import Head from "next/head";

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function Seo({
  title,
  description = "My site description",
  children,
}: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {children}
    </Head>
  );
}
