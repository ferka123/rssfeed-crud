import express from 'express';
import { loginUser, logoutUser, refreshAccessToken } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.get('/refresh', refreshAccessToken);

export default router;
