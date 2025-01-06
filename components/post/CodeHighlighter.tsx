import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import styled from "@emotion/styled";

type Props = {
  language: string;
  code: string;
};

const THEME = "vesper";

const SyntaxHighlighter = styled.div`
  * {
    font-family: "Source Code Pro", monospace;
  }

  pre {
    padding: 1em 1.5em;
    overflow-x: scroll;

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
  }
`;

export default function CodeHighlighter({ language, code }: Props) {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [htmlCode, setHtmlCode] = useState("");

  useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: [THEME],
        langs: [language],
      });
      setHighlighter(highlighter);
    };

    loadHighlighter();
  }, [language]);

  useEffect(() => {
    if (highlighter) {
      const highlightedCode = highlighter.codeToHtml(code, {
        lang: language,
        theme: THEME,
      });

      setHtmlCode(highlightedCode);
    }
  }, [code, language, highlighter]);

  return <SyntaxHighlighter dangerouslySetInnerHTML={{ __html: htmlCode }} />;
}
