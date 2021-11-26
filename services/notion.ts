import { flow, pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import { Client } from "@notionhq/client";

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
    O.fromNullable(process.env.DATABASE_ID),
    TE.fromOption(() => new Error("Missing DATABASE_ID"))
  );
}

export function getDatabase(client: Client, pageSize?: number) {
  return pipe(
    getDatabaseId(),
    TE.chain((database_id) =>
      TE.tryCatch(
        () => client.databases.query({ database_id, page_size: pageSize }),
        E.toError
      )
    )
  );
}

export function fetchPostBySlug(slug: string) {
  return function (client: Client) {
    return pipe(
      getDatabaseId(),
      TE.chain((database_id) =>
        TE.tryCatch(
          () =>
            client.databases.query({
              database_id,
              filter: { text: { equals: slug }, property: "slug" },
            }),
          E.toError
        )
      ),
      TE.map((data) => pipe(data.results, ([post]) => O.fromNullable(post))),
      TE.chain(
        flow(
          TE.fromOption(() => new Error("failed to get page id")),
          TE.chain((post) =>
            TE.tryCatch(async () => {
              const content = await client.blocks.children.list({
                block_id: post.id,
              });
              const description =
                // @ts-ignore
                post.properties.description.rich_text[0].plain_text;
              // @ts-ignore
              const title = post.properties.title.title[0].plain_text;
              return { content, title, description };
            }, E.toError)
          )
        )
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

export function getBlogPostsPreview(
  client: Client,
  pageSize?: number
): TE.TaskEither<Error, Post[]> {
  return pipe(
    getDatabase(client, pageSize),
    TE.map((data) =>
      pipe(
        data.results,
        A.map((post) => ({
          id: post.id,
          // @ts-ignore
          title: post.properties.title.title[0].plain_text,
          // @ts-ignore
          slug: post.properties.slug.rich_text[0].plain_text,
          // @ts-ignore
          description: post.properties.description.rich_text[0].plain_text,
          // @ts-ignore
          createdAt: post.properties.createdAt.date.start,
          // @ts-ignore
          likes: post.properties.likes.number,
        }))
      )
    )
  );
}
