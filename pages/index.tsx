import type { NextPage, InferGetServerSidePropsType } from "next";

import Header from "@components/Header";
import Greetings from "@components/Greetings";
import LastWritings from "@components/LastWritings";
import Songs from "@components/Songs";
import Seo from "@components/Seo";

import { getFromTaskEither } from "@utils/fp-ts";

import { getBlogPostsPreview } from "@services/notion";
import { getTopSongs } from "@services/spotify";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ posts, songs }) => {
  return (
    <>
      <Seo title="Home" />
      <Header activePage="home" />
      <Greetings />
      <LastWritings posts={posts} />
      <Songs songs={songs} />
    </>
  );
};

export async function getServerSideProps() {
  const posts = await getFromTaskEither(getBlogPostsPreview(2), []);
  const songs = await getFromTaskEither(getTopSongs(), []);

  return { props: { songs, posts } };
}

export default Home;
