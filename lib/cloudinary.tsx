// lib/cloudinary.ts
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
      if (error) {
        reject(error);
      } else {
        resolve(result as UploadApiResponse);
      }
    });
  });
};
