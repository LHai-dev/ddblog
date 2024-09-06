'use client'; // Mark this as a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <div className="block mb-8 border-b border-gray-300 pb-6 hover:bg-gray-50 cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center">
                    {/* Main Post Content */}
                    <div className="md:w-10/12">
                      <div className="mb-2 flex items-center text-sm text-gray-500">
                        {/* Author Image */}
                        <Image
                          src={post.authorImageUrl}
                          alt="Author Image"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <span className="ml-2">{post.author}</span>
                      </div>
                      {/* Title */}
                      <h2 className="text-xl font-semibold text-gray-800">
                        {post.title}
                      </h2>
                      {/* Summary */}
                      <p className="text-lg text-gray-600">{post.summary}</p>
                      {/* Date */}
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(post.createdDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      {/* Post Actions */}
                      <div className="mt-3 text-gray-500">
                        <i className="bi bi-bookmark mr-4"></i>
                        <i className="bi bi-three-dots"></i>
                      </div>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="md:w-2/12 md:flex md:justify-end">
                      <Image
                        src={post.thumbnailUrl}
                        alt="Thumbnail Image"
                        width={120}
                        height={80}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
