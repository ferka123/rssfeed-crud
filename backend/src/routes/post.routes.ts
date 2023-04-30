import express from 'express';
import { addPost, deletePost, getPosts, updatePost } from '../controllers/post.controller';
import { receiveImage } from '../middleware/receiveImage';
import { requireAuth } from '../middleware/requireAuth';
import { restrictTo } from '../middleware/restrictTo';
import { uploadToCloud } from '../middleware/uploadToCloud';
import { validate } from '../middleware/validate';
import { UserRole } from '../models/user.model';

import { getPostsSchema, addPostSchema, updatePostSchema } from '../schemas/post.schema';

const router = express.Router();

router.get('/', validate(getPostsSchema), getPosts);
router.delete('/:id', requireAuth, restrictTo([UserRole.admin]), deletePost);
router.post(
  '/',
  requireAuth,
  restrictTo([UserRole.admin]),
  receiveImage('image'),
  uploadToCloud,
  validate(addPostSchema),
  addPost
);
router.patch(
  '/:id',
  requireAuth,
  restrictTo([UserRole.admin]),
  receiveImage('image'),
  uploadToCloud,
  validate(updatePostSchema),
  updatePost
);

export default router;
