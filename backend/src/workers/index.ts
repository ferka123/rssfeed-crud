import { Worker } from 'worker_threads';
import path from 'path';

const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts';

export const startRssGrabber = () => {
  const worker = new Worker(path.resolve(__dirname, `./rssGrabber.${ext}`));
  worker.on('error', (e) => {
    console.log('RSS Feed Grabber Worker Error:', e);
    worker.terminate();
    console.log('Restarting...');
    setTimeout(startRssGrabber, 60000);
  });
};
