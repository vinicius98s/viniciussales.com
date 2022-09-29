import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";

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

const Home: NextPage<Props> = ({ posts, songs, allowSpotifyIntegration }) => {
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
              Hi, I’m Vinicius.
            </Heading>
          </Flex>
          <Heading level={2} mt={2} fontSize={4}>
            A nice and clean subject.
          </Heading>
          <Text mt={3} fontSize="16px" lineHeight={1.4}>
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
      <Songs songs={songs} allowSpotifyIntegration={allowSpotifyIntegration} />
    </>
  );
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const posts = await getFromTaskEither(getBlogPostsPreview(2), []);
  const code = typeof query.code === "string" ? query.code : null;
  const songs = await getFromTaskEither(getTopSongs(code), []);
  const allowSpotifyIntegration =
    query.spotify === process.env.SPOTIFY_PASSWORD;

  return {
    ...(!!code && {
      redirect: {
        destination: "/",
        statusCode: 308,
      },
    }),
    props: {
      songs,
      posts,
      allowSpotifyIntegration,
    },
  };
}

export default Home;
