import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import { startRssGrabber } from './workers';
import postRouter from './routes/post.routes';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: '1kb' }));
app.use(cookieParser());

// router
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// error Handler
app.use(errorHandler);

const port = process.env.PORT ?? 3000;

app.listen(port, async () => {
  console.log(`Server started on port: ${port}`);
  await connectDB();
});

startRssGrabber();
