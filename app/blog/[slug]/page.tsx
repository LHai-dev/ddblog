import { notFound } from 'next/navigation';
import { Post } from '@/app/type/Post';
import BlogDetail from '@/app/components/BlogDetail';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import siteMetadata from "@/app/lib/siteMetaData";
import { calculateReadingTime } from "@/app/lib/readingTimeUtil";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Fetch the blog post from your API using the slug to generate metadata
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
    title: `${post.title} | ${siteMetadata.title}`,
    description: post.summary || siteMetadata.description,
    openGraph: {
      title: post.title,
      description: post.summary || siteMetadata.description,
      url: `${siteMetadata.siteUrl}/blogs/${params.slug}`,
      siteName: siteMetadata.title,
      images: [
        {
          url: post.thumbnailUrl || siteMetadata.socialBanner, // Use the blog cover image or fallback to default
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
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blogs/${params.slug}`,
    },
  };
}

export default async function BlogSlug({ params }: { params: { slug: string } }) {
  try {
    // Fetch the blog post from your API using the slug
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
