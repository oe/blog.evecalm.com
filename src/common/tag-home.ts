import { getCollection } from 'astro:content';
import { type IBlogPostMeta, type IBlogEntry, type IBlogTagType } from '@/content/config';


export type ITagType = IBlogTagType

export interface IGroupedInfoOptions {
  /** 博客信息类型 */
  type: ITagType
}

export async function getGroupedInfo(options: IGroupedInfoOptions) {
  const posts = await getCollection('blog');
  const result: {names: Set<string>, group: Record<string, IBlogEntry[]>} = { names: new Set(), group: {} };
  return posts.reduce((acc, post) => {
    const meta = post.data as IBlogPostMeta;
    const names = meta[options.type];
    if (!names?.length) return acc;
    names.forEach(name => {
      acc.names.add(name)
      if (!acc.group[name]) {
        acc.group[name] = [];
      }
      acc.group[name].push(post);
    });
    return acc
  }, result)

}
