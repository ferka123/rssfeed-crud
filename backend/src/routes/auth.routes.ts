import express from 'express';
import { loginUser, logoutUser } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);

export default router;
