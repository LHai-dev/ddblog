import * as schema from '@/db/schema';
import { db } from '@/db/turso'; // Import the initialized database connection
import { calculateReadingTime } from '@/lib/readingTimeUtil';
import { eq } from 'drizzle-orm'; // Ensure this import exists if supported
import { z } from 'zod';

import { NextRequest } from 'next/server';


const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  summary: z.string().min(1, 'Summary is required').optional(),
  author: z.string().min(1, 'Author name is required').optional(),
  authorImageUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  content: z.string().min(1, 'Content is required').optional(),
  categoryIds: z.array(z.number()).min(1, 'At least one category is required').optional(),
});

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const blogs = await db
      .select()
      .from(schema.blogs)
      .where(eq(schema.blogs.slug, slug));

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

export async function PUT(req: Request, { params }: { params: { slug: string } }): Promise<Response> {
  const { slug } = params; // Extract slug from params

  try {
    const json = await req.json();

    // Validate data
    const parsedData = blogSchema.safeParse(json); // Use safeParse() for validation
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((err) => err.message).join(', ');
      return new Response(JSON.stringify({ error: `Validation failed: ${errorMessages}` }), { status: 400 });
    }

    const { author, title, summary, content, authorImageUrl, thumbnailUrl, categoryIds } = parsedData.data;

    // Check if the blog with the given slug exists
    const existingBlogResult = await db.select().from(schema.blogs).where(eq(schema.blogs.slug, slug));
    const existingBlog = existingBlogResult.length > 0 ? existingBlogResult[0] : null;
    if (!existingBlog) {
      return new Response(JSON.stringify({ error: 'Blog post not found' }), { status: 404 });
    }

    // Calculate reading time if content is being updated
    const minuteRead = content ? calculateReadingTime(content) : undefined;

    // Update blog post in the blogs table
    const updatedBlog = await db
      .update(schema.blogs)
      .set({
        title: title || existingBlog.title,
        summary: summary || existingBlog.summary,
        author: author || existingBlog.author,
        authorImageUrl: authorImageUrl || existingBlog.authorImageUrl,
        thumbnailUrl: thumbnailUrl || existingBlog.thumbnailUrl,
        content: content || existingBlog.content,
        minuteRead: minuteRead || existingBlog.minuteRead, // Update minuteRead if content is changed
      })
      .where(eq(schema.blogs.slug, slug))
      .returning();

    const blogId = updatedBlog[0].id;

    // Update categories if categoryIds are provided
    if (categoryIds) {
      // First, delete existing blogCategory relations
      await db.delete(schema.blogCategory).where(eq(schema.blogCategory.blog_id, blogId));

      // Then insert the new categories
      const categoryInsertions = categoryIds.map((categoryId) =>
        db.insert(schema.blogCategory).values({
          blog_id: blogId,
          category_id: categoryId,
        })
      );

      await Promise.all(categoryInsertions);
    }

    return new Response(JSON.stringify({ message: 'Blog updated successfully', blogId }), { status: 200 });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to update blog post' }), { status: 500 });
  }
}