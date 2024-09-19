
import { NextResponse } from 'next/server';
import { getBlogsByCategorySlug } from '@/db/query'; // Adjust path as needed

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug'); // Get the slug from query parameters

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    // Fetch blogs by category slug
    const blogs = await getBlogsByCategorySlug(slug);

    // Check if any blogs were found
    if (blogs.length === 0) {
      return NextResponse.json({ error: 'No blogs found for this category' }, { status: 404 });
    }

    // Process the blogs to include necessary fields
    const processedBlogs = blogs.map(blog => ({
      createdDate: blog.createdDate,
      summary: blog.summary,
      authorImageUrl: blog.authorImageUrl,
      author: blog.author,
      title: blog.title,
      slug: blog.slug,
      thumbnailUrl: blog.thumbnailUrl,
      views: blog.views, // Include the views
      minuteRead: blog.minuteRead, // Include the minuteRead
    }));

    // Return the processed blogs as JSON
    return NextResponse.json(processedBlogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}