// app/components/BlogDetail.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/app/type/type';

interface BlogDetailProps {
  post: Post;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto max-w-3xl bg-white p-10 rounded-lg">
        {/* Title */}
        <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

        {/* Author and Meta Info */}
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src={post.authorImageUrl || '/default-avatar.png'} // Fallback for author image
            alt="Author Image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-lg text-gray-900 font-medium">{post.author}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              • 6 min read
            </p>
          </div>
        </div>

        {/* Featured Image (if available) */}
        {post.thumbnailUrl && (
          <div className="mb-6">
            <Image
              src={post.thumbnailUrl}
              alt="Thumbnail Image"
              width={1200}
              height={600}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {post.content}
        </div>

        {/* Footer: Interactions */}
        <div className="flex justify-between items-center text-gray-600 border-t border-gray-200 pt-6 mt-8">
          <div className="flex space-x-6">
            <button className="hover:text-gray-900">
              <i className="bi bi-bookmark"></i> Bookmark
            </button>
            <button className="hover:text-gray-900">
              <i className="bi bi-share"></i> Share
            </button>
          </div>
          <Link href="/" className="text-blue-500 hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
