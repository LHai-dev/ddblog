import client from '../../../lib/turso';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const result = await client.execute(
      'SELECT * FROM blogs WHERE slug = ?',
      [slug]
    );

    if (result.rows.length > 0) {
      return new Response(JSON.stringify(result.rows[0]), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Blog post not found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch blog post' }), { status: 500 });
  }
}
