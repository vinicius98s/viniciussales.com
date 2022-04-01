import styled from "@emotion/styled";

import { Text } from "@components/Typography";

type TextBlock = {
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
  };
  plain_text: string;
  href: string | null;
};

type Props = {
  text: TextBlock[];
};

const StyledText = styled(Text)`
  line-height: 2em;

  span {
    background: ${(p) => p.theme.colors.darkGray};
    color: ${(p) => p.theme.colors.primary};
    display: inline;
    padding: 0 0.2em;
    border-radius: 0.1em;
  }
`;

export default function Paragraph({ text }: Props) {
  return (
    <StyledText mb={4}>
      {text.map(({ plain_text, annotations }, idx) => {
        if (annotations.bold) {
          return <b key={idx}>{plain_text}</b>;
        }

        if (annotations.italic) {
          return <i key={idx}>{plain_text}</i>;
        }

        if (annotations.strikethrough) {
          return <s key={idx}>{plain_text}</s>;
        }

        if (annotations.underline) {
          return <u key={idx}>{plain_text}</u>;
        }

        if (annotations.code) {
          return <span key={idx}>{plain_text}</span>;
        }

        return plain_text;
      })}
    </StyledText>
  );
}
