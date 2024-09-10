// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadImage } from '@/lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body;
      const result = await uploadImage(file);
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
