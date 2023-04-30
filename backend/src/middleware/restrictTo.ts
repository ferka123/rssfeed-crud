import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../models/user.model';
import CustomError from '../utils/customError';

export const restrictTo =
  (allowedRoles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = res.locals.user;
      if (allowedRoles.includes(role)) next();
      else next(new CustomError('Access forbidden', 403));
    } catch (error) {
      next(error);
    }
  };
