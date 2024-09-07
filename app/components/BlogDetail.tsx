import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/app/type/Post';

interface BlogDetailProps {
  post: Post;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-4xl bg-white p-6 md:p-10 rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-snug">
          {post.title}
        </h1>
        <hr className="mb-6" />

        {/* Author and Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
          <div className="flex-shrink-0">
            <Image
              src={post.authorImageUrl || '/default-avatar.png'} // Fallback for author image
              alt="Author Image"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-base sm:text-lg font-semibold text-gray-900">{post.author}</p>
            <p className="text-sm sm:text-base text-gray-500">
              {new Date(post.createdDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })} • 6 min read
            </p>
          </div>
        </div>
        <hr className="mb-6" />

        {/* Featured Image (if available) */}
        {post.thumbnailUrl && (
          <div className="mb-6">
            <Image
              src={post.thumbnailUrl}
              alt="Thumbnail Image"
              layout="responsive"
              width={1200}
              height={600}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800 leading-relaxed">
          {post.content}
        </div>

        {/* Footer: Interactions */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-600 border-t border-gray-200 pt-6 mt-8 space-y-4 sm:space-y-0">
          <div className="flex space-x-6">
            <button className="hover:text-gray-900 flex items-center space-x-2 transition ease-in-out duration-150">
              <i className="bi bi-bookmark"></i>
              <span>Bookmark</span>
            </button>
            <button className="hover:text-gray-900 flex items-center space-x-2 transition ease-in-out duration-150">
              <i className="bi bi-share"></i>
              <span>Share</span>
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
