import type { NextPage } from "next";

import Header from "@components/Header";
import LastWritings from "@components/LastWritings";
import { Col, Row } from "@components/Grid";
import { Heading, Text } from "@components/Typography";
import Songs from "@components/Songs";
import Seo from "@components/Seo";

import { getFromTaskEither } from "@utils/fp-ts";

import { getBlogPostsPreview, getNotionClient, Post } from "@services/notion";
import { getTopSongs, Song } from "@services/spotify";

const Home: NextPage<{ posts: Post[]; songs: Song[] }> = ({ posts, songs }) => {
  return (
    <>
      <Seo title="Vinicius Sales" />
      <Header activePage="home" />
      <Row mt={7} as="section">
        <Col size={3}>
          <Heading color="primary" fontSize="32px">
            <span role="img" aria-label="waving hand">
              👋
            </span>{" "}
            Hi, I’m Vinicius.
          </Heading>
          <Heading level={2} mt={2} fontSize="24px">
            A nice and clean subject.
          </Heading>
          <Text mt={3} fontSize="16px" lineHeight={1.35}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Col>
      </Row>
      <LastWritings posts={posts} />
      <Songs songs={songs} />
    </>
  );
};

export async function getStaticProps() {
  const client = getNotionClient();
  const posts = await getFromTaskEither(getBlogPostsPreview(client, 2), []);
  const songs = await getFromTaskEither(getTopSongs(), []);

  return { props: { posts, songs } };
}

export default Home;
