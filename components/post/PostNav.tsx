import Link from "next/link";

import type { PostPreview } from "@lib/posts";

import t from "@styles/typography.module.css";
import styles from "./PostNav.module.css";

type Props = {
  previousPost: PostPreview | null;
  nextPost: PostPreview | null;
};

export default function PostNav({ previousPost, nextPost }: Props) {
  if (!previousPost && !nextPost) return null;

  return (
    <nav className={styles.nav} aria-label="More posts">
      {previousPost && (
        <Link
          href={`/blog/${previousPost.slug}`}
          className={`${styles.link} ${styles.previous}`}
        >
          <span className={`${t.label} ${styles.label}`}>← Previous</span>
          <span className={`${t.display} ${styles.title}`}>
            {previousPost.title}
          </span>
        </Link>
      )}
      {nextPost && (
        <Link
          href={`/blog/${nextPost.slug}`}
          className={`${styles.link} ${styles.next}`}
        >
          <span className={`${t.label} ${styles.label}`}>Next →</span>
          <span className={`${t.display} ${styles.title}`}>
            {nextPost.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
