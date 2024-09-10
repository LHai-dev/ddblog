import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/app/type/Post';
import { AiOutlineRead } from 'react-icons/ai';
import { CiTimer } from 'react-icons/ci';

interface BlogCardProps {
  post: Post;
  readTime: string;
}

export default function BlogCard({ post, readTime }: BlogCardProps) {
  return (
    <div className=" block mb-12 border-b border-gray-200 pb-8 hover:bg-gray-50 cursor-pointer">
      <Link href={`/blog/${post.slug}`}>
        <div className="flex flex-col md:flex-row items-start md:space-x-6">
          {/* Thumbnail Image */}
          <div className="w-full md:w-4/12 flex-shrink-0">
            <Image
              src={post.thumbnailUrl || '/default-thumbnail.png'}
              alt={post.title}
              width={400}
              height={250}
              className="object-cover w-full h-56 rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Main Post Content */}
          <div className="w-full md:w-8/12 mt-4 md:mt-0">
            <div className="mb-3 flex items-center text-sm text-gray-600">
              {/* Author Image */}
              <Image
                src={post.authorImageUrl || '/default-avatar.png'}
                alt={post.author}
                width={40}
                height={40}
                className="object-cover w-[40px] h-[40px] rounded-full shadow-md"
              />
              <span className="ml-3 font-semibold">{post.author}</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {post.title}
            </h2>

            {/* Summary */}
            <p className="text-base text-gray-700 mb-4 leading-relaxed line-clamp-3">
              {post.summary}
            </p>

            {/* Date and Read Time */}
            <div className="flex items-center text-sm text-gray-500">
              <CiTimer className="mr-1" />
              <span>{new Date(post.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <AiOutlineRead className="mx-2" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
