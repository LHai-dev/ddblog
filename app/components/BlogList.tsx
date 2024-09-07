// app/components/BlogList.tsx
'use client'; // Mark this as a Client Component

import { useEffect, useState } from 'react';
import { Post } from '@/app/type/type';
import BlogCard from './BlogCard';

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]); // Type the posts array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blogs'); // Make sure this API endpoint is working
        if (!res.ok) new Error('Failed to fetch posts');
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        setError('Failed to fetch posts');
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            posts.map((post) => <BlogCard key={post.slug} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}
