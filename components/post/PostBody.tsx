import type { Inline } from "@lib/posts";
import type { RenderedBlock } from "@lib/highlight";

import CodeBlock from "./CodeBlock";

import t from "@styles/typography.module.css";
import styles from "./PostBody.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

function InlineContent({ content }: { content: Inline[] }) {
  return content.map((item, i) => {
    if (typeof item === "string") return item;
    if ("code" in item) {
      return (
        <code key={i} className={`${t.mono} ${styles.inlineCode}`}>
          {item.code}
        </code>
      );
    }
    return (
      <a key={i} href={item.href} className={styles.link}>
        {item.link}
      </a>
    );
  });
}

type Props = { blocks: RenderedBlock[] };

export default function PostBody({ blocks }: Props) {
  let heading = 0;
  const numbered = blocks.map((block) => ({
    block,
    n: block.type === "h2" ? pad(++heading) : "",
  }));
  const toc = numbered.filter(({ block }) => block.type === "h2");

  return (
    <div className={styles.layout}>
      <aside className={styles.aside}>
        <nav className={styles.toc} aria-label="Contents">
          <span className={`${t.label} ${styles.tocLabel}`}>Contents</span>
          {toc.map(({ block, n }) => (
            <a key={n} href={`#section-${n}`} className={styles.tocItem}>
              <span className={`${t.mono} ${styles.tocNumber}`}>{n}</span>
              {block.type === "h2" && block.text}
            </a>
          ))}
        </nav>
      </aside>
      <article className={styles.article}>
        {numbered.map(({ block, n }, i) => {
          switch (block.type) {
            case "p":
              return (
                <p key={i} className={styles.paragraph}>
                  <InlineContent content={block.content} />
                </p>
              );
            case "h2":
              return (
                <h2
                  key={i}
                  id={`section-${n}`}
                  className={`${t.display} ${styles.heading}`}
                >
                  <span className={`${t.mono} ${styles.headingNumber}`}>
                    {n}
                  </span>
                  {block.text}
                </h2>
              );
            case "quote":
              return (
                <blockquote key={i} className={`${t.display} ${styles.quote}`}>
                  <span className={styles.accent}>“</span>
                  {block.text}
                  <span className={styles.accent}>”</span>
                </blockquote>
              );
            case "code":
              return (
                <CodeBlock
                  key={i}
                  filename={block.filename}
                  code={block.code}
                  html={block.html}
                />
              );
          }
        })}
      </article>
    </div>
  );
}
