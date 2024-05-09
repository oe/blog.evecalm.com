import { getCollection } from 'astro:content';
import { type IBlogPostMeta, type IBlogTagType } from '@/content/config';
import { getBlogListStaticPathsInner } from './post-list'

export interface ITagListProps {
  /** 标签列表 */
  type: IBlogTagType
  slug: string
}

export async function getTagListStaticPaths(options: ITagListProps) {
  const posts = await getCollection('blog');
  const names = new Set<string>();

  posts.reduce((acc, post) => {
    const meta = post.data as IBlogPostMeta;
    const names = meta[options.type];
    if (!names?.length) return acc;
    names.forEach(name => acc.add(name));
    return acc
  }, names);

  const uniqueNames = Array.from(names);

  const paths = await Promise.all(uniqueNames.map((name) => {
    return getBlogListStaticPathsInner({ type: options.type, slug: options.slug, value: name });
  }))
  return paths.flat();
}

