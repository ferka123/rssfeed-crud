import cloudinary from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { Readable } from 'stream';
import CustomError from '../utils/customError';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloud = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return next();
    const { fieldname } = req.file;

    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: process.env.CLOUD_FOLDER
      },
      (error, result) => {
        if (result) {
          req.body[fieldname] = result.url;
          next();
        } else next(new CustomError('Failed to upload', 417));
      }
    );

    const imageStream = Readable.from(req.file.buffer);
    imageStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};
