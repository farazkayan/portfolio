import {
  createGumroadReleaseResolver,
  GUMROAD_CACHE_TTL_MS,
} from '../../../src/utils/gumroadLatestRelease';

interface CloudflarePagesContext {
  request: Request;
  waitUntil?: (promise: Promise<unknown>) => void;
}

interface CloudflareCacheStorage {
  default?: Cache;
}

const CACHE_TTL_SECONDS = Math.floor(GUMROAD_CACHE_TTL_MS / 1000);
const resolver = createGumroadReleaseResolver({ ttlMs: GUMROAD_CACHE_TTL_MS });

function getEdgeCache(): Cache | null {
  try {
    const cfCaches = caches as unknown as CloudflareCacheStorage;
    return cfCaches?.default ?? null;
  } catch {
    return null;
  }
}

export const onRequestGet = async (
  context: CloudflarePagesContext,
): Promise<Response> => {
  const edgeCache = getEdgeCache();
  const cacheKey = new Request(context.request.url, { method: 'GET' });

  if (edgeCache) {
    const hit = await edgeCache.match(cacheKey);
    if (hit) {
      return hit;
    }
  }

  const { payload, httpStatus } = await resolver.resolve();
  const isSuccess = httpStatus === 200;

  const response = new Response(JSON.stringify(payload), {
    status: httpStatus,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': isSuccess
        ? `public, max-age=120, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=300`
        : 'no-store',
    },
  });

  if (edgeCache && isSuccess) {
    const putPromise = edgeCache.put(cacheKey, response.clone());
    if (context.waitUntil) {
      context.waitUntil(putPromise);
    } else {
      await putPromise;
    }
  }

  return response;
};
