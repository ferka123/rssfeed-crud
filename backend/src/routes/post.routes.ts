import express from 'express';
import { getPosts } from '../controllers/post.controller';
import { validate } from '../middleware/validate';

import { getPostsSchema, deletePostSchema } from '../schemas/post.schema';

const router = express.Router();

router.get('/', validate(getPostsSchema), getPosts);
router.delete('/:id', validate(deletePostSchema), getPosts);

export default router;
