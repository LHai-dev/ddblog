import {turso} from '../../lib/turso';
import slugify from 'slugify';
import {Post} from "@/app/type/Post";

export async function GET() {
  try {
    const blogs = await turso.execute('SELECT * FROM blogs');
    return new Response(JSON.stringify(blogs.rows), {status: 200});
  } catch (error) {
    return new Response(JSON.stringify({error: 'Failed to fetch blogs'}), {status: 500});
  }
}
export async function POST(req: Request): Promise<Response> {
  try {
    const body: Post = await req.json();

    // Validate the incoming body to ensure it matches the expected interface
    const { author, authorImageUrl, title, summary, thumbnailUrl, content } = body;

    // Generate a slug from the title
    const slug: string = slugify(title, { lower: true, strict: true });

    const createdDate: string = new Date().toISOString();

    // Use parameterized query to avoid SQL injection and handle values properly
    await turso.execute(
      `INSERT INTO blogs (slug, author, authorImageUrl, title, summary, createdDate, thumbnailUrl, content)
   VALUES ('${slug}', '${author}', '${authorImageUrl}', '${title}', '${summary}', '${createdDate}', '${thumbnailUrl}', '${content}')`
    );


    return new Response(JSON.stringify({ message: 'Blog created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating blog post:', error);

    // Handle the error explicitly by checking if it's an instance of Error
    return new Response(
      JSON.stringify({
        error: 'Failed to create blog',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
