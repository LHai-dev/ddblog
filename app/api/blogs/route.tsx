import {turso} from '../../lib/turso';
import slugify from 'slugify';
export async function GET() {
  try {
    // Fetch blogs from the database, including the BLOB field for the thumbnail
    const blogs = await turso.execute('SELECT author, title, summary, createdDate, slug, thumbnailUrl, authorImageUrl FROM blogs');

    // Process the blogs and convert the thumbnailUrl BLOB (ArrayBuffer) back to a base64 string if it's a BLOB
    const processedBlogs = await Promise.all(blogs.rows.map(async (blog) => {
      let thumbnailBase64 = null;

      if (blog.thumbnailUrl) {
        const thumbnailData = blog.thumbnailUrl;

        // Check if the thumbnail is already a string (base64), if not, process it as ArrayBuffer
        if (typeof thumbnailData === 'string') {
          // If thumbnail is already a base64 string, no further processing needed
          thumbnailBase64 = thumbnailData;
        } else if (thumbnailData instanceof ArrayBuffer) {
          // If it's an ArrayBuffer, convert it to Uint8Array and then to base64 string
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

    // Return the processed blogs as a JSON response
    return new Response(JSON.stringify(processedBlogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), { status: 500 });
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();

    const author = formData.get('author') as string;
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const content = formData.get('content') as string;
    const createdDate = new Date().toISOString();
    const slug = slugify(title, { lower: true, strict: true });
    const authorImageUrl = formData.get('authorImageUrl') || 'https://miro.medium.com/v2/resize:fill:40:40/0*zFTV8OpWZVwQRLXd';  // Default image URL if missing

    // Handle `thumbnailUrl` as BLOB
    let thumbnailBlob: Buffer | null = null;
    const thumbnailFile = formData.get('thumbnailFile') as File | null;
    if (thumbnailFile) {
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      thumbnailBlob = Buffer.from(arrayBuffer); // Convert file to binary (BLOB)
    }

    // Insert the blog post data using a parameterized query
    await turso.execute(
      `INSERT INTO blogs (slug, author, authorImageUrl, title, summary, createdDate, thumbnailUrl, content)
       VALUES (${slug}, ${author},${authorImageUrl},${title}, ${summary}, ${createdDate}, ${thumbnailBlob}, ${content})`,
    );

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
