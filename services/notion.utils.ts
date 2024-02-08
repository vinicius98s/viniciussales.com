import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/function";
import { Client, isFullPage } from "@notionhq/client";
import {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { FormattedPost, NextOrPreviousPost, Page, Post } from "./notion.types";

type PostWithPage = Post & {
  page: PageObjectResponse;
};

export function getNotionClient() {
  return new Client({ auth: process.env.NOTION_SECRET });
}

export function getDatabaseId() {
  return pipe(
    O.fromNullable(process.env.NOTION_DATABASE_ID),
    E.fromOption(() => new Error("Missing NOTION_DATABASE_ID env variable"))
  );
}

export function formatPost(page?: Page): E.Either<Error, PostWithPage> {
  if (!page) return E.left(new Error("missing page"));
  return pipe(
    page,
    E.fromPredicate(isFullPage, () => new Error("not a full page")),
    E.map((fullPage) => {
      const pageDescription = fullPage.properties.description;
      const pageTitle = fullPage.properties.title;
      const pageSlug = fullPage.properties.slug;
      const pageCreatedAt = fullPage.properties.createdAt;
      const pageLikes = fullPage.properties.likes;
      if (
        pageSlug.type !== "rich_text" ||
        pageDescription.type !== "rich_text" ||
        pageTitle.type !== "title" ||
        pageCreatedAt.type !== "date" ||
        pageLikes.type !== "number"
      ) {
        throw new Error("invalid page properties");
      }

      const createdAt = pageCreatedAt.date?.start;
      if (!createdAt) {
        throw new Error("missing 'start' from 'createdAt' page");
      }

      const description = pageDescription.rich_text[0].plain_text;
      const title = pageTitle.title[0].plain_text;
      const slug = pageSlug.rich_text[0].plain_text;
      const likes = pageLikes.number ?? 0;
      return {
        id: page.id,
        title,
        description,
        slug,
        createdAt,
        page: fullPage,
        likes,
      };
    })
  );
}

function getPageIdAndParentDatabaseId(
  page: PageObjectResponse
): E.Either<Error, { id: number; database_id: string }> {
  if (page.properties.id.type !== "unique_id") {
    return E.left(new Error("invalid page 'id'"));
  }

  if (page.parent.type !== "database_id") {
    return E.left(new Error("invalid page 'parent'"));
  }

  const id = page.properties.id.unique_id.number;
  if (typeof id !== "number") {
    return E.left(new Error("missing page 'unique_id'"));
  }
  const database_id = page.parent.database_id;
  return E.right({ id, database_id });
}

type PostWithContent = {
  post: PostWithPage;
  content: ListBlockChildrenResponse;
};

export function getPostContent(client: Client) {
  return function (page: Page): TE.TaskEither<Error, PostWithContent> {
    return pipe(
      formatPost(page),
      TE.fromEither,
      TE.chain((post) =>
        TE.tryCatch(async () => {
          const content = await client.blocks.children.list({
            block_id: post.page.id,
          });
          return { content, post };
        }, E.toError)
      )
    );
  };
}

function getPreviousOrNextPost(
  client: Client,
  page: { id: number; database_id: string },
  filter: "next" | "previous"
): TE.TaskEither<Error, NextOrPreviousPost> {
  return pipe(
    TE.tryCatch(
      () =>
        client.databases.query({
          database_id: page.database_id,
          filter: {
            unique_id:
              filter === "previous"
                ? { less_than: page.id }
                : { greater_than: page.id },
            property: "id",
          },
        }),
      E.toError
    ),
    TE.map((data) => pipe(data.results, ([post]) => O.fromNullable(post))),
    TE.chain(flow(TE.fromOption(() => new Error(`${filter} post not found`)))),
    TE.chain(flow(formatPost, TE.fromEither)),
    TE.map((post) => ({
      title: post.title,
      description: post.description,
      slug: post.slug,
    }))
  );
}

export function getPreviousAndNextPosts(client: Client) {
  return function ({
    post,
    content,
  }: PostWithContent): TE.TaskEither<Error, FormattedPost> {
    return pipe(
      getPageIdAndParentDatabaseId(post.page),
      TE.fromEither,
      TE.chainW((page) =>
        pipe(
          getPreviousOrNextPost(client, page, "previous"),
          TE.orElseW(() => TE.right(null)),
          TE.chain((previousPost) =>
            pipe(
              getPreviousOrNextPost(client, page, "next"),
              TE.orElseW(() => TE.right(null)),
              TE.map((nextPost) => ({ previousPost, nextPost }))
            )
          ),
          TE.orElseW(() => TE.right({ previousPost: null, nextPost: null }))
        )
      ),
      TE.map((postWithPreviousAndNext) => {
        const { page: _, ...postWithoutPage } = post;
        return {
          content,
          ...postWithoutPage,
          ...postWithPreviousAndNext,
        };
      })
    );
  };
}
