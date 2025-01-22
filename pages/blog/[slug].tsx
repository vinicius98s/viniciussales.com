import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { motion, useScroll, useSpring } from "framer-motion";
import styled from "@emotion/styled";

import BlockRenderer from "@components/post/BlockRenderer";
import { Heading } from "@components/Typography";
import Header from "@components/Header";
import { Box } from "@components/Grid";
import Seo from "@components/Seo";
import ContinueReading from "@components/ContinueReading";
import Badge from "@components/Badge";

import { getFromTaskEither } from "@utils/fp-ts";

import { getBlogPostsPreview, fetchPostBySlug } from "@services/notion";

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${(p) => p.theme.space[1]}px;
  background: ${(p) => p.theme.colors.primary};
  transform-origin: 0%;
  z-index: 1;
`;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Slug = (post: Props) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 250,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  return (
    <>
      <ProgressBar style={{ scaleX }} />
      <Header activePage="writing" />
      <Seo title={post.title} description={post.description} />
      <Box as="article" mt={8}>
        {post.isDraft && (
          <Box mb={4}>
            <Badge>DRAFT</Badge>
          </Box>
        )}
        <Heading color="primary" textAlign="center" fontSize="2rem">
          {post.title}
        </Heading>
        <Heading fontSize="1.4rem" level={2} mt={2} mb={5} textAlign="center">
          {post.description}
        </Heading>
        {post.content.results.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </Box>
      <ContinueReading
        previousPost={post.previousPost}
        nextPost={post.nextPost}
      />
    </>
  );
};

export const getStaticProps = (async ({ params }) => {
  return await pipe(
    fetchPostBySlug(params?.slug as string),
    TE.map((post) => ({ props: post, revalidate: 1 * 60 * 60 })),
    TE.getOrElseW(() => T.of({ notFound: true } as const))
  )();
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  return await pipe(
    getBlogPostsPreview(),
    TE.getOrElseW(() => T.of([])),
    T.map((posts) => ({
      fallback: false,
      paths: posts.map(({ slug }) => ({ params: { slug } })),
    }))
  )();
}) satisfies GetStaticPaths;

export default Slug;
