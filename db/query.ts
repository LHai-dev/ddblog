import { db } from '@/db/turso';
import * as schema from '@/db/schema'; // Assuming schema includes blogs, blogCategory, and categories tables
import { eq } from 'drizzle-orm';

export async function getBlogsByCategorySlug(slug: string) {
  try {
    const blogs = await db
      .select()
      .from(schema.blogs)
      .innerJoin(schema.blogCategory, eq(schema.blogs.id, schema.blogCategory.blog_id))
      .innerJoin(schema.categories, eq(schema.blogCategory.category_id, schema.categories.id))
      .where(eq(schema.categories.slug, slug));

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs by category slug:', error);
    throw new Error('Failed to fetch blogs');
  }
}
