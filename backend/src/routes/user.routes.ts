import express from 'express';
import { getMe } from '../controllers/user.controller';
import { requireAuth } from '../middleware/requireAuth';

const router = express.Router();

router.get('/me', requireAuth, getMe);

export default router;
