export const GUMROAD_STOREFRONT_ORIGIN = 'https://shop.farazkh.dev';
export const GUMROAD_STOREFRONT_URL = `${GUMROAD_STOREFRONT_ORIGIN}/`;
export const GUMROAD_EMBED_FALLBACK_URL = `${GUMROAD_STOREFRONT_ORIGIN}/landing/embed`;
export const GUMROAD_CACHE_TTL_MS = 6 * 60 * 1000; // 6 minutes (360s)

const ALLOWED_STOREFRONT_HOSTS = new Set([
  'shop.farazkh.dev',
  'farazkayan.gumroad.com',
]);

export interface GumroadCatalogueProduct {
  name?: unknown;
  url?: unknown;
  price?: unknown;
  native_type?: unknown;
  thumbnail_url?: unknown;
  cover_url?: unknown;
  description?: unknown;
  published?: unknown;
  is_published?: unknown;
  archived?: unknown;
  is_archived?: unknown;
  deleted?: unknown;
  hidden?: unknown;
}

export interface GumroadProfileData {
  products?: GumroadCatalogueProduct[];
  products_total?: number;
}

export interface LatestReleaseProduct {
  name: string;
  url: string;
  imageUrl: string | null;
  price: string | null;
  summary: string;
}

export interface LatestReleaseResponse {
  status: 'ok' | 'empty' | 'error';
  product: LatestReleaseProduct | null;
  fetchedAt: string;
  cached?: boolean;
  error?: string;
}

export interface FeaturedOfferingViewModel {
  label: string;
  name: string;
  subtitle: string;
  url: string;
  imageUrl: string | null;
  imageAlt: string;
  price?: string | null;
}

/**
 * Extracts and parses the `<script id="gumroad-data" type="application/json">` payload
 * from a Gumroad profile or embed HTML document.
 */
export function extractGumroadDataJson(html: string): GumroadProfileData | null {
  if (!html || typeof html !== 'string') return null;

  const scriptRegex =
    /<script\b[^>]*\bid=["']gumroad-data["'][^>]*>([\s\S]*?)<\/script>/i;
  const match = html.match(scriptRegex);
  if (!match?.[1]) return null;

  const rawJson = match[1].trim();
  if (!rawJson) return null;

  try {
    const parsed = JSON.parse(rawJson) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }
    return parsed as GumroadProfileData;
  } catch {
    return null;
  }
}

/**
 * Extracts the storefront embed iframe src (e.g. `/landing/embed`) when Gumroad
 * wraps the profile in `#gumroad-landing-frame`, validating same/allowed origin.
 */
export function extractGumroadEmbedUrl(
  html: string,
  baseOrigin: string = GUMROAD_STOREFRONT_ORIGIN,
): string | null {
  if (!html || typeof html !== 'string') return null;

  const iframeByIdMatch = html.match(
    /<iframe\b[^>]*\bid=["']gumroad-landing-frame["'][^>]*\bsrc=["']([^"']+)["'][^>]*>/i,
  );
  const iframeBySrcMatch = html.match(
    /<iframe\b[^>]*\bsrc=["']([^"']*\/landing\/embed[^"']*)["'][^>]*>/i,
  );
  const rawSrc = (iframeByIdMatch?.[1] || iframeBySrcMatch?.[1] || '').trim();
  if (!rawSrc) return null;

  try {
    const resolved = new URL(rawSrc, baseOrigin);
    if (
      resolved.protocol !== 'https:' ||
      !ALLOWED_STOREFRONT_HOSTS.has(resolved.hostname)
    ) {
      return null;
    }
    return resolved.toString();
  } catch {
    return null;
  }
}

/**
 * Normalizes a Gumroad product permalink so custom storefront links always point
 * cleanly to https://shop.farazkh.dev/l/<slug>.
 */
export function normalizeStorefrontProductUrl(
  rawUrl: unknown,
  storefrontOrigin: string = GUMROAD_STOREFRONT_ORIGIN,
): string | null {
  if (typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed, storefrontOrigin);
    if (parsed.protocol !== 'https:') return null;

    if (parsed.hostname === 'farazkayan.gumroad.com') {
      return `${storefrontOrigin}${parsed.pathname}${parsed.search}`;
    }

    if (
      ALLOWED_STOREFRONT_HOSTS.has(parsed.hostname) ||
      parsed.hostname === 'gumroad.com' ||
      parsed.hostname.endsWith('.gumroad.com')
    ) {
      return parsed.toString();
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Validates and cleans a Gumroad public image URL (thumbnail_url or cover_url).
 */
export function normalizeProductImageUrl(rawUrl: unknown): string | null {
  if (typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Formats Gumroad's concatenated description snippet into a clean, single-line summary
 * suitable for the compact featured-release card slot.
 */
export function formatGumroadSummary(description: unknown): string {
  if (typeof description !== 'string') return 'Digital resource & template';

  const spaced = description
    .replace(/<[^>]+>/g, ' ')
    .replace(/([.!?])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

  if (!spaced) return 'Digital resource & template';

  // Prefer the clean opening sentence if reasonably sized
  const firstSentenceMatch = spaced.match(/^(.{12,110}?[.!?])(?:\s|$)/);
  if (firstSentenceMatch?.[1]) {
    return firstSentenceMatch[1].trim();
  }

  if (spaced.length <= 96) return spaced;
  return `${spaced.slice(0, 93).trimEnd()}...`;
}

function isProductEligible(item: GumroadCatalogueProduct): boolean {
  if (!item || typeof item !== 'object') return false;
  if (item.published === false || item.is_published === false) return false;
  if (
    item.archived === true ||
    item.is_archived === true ||
    item.deleted === true ||
    item.hidden === true
  ) {
    return false;
  }
  if (typeof item.name !== 'string' || !item.name.trim()) return false;
  if (!normalizeStorefrontProductUrl(item.url)) return false;
  return true;
}

/**
 * Selects the newest eligible published product from Gumroad's `gumroad-data` catalogue.
 * Gumroad's profile `products` array is ordered newest first (up to 100 items).
 */
export function selectLatestEligibleProduct(
  catalogue: GumroadProfileData | null | undefined,
  storefrontOrigin: string = GUMROAD_STOREFRONT_ORIGIN,
): LatestReleaseProduct | null {
  if (!catalogue || !Array.isArray(catalogue.products)) return null;

  for (const candidate of catalogue.products) {
    if (!isProductEligible(candidate)) continue;

    const name = (candidate.name as string).trim();
    const url = normalizeStorefrontProductUrl(candidate.url, storefrontOrigin);
    if (!url) continue;

    const imageUrl =
      normalizeProductImageUrl(candidate.thumbnail_url) ??
      normalizeProductImageUrl(candidate.cover_url);

    const price =
      typeof candidate.price === 'string' && candidate.price.trim()
        ? candidate.price.trim()
        : null;

    return {
      name,
      url,
      imageUrl,
      price,
      summary: formatGumroadSummary(candidate.description),
    };
  }

  return null;
}

async function fetchTextWithTimeout(
  url: string,
  fetchFn: typeof fetch,
  timeoutMs: number = 6000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchFn(url, {
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; FarazPortfolioSync/1.0)',
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetches the storefront profile HTML server-side, follows Gumroad's iframe embed
 * if `#gumroad-data` is nested inside `/landing/embed`, parses the real catalogue,
 * and returns the newest eligible published release.
 */
export async function fetchLatestGumroadRelease(
  options: {
    fetchFn?: typeof fetch;
    storefrontUrl?: string;
    timeoutMs?: number;
    now?: () => Date;
  } = {},
): Promise<LatestReleaseResponse> {
  const fetchFn = options.fetchFn ?? fetch;
  const storefrontUrl = options.storefrontUrl ?? GUMROAD_STOREFRONT_URL;
  const timeoutMs = options.timeoutMs ?? 6000;
  const now = options.now ?? (() => new Date());

  const origin = new URL(storefrontUrl).origin;
  const rootResponse = await fetchTextWithTimeout(storefrontUrl, fetchFn, timeoutMs);
  if (!rootResponse.ok) {
    throw new Error(`Gumroad storefront responded with HTTP ${rootResponse.status}`);
  }

  const rootHtml = await rootResponse.text();
  let catalogue = extractGumroadDataJson(rootHtml);

  if (!catalogue) {
    const embedUrl =
      extractGumroadEmbedUrl(rootHtml, origin) ?? `${origin}/landing/embed`;
    const embedResponse = await fetchTextWithTimeout(embedUrl, fetchFn, timeoutMs);
    if (!embedResponse.ok) {
      throw new Error(`Gumroad storefront embed responded with HTTP ${embedResponse.status}`);
    }
    const embedHtml = await embedResponse.text();
    catalogue = extractGumroadDataJson(embedHtml);
  }

  if (!catalogue || !Array.isArray(catalogue.products)) {
    throw new Error('Could not locate valid gumroad-data product catalogue');
  }

  const product = selectLatestEligibleProduct(catalogue, origin);
  return {
    status: product ? 'ok' : 'empty',
    product,
    fetchedAt: now().toISOString(),
  };
}

/**
 * Creates a lightweight server-side TTL cache with concurrent request coalescing
 * so bursts or simultaneous requests never trigger duplicate Gumroad fetches.
 */
export function createGumroadReleaseResolver(
  options: {
    ttlMs?: number;
    fetchRelease?: () => Promise<LatestReleaseResponse>;
    nowMs?: () => number;
  } = {},
) {
  const ttlMs = options.ttlMs ?? GUMROAD_CACHE_TTL_MS;
  const fetchRelease = options.fetchRelease ?? (() => fetchLatestGumroadRelease());
  const nowMs = options.nowMs ?? (() => Date.now());

  let cached: { payload: LatestReleaseResponse; expiresAt: number } | null = null;
  let inFlight: Promise<LatestReleaseResponse> | null = null;

  return {
    async resolve(): Promise<{ payload: LatestReleaseResponse; httpStatus: number }> {
      const current = nowMs();
      if (cached && current < cached.expiresAt) {
        return {
          payload: { ...cached.payload, cached: true },
          httpStatus: 200,
        };
      }

      if (!inFlight) {
        inFlight = fetchRelease().finally(() => {
          inFlight = null;
        });
      }

      try {
        const fresh = await inFlight;
        cached = {
          payload: fresh,
          expiresAt: nowMs() + ttlMs,
        };
        return {
          payload: { ...fresh, cached: false },
          httpStatus: 200,
        };
      } catch (err) {
        if (cached) {
          return {
            payload: { ...cached.payload, cached: true },
            httpStatus: 200,
          };
        }

        return {
          payload: {
            status: 'error',
            product: null,
            fetchedAt: new Date(nowMs()).toISOString(),
            error: err instanceof Error ? err.message : 'Unable to reach Gumroad storefront',
          },
          httpStatus: 502,
        };
      }
    },
    clear() {
      cached = null;
      inFlight = null;
    },
  };
}

/**
 * Pure client-side state mapper deciding what the featured-release box should display:
 * - While loading or on network/server error: preserve the initial fallback offering.
 * - When Gumroad responds with `status === 'empty'` (0 eligible products): return `null` so the module hides cleanly.
 * - When Gumroad responds with `status === 'ok'` and a live `product`: map its live fields into the card view model.
 */
export function resolveFeaturedOfferingViewModel(
  fallback: FeaturedOfferingViewModel | undefined,
  apiPayload: LatestReleaseResponse | null,
): FeaturedOfferingViewModel | null {
  if (!apiPayload) {
    return fallback ?? null;
  }

  if (apiPayload.status === 'empty') {
    return null;
  }

  if (apiPayload.status === 'ok' && apiPayload.product) {
    const p = apiPayload.product;
    return {
      label: p.price ? `Featured release · ${p.price}` : 'Featured release',
      name: p.name,
      subtitle: p.summary,
      url: p.url,
      imageUrl: p.imageUrl ?? fallback?.imageUrl ?? null,
      imageAlt: `${p.name} cover preview`,
      price: p.price,
    };
  }

  // `status === 'error'`: keep fallback gracefully rather than breaking UI
  return fallback ?? null;
}
