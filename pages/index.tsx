import type { NextPage, InferGetServerSidePropsType } from "next";

import Header from "@components/Header";
import LastWritings from "@components/LastWritings";
import { Col, Flex, Row } from "@components/Grid";
import { Heading, Text } from "@components/Typography";
import Songs from "@components/Songs";
import Seo from "@components/Seo";

import { getFromTaskEither } from "@utils/fp-ts";

import { getBlogPostsPreview } from "@services/notion";
import { getTopSongs } from "@services/spotify";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ posts, songs }) => {
  return (
    <>
      <Seo title="Vinicius Sales" />
      <Header activePage="home" />
      <Row
        mt={7}
        as="section"
        px={[4, 0]}
        gridTemplateColumns={["auto", "repeat(4, 1fr)"]}
      >
        <Col size={3}>
          <Flex alignItems="center">
            <span role="img" aria-label="waving hand" style={{ fontSize: 32 }}>
              👋
            </span>
            <Heading color="primary" fontSize={5} ml={2}>
              Hi, I’m Vinícius.
            </Heading>
          </Flex>
          <Heading level={2} mt={2} fontSize={4}>
            Software Development Engineer
          </Heading>
          <Text mt={3} fontSize="16px" lineHeight={1.4}>
            A seasoned full-stack developer with a strong background in both
            front-end and back-end technologies. Proficient in React, Node.js,
            Typescript, and Functional Programming. I have a proven track record
            of developing, maintaining, and enhancing web applications, excel in
            modernizing codebases, implementing new features, and ensuring high
            code quality standards. My expertise is backed by a proactive
            approach to continuous learning and professional growth.
          </Text>
        </Col>
      </Row>
      <LastWritings posts={posts} />
      <Songs songs={songs} />
    </>
  );
};

export async function getServerSideProps() {
  const posts = await getFromTaskEither(getBlogPostsPreview(2), []);
  const songs = await getFromTaskEither(getTopSongs(), []);

  return {
    props: {
      songs,
      posts,
    },
  };
}

export default Home;
