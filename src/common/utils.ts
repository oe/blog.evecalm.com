import truncate from 'truncate-html';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
/**
 * get excerpt from html string
 * @param html html string
 * @returns truncated html string
 */
export async function getExcerpt(html: string, stripTags = false) {
  return truncate(html, {
    length: 200,
    stripTags: stripTags,
    excludes: ['img', 'figure', 'iframe', 'video', 'audio', 'pre']
  });
}

export function getTagListLink(tag: string) {
  return `/tags/${encodeURI(tag)}/`;
}

export function getCategoryListLink(category: string) {
  return `/categories/${encodeURI(category)}/`;
}

let cachedMarkdownProcessor: ReturnType<typeof createMarkdownProcessor> | null = null;
let clearCacheTimeoutId: number = 0;
function getMarkdownProcessor() {
  clearTimeout(clearCacheTimeoutId || 0);
  if (!cachedMarkdownProcessor) {
    cachedMarkdownProcessor = createMarkdownProcessor();
  }
  clearCacheTimeoutId = setTimeout(() => {
    cachedMarkdownProcessor = null;
  }, 100) as unknown as number;
  return cachedMarkdownProcessor;
}

export async function renderMarkdown(markdown: string) {
  const processor = await getMarkdownProcessor();
  const { code: html } = await processor.render(markdown);
  return html;
}

export async function getMarkdownExcerpt(markdown: string, stripTags = false) {
  const html = await renderMarkdown(markdown);
  return getExcerpt(html, stripTags);
}
