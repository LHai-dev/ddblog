import { Post } from '@/app/type/Post';
import BlogDetail from '@/app/components/BlogDetail';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import siteMetadata from "@/app/lib/siteMetaData";
import { calculateReadingTime } from "@/app/lib/readingTimeUtil";
import { notFound } from 'next/navigation';

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

  const keywords = post.tags && post.tags.length > 0
    ? post.tags.join(', ')
    : siteMetadata.keywords || "default, blog, tags";

  return {
    title: `${post.title} - ${post.author}`,
    description: post.summary || siteMetadata.description,
    keywords: keywords,
    author: post.author || siteMetadata.author,
    openGraph: {
      title: post.title,
      description: post.summary || siteMetadata.description,
      url: `${siteMetadata.siteUrl}/blog/${params.slug}`,
      siteName: siteMetadata.title,
      images: [
        {
          url: post.thumbnailUrl || siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: `${post.title} cover image`,
        },
      ],
      type: 'article',
      article: {
        publishedTime: post.createdDate,
        authors: [post.author],
      },
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary || siteMetadata.description,
      images: [post.thumbnailUrl || siteMetadata.socialBanner],
    },
    robots: {
      index: true,
      follow: true,
    },
    themeColor: "#ffffff",
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog/${params.slug}`,
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
