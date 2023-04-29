import { NextFunction, Request, Response } from 'express';

import postModel from '../models/post.model';
import { GetPostsInput, DeletePostInput } from '../schemas/post.schema';
import CustomError from '../utils/customError';

export const getPosts = async (
  req: Request<object, object, object, GetPostsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search ?? '';
    const sortBy = req.query.sortby ?? 'date';
    const order = req.query.order === 'dsc' ? -1 : 1;

    const posts = await postModel
      .find({ title: { $regex: search, $options: 'i' } })
      .sort({ [sortBy]: order })
      .skip(page * limit)
      .limit(limit);

    const total = await postModel.countDocuments({ title: { $regex: search, $options: 'i' } });

    return res.status(200).json({ status: 'ok', posts, total });
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (
  req: Request<DeletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await postModel.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) return next(new CustomError('Post not found', 404));

    return res.status(204);
  } catch (e) {
    next(e);
  }
};
