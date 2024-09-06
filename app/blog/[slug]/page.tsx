import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Fetch data in a Server Component
async function getPost(slug) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: 'no-store' });

  if (!res.ok) {
    return null; // Return null if the blog post is not found
  }

  return res.json();
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  // If post is not found, show 404 page
  if (!post) {
    notFound();
  }

  return (
    <div className=" min-h-screen py-10">
      <div className="container mx-auto max-w-3xl bg-white p-8 shadow-lg rounded-lg">
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Subtitle and Author */}
        <div className="flex items-center space-x-3 mb-6">
          <Image
            src={post.authorImageUrl}
            alt="Author Image"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="text-lg text-gray-700 font-semibold">{post.author}</p>
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

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none mb-6 text-gray-700">
          {post.content}
        </div>

        {/* Footer with Interaction */}
        <div className="flex justify-between items-center text-gray-500 border-t pt-4">
          <div className="flex space-x-4">
            <i className="bi bi-bookmark"></i> <span>Bookmark</span>
            <i className="bi bi-share"></i> <span>Share</span>
          </div>
          <Link href="/contact">
            {/*<a className="text-blue-500">Contact Us</a>*/}
          </Link>
        </div>
      </div>
    </div>
  );
}
