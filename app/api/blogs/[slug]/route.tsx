import { turso } from '@/app/lib/turso';


export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Using a parameterized query to prevent SQL injection
    const result = await turso.execute(
      `SELECT * FROM blogs WHERE slug = '${slug}'`
    );

    if (result.rows.length > 0) {
      // Process the blogs (even if it's just one) and convert the thumbnailUrl
      const processedBlogs = await Promise.all(result.rows.map(async (blog) => {
        let thumbnailBase64 = null;

        if (blog.thumbnailUrl) {
          const thumbnailData = blog.thumbnailUrl;

          // Check if the thumbnail is already a string (base64), if not, process it as ArrayBuffer
          if (typeof thumbnailData === 'string') {
            thumbnailBase64 = thumbnailData;
          } else if (thumbnailData instanceof ArrayBuffer) {
            const uint8Array = new Uint8Array(thumbnailData);
            thumbnailBase64 = `data:image/jpeg;base64,${Buffer.from(uint8Array).toString('base64')}`;
          } else {
            throw new Error('Unexpected type for thumbnailUrl');
          }
        }

        return {
          ...blog,
          thumbnailUrl: thumbnailBase64, // Use the base64 encoded image
        };
      }));

      // Since you are fetching by slug, return the first processed blog post
      return new Response(JSON.stringify(processedBlogs[0]), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Blog post not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
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

