// Payload CMS client. Posts come from the REST API of the self-hosted Payload
// instance and their Lexical rich text is converted into the site's own Block
// type, so the rest of the app never sees CMS-specific shapes.
// The contract this expects from the CMS is documented in docs/cms.md.

import type { Block, Inline, ListBlock, Post, Text } from "./posts";

type LexicalNode = { type: string; [key: string]: unknown };

type LexicalElement = LexicalNode & { children?: LexicalNode[] };

type Media = {
  url: string;
  alt?: string | null;
  width: number;
  height: number;
};

type CmsPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO datetime */
  date: string;
  status: "draft" | "published";
  body: { root: LexicalElement };
};

function getCmsUrl() {
  const url = process.env.CMS_URL;
  if (!url) throw new Error("Missing CMS_URL env variable");
  return url;
}

async function cmsFetch<T>(path: string, params: URLSearchParams): Promise<T> {
  const url = new URL(path, getCmsUrl());
  url.search = params.toString();

  const headers: HeadersInit = {};
  if (process.env.CMS_API_KEY) {
    headers.Authorization = `users API-Key ${process.env.CMS_API_KEY}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status} ${url.pathname}`);
  }
  return res.json() as Promise<T>;
}

/** Newest first. */
export async function fetchPosts({
  includeDrafts,
}: {
  includeDrafts: boolean;
}): Promise<Post[]> {
  const params = new URLSearchParams({
    pagination: "false",
    depth: "1",
    sort: "-date",
  });
  if (!includeDrafts) params.set("where[status][equals]", "published");

  const { docs } = await cmsFetch<{ docs: CmsPost[] }>("/api/posts", params);
  return docs.map(toPost);
}

function toPost(doc: CmsPost): Post {
  const blocks = toBlocks(doc.body?.root?.children ?? []);
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? "",
    createdAt: doc.date.slice(0, 10),
    isDraft: doc.status !== "published",
    readTime: readTime(blocks),
    blocks,
  };
}

// Lexical text format bitflags.
const IS_BOLD = 1;
const IS_ITALIC = 1 << 1;
const IS_CODE = 1 << 4;

const children = (node: LexicalNode) =>
  ((node as LexicalElement).children ?? []) as LexicalNode[];

function toText(node: LexicalNode): Text {
  const format = typeof node.format === "number" ? node.format : 0;
  const text: Text = { type: "text", text: String(node.text ?? "") };
  if (format & IS_BOLD) text.bold = true;
  if (format & IS_ITALIC) text.italic = true;
  if (format & IS_CODE) text.code = true;
  return text;
}

function toInlines(nodes: LexicalNode[]): Inline[] {
  return nodes.flatMap((node): Inline[] => {
    switch (node.type) {
      case "text":
        return [toText(node)];
      case "linebreak":
        return [{ type: "br" }];
      case "link":
      case "autolink": {
        const fields = (node.fields ?? {}) as { url?: string };
        const texts = children(node).filter((c) => c.type === "text");
        if (!fields.url) return texts.map(toText);
        return [
          { type: "link", href: fields.url, children: texts.map(toText) },
        ];
      }
      default:
        return [];
    }
  });
}

/** Plain text of an element, ignoring formatting. */
function plainText(node: LexicalNode): string {
  if (node.type === "text") return String(node.text ?? "");
  if (node.type === "linebreak") return " ";
  return children(node).map(plainText).join("");
}

function toList(node: LexicalNode): ListBlock {
  const list: ListBlock = {
    type: "list",
    ordered: node.listType === "number",
    items: [],
  };
  for (const item of children(node)) {
    // Lexical nests a sub-list in its own list item, right after its parent.
    const nested = children(item).find((c) => c.type === "list");
    const parent = list.items.at(-1);
    if (nested && parent) {
      parent.sublist = toList(nested);
    } else {
      list.items.push({ content: toInlines(children(item)) });
    }
  }
  return list;
}

function toImage(node: LexicalNode): Block | null {
  const media = node.value as Media | string | number | null;
  // An unpopulated relation (just an id) means the request depth was too low.
  if (!media || typeof media !== "object" || !media.url) return null;

  const fields = (node.fields ?? {}) as { caption?: string };
  return {
    type: "image",
    src: new URL(media.url, getCmsUrl()).href,
    alt: media.alt ?? "",
    width: media.width,
    height: media.height,
    ...(fields.caption ? { caption: fields.caption } : {}),
  };
}

function toBlocks(nodes: LexicalNode[]): Block[] {
  return nodes.flatMap((node): Block[] => {
    switch (node.type) {
      case "paragraph": {
        const content = toInlines(children(node));
        return content.length ? [{ type: "p", content }] : [];
      }
      case "heading": {
        const text = plainText(node);
        const type = node.tag === "h1" || node.tag === "h2" ? "h2" : "h3";
        return text ? [{ type, text }] : [];
      }
      case "quote":
        return [{ type: "quote", text: plainText(node) }];
      case "list":
        return [toList(node)];
      case "upload": {
        const image = toImage(node);
        return image ? [image] : [];
      }
      case "block": {
        const fields = (node.fields ?? {}) as {
          blockType?: string;
          language?: string;
          filename?: string;
          code?: string;
        };
        if (fields.blockType !== "code" || !fields.code) return [];
        return [
          {
            type: "code",
            lang: fields.language || "text",
            code: fields.code,
            ...(fields.filename ? { filename: fields.filename } : {}),
          },
        ];
      }
      default:
        return [];
    }
  });
}

const WORDS_PER_MINUTE = 220;

function blockText(block: Block): string {
  switch (block.type) {
    case "p":
      return block.content
        .map((i) =>
          i.type === "text"
            ? i.text
            : i.type === "link"
              ? i.children.map((c) => c.text).join("")
              : " "
        )
        .join("");
    case "h2":
    case "h3":
    case "quote":
      return block.text;
    case "list":
      return block.items
        .map(
          (item) =>
            blockText({ type: "p", content: item.content }) +
            " " +
            (item.sublist ? blockText(item.sublist) : "")
        )
        .join(" ");
    default:
      return "";
  }
}

function readTime(blocks: Block[]) {
  const words = blocks
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
