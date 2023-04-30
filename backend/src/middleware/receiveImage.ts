import { Request } from 'express';
import multer from 'multer';
import CustomError from '../utils/customError';

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new CustomError('Wrong file type', 415));
  }
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }
});

export const receiveImage = (name: string) => upload.single(name);
