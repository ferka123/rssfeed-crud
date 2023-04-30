import { Worker } from 'worker_threads';
import path from 'path';

export const startRssGrabber = () => new Worker(path.resolve(__dirname, './rssGrabber.ts'));
