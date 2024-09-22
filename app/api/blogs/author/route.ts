import * as schema from '@/db/schema';
import { db } from '@/db/turso';
import { eq } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: { author: string } }) {
    const { author } = params;
  
    try {
      const blogs = await db
        .select()
        .from(schema.blogs)
        .where(eq(schema.blogs.author, author));
  
      if (blogs.length > 0) {
        return new Response(JSON.stringify(blogs), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error: 'No blogs found for this author' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
  
      return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }