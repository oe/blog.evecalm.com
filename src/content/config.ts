import { z, defineCollection } from 'astro:content'

export interface IBlogPostMeta {
  title: string
  date: string
  tags: string[]
  categories: string[]
  uri: string
}

const blogCollection = defineCollection({
  type: 'content',
  schema: {
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    uri: z.string(),
  }
})

export const collections = {
  blog: blogCollection
}


export function getPostSlug(post: IBlogPostMeta) {
  const createDate = new Date(post.date);
  const year = createDate.getFullYear();
  const month = createDate.getMonth() + 1;
  let slug = '';
  if (year < 2021) {
    slug = `${year}/${String(month).padStart(2, '0')}/${post.uri}.html`;
  } else {
    slug = `${year}/${post.uri}.html`;
  }
  return slug;
}