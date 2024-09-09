// app/blog/[slug]/page.tsx (Server Component)
import { notFound } from 'next/navigation';
import { Post } from '@/app/type/Post';
import BlogDetail from '@/app/components/BlogDetail'; // Client component
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';
import siteMetadata from "@/app/lib/siteMetaData"; // Consistent import

export const runtime = "edge"; // Running on edge runtime

export default async function BlogPost({ params }: { params: { slug: string } }) {
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
  }

  // Serialize the MDX content using next-mdx-remote
  const mdxSource: MDXRemoteSerializeResult = await serialize(post.content);

  // Set default fallback values for metadata if some are missing
  const postTitle = post.title || 'Untitled Post';
  const postSummary = post.summary || 'Read this exciting blog post';
  const postImage = post.thumbnailUrl || `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`;
  const postUrl = `${siteMetadata.siteUrl}/blog/${post.slug}`;

  return (
    <>
      {/* Dynamic SEO */}
      <Head>
        <title>{postTitle} | {siteMetadata.title}</title>
        <meta name="description" content={postSummary} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content={postSummary} />
        <meta property="og:image" content={postImage} />
        <meta property="og:url" content={postUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postTitle} />
        <meta name="twitter:description" content={postSummary} />
        <meta name="twitter:image" content={postImage} />
      </Head>

      {/* Pass data to BlogDetail client component */}
      <BlogDetail post={post} mdxSource={mdxSource} />
    </>
  );
}
