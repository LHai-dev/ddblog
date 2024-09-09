import { notFound } from 'next/navigation';
import { Post } from '@/app/type/Post';
import BlogDetail from '@/app/components/BlogDetail';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    // Fetch the blog post from your API using the slug
    const res = await fetch(`https://ddkhdev.lol/api/blogs/${params.slug}`);

    // Check if the response is not ok (404 or other errors)
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

    // Render the BlogDetail component, passing the post and serialized MDX content
    return (
      <>
        {/* Add dynamic SEO for the blog post */}
        <Head>
          <title>{post.title} | My Blog</title>
          <meta name="description" content={post.summary} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.summary} />
          <meta property="og:image" content={post.thumbnailUrl} />
          <meta property="og:url" content={`https://ddkhdev.lol/api/blogs/${post.slug}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.summary} />
          <meta name="twitter:image" content={post.authorImageUrl} />
        </Head>

        {/* Render the blog detail */}
        <BlogDetail post={post} mdxSource={mdxSource} />
      </>
    );
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error('Error fetching post:', error);
    notFound(); // Display 404 page if there's a fetch error
  }
}
