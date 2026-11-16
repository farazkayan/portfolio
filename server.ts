import express from 'express';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import {
  createGumroadReleaseResolver,
  GUMROAD_CACHE_TTL_MS,
} from './src/utils/gumroadLatestRelease';

const PORT = Number(process.env.PORT || 3000);
const CACHE_TTL_SECONDS = Math.floor(GUMROAD_CACHE_TTL_MS / 1000);

async function startServer() {
  const app = express();
  const resolver = createGumroadReleaseResolver({ ttlMs: GUMROAD_CACHE_TTL_MS });

  app.get('/api/ventures/latest-release', async (_req, res) => {
    const { payload, httpStatus } = await resolver.resolve();
    res.status(httpStatus);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      httpStatus === 200
        ? `public, max-age=120, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=300`
        : 'no-store',
    );
    res.json(payload);
  });

  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(import.meta.dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
