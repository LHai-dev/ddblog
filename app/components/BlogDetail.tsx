'use client'; // Enable client-side rendering for this component

import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Post } from '@/app/type/Post';
import {calculateReadingTime} from "@/app/lib/readingTimeUtil";

interface BlogDetailProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
  readTime: string;
}

export default function BlogDetail({ post, mdxSource }: BlogDetailProps) {
  // Calculate reading time from post content
  const readTime = calculateReadingTime(post.content);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto max-w-4xl bg-white p-6 md:p-10 rounded-lg">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {/* Author and Meta Information */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={post.authorImageUrl || '/default-avatar.png'}
            alt={post.author}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-semibold">{post.author}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })} • {readTime}
            </p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-800">
          {mdxSource ? (
            <MDXRemote {...mdxSource} />
          ) : (
            <p>Content is loading or unavailable.</p>
          )}
        </div>
      </div>
    </div>
  );
}
