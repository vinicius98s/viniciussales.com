// TODO: better code highlighter
import styled from "@emotion/styled";
import { Prism } from "react-syntax-highlighter";
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

  ::-webkit-scrollbar {
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.colors.gray};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(p) => p.theme.colors.darkGray};
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
    <Box my={4} display="grid">
      <SyntaxHighlighter language={language} style={coldarkDark}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
}
