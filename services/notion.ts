import { flow, pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import { Client, isFullPage } from "@notionhq/client";
import {
  PartialPageObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export function getNotionClient() {
  return new Client({ auth: process.env.NOTION_SECRET });
}

export type Post = {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  slug: string;
  likes: number;
};

function getDatabaseId() {
  return pipe(
    O.fromNullable(process.env.NOTION_DATABASE_ID),
    E.fromOption(() => new Error("Missing NOTION_DATABASE_ID"))
  );
}

export function getDatabase(client: Client, pageSize?: number) {
  return pipe(
    getDatabaseId(),
    TE.fromEither,
    TE.chain((database_id) =>
      TE.tryCatch(
        () => client.databases.query({ database_id, page_size: pageSize }),
        E.toError
      )
    )
  );
}

function buildPostTitleAndDescription(
  page: PageObjectResponse | PartialPageObjectResponse
) {
  if (!isFullPage(page)) return E.left("bad page response");
  const pageDescription = page.properties.description;
  const pageTitle = page.properties.title;
  if (pageDescription.type !== "rich_text" || pageTitle.type !== "title") {
    return E.left("invalid page 'description' or 'title'");
  }
  const description = pageDescription.rich_text[0].plain_text;
  const title = pageTitle.title[0].plain_text;
  return E.right({ title, description, page });
}

export function fetchPostBySlug(slug: string) {
  return function (client: Client) {
    return pipe(
      getDatabaseId(),
      TE.fromEither,
      TE.chain((database_id) =>
        TE.tryCatch(
          () =>
            client.databases.query({
              database_id,
              filter: { rich_text: { equals: slug }, property: "slug" },
            }),
          E.toError
        )
      ),
      TE.map((data) => pipe(data.results, ([post]) => O.fromNullable(post))),
      TE.chain(flow(TE.fromOption(() => new Error("post not found")))),
      TE.chain((page) =>
        TE.tryCatch(async () => {
          const content = await client.blocks.children.list({
            block_id: page.id,
          });

          const post = buildPostTitleAndDescription(page);
          if (E.isLeft(post)) {
            throw new Error(post.left);
          }

          return {
            content,
            title: post.right.title,
            description: post.right.description,
          };
        }, E.toError)
      )
    );
  };
}

export function likePost(post: { id: string; likes: number }) {
  return function (client: Client) {
    return pipe(
      TE.tryCatch(
        () =>
          client.pages.update({
            page_id: post.id,
            properties: { likes: { number: post.likes + 1 } },
          }),
        E.toError
      )
    );
  };
}

function buildPostPreview(
  page: PageObjectResponse | PartialPageObjectResponse
) {
  return pipe(
    page,
    buildPostTitleAndDescription,
    E.chain(({ title, description, page }) => {
      const properties = page.properties;
      const pageSlug = properties.slug;
      const pageCreatedAt = properties.createdAt;
      const pageLikes = properties.likes;

      if (pageSlug.type !== "rich_text") {
        return E.left("bad page 'slug' type");
      }

      if (pageCreatedAt.type !== "date") {
        return E.left("bad page 'createdAt' type");
      }
      const createdAt = pageCreatedAt.date?.start;
      if (!createdAt) {
        return E.left("missing 'start' from 'createdAt' page");
      }

      if (pageLikes.type !== "number") {
        return E.left("bad page 'likes' type");
      }

      return E.right({
        id: page.id,
        title,
        description,
        slug: pageSlug.rich_text[0].plain_text,
        createdAt,
        likes: pageLikes.number ?? 0,
      });
    })
  );
}

export function getBlogPostsPreview(
  client: Client,
  pageSize?: number
): TE.TaskEither<Error, Post[]> {
  return pipe(
    getDatabase(client, pageSize),
    TE.map(({ results }) =>
      pipe(results, A.filterMap(flow(buildPostPreview, O.fromEither)))
    )
  );
}
