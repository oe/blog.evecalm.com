import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '@/common/og-image';
import { getPostSlug } from '@/content/config';

const slugName = 'ogSlug';

const blog = await getCollection('blog');

function getImageSlug(post: any) {
  return getPostSlug(post).replace(/^\//, '') + '.png';
}

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', description: '' } }]
// to { 'post.md': { title: 'Example', description: '' } }
const posts = Object.fromEntries(blog.map((post) => [
  getImageSlug(post.data),
  post.data,
]));

export const GET: APIRoute = async (context) => {
  const route = context.params[slugName];
  const post = route && posts[route];

  if (!post) {
    return new Response('Not Found', { status: 404 });
  }

  const image = await generateOgImage({
    title: post.title,
    description: post.description,
  });

  return new Response(image);
}

export async function getStaticPaths() {
  return blog.map((post) => ({
    params: {
      [slugName]: getImageSlug(post.data)
    }
  }));
}
