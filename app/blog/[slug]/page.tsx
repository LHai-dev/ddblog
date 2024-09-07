import { notFound } from 'next/navigation';
import { Post } from '@/app/type/type';
import BlogDetail from '@/app/components/BlogDetail';

export interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    console.log('Base URL in production:', baseUrl); // Log the base URL in production

    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: 'no-store' });

    if (!res.ok) {
      console.error('Failed to fetch post:', res.status, res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function BlogPost({ params }: Params) {
  const post: Post | null = await getPost(params.slug);

  if (!post) {
    notFound(); // Trigger a 404 if post is not found
  }

  return <BlogDetail post={post} />;
}
