
import { NextResponse } from 'next/server';
import { getBlogsByCategorySlug } from '@/db/query'; // Adjust path as needed

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug'); // Get the slug from query parameters

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const blogs = await getBlogsByCategorySlug(slug);

    if (blogs.length === 0) {
      return NextResponse.json({ error: 'No blogs found for this category' }, { status: 404 });
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
