import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/function";
import { Client, isFullPage, isFullBlock } from "@notionhq/client";
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import fs from "fs";
import path from "path";
import axios from "axios";

import { FormattedPost, NextOrPreviousPost, Page, Post } from "./notion.types";

type PostWithPage = Post & {
  page: PageObjectResponse;
};

async function downloadAndSaveImage(
  blockId: string,
  imageUrl: string
): Promise<string> {
  const imagesDir = path.join(process.cwd(), "public", "images", "posts");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  let fileExtension: string;
  try {
    const urlPath = new URL(imageUrl).pathname;
    fileExtension = path.extname(urlPath);
    // Default to .jpg if no extension is found
    if (!fileExtension) {
      fileExtension = ".jpg";
    }
  } catch {
    // If URL is invalid, default to .jpg
    fileExtension = ".jpg";
  }

  const localFileName = `${blockId}${fileExtension}`;
  const localImagePath = path.join(imagesDir, localFileName);
  const publicPath = `/images/posts/${localFileName}`;

  if (!fs.existsSync(localImagePath)) {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
      timeout: 30000, // 30 second timeout
    });
    const writer = fs.createWriteStream(localImagePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }

  return publicPath;
}

export const statusFilter = {
  or: [
    { select: { equals: "Published" }, property: "status" },
    ...(process.env.NODE_ENV !== "production"
      ? [{ select: { equals: "Draft" }, property: "status" }]
      : []),
  ],
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
      const pageStatus = fullPage.properties.status;
      const pageImage = fullPage.properties.image;
      if (
        pageSlug.type !== "rich_text" ||
        pageDescription.type !== "rich_text" ||
        pageTitle.type !== "title" ||
        pageCreatedAt.type !== "date" ||
        pageLikes.type !== "number" ||
        pageStatus.type !== "select" ||
        pageImage.type !== "files"
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
      const image = pageImage.files[0]?.name ?? null;
      const likes = pageLikes.number ?? 0;
      const isDraft = pageStatus.select?.name === "Draft";
      return {
        id: page.id,
        title,
        image,
        description,
        slug,
        createdAt,
        page: fullPage,
        likes,
        isDraft,
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

          // Process image blocks in parallel for better performance
          const imageDownloadPromises = content.results.map(async (block) => {
            if (isFullBlock(block) && block.type === "image") {
              const imageBlock = block as BlockObjectResponse & {
                type: "image";
              };
              const imageUrl =
                imageBlock.image.type === "external"
                  ? imageBlock.image.external.url
                  : imageBlock.image.file.url;

              // Download and save the image
              const localPath = await downloadAndSaveImage(
                block.id,
                imageUrl
              );

              // Update the image block to use the local path
              if (imageBlock.image.type === "file") {
                imageBlock.image.file.url = localPath;
              } else {
                imageBlock.image.external.url = localPath;
              }
            }
          });

          // Wait for all images to be downloaded
          await Promise.all(imageDownloadPromises);

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
            and: [
              {
                unique_id:
                  filter === "previous"
                    ? { less_than: page.id }
                    : { greater_than: page.id },
                property: "id",
              },
              statusFilter,
            ],
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
          TE.Do,
          TE.bind("previousPost", () =>
            pipe(
              getPreviousOrNextPost(client, page, "previous"),
              TE.orElseW(() => TE.right(null))
            )
          ),
          TE.bind("nextPost", () =>
            pipe(
              getPreviousOrNextPost(client, page, "next"),
              TE.orElseW(() => TE.right(null))
            )
          )
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
