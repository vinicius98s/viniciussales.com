import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import { Client } from "@notionhq/client";
import slugify from "@sindresorhus/slugify";

export function getNotionClient() {
  return new Client({ auth: process.env.NOTION_SECRET });
}

export type Post = {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  slug: string;
};

export function getDatabase(client: Client, pageSize?: number) {
  return pipe(
    O.fromNullable(process.env.DATABASE_ID),
    TE.fromOption(() => new Error("Missing DATABASE_ID")),
    TE.chain((database_id) =>
      TE.tryCatch(
        () => client.databases.query({ database_id, page_size: pageSize }),
        E.toError
      )
    )
  );
}

export function getBlogPostsPreview(
  client: Client
): TE.TaskEither<Error, Post[]> {
  return pipe(
    getDatabase(client, 2),
    TE.map((data) =>
      pipe(
        data.results,
        A.map((post) => {
          // @ts-ignore
          const title = post.properties.title.title[0].plain_text;

          return {
            id: post.id,
            title,
            slug: slugify(title),
            // @ts-ignore
            description: post.properties.description.rich_text[0].plain_text,
            // @ts-ignore
            createdAt: post.properties.createdAt.date.start,
          };
        })
      )
    )
  );
}
