import slugify from 'slugify';
import * as schema from '@/db/schema';
import { db } from '@/db/turso';
import { z } from 'zod';
import {desc} from "drizzle-orm";

export async function GET() {
  try {
    const blogs = await db.select().from(schema.blogs).orderBy(desc(schema.blogs.createdDate)); // Use the schema for table reference

    const processedBlogs = blogs.map(blog => ({
      createdDate: blog.createdDate,
      summary: blog.summary,
      authorImageUrl: blog.authorImageUrl,
      author: blog.author,
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      thumbnailUrl: blog.thumbnailUrl,
    }));

    // Return the processed blogs as JSON
    return new Response(JSON.stringify(processedBlogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  author: z.string().min(1, 'Author name is required'),
  authorImageUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  content: z.string().min(1, 'Content is required'),
  categoryIds: z.array(z.number()).min(1, 'At least one category is required'), // This should expect an array
});


export async function POST(req: Request): Promise<Response> {
  try {
    const json = await req.json();

    // Validate data
    const parsedData = blogSchema.safeParse(json);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((err) => err.message).join(', ');
      return new Response(JSON.stringify({ error: `Validation failed: ${errorMessages}` }), { status: 400 });
    }

    const { author, title, summary, content, authorImageUrl, thumbnailUrl, categoryIds } = parsedData.data;

    // Insert into blogs table
    const insertedBlog = await db.insert(schema.blogs).values({
      slug: slugify(title, { lower: true, strict: true }),
      author,
      authorImageUrl: authorImageUrl || 'https://default-url.com/image.png',
      title,
      summary,
      content,
      thumbnailUrl: thumbnailUrl || 'https://default-url.com/thumbnail.png',
      createdDate: new Date().toISOString(),
    }).returning();

    const blogId = insertedBlog[0].id;

    // Insert into BlogCategory table for each category
    const categoryInsertions = categoryIds.map(categoryId =>
      db.insert(schema.blogCategory).values({
        blog_id: blogId,
        category_id: categoryId
      })
    );

    await Promise.all(categoryInsertions);

    return new Response(JSON.stringify({ message: 'Blog created successfully', blogId }), { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to create blog post' }), { status: 500 });
  }
}