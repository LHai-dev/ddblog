import { Post } from '@/app/type/Post';
import BlogDetail from '@/app/components/BlogDetail';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import siteMetadata from "@/app/lib/siteMetaData";
import { calculateReadingTime } from "@/app/lib/readingTimeUtil";
import { notFound } from 'next/navigation';
import siteMetaData from "@/app/lib/siteMetaData";

// Generate static paths for each blog post
export async function generateStaticParams() {
  const res = await fetch(`${siteMetadata.siteUrl}/api/blogs`);
  const posts: Post[] = await res.json();

  // Return paths with each blog slug
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await fetch(`${siteMetadata.siteUrl}/api/blogs/${params.slug}`);

  if (!res.ok) {
    console.error('Failed to fetch post:', res.status, res.statusText);
    return {
      title: 'Post Not Found',
      description: 'This post does not exist.',
    };
  }

  const post: Post | null = await res.json();

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist.',
    };
  }

  return {
    metadataBase: new URL(siteMetaData.siteUrl),
    title: `${post.title} - ${post.author}`,
    description: post.summary, // Default description
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteMetadata.siteUrl}/blog/${params.slug}`,
      siteName: siteMetaData.title,
      images: [
        {
          url: post.thumbnailUrl,
          width: 1200, // Specify image dimensions
          height: 630,
          alt: "Banner image for social sharing", // Provide an alt for accessibility
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteMetaData.title,
      description: siteMetaData.description,
      images: [siteMetaData.socialBanner],
    },
    robots: {
      index: true, // Ensure search engines index the page
      follow: true, // Allow following links
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true, // Prevent image indexing
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteMetaData.siteUrl, // Canonical URL for SEO
    },
  };
}

export default async function BlogSlug({ params }: { params: { slug: string } }) {
  try {
    const res = await fetch(`${siteMetadata.siteUrl}/api/blogs/${params.slug}`);

    if (!res.ok) {
      console.error('Failed to fetch post:', res.status, res.statusText);
      notFound();
    }

    const post: Post | null = await res.json();
    if (!post) {
      notFound();
    }

    const mdxSource: MDXRemoteSerializeResult = await serialize(post.content);
    const readTime = calculateReadingTime(post.content);

    return (
      <>
        <BlogDetail post={post} mdxSource={mdxSource} readTime={readTime} />
      </>
    );
  } catch (error) {
    console.error('An error occurred while fetching the blog post:', error);
    notFound();
  }
}
