import type { NextPage } from "next";

import Header from "@components/Header";
import PostPreview from "@components/PostPreview";
import { Box, Col, Row } from "@components/Grid";

import { getFromTaskEither } from "@utils/fp-ts";

import { getNotionClient, getBlogPostsPreview, Post } from "@services/notion";
import { Heading } from "@components/Typography";

type Props = {
  posts: Post[];
};

const Writings: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Header activePage="writing" />
      <Row mt={7} as="section">
        <Col size={3}>
          <Heading color="primary" fontSize="32px">
            <span role="img" aria-label="writing hand">
              ✍🏽
            </span>{" "}
            Writing.
          </Heading>
          <Heading level={2} mt={2} fontSize="24px">
            All posts I&apos;ve written.
          </Heading>
        </Col>
      </Row>
      <Box mt={6}>
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
  const client = getNotionClient();
  const posts = await getFromTaskEither(getBlogPostsPreview(client), []);

  return { props: { posts } };
}

export default Writings;
