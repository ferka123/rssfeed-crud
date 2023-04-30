import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import CustomError from '../utils/customError';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accesstoken } = req.cookies;

    if (!accesstoken) {
      return next(new CustomError('No access token', 401));
    }

    const decoded = verify(accesstoken, process.env.JWT_SECRET as string);

    if (!decoded) {
      return next(new CustomError('Invalid access token', 401));
    }

    res.locals.user = decoded;

    next();
  } catch (e) {
    next(new CustomError('Unauthorized', 401));
  }
};
