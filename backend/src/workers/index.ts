import { Worker } from 'worker_threads';
import path from 'path';

const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts';

export const startRssGrabber = () => new Worker(path.resolve(__dirname, `./rssGrabber.${ext}`));
