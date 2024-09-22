import * as schema from '@/db/schema';
import { db } from '@/db/turso'; // Import the initialized database connection
import { eq } from 'drizzle-orm'; // Ensure this import exists if supported

import { NextRequest } from 'next/server';
// Fetch a blog post by its slug
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const blogs = await db
      .select()
      .from(schema.blogs)
      .where(eq(schema.blogs.slug, slug));

    // Check if the blog post was found
    if (blogs.length > 0) {
      const blog = blogs[0];

      return new Response(JSON.stringify(blog), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Blog post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);

    return new Response(JSON.stringify({ error: 'Failed to fetch blog post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) { 
  const { slug } = params;
  
  try {
    // First, get the blog by slug
    const blogResults = await db
      .select()
      .from(schema.blogs)
      .where(eq(schema.blogs.slug, slug));

    const blog = blogResults.length > 0 ? blogResults[0] : null;

    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    }

    // Delete the related entries in blogCategory
    await db.delete(schema.blogCategory).where(eq(schema.blogCategory.blog_id, blog.id));

    // Delete the blog
    const result = await db.delete(schema.blogs).where(eq(schema.blogs.id, blog.id));

    console.log('Delete result:', result);

    return new Response(JSON.stringify({ message: 'Blog post deleted successfully' }), { status: 200 });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete blog post' }), { status: 500 });
  }
}
