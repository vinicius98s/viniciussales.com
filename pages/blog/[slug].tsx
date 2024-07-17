import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
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
import { FormattedPost } from "@services/notion.types";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  return await pipe(
    fetchPostBySlug(params?.slug as string),
    TE.map((post) => ({ props: post })),
    TE.getOrElseW(() => T.of({ notFound: true }))
  )();
};

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

const Slug: NextPage<FormattedPost> = (post) => {
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
      <Box as="article" mt={8} px={[4, 0]}>
        {post.isDraft && (
          <Box mb={4}>
            <Badge>DRAFT</Badge>
          </Box>
        )}
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
      <ContinueReading
        previousPost={post.previousPost}
        nextPost={post.nextPost}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFromTaskEither(getBlogPostsPreview(), []);

  return {
    fallback: false,
    paths: posts.map(({ slug }) => ({ params: { slug } })),
  };
};

export default Slug;
