import * as schema from '@/db/schema';
import { db } from '@/db/turso'; // Import the initialized database connection
import { eq } from 'drizzle-orm'; // Ensure this import exists if supported
// Fetch a blog post by its slug
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Fetch the blog post using the condition directly
    const blogs = await db
      .select()
      .from(schema.blogs)
      .where(eq(schema.blogs.slug, slug)); // Adjust the query condition

    // Check if the result is an array and has items
    if (Array.isArray(blogs) && blogs.length > 0) {
      const blog = blogs[0];
      return new Response(JSON.stringify(blog), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Blog post not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blog post' }), { status: 500 });
  }
}
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const result = await db
      .delete(schema.blogs)
      .where(eq(schema.blogs.slug, slug));

    // Log the result to inspect its structure
    console.log('Delete result:', result);

    // Adjust the property below based on actual result structure

      return new Response(JSON.stringify({ message: 'Blog post deleted successfully' }), { status: 200 });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete blog post' }), { status: 500 });
  }
}
