import type { NextPage } from "next";

import Header from "@components/Header";
import PostPreview from "@components/PostPreview";
import { Box, Col, Flex, Row } from "@components/Grid";

import { getFromTaskEither } from "@utils/fp-ts";

import { getBlogPostsPreview } from "@services/notion";
import { Post } from "@services/notion.types";
import { Heading } from "@components/Typography";
import Seo from "@components/Seo";

type Props = {
  posts: Post[];
};

const Writings: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Seo title="Writing" />
      <Header activePage="writing" />
      <Row
        mt={7}
        as="section"
        px={[4, 0]}
        gridTemplateColumns={["auto", "repeat(4, 1fr)"]}
      >
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

      <Box mt={6} px={[4, 0]}>
        {posts.map((post, index) => (
          <Box mb={index + 1 === posts.length ? 7 : 5} key={post.id}>
            <PostPreview post={post} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export async function getStaticProps() {
  const posts = await getFromTaskEither(getBlogPostsPreview(), []);

  return { props: { posts } };
}

export default Writings;
