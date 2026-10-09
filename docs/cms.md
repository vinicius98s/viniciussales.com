# CMS contract

The site reads posts from a self-hosted [Payload](https://payloadcms.com) instance
over its REST API (`lib/cms.ts`). This is what the site expects from the CMS.

## Environment (Vercel)

| Variable            | Purpose                                                   |
| ------------------- | --------------------------------------------------------- |
| `CMS_URL`           | Base URL of the CMS, e.g. `https://cms.viniciussales.com` |
| `CMS_API_KEY`       | API key of a user in the `users` collection; reads drafts |
| `REVALIDATE_SECRET` | Shared secret the CMS sends to `/api/revalidate`          |

`CMS_URL` must be set at build time too: `next.config.ts` allows `next/image`
to optimize images from that host.

## Collections

### `users`

Auth collection with API keys enabled (`auth: { useAPIKey: true }`). The site
sends `Authorization: users API-Key <CMS_API_KEY>`.

### `media`

Upload collection. Fields used by the site: `url`, `alt` (text, required),
`width`, `height`. Payload fills `width`/`height` for images. A relative `url`
(e.g. `/api/media/file/foo.png`) is resolved against `CMS_URL`.

### `posts`

| Field         | Type                                    | Notes                              |
| ------------- | --------------------------------------- | ---------------------------------- |
| `title`       | text, required                          |                                    |
| `slug`        | text, required, unique, indexed         | `[a-z0-9-]+`                       |
| `description` | textarea, required                      | Shown in lists and meta tags       |
| `date`        | date, required, day only                | Only the `YYYY-MM-DD` part is used |
| `status`      | select `draft` \| `published`, required | Default `draft`                    |
| `body`        | richText (Lexical)                      | See below                          |

Use this `status` field rather than Payload's `versions.drafts`. Drafts here are
posts that aren't live yet, not unsaved edits of a live post.

Read time is computed by the site from the body, so there's no field for it.

#### Access

- `read`: anyone can read `status = published`; authenticated users (API key)
  can read everything.
- `create` / `update` / `delete`: authenticated users only.

#### Hooks

`afterChange` and `afterDelete` POST to `${SITE_URL}/api/revalidate`:

```http
POST /api/revalidate
Authorization: Bearer <REVALIDATE_SECRET>
Content-Type: application/json

{ "slugs": ["previous-slug"] }
```

`slugs` is optional. Pass the old slug when a post is renamed and the slug of a
deleted post, so those pages get removed. The site refreshes the homepage and
every current post on each call. Don't let a failed webhook fail the save: log
it and move on (pages also refresh on their own every hour).

## Requests the site makes

```
GET /api/posts?pagination=false&depth=1&sort=-date
GET /api/posts?pagination=false&depth=1&sort=-date&where[status][equals]=published   (production)
```

`depth=1` must populate `upload` nodes in the rich text with their `media` doc.

## Rich text (Lexical)

Supported nodes. Anything else is silently skipped.

| Lexical node            | Rendered as                                      |
| ----------------------- | ------------------------------------------------ |
| `paragraph`             | Paragraph                                        |
| `heading` h1/h2         | Numbered section heading, listed in Contents     |
| `heading` h3–h6         | Subheading                                       |
| `quote`                 | Pull quote (plain text, formatting dropped)      |
| `list` bullet/number    | `ul` / `ol`, nested lists supported              |
| `upload` (media)        | Image; optional `fields.caption` text as caption |
| `block` `code`          | Highlighted code block                           |
| `text` bold/italic/code | `strong` / `em` / inline `code`                  |
| `link` / `autolink`     | Link (`fields.url`)                              |
| `linebreak`             | `br`                                             |

### `code` block

Register it with `BlocksFeature` with slug `code`:

| Field      | Type                      | Notes                                             |
| ---------- | ------------------------- | ------------------------------------------------- |
| `language` | text / select             | Shiki language id (`ts`, `tsx`, `bash`, ...)      |
| `filename` | text, optional            | Shown in the block header; falls back to language |
| `code`     | code / textarea, required |                                                   |

Unknown languages render as plain text.

## Drafts

Production (`VERCEL_ENV=production`) only shows published posts. Everything
else, including local dev and Vercel preview deploys, shows drafts too, marked
with a DRAFT badge. The newest draft is featured as "Now drafting" on the
homepage.
