import { getCollection } from 'astro:content';
import { type IBlogPostMeta, type IBlogEntry, type IBlogMetaType } from '@/content/config';

import { POST_PAGE_SIZE } from '@/config';


export interface IPageListProps {
  /** 
   * 博客信息列表
   */
  entries: IBlogEntry[]
  /**
   * 当前页码
   */
  pageNo: number
  /**
   * 总页数
   */
  totalPage: number
  /**
   * 路由字段中的 tag, 仅 type 为 categories 或 tags 时有效
   */
  value?: string
}

export interface IStaticPathsOptions {
  /** 博客信息类型 */
  type: IBlogMetaType
  /** 路由字段名称 */
  slug: string
  /** 信息类型对应的值, 非 blog 时必填 */
  value?: string
  /** 博客列表 */
  posts?: IBlogEntry[]
}

export async function getBlogListStaticPathsInner(options: IStaticPathsOptions) {
  const posts = options.posts || await getCollection('blog');
  const filteredPosts = posts.filter((post) => {
    const meta = post.data as IBlogPostMeta;
    switch (options.type) {
      case 'blog':
        return true;
      case 'categories':
        return meta.categories?.includes(options.value!);
      case 'tags':
        return meta.tags?.includes(options.value!);
    }
    // sort blog by date, newest first
  }).sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  const totalPage = Math.ceil(filteredPosts.length / POST_PAGE_SIZE);
  return Array.from({ length: totalPage }).map((_, index) => {
    const pageNo = index + 1;
    return {
      params: {
        [options.slug]: getStaticPath({
          type: options.type,
          value: options.value,
          pageNo,
        })
      },
      props: {
        entries: filteredPosts.slice(index * POST_PAGE_SIZE, (index + 1) * POST_PAGE_SIZE),
        pageNo,
        totalPage,
        value: options.value,
      }
    };
  });
}

interface IStaticPathOptions {
  type: IStaticPathsOptions['type']
  value?: string
  pageNo: number
}

function getStaticPath(options: IStaticPathOptions) {
  let slug = options.type === 'blog' ? '' : `${options.value!}/`;
  slug += options.pageNo === 1 ? '' : `page/${options.pageNo}/`;
  // add index in production for better SEO and user experience
  return process.env.NODE_ENV === 'development' ? (slug || undefined): slug + 'index';
}

