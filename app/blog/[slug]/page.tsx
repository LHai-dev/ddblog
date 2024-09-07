import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from "@/app/type/type";

// Define your own Params type
export interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    console.log('Base URL in production:', baseUrl);
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: 'no-store' });

    if (!res.ok) {
      console.error('Failed to fetch post:', res.status, res.statusText); // Log server error details
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error); // Log any fetch-related errors
    return null;
  }
}

export default async function BlogPost({ params }: Params) {
  const post: Post | null = await getPost(params.slug);

  // If post is not found, show 404 page
  if (!post) {
    notFound();
  }

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
