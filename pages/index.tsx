import type { InferGetStaticPropsType, GetStaticProps } from "next";

import Header from "@components/Header";
import Greetings from "@components/Greetings";
import LastWritings from "@components/LastWritings";
import Songs from "@components/Songs";
import Seo from "@components/Seo";

import { getFromTaskEither } from "@utils/fp-ts";

import { getBlogPostsPreview } from "@services/notion";
import { getTopSongs } from "@services/spotify";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ posts, songs }: Props) => {
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

export const getStaticProps = (async () => {
  const posts = await getFromTaskEither(getBlogPostsPreview(2), []);
  const songs = await getFromTaskEither(getTopSongs(), []);

  return { props: { songs, posts }, revalidate: 1 * 60 * 60 };
}) satisfies GetStaticProps;

export default Home;
