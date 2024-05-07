import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { getPostSlug } from '@/content/config'
import { SITE_NAME, SITE_DESCRIPTION } from '@/config'
import type { APIContext } from 'astro'
import { renderMarkdown } from '@/common/utils'
import sanitizeHtml from 'sanitize-html';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');
  // sort blog by date, newest first, and get the first 10
  const posts = blog.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 10);
  const items = await Promise.all(posts.map(async (post) => {
    const html = await renderMarkdown(post.body);
    return {
      title: post.data.title,
      description: post.data.description,
      link: getPostSlug(post.data, true),
      pubDate: post.data.date,
      content: sanitizeHtml(html),
    }
  }))
  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items,
  })
}

