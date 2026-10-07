// Static post data. This stands in for a CMS until we pick one, so every
// post here is placeholder content taken from the redesign mockups.

export type Inline = string | { code: string } | { link: string; href: string };

export type Block =
  | { type: "p"; content: Inline[] }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "code"; lang: string; filename: string; code: string };

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

// TODO: replace with real content once posts come from a CMS.
const SAMPLE_BODY: Block[] = [
  {
    type: "p",
    content: [
      "Most of the bugs I've chased in production weren't exotic. They were an ",
      { code: "undefined" },
      " that slipped through three layers of code before anyone noticed. This post is about how I started modelling failure explicitly instead.",
    ],
  },
  { type: "h2", text: "The problem with throwing" },
  {
    type: "p",
    content: [
      "A thrown error is invisible in a function's signature. The caller has no way of knowing it needs to handle anything until it blows up. With ",
      { link: "fp-ts", href: "https://gcanti.github.io/fp-ts/" },
      ", failure becomes part of the type.",
    ],
  },
  {
    type: "code",
    lang: "ts",
    filename: "user.ts",
    code: `const getUser = (id: string) =>
  TE.tryCatch(
    () => db.find(id),
    () => "user-not-found" as const
  );`,
  },
  {
    type: "quote",
    text: "Make illegal states unrepresentable, and make failure impossible to ignore.",
  },
  { type: "h2", text: "Composing the happy path" },
  {
    type: "p",
    content: [
      "Once every step returns a ",
      { code: "TaskEither" },
      ", composing them is a matter of piping them together. The first failure short-circuits the rest, like a train switching onto the error track.",
    ],
  },
  {
    type: "code",
    lang: "ts",
    filename: "checkout.ts",
    code: `pipe(
  getUser(id),
  TE.chain(validateCart),
  TE.chain(charge),
  TE.match(toErrorPage, toReceipt)
);`,
  },
  { type: "h2", text: "Where it gets awkward" },
  {
    type: "p",
    content: [
      "Libraries that throw still need a boundary. I keep those boundaries thin and push them to the edges of the app, so the core only ever sees values.",
    ],
  },
];

// Newest first.
const POSTS: Post[] = [
  {
    slug: "railway-errors-fp-ts",
    title: "Railway-oriented error handling with fp-ts",
    createdAt: "2026-09-18",
    description:
      "Modelling failure in the type system instead of hoping nobody forgets a try/catch.",
    isDraft: true,
    readTime: 7,
    blocks: SAMPLE_BODY,
  },
  {
    slug: "typing-notion-api",
    title: "Typing Notion's API without losing your mind",
    createdAt: "2026-07-02",
    description:
      "How I narrowed Notion's huge union types into something a blog can actually use.",
    isDraft: false,
    readTime: 9,
    blocks: SAMPLE_BODY,
  },
  {
    slug: "modernizing-react",
    title: "Modernizing a five-year-old React codebase",
    createdAt: "2026-04-11",
    description:
      "Class components, legacy context and Redux sagas: an incremental migration plan.",
    isDraft: false,
    readTime: 12,
    blocks: SAMPLE_BODY,
  },
  {
    slug: "option-vs-null",
    title: "Option vs. null, a practical comparison",
    createdAt: "2026-01-23",
    description:
      "When reaching for Option pays off, and when plain null is fine.",
    isDraft: false,
    readTime: 5,
    blocks: SAMPLE_BODY,
  },
  {
    slug: "spotify-github-actions",
    title: "A Spotify widget powered by GitHub Actions",
    createdAt: "2025-10-30",
    description:
      "Refreshing tokens on a cron so the homepage always knows what I'm listening to.",
    isDraft: false,
    readTime: 6,
    blocks: SAMPLE_BODY,
  },
  {
    slug: "framer-motion-lists",
    title: "Staggered list animations with Framer Motion",
    createdAt: "2025-08-14",
    description:
      "Small delays, big difference: making a list of posts feel alive.",
    isDraft: false,
    readTime: 4,
    blocks: SAMPLE_BODY,
  },
];

const toPreview = ({ blocks: _blocks, ...preview }: Post): PostPreview =>
  preview;

export function getPostPreviews(): PostPreview[] {
  return POSTS.map(toPreview);
}

export function getPostBySlug(slug: string) {
  const index = POSTS.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const older = POSTS[index + 1];
  const newer = POSTS[index - 1];

  return {
    post: POSTS[index],
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
