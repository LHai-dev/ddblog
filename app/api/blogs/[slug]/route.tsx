import { turso } from '@/app/lib/turso';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const result = await turso.execute(
      `SELECT * FROM blogs WHERE slug = '${slug}'`
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

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Execute delete statement to remove the blog post by slug
    const result = await turso.execute(
      `DELETE FROM blogs WHERE slug = '${slug}'`,
    );

    console.log(result); // Log the result to check its structure

    return new Response(JSON.stringify({ message: 'Delete operation executed' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete blog post' }), { status: 500 });
  }
}

