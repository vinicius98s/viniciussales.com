import { createHighlighter } from "shiki";
import { createCssVariablesTheme } from "shiki/theme-css-variables";

import type { Block } from "./posts";

// Colors come from CSS variables (see components/post/CodeBlock.module.css),
// so code blocks follow the light/dark theme toggle.
const theme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
});

export type RenderedBlock =
  | Exclude<Block, { type: "code" }>
  | (Extract<Block, { type: "code" }> & { html: string });

let highlighter: ReturnType<typeof createHighlighter> | undefined;

/** Runs at build time, so the client never ships Shiki. */
export async function renderBlocks(blocks: Block[]): Promise<RenderedBlock[]> {
  const langs = [
    ...new Set(blocks.flatMap((b) => (b.type === "code" ? [b.lang] : []))),
  ];
  highlighter ??= createHighlighter({ themes: [theme], langs: [] });
  const h = await highlighter;
  await Promise.all(langs.map((lang) => h.loadLanguage(lang as never)));

  return blocks.map((block) =>
    block.type === "code"
      ? {
          ...block,
          html: h.codeToHtml(block.code, {
            lang: block.lang,
            theme: "css-variables",
          }),
        }
      : block
  );
}
