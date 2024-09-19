'use client';
import React, { useEffect, useState } from 'react';
import { Post } from '@/app/type/Post';
import BlogCard from './BlogCard';
import CategoryBar from "@/components/CategoryBar"; 
import BlogListSkeleton from "@/components/BlogListSkeleton";
import CategoryBarSkeleton from "@/components/CategoryBarSkeleton";

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch blogs by selected category slug or fetch all if null
        const apiUrl = selectedCategory
          ? `/api/blogs-by-category?slug=${selectedCategory}` // Using query parameter for slug
          : '/api/blogs'; // Fetch all blogs if no category is selected
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch posts');
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
  }, [selectedCategory]); // Re-fetch when selectedCategory changes

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        {/* Category Bar Skeleton Placeholder */}
        <CategoryBarSkeleton />

        {/* Blog List Skeleton Placeholder */}
        <BlogListSkeleton />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Pass setSelectedCategory to CategoryBar to handle category changes */}
      <CategoryBar onCategoryChange={setSelectedCategory} />
      
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            posts.map((post) => {
  
              // Ensure a unique key is provided (check if slug or id is unique)
              return <BlogCard key={post.id || post.slug} post={post} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
