import { fetchPosts } from "./cms";

export type Text = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
};

export type Inline =
  Text | { type: "link"; href: string; children: Text[] } | { type: "br" };

export type ListItem = { content: Inline[]; sublist?: ListBlock };

export type ListBlock = {
  type: "list";
  ordered: boolean;
  items: ListItem[];
};

export type Block =
  | { type: "p"; content: Inline[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | ListBlock
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    }
  | { type: "code"; lang: string; filename?: string; code: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-09-18" */
  createdAt: string;
  isDraft: boolean;
  readTime: number;
  blocks: Block[];
};

export type PostPreview = Omit<Post, "blocks">;

/**
 * Drafts are visible everywhere except the production deployment: local dev,
 * local builds and Vercel preview deploys all show them.
 */
export const showDrafts = process.env.VERCEL_ENV !== "production";

/**
 * Fallback for ISR. Production is normally refreshed on publish by the CMS
 * webhook (pages/api/revalidate.ts), which only reaches production, so preview
 * deploys poll more often to pick up draft edits.
 */
export const REVALIDATE_SECONDS = showDrafts ? 60 : 60 * 60;

const toPreview = ({ blocks: _blocks, ...preview }: Post): PostPreview =>
  preview;

/** Newest first. */
export async function getPostPreviews(): Promise<PostPreview[]> {
  const posts = await fetchPosts({ includeDrafts: showDrafts });
  return posts.map(toPreview);
}

export async function getPostBySlug(slug: string) {
  const posts = await fetchPosts({ includeDrafts: showDrafts });
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const older = posts[index + 1];
  const newer = posts[index - 1];

  return {
    post: posts[index],
    previousPost: older ? toPreview(older) : null,
    nextPost: newer ? toPreview(newer) : null,
  };
}

const parseDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** "September 18, 2026" */
export function formatLongDate(iso: string) {
  return parseDate(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Sep 2026" */
export function formatShortDate(iso: string) {
  return parseDate(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
