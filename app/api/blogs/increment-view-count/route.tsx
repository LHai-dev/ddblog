import client from "@/app/lib/turso";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { slug } = req.query;

    try {
      // Update viewCount in the database
      await client.execute(
        `UPDATE blogs SET viewCount = viewCount + 1 WHERE slug = ?`,
        [slug]
      );

      res.status(200).json({ message: 'View count incremented' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to increment view count' });
    }
  } else {
    // Return 405 if method is not POST
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
