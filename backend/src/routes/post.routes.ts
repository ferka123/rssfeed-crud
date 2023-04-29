import express from 'express';
import { addPost, deletePost, getPosts, updatePost } from '../controllers/post.controller';
import { validate } from '../middleware/validate';

import { getPostsSchema, addUpdatePostSchema } from '../schemas/post.schema';

const router = express.Router();

router.get('/', validate(getPostsSchema), getPosts);
router.delete('/:id', deletePost);
router.post('/', validate(addUpdatePostSchema), addPost);
router.patch('/:id', validate(addUpdatePostSchema), updatePost);

export default router;
