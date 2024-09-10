import { notFound } from 'next/navigation';
import { Post } from '@/app/type/Post';
import BlogDetail from '@/app/components/BlogDetail';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import SEO from '@/app/components/Head';
import siteMetadata from "@/app/lib/siteMetaData";
import Script from 'next/script';
import {calculateReadingTime} from "@/app/lib/readingTimeUtil";

export default async function BlogSlug({ params }: { params: { slug: string } }) {
  // Fetch the blog post from your API using the slug
  const res = await fetch(`${siteMetadata.siteUrl}/api/blogs/${params.slug}`);

  if (!res.ok) {
    console.error('Failed to fetch post:', res.status, res.statusText);
    notFound();
    return;
  }

  const post: Post | null = await res.json();
  if (!post) {
    notFound();
    return;
  }

  const mdxSource: MDXRemoteSerializeResult = await serialize(post.content);
  const postTitle = post.title || 'Untitled Post';
  const postSummary = post.summary || 'Read this exciting blog post';
  const postImage = post.thumbnailUrl || `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`;
  const postAuthor = post.author || 'Unknown Author';
  const postAuthorImage = post.authorImageUrl || `${siteMetadata.siteUrl}/default-author.jpg`; // You should add author image handling in your data
  const postUrl = `${siteMetadata.siteUrl}/blog/${post.slug}`;
  const readTime = calculateReadingTime(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postTitle,
    "image": postImage,
    "author": {
      "@type": "Person",
      "name": postAuthor,
      "image": postAuthorImage // Add author image for SEO structured data
    },
    "datePublished": post.createdDate || "2024-01-01",
    "dateModified": post.createdDate || "2024-01-01",
    "description": postSummary,
    "url": postUrl,
  };

  return (
    <>
      <SEO
        title={`${postTitle} | ${siteMetadata.title}`}
        description={postSummary}
        imageUrl={postImage}
        url={postUrl}
      />

      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogDetail post={post} mdxSource={mdxSource} readTime={readTime} />
    </>
  );
}
