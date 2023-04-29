import { NextFunction, Request, Response } from 'express';

import postModel from '../models/post.model';
import { GetPostsInput } from '../schemas/post.schema';

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
