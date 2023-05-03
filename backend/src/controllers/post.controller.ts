import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';

import postModel, { IPost } from '../models/post.model';
import { GetPostsInput, AddPostInput, UpdatePostInput } from '../schemas/post.schema';
import CustomError from '../utils/customError';

export const getPosts = async (
  req: Request<object, object, object, GetPostsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const sort = req.query.sortby?.split('-') ?? ['date', 'dsc'];
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search ?? '';
    const sortBy = sort[0];
    const order = sort[1] === 'dsc' ? -1 : 1;
    const [startDate, endDate] = req.query.filterdate?.split(',') ?? [];

    const filter: FilterQuery<IPost> = { title: { $regex: search, $options: 'i' } };
    if (req.query.filtercreator) filter.creator = { $in: req.query.filtercreator.split(',') };
    if (startDate && endDate)
      filter.date = {
        $gte: new Date(startDate).toISOString(),
        $lte: new Date(endDate).toISOString()
      };

    const total = await postModel.countDocuments(filter);

    const posts = await postModel
      .find(filter)
      .sort({ [sortBy]: order })
      .skip(page * limit)
      .limit(limit);

    const [dateRange] = await postModel.aggregate<{
      _id: null;
      minDate: string;
      maxDate: string;
    }>([
      {
        $group: {
          _id: null,
          minDate: { $min: { $toDate: '$date' } },
          maxDate: { $max: { $toDate: '$date' } }
        }
      }
    ]);

    const { minDate, maxDate } = dateRange;

    return res.status(200).json({ status: 'ok', posts, minDate, maxDate, total });
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await postModel.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) return next(new CustomError('Post not found', 404));

    return res.status(200).json({ status: 'ok' });
  } catch (e) {
    next(e);
  }
};

export const addPost = async (
  req: Request<object, object, AddPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await postModel.create(req.body);

    res.status(200).json({
      status: 'ok',
      post
    });
  } catch (e) {
    next(e);
  }
};

export const updatePost = async (
  req: Request<{ id: string }, object, UpdatePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!post) return next(new CustomError('Post not found', 404));

    res.status(200).json({
      status: 'ok',
      post
    });
  } catch (e) {
    next(e);
  }
};

export const getPostCreators = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const creators = await postModel.distinct<string>('creator');

    return res.status(200).json({ status: 'ok', creators });
  } catch (e) {
    next(e);
  }
};
