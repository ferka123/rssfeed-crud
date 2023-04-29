import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (e: unknown, req: Request, res: Response, next: NextFunction) => {
  if (e instanceof ZodError)
    return res
      .status(400)
      .json({ status: 'error', message: e.errors.map((el) => el.message).join(', ') });

  return res.status(500).json({ status: 'fail', message: 'Internal error' });
};

export default errorHandler;
