import express from 'express';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import {
  createGumroadReleaseResolver,
  GUMROAD_CACHE_TTL_MS,
} from './src/utils/gumroadLatestRelease';

function resolvePort(): number {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--port=')) {
      const parsed = Number(arg.slice('--port='.length));
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    } else if (arg === '--port' && args[i + 1]) {
      const parsed = Number(args[i + 1]);
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }
  }

  const envPort = Number(process.env.PORT);
  const nginxPort = Number(process.env.NGINX_PORT);
  if (
    process.env.NODE_ENV !== 'production' &&
    Number.isFinite(nginxPort) &&
    nginxPort > 0 &&
    envPort === nginxPort
  ) {
    return Number(process.env.DEFAULT_APP_PORT || 3000);
  }

  return Number.isFinite(envPort) && envPort > 0 ? envPort : 3000;
}

const PORT = resolvePort();
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

  let vite: Awaited<ReturnType<typeof createViteServer>> | null = null;

  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(import.meta.dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const httpServer = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });

  const shutdown = async () => {
    httpServer.close();
    if (vite) {
      await vite.close().catch(() => {});
    }
    process.exit(0);
  };

  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
