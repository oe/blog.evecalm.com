import { z, defineCollection, type CollectionEntry } from 'astro:content'


export type IBlogEntry = CollectionEntry<'blog'>;

/**
 * 每页显示的博客数量
 */
export const PAGE_SIZE = 10;

export type IBlogMetaType = 'categories' | 'tags' | 'blog';

export type IBlogTagType = Exclude<IBlogMetaType, 'blog'>;

export interface IBlogPostMeta {
  title: string
  date: Date
  tags: string[]
  categories: string[]
  uri: string
}

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()),
    uri: z.string(),
  })
})

export const collections = {
  blog: blogCollection
}


export function getPostSlug(post: IBlogPostMeta) {
  const createDate = post.date;
  const year = createDate.getFullYear();
  const month = createDate.getMonth() + 1;
  let slug = '';
  // old posts use the old uri format
  if (year < 2021) {
    slug = `${year}/${String(month).padStart(2, '0')}/${post.uri}`;
  } else {
    slug = `${year}/${post.uri}`;
  }
  return slug;
}