import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import CustomError from '../utils/customError';

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const { sub } = res.locals.user;

  const user = await UserModel.findById(sub);

  if (!user) return next(new CustomError('No such user', 404));

  return res.status(200).send({
    status: 'ok',
    ...user
  });
};
