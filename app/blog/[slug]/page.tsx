import { notFound } from 'next/navigation';
import { Post } from '@/app/type/type';
import BlogDetail from '@/app/components/BlogDetail';

// Fetch the blog post data server-side
async function getPost(slug: string): Promise<Post | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
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

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post: Post | null = await getPost(params.slug);

  // If post is not found, show 404 page
  if (!post) {
    notFound();
  }

  // Render the BlogDetail component with the post data
  return <BlogDetail post={post} />;
}
