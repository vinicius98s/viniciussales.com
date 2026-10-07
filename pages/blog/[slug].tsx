import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";

import Header from "@components/Header";
import Seo from "@components/Seo";
import PostBody from "@components/post/PostBody";
import PostNav from "@components/post/PostNav";

import { formatLongDate, getPostBySlug, getPostPreviews } from "@lib/posts";
import { renderBlocks } from "@lib/highlight";
import { getBaseUrl } from "@utils/url";

import t from "@styles/typography.module.css";
import styles from "@styles/Post.module.css";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post = ({ post, blocks, previousPost, nextPost }: Props) => {
  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        url={`${getBaseUrl()}/blog/${post.slug}`}
        type="article"
        publishedTime={post.createdAt}
      />
      <Header showProgress />
      <main className={t.container}>
        <div className={styles.intro}>
          <Link href="/#writing" className={`${t.label} ${styles.back}`}>
            <span>←</span>All writing
          </Link>
          <div className={`${t.mono} ${styles.meta}`}>
            <time dateTime={post.createdAt} className={styles.metaItem}>
              {formatLongDate(post.createdAt)}
            </time>
            <span className={styles.metaItem}>{post.readTime} min read</span>
            {post.isDraft && (
              <span className={`${t.draftBadge} ${styles.draft}`}>DRAFT</span>
            )}
          </div>
          <h1 className={`${t.display} ${styles.title}`}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
        </div>

        <PostBody blocks={blocks} />
        <PostNav previousPost={previousPost} nextPost={nextPost} />
      </main>
    </>
  );
};

export const getStaticProps = (async ({ params }) => {
  const result = getPostBySlug(params?.slug as string);
  if (!result) return { notFound: true };

  const { post, previousPost, nextPost } = result;
  const { blocks, ...preview } = post;

  return {
    props: {
      post: preview,
      blocks: await renderBlocks(blocks),
      previousPost,
      nextPost,
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  return {
    fallback: false,
    paths: getPostPreviews().map(({ slug }) => ({ params: { slug } })),
  };
}) satisfies GetStaticPaths;

export default Post;
