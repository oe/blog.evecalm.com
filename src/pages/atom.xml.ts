import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { getPostSlug } from '@/content/config'
import { SITE_NAME, SITE_DESCRIPTION } from '@/config'
import type { APIContext } from 'astro'
import { getMarkdownExcerpt } from '@/common/utils'
import sanitizeHtml from 'sanitize-html';

// allow img tag in rss content
// sanitizeHtml.defaults.allowedTags.push('img');

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');
  
  // sort blog by date, newest first, and get the first 10
  const posts = blog.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 10);
  const items = await Promise.all(posts.map(async (post) => {
    const html = await getMarkdownExcerpt(post.body);
    const link = getPostSlug(post.data, true)
    const notice = `
    <br>
      <p>
      <strong>Notice: 因使用的框架 Astro 暂时无法解决rss 中图片地址问题, 故此处截取文章部分内容.</strong><br>
      <a href="${link}">完整内容, 请阅读原文</a>
    </p>`
    return {
      title: post.data.title,
      description: post.data.description,
      link,
      pubDate: post.data.date,
      content: sanitizeHtml(html + notice),
    }
  }))
  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site!,
    stylesheet: '/pretty-feed.xsl',
    items,
  })
}

