import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import { startRssGrabber } from './workers';
import postRouter from './routes/post.routes';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1kb' }));
app.use(cookieParser());

// router
app.use('/api/posts', postRouter);

// error Handler
app.use(errorHandler);

const port = process.env.PORT ?? 3000;

app.listen(port, async () => {
  console.log(`Server started on port: ${port}`);
  await connectDB();
});

startRssGrabber();
