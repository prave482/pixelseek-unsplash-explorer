import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import photosRouter from './routes/photos.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/photos', photosRouter);
app.use((error, _req, res, _next) => {
  console.error(`[api] ${error.code || 'ERROR'}: ${error.message}`);
  const status = error.status || 500;
  res.status(status).json({ error: { code: error.code || 'SERVER_ERROR', message: status === 500 ? 'Something went wrong. Please try again.' : error.message } });
});

if (config.isProduction) {
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.listen(config.port, '0.0.0.0', () => console.log(`PixelSeek server running on ${config.port}`));
