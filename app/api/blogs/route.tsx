import client from '../../lib/turso';

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
    const { slug, author, authorImageUrl, title, summary, createdDate, thumbnailUrl } = await req.json();

    const result = await client.execute(
      `INSERT INTO blogs (slug, author, authorImageUrl, title, summary, createdDate, thumbnailUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [slug, author, authorImageUrl, title, summary, createdDate, thumbnailUrl]
    );

    return new Response(JSON.stringify({ message: 'Blog created successfully', id: result.lastInsertId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create blog' }), { status: 500 });
  }
}
