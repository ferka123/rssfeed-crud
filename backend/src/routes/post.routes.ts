import express from 'express';
import { addPost, deletePost, getPosts, updatePost } from '../controllers/post.controller';
import { receiveImage } from '../middleware/receiveImage';
import { uploadToCloud } from '../middleware/uploadToCloud';
import { validate } from '../middleware/validate';

import { getPostsSchema, addPostSchema, updatePostSchema } from '../schemas/post.schema';

const router = express.Router();

router.get('/', validate(getPostsSchema), getPosts);
router.delete('/:id', deletePost);
router.post('/', receiveImage('image'), uploadToCloud, validate(addPostSchema), addPost);
router.patch('/:id', receiveImage('image'), uploadToCloud, validate(updatePostSchema), updatePost);

export default router;
