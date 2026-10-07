import Link from "next/link";

import { formatShortDate, type PostPreview } from "@lib/posts";

import t from "@styles/typography.module.css";
import styles from "./Writing.module.css";

type Props = { posts: PostPreview[] };

export default function Writing({ posts }: Props) {
  return (
    <section id="writing" className={styles.section}>
      <div className={styles.heading}>
        <h2 className={`${t.display} ${styles.title}`}>
          Writing
          <span className={`${t.mono} ${styles.count}`}>({posts.length})</span>
        </h2>
        <span className={`${t.label} ${styles.number}`}>01</span>
      </div>
      <ol className={styles.list}>
        {posts.map((post, i) => (
          <li key={post.slug} className={styles.item}>
            <Link href={`/blog/${post.slug}`} className={styles.row}>
              <span className={`${t.mono} ${styles.index}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.body}>
                <span className={styles.titleRow}>
                  <span className={`${t.display} ${styles.postTitle}`}>
                    {post.title}
                  </span>
                  {post.isDraft && <span className={t.draftBadge}>DRAFT</span>}
                </span>
                <span className={styles.description}>{post.description}</span>
              </span>
              <span className={`${t.mono} ${styles.date}`}>
                <time dateTime={post.createdAt}>
                  {formatShortDate(post.createdAt)}
                </time>
                <span className={styles.arrow}>→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
