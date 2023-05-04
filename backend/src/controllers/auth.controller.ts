import { NextFunction, Request, Response, CookieOptions } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { LoginInput } from '../schemas/user.schema';
import userModel from '../models/user.model';
import CustomError from '../utils/customError';
import config from '../config';
import RefreshTokenModel from '../models/refreshToken.model';

const cookieOptions: CookieOptions = {
  maxAge: config.refreshExp,
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

    const accessToken = sign({ sub: user._id, role: user.role }, config.jwtSecret, {
      expiresIn: config.accessExp
    });
    const refreshToken = sign({ sub: user._id }, config.jwtSecret, {
      expiresIn: config.refreshExp
    });

    await new RefreshTokenModel({ token: refreshToken, user: user._id }).save();

    res.cookie('refreshtoken', refreshToken, cookieOptions);
    res.cookie('accesstoken', accessToken, { ...cookieOptions, maxAge: config.accessExp });
    res.cookie('loggedin', true, { ...cookieOptions, httpOnly: false });

    res.status(200).json({
      status: 'ok',
      message: 'Login successfull'
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshtoken = req.cookies.refreshtoken as string | undefined;

    if (!refreshtoken) return next(new CustomError('Failed to refresh token', 401));

    const decoded = verify(refreshtoken, config.jwtSecret);

    if (!decoded) {
      return next(new CustomError('Failed to refresh token', 401));
    }

    const session = await RefreshTokenModel.findOne({ token: refreshtoken });
    if (!session) return next(new CustomError('Failed to refresh token', 401));

    const user = await userModel.findById(session.user).lean();
    if (!user) return next(new CustomError('Failed to refresh token', 401));

    const accessToken = sign({ sub: user._id, role: user.role }, config.jwtSecret, {
      expiresIn: config.accessExp
    });

    res.cookie('accesstoken', accessToken, { ...cookieOptions, maxAge: config.accessExp });

    res.status(200).json({
      status: 'ok',
      message: 'Refresh successful'
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const { refreshtoken } = req.cookies;
  if (refreshtoken) await RefreshTokenModel.deleteOne({ token: refreshtoken });
  res.clearCookie('accesstoken');
  res.clearCookie('refreshtoken');
  res.clearCookie('loggedin');
  return res.status(200).send({
    status: 'ok',
    message: 'Logout successfull'
  });
};
