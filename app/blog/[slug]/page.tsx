// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Post } from '@/app/type/type';
import BlogDetail from '@/app/components/BlogDetail';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Move the data fetching logic inside the component
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${params.slug}`);

  if (!res.ok) {
    notFound(); // Show 404 if not found
  }

  const post: Post | null = await res.json();

  // If post is null, trigger not found
  if (!post) {
    notFound();
  }

  return <BlogDetail post={post} />;
}
