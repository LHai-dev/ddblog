import { notFound } from 'next/navigation';
import { Post } from '@/app/type/Post';
import BlogDetail from '@/app/components/BlogDetail'; // Client component
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import SEO from '@/app/components/Head'; // Use your SEO component
import siteMetadata from "@/app/lib/siteMetaData"; // Consistent import
import Script from 'next/script';
import {calculateReadingTime} from "@/app/lib/readingTimeUtil";

export const runtime = "edge"; // Running on edge runtime

export default async function BlogSlug({ params }: { params: { slug: string } }) {
  // Fetch the blog post from your API using the slug
  const res = await fetch(`${siteMetadata.siteUrl}/api/blogs/${params.slug}`);

  if (!res.ok) {
    console.error('Failed to fetch post:', res.status, res.statusText);
    notFound(); // Display 404 page if the post isn't found
    return;
  }

  const post: Post | null = await res.json();
  if (!post) {
    notFound(); // Display 404 page if the post is null
    return;
  }

  // Serialize the MDX content using next-mdx-remote
  const mdxSource: MDXRemoteSerializeResult = await serialize(post.content);

  // Set default fallback values for metadata if some are missing
  const postTitle = post.title || 'Untitled Post';
  const postSummary = post.summary || 'Read this exciting blog post';
  const postImage = post.thumbnailUrl || `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`;
  const readTime = calculateReadingTime(post.content);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postTitle,
    "image": postImage,
    "author": {
      "@type": "Person",
      "name": post.author || "Unknown Author"
    },
    "datePublished": post.createdDate || "2024-01-01",
    "dateModified": post.createdDate || "2024-01-01",
    "description": postSummary,
    "url": `${siteMetadata.siteUrl}/blog/${post.slug}`
  };

  return (
    <>
      {/* Use your dynamic SEO component */}
      <SEO
        title={`${postTitle} | ${siteMetadata.title}`}
        description={postSummary}
        imageUrl={postImage}
      />

      {/* Inject JSON-LD structured data for the blog post */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Pass data to BlogDetail client component */}
      <BlogDetail post={post} mdxSource={mdxSource}   readTime={readTime}/>
    </>
  );
}
