import { createCssVariablesTheme, createHighlighter } from "shiki";

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

/** Runs on the server, so the client never ships Shiki. */
export async function renderBlocks(blocks: Block[]): Promise<RenderedBlock[]> {
  const langs = [
    ...new Set(blocks.flatMap((b) => (b.type === "code" ? [b.lang] : []))),
  ];
  highlighter ??= createHighlighter({ themes: [theme], langs: [] });
  const h = await highlighter;

  // The language comes from the CMS as free text; unknown ones render plain.
  const loaded = new Set<string>(["text"]);
  await Promise.all(
    langs.map(async (lang) => {
      try {
        await h.loadLanguage(lang as never);
        loaded.add(lang);
      } catch {
        console.warn(`Unknown code language "${lang}", rendering as text`);
      }
    })
  );

  return blocks.map((block) =>
    block.type === "code"
      ? {
          ...block,
          html: h.codeToHtml(block.code, {
            lang: loaded.has(block.lang) ? block.lang : "text",
            theme: "css-variables",
          }),
        }
      : block
  );
}
