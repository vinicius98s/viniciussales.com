import type { InferGetStaticPropsType, GetStaticProps } from "next";

import Header from "@components/Header";
import Seo from "@components/Seo";
import Hero from "@components/home/Hero";
import Writing from "@components/home/Writing";
import About from "@components/home/About";
import Contact from "@components/home/Contact";

import { getPostPreviews, REVALIDATE_SECONDS } from "@lib/posts";

import t from "@styles/typography.module.css";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ posts }: Props) => {
  return (
    <>
      <Seo title="Home" />
      <Header />
      <main className={t.container}>
        <Hero draft={posts.find((p) => p.isDraft)} />
        <Writing posts={posts} />
        <About />
        <Contact />
      </main>
    </>
  );
};

export const getStaticProps = (async () => {
  return {
    props: { posts: await getPostPreviews() },
    revalidate: REVALIDATE_SECONDS,
  };
}) satisfies GetStaticProps;

export default Home;
