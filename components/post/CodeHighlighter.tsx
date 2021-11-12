import styled from "styled-components";
import { Prism } from "react-syntax-highlighter";
// @ts-ignore
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Box } from "@components/Grid";

type Props = {
  language: string;
  code: string;
};

const SyntaxHighlighter = styled(Prism)`
  position: relative;
  padding: 1em 1.5em !important;

  * {
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  }

  ::before {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: ${(p) => p.theme.colors.primary};
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export default function CodeHighlighter({ language, code }: Props) {
  return (
    <Box my={5}>
      <SyntaxHighlighter language={language} style={coldarkDark}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
}
