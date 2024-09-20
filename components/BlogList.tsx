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
      setError(null); // Reset error before fetching
  
      try {
        // Fetch blogs by selected category slug or fetch all if null
        const apiUrl = selectedCategory
          ? `/api/blogs-by-category?slug=${selectedCategory}` // Using query parameter for slug
          : '/api/blogs'; // Fetch all blogs if no category is selected
  
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch posts');
  
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch posts');
        } else {
          setError('Failed to fetch posts');
        }
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [selectedCategory]);
  

  if (loading) {
    return (
      <div className="container mx-auto px-4">
              <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                        <CategoryBarSkeleton />
        <BlogListSkeleton />
            </div>
          </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <CategoryBar onCategoryChange={setSelectedCategory} />
        <p className="text-center text-red-500 mt-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">

      
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <CategoryBar onCategoryChange={setSelectedCategory} />
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            posts.map((post) => (
              <BlogCard key={post.id || post.slug} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
