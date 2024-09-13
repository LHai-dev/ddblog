import slugify from 'slugify';
import * as schema from '@/db/schema';
import { db } from '@/db/turso';
import { z } from 'zod';

export async function GET() {
  try {
    const blogs = await db.select().from(schema.blogs); // Use the schema for table reference

    const processedBlogs = blogs.map(blog => ({
      ...blog,
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
  author: z.string().nonempty('Author is required'),
  title: z.string().nonempty('Title is required'),
  summary: z.string().optional(),
  content: z.string().optional(),
  authorImageUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
});

function generateUniqueId() {
  return Math.floor(Math.random() * 1_000_000_000).toString(); // Generates a string representation of a 9-digit number
}

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();

    // Convert FormData entries into an object
    const formObject: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Validate and parse the data using Zod
    const parsedData = blogSchema.safeParse({
      author: formObject.author,
      title: formObject.title,
      summary: formObject.summary,
      content: formObject.content,
      authorImageUrl: formObject.authorImageUrl,
      thumbnailUrl: formObject.thumbnailUrl,
    });

    // Check for validation errors
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((err) => err.message).join(', ');
      return new Response(JSON.stringify({ error: `Validation failed: ${errorMessages}` }), { status: 400 });
    }

    // Extract validated data
    const { author, title, summary, content, authorImageUrl, thumbnailUrl } = parsedData.data;

    // Generate the slug
    const slugBase = slugify(title, { lower: true, strict: true });
    const uniqueId = generateUniqueId(); // Generate a unique numeric ID
    const slug = `${slugBase}-${uniqueId}`; // Concatenate slug with the unique numeric ID

    // Default values for URLs if missing
    const defaultAuthorImageUrl = 'https://miro.medium.com/v2/resize:fill:40:40/0*zFTV8OpWZVwQRLXd';
    const defaultThumbnailUrl = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';

    // Insert into the database with validated data
    await db.insert(schema.blogs).values({
      slug: slug,
      author: author,
      authorImageUrl: authorImageUrl || defaultAuthorImageUrl,
      title: title,
      summary: summary || '',
      createdDate: new Date().toISOString(),
      thumbnailUrl: thumbnailUrl || defaultThumbnailUrl,
      content: content || '',
    });

    // Return success response
    return new Response(JSON.stringify({ message: 'Blog created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to create blog post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
