import Image from "next/image";

import type { Inline, ListBlock, Text } from "@lib/posts";
import type { RenderedBlock } from "@lib/highlight";

import CodeBlock from "./CodeBlock";

import t from "@styles/typography.module.css";
import styles from "./PostBody.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

function TextContent({ item }: { item: Text }) {
  let node: React.ReactNode = item.text;
  if (item.code) {
    node = <code className={`${t.mono} ${styles.inlineCode}`}>{node}</code>;
  }
  if (item.italic) node = <em>{node}</em>;
  if (item.bold) node = <strong>{node}</strong>;
  return node;
}

function InlineContent({ content }: { content: Inline[] }) {
  return content.map((item, i) => {
    switch (item.type) {
      case "text":
        return <TextContent key={i} item={item} />;
      case "br":
        return <br key={i} />;
      case "link":
        return (
          <a key={i} href={item.href} className={styles.link}>
            {item.children.map((child, j) => (
              <TextContent key={j} item={child} />
            ))}
          </a>
        );
    }
  });
}

function List({ list }: { list: ListBlock }) {
  const Tag = list.ordered ? "ol" : "ul";
  return (
    <Tag className={`${styles.list} ${list.ordered ? styles.ordered : ""}`}>
      {list.items.map((item, i) => (
        <li key={i} className={styles.listItem}>
          <InlineContent content={item.content} />
          {item.sublist && <List list={item.sublist} />}
        </li>
      ))}
    </Tag>
  );
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
            case "h3":
              return (
                <h3 key={i} className={`${t.display} ${styles.subheading}`}>
                  {block.text}
                </h3>
              );
            case "quote":
              return (
                <blockquote key={i} className={`${t.display} ${styles.quote}`}>
                  <span className={styles.accent}>“</span>
                  {block.text}
                  <span className={styles.accent}>”</span>
                </blockquote>
              );
            case "list":
              return <List key={i} list={block} />;
            case "image":
              return (
                <figure key={i} className={styles.figure}>
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="(min-width: 760px) 700px, 100vw"
                    className={styles.image}
                  />
                  {block.caption && (
                    <figcaption className={`${t.mono} ${styles.caption}`}>
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            case "code":
              return (
                <CodeBlock
                  key={i}
                  filename={block.filename ?? block.lang}
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
