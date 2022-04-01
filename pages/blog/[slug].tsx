import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";
import * as T from "fp-ts/Task";

import BlockRenderer from "@components/post/BlockRenderer";
import { Heading } from "@components/Typography";
import Header from "@components/Header";
import { Box } from "@components/Grid";
import Seo from "@components/Seo";

import { getFromTaskEither } from "@utils/fp-ts";

import {
  getBlogPostsPreview,
  getNotionClient,
  fetchPostBySlug,
} from "@services/notion";

type Props = {
  content: ListBlockChildrenResponse;
  title: string;
  description: string;
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = await pipe(
    getNotionClient(),
    fetchPostBySlug(params?.slug as string),
    TE.fold(
      () => T.of(O.none),
      (data) => T.of(O.of({ props: data }))
    )
  )();

  return O.getOrElseW(() => ({ notFound: true }))(post);
};

const Slug: NextPage<Props> = (post) => {
  return (
    <>
      <Header activePage="writing" />
      <Seo title={post.title} />
      <Box as="article" mt={8} px={[4, 0]}>
        <Heading color="primary" textAlign="center">
          {post.title}
        </Heading>
        <Heading level={3} mt={2} mb={4} textAlign="center">
          {post.description}
        </Heading>
        {post.content.results.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </Box>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getNotionClient();
  const posts = await getFromTaskEither(getBlogPostsPreview(client), []);

  return {
    fallback: false,
    paths: posts.map(({ slug }) => ({ params: { slug } })),
  };
};

export default Slug;
