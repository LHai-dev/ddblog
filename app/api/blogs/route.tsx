import client from '../../lib/turso';
import slugify from 'slugify';

export async function GET() {
  try {
    const blogs = await client.execute('SELECT * FROM blogs');
    return new Response(JSON.stringify(blogs.rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), { status: 500 });
  }
}
export async function POST(req) {
  try {
    const { author, authorImageUrl, title, summary, thumbnailUrl,content } = await req.json();

    // Generate a slug from the title
    const slug = slugify(title, { lower: true, strict: true });

    // Automatically set the created date to now (local time)
    const createdDate = new Date().toISOString();  // Use ISO 8601 format for consistency

    const result = await client.execute(
      `INSERT INTO blogs (slug, author, authorImageUrl, title, summary, createdDate, thumbnailUrl,content)
       VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
      [slug, author, authorImageUrl, title, summary, createdDate, thumbnailUrl,content]
    );

    return new Response(JSON.stringify({ message: 'Blog created successfully', id: result.lastInsertId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create blog' }), { status: 500 });
  }
}

