import truncate from 'truncate-html';

/**
 * get excerpt from html string
 * @param html html string
 * @returns truncated html string
 */
export async function getExcerpt(html: string) {
  return truncate(html, {
    length: 300,
    excludes: ['img', 'figure', 'iframe', 'video', 'audio', 'pre']
  });
}
