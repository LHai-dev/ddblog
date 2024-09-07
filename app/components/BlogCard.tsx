// components/BlogCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/app/type/type';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="block mb-8 border-b border-gray-300 pb-6 hover:bg-gray-50 cursor-pointer">
      <Link href={`/blog/${post.slug}`}>
        <div className="flex flex-col sm:flex-row sm:items-center">
          {/* Main Post Content */}
          <div className="w-full sm:w-10/12">
            <div className="mb-2 flex items-center text-sm text-gray-500">
              {/* Author Image */}
              <Image
                src={post.authorImageUrl || '/default-avatar.png'} // Fallback for author image
                alt="Author Image"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="ml-2">{post.author}</span>
            </div>
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
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
          <div className="w-full sm:w-2/12 flex justify-center sm:justify-end mt-4 sm:mt-0">
            <Image
              src={post.thumbnailUrl || '/default-thumbnail.png'} // Fallback for thumbnail
              alt="Thumbnail Image"
              width={120}
              height={80}
              className="rounded-md"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
