import { Heading } from "@components/Typography";
import { isFullBlock } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

import CodeHighlighter from "./CodeHighlighter";
import Paragraph from "./Paragraph";
import Image from "./Image";

type Unpacked<T> = T extends (infer U)[] ? U : T;

type Props = {
  block: Unpacked<ListBlockChildrenResponse["results"]>;
};

export default function BlockRenderer({ block }: Props) {
  if (isFullBlock(block)) {
    switch (block.type) {
      case "heading_1":
        return (
          <Heading fontSize="1.8em" mb={2}>
            {block.heading_1.rich_text[0].plain_text}
          </Heading>
        );
      case "heading_2":
        return (
          <Heading fontSize="1.4em" level={2} mb={2}>
            {block.heading_2.rich_text[0].plain_text}
          </Heading>
        );
      case "heading_3":
        return (
          <Heading fontSize="1.2em" level={3} mb={2}>
            {block.heading_3.rich_text[0].plain_text}
          </Heading>
        );
      case "paragraph":
        return <Paragraph text={block.paragraph.rich_text} />;
      case "code":
        return (
          <CodeHighlighter
            language={block.code.language}
            code={block.code.rich_text[0].plain_text}
          />
        );
      case "image":
        return <Image image={block.image} />;
      default:
        return null;
    }
  }

  return null;
}
