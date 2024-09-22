import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/app/type/Post';
import { AiOutlineRead, AiOutlineEdit, AiOutlineDelete, AiOutlineEllipsis } from 'react-icons/ai';
import { CiTimer } from 'react-icons/ci';
import { useState } from 'react';
import { Session } from 'next-auth'; // Import the correct type for session

interface BlogCardProps {
  post: Post;
  session: Session | null; // Allow session to be Session or null
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function AuthorBlogCard({ post, onUpdate, onDelete }: BlogCardProps) {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="block mb-12 border-b border-gray-200 pb-8 hover:bg-gray-50 cursor-pointer relative"
    onClick={handleOptionsClick} // Adds click handler on the card
    >
        <div className="flex flex-col md:flex-row items-start md:space-x-6">
          <div className="w-full md:w-4/12 flex-shrink-0">
            <Image
              src={post.thumbnailUrl || '/default-thumbnail.png'}
              alt={post.title}
              width={400}
              height={250}
              className="object-cover w-full h-56 rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="/default-thumbnail.png"
            />
          </div>

          <div className="w-full md:w-8/12 mt-4 md:mt-0">
            <div className="mb-3 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Image
                  src={post.authorImageUrl || '/default-avatar.png'}
                  alt={post.author}
                  width={40}
                  height={40}
                  className="object-cover w-[40px] h-[40px] rounded-full shadow-md"
                  placeholder="blur"
                  blurDataURL="/default-avatar.png"
                />
                <span className="ml-3 font-semibold">{post.author}</span>
              </div>

              <div className="relative">
                <button
                  className="p-2 text-gray-600 hover:text-gray-900"
                  onClick={handleOptionsClick}
                >
                  <AiOutlineEllipsis className="text-xl" />
                </button>

                {/* Dropdown Menu */}
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={onUpdate}
                    >
                      <AiOutlineEdit className="inline mr-2" />
                      Update
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={onDelete}
                    >
                      <AiOutlineDelete className="inline mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          <Link href={`/blog/${post.slug}`}>
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
              <span>{post.minuteRead} min read</span>
            </div>
            </Link>
          </div>
        </div>
    </div>
  );
}
