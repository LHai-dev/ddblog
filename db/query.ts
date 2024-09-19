import { db } from '@/db/turso';
import * as schema from '@/db/schema'; // Assuming schema includes blogs, blogCategory, and categories tables
import { eq } from 'drizzle-orm';

export async function getBlogsByCategorySlug(slug: string) {
  try {
    const blogs = await db
      .select({
        blogId: schema.blogs.id,
        slug: schema.blogs.slug,
        createdDate: schema.blogs.createdDate,
        summary: schema.blogs.summary,
        authorImageUrl: schema.blogs.authorImageUrl,
        author: schema.blogs.author,
        title: schema.blogs.title,
        blogSlug: schema.blogs.slug,
        thumbnailUrl: schema.blogs.thumbnailUrl,
        views: schema.blogs.views,
        minuteRead: schema.blogs.minuteRead,
        categorySlug: schema.categories.slug, // Category field for checking the slug
      })
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