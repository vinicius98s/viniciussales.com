import type { NextPage } from "next";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";

import Header from "@components/Header";
import LastWritings from "@components/LastWritings";
import { Col, Row } from "@components/Grid";
import { Heading, Text } from "@components/Typography";
import Songs from "@components/Songs";

import { getBlogPostsPreview, getNotionClient, Post } from "@services/notion";
import { getTopSongs, Song } from "@services/spotify";

const Home: NextPage<{ posts: Post[]; songs: Song[] }> = ({ posts, songs }) => {
  return (
    <>
      <Header activePage="home" />
      <Row mt={8} as="section">
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
          <Text mt={3} fontSize="16px">
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

function getFromTaskEither<T>(
  task: TE.TaskEither<unknown, T>,
  defaultValue: T
) {
  return pipe(
    task,
    TE.getOrElse(() => T.of(defaultValue))
  )();
}

export async function getStaticProps() {
  const client = getNotionClient();
  const posts = await getFromTaskEither(getBlogPostsPreview(client), []);
  const songs = await getFromTaskEither(getTopSongs(), []);

  return { props: { posts, songs } };
}

export default Home;
