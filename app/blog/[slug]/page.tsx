// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Post } from '@/app/type/type';
import BlogDetail from '@/app/components/BlogDetail';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${params.slug}`);

    if (!res.ok) {
      console.error('Failed to fetch post:', res.status, res.statusText); // Log error
      notFound();
    }

    const post: Post | null = await res.json();

    if (!post) {
      notFound();
    }

    return <BlogDetail post={post} />;
  } catch (error) {
    console.error('Error fetching post:', error); // Log the error
    notFound();
  }
}
