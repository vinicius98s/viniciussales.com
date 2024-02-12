import { flow, pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";

import { FormattedPost, Post } from "./notion.types";
import {
  formatPost,
  getPostContent,
  getPreviousAndNextPosts,
  getDatabaseId,
  getNotionClient,
} from "./notion.utils";

export function fetchPostBySlug(
  slug: string
): TE.TaskEither<Error, FormattedPost> {
  return pipe(getNotionClient(), (client) =>
    pipe(
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
      TE.chain(flow(getPostContent(client))),
      TE.chain(flow(getPreviousAndNextPosts(client)))
    )
  );
}

export function likePost(post: { id: string; likes: number }) {
  return pipe(getNotionClient(), (client) =>
    TE.tryCatch(
      () =>
        client.pages.update({
          page_id: post.id,
          properties: { likes: { number: post.likes + 1 } },
        }),
      E.toError
    )
  );
}

export function getBlogPostsPreview(
  pageSize?: number
): TE.TaskEither<Error, Post[]> {
  return pipe(
    getNotionClient(),
    (client) =>
      pipe(
        getDatabaseId(),
        TE.fromEither,
        TE.chain((database_id) =>
          TE.tryCatch(
            () => client.databases.query({ database_id, page_size: pageSize }),
            E.toError
          )
        )
      ),
    TE.map(({ results }) =>
      pipe(results, A.filterMap(flow(formatPost, O.fromEither)))
    )
  );
}
