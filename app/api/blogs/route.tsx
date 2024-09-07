import {turso} from '../../lib/turso';
import slugify from 'slugify';

export async function GET() {
  try {
    const blogs = await turso.execute('SELECT * FROM blogs');
    return new Response(JSON.stringify(blogs.rows), {status: 200});
  } catch (error) {
    return new Response(JSON.stringify({error: 'Failed to fetch blogs'}), {status: 500});
  }
}


export async function POST(req: Request) {
  try {
    const {author, authorImageUrl, title, summary, thumbnailUrl, content} = await req.json();

    // Generate a slug from the title
    const slug = slugify(title, {lower: true, strict: true});

    const createdDate = new Date().toISOString();
    await turso.execute(
      `INSERT INTO blogs (slug, author, authorImageUrl, title, summary, createdDate, thumbnailUrl, content)
       VALUES ('${slug}', '${author}', '${authorImageUrl}', '${title}', '${summary}', '${createdDate}', '${thumbnailUrl}', '${content}')`
    );
    return new Response(JSON.stringify({message: 'Blog created successfully'}), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);

    // Cast the error to the Error type
    return new Response(JSON.stringify({
      error: 'Failed to create blog',
      details: (error as Error).message // Casting error to Error
    }), {
      status: 500,
    });
  }
}
