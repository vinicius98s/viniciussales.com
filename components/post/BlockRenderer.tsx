import { Heading } from "@components/Typography";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

import CodeHighlighter from "./CodeHighlighter";
import Paragraph from "./Paragraph";

type Unpacked<T> = T extends (infer U)[] ? U : T;

type Props = {
  block: Unpacked<ListBlockChildrenResponse["results"]>;
};

export default function BlockRenderer({ block }: Props) {
  switch (block.type) {
    case "heading_1":
      return (
        <Heading fontSize="1.8em" mb={2}>
          {block.heading_1.text[0].plain_text}
        </Heading>
      );
    case "heading_2":
      return (
        <Heading fontSize="1.4em" level={2} mb={2}>
          {block.heading_2.text[0].plain_text}
        </Heading>
      );
    case "heading_3":
      return (
        <Heading fontSize="1.2em" level={3} mb={2}>
          {block.heading_3.text[0].plain_text}
        </Heading>
      );
    case "paragraph":
      return <Paragraph text={block.paragraph.text} />;
    case "code":
      return (
        <CodeHighlighter
          language={block.code.language}
          code={block.code.text[0].plain_text}
        />
      );
    default:
      return null;
  }
}
