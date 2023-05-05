import express from 'express';
import compression from 'compression';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(compression());

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

app.listen(process.env.PORT ?? 8081);
