import { notFound } from 'next/navigation';
import { Post } from '@/app/type/type';
import BlogDetail from '@/app/components/BlogDetail';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    // Fetch the blog post from your API using the slug
    const res = await fetch(`https://ddkhdev.lol/api/blogs/${params.slug}`);

    if (!res.ok) {
      console.error('Failed to fetch post:', res.status, res.statusText);
      notFound(); // Display 404 page if the post isn't found
    }

    const post: Post | null = await res.json();
    if (!post) {
      notFound(); // Display 404 page if the post is null
    }

    return <BlogDetail post={post} />;
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound(); // Display 404 page if there's a fetch error
  }
}
