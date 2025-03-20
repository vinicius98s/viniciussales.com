import { getBaseUrl } from "@utils/url";
import Head from "next/head";

type Props = {
  title: string;
  description?: string;
  ogImage?: string;
  url?: string;
  type?: "article" | "website";
  publishedTime?: string;
  locale?: string;
};

export default function Seo({
  title,
  description = "A personal blog about software development, technology, and life experiences. Join me as I share insights, tutorials, and thoughts on modern web development and engineering practices.",
  ogImage = "/ms-icon-310x310.png",
  url = getBaseUrl(),
  type = "website",
  publishedTime,
  locale = "en_US",
}: Props) {
  const siteName = "Vinícius Sales";
  const imageUrl = ogImage?.startsWith("http")
    ? ogImage
    : `${getBaseUrl()}${ogImage}`;

  return (
    <Head>
      <title>{type !== "article" ? `${title} - ${siteName}` : title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={siteName} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && (
        <meta property="article:author" content="Vinícius Sales" />
      )}
    </Head>
  );
}
