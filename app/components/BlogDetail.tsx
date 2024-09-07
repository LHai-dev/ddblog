'use client';

import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Post } from '@/app/type/Post';

interface BlogDetailProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
}

export default function BlogDetail({ post, mdxSource }: BlogDetailProps) {
  return (
    <div className="min-h-screen  py-10">
      <div className="container mx-auto max-w-4xl bg-white p-6 md:p-10 rounded-lg">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {/* Author and Meta Information */}
        <div className="flex items-center space-x-4 mb-6">
          <Image
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
              })} • 6 min read
            </p>
          </div>
        </div>

        {/* Thumbnail Image */}
        {post.thumbnailUrl && (
          <div className="mb-6">
            <Image
              src={post.thumbnailUrl}
              alt="Post Thumbnail"
              layout="responsive"
              width={1200}
              height={600}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-800">
          <MDXRemote {...mdxSource} />
        </div>

        {/* Footer with Interactions */}
        <div className="flex justify-between items-center text-gray-600 border-t border-gray-200 pt-6 mt-8">
          <div className="space-x-6">
            <button className="hover:text-gray-900 transition">
              <i className="bi bi-bookmark"></i> Bookmark
            </button>
            <button className="hover:text-gray-900 transition">
              <i className="bi bi-share"></i> Share
            </button>
          </div>
          <a href="/" className="text-blue-500 hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
