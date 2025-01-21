import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

import { Box } from "@components/Grid";
import { Text } from "@components/Typography";

type Props = {
  blocks: RichTextItemResponse[];
};

export default function Quote(props: Props) {
  const text = props.blocks.map((block) => block.plain_text).join(" ");
  return (
    <Box borderLeft="0.2rem solid" borderColor="primary" p={2} pl={3} mb={4}>
      <Text fontStyle="italic">{text}</Text>
    </Box>
  );
}
