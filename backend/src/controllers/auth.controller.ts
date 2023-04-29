import { NextFunction, Request, Response, CookieOptions } from 'express';
import { sign } from 'jsonwebtoken';
import { LoginInput } from '../schemas/user.schema';
import userModel from '../models/user.model';
import CustomError from '../utils/customError';

const maxAge = Number(process.env.ACCESS_TOKEN_EXP) || 600000;

const accessTokenCookie: CookieOptions = {
  maxAge,
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
};

export const loginUser = async (
  req: Request<object, object, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password } = req.body;
    const user = await userModel.findOne({ login }).select('+password');

    if (!user || !(await user.verifyPassword(password))) {
      return next(new CustomError('Login or password are incorrect', 401));
    }

    const token = sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: maxAge
    });
    res.cookie('accesstoken', token, accessTokenCookie);
    res.cookie('loggedin', true, { ...accessTokenCookie, httpOnly: false });

    res.status(200).json({
      status: 'ok',
      message: 'Login successfull'
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('accesstoken');
  res.clearCookie('loggedin');
  return res.status(200).send({
    status: 'ok',
    message: 'Logout successfull'
  });
};
