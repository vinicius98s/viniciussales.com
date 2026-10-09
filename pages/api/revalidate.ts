import { timingSafeEqual } from "node:crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import { getPostPreviews } from "@lib/posts";

// Called by the CMS after a post is created, updated or deleted:
//   POST /api/revalidate
//   Authorization: Bearer <REVALIDATE_SECRET>
//   { "slugs": ["old-slug"] }   (optional: paths that no longer exist)
//
// Every page is refreshed rather than just the edited one, since titles and
// drafts also show up on the homepage and in other posts' previous/next links.

const SLUG = /^[a-z0-9-]+$/i;

function isAuthorized(req: NextApiRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const header = req.headers.authorization ?? "";
  if (!secret || !header.startsWith("Bearer ")) return false;

  const expected = Buffer.from(secret);
  const received = Buffer.from(header.slice("Bearer ".length));
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const extra: unknown = req.body?.slugs;
  const removed = Array.isArray(extra)
    ? extra.filter((s): s is string => typeof s === "string" && SLUG.test(s))
    : [];

  const posts = await getPostPreviews();
  const paths = [
    ...new Set([
      "/",
      ...posts.map(({ slug }) => `/blog/${slug}`),
      ...removed.map((slug) => `/blog/${slug}`),
    ]),
  ];

  const results = await Promise.allSettled(paths.map((p) => res.revalidate(p)));
  const failed = paths.filter((_, i) => results[i].status === "rejected");

  return res.status(failed.length ? 207 : 200).json({
    revalidated: paths.filter((p) => !failed.includes(p)),
    failed,
  });
}
