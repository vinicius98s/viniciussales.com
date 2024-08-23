import type { GetStaticProps, InferGetStaticPropsType } from "next";

import Header from "@components/Header";
import PostPreview from "@components/PostPreview";
import { Box, Col, Flex, Row } from "@components/Grid";

import { getFromTaskEither } from "@utils/fp-ts";

import { getBlogPostsPreview } from "@services/notion";
import { Heading } from "@components/Typography";
import Seo from "@components/Seo";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Writings = ({ posts }: Props) => {
  return (
    <>
      <Seo title="Writing" />
      <Header activePage="writing" />
      <Row>
        <Col size={3}>
          <Heading color="primary" fontSize="32px">
            <Flex alignItems="center">
              <span
                role="img"
                aria-label="writing hand"
                style={{ fontSize: 32 }}
              >
                ✍🏽
              </span>
              <Heading color="primary" fontSize={5} ml={2}>
                Writing.
              </Heading>
            </Flex>
          </Heading>
          <Heading level={2} mt={2} fontSize={4}>
            All posts I&apos;ve written.
          </Heading>
        </Col>
      </Row>

      <Box mt={6}>
        {posts.map((post, index) => (
          <Box mb={index + 1 === posts.length ? 7 : 5} key={post.id}>
            <PostPreview post={post} index={index} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export const getStaticProps = (async () => {
  const posts = await getFromTaskEither(getBlogPostsPreview(), []);

  return { props: { posts } };
}) satisfies GetStaticProps;

export default Writings;
