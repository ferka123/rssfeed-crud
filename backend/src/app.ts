import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1kb' }));
app.use(cookieParser());

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});
