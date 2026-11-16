import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGumroadReleaseResolver,
  extractGumroadDataJson,
  extractGumroadEmbedUrl,
  fetchLatestGumroadRelease,
  formatGumroadSummary,
  normalizeStorefrontProductUrl,
  resolveFeaturedOfferingViewModel,
  selectLatestEligibleProduct,
} from '../src/utils/gumroadLatestRelease';

const SAMPLE_CATALOGUE_HTML = `<!doctype html>
<html>
  <head><title>Store</title></head>
  <body>
    <script id="gumroad-data" type="application/json">${JSON.stringify({
      products: [
        {
          name: 'Unpublished Draft',
          url: 'https://shop.farazkh.dev/l/draft-item',
          published: false,
          price: '$9.00',
          thumbnail_url: 'https://public-files.gumroad.com/draft',
          description: 'Draft not visible',
        },
        {
          name: 'Archived Release',
          url: 'https://shop.farazkh.dev/l/archived-item',
          archived: true,
          price: '$5.00',
          thumbnail_url: 'https://public-files.gumroad.com/arch',
          description: 'Archived product',
        },
        {
          name: 'New Study Pack',
          url: 'https://shop.farazkh.dev/l/new-study-pack',
          price: '$2.99',
          native_type: 'digital',
          thumbnail_url: 'https://public-files.gumroad.com/newthumb',
          cover_url: 'https://public-files.gumroad.com/newcover',
          description:
            'Plan your semester cleanly.Track assignments, exams, and notes together.',
        },
        {
          name: 'Older Kit',
          url: 'https://shop.farazkh.dev/l/older-kit',
          price: '$1.99',
          thumbnail_url: 'https://public-files.gumroad.com/oldthumb',
          description: 'Older release.',
        },
      ],
      products_total: 2,
    })}</script>
  </body>
</html>`;

test('extractGumroadDataJson parses gumroad-data script JSON cleanly', () => {
  const data = extractGumroadDataJson(SAMPLE_CATALOGUE_HTML);
  assert.ok(data);
  assert.equal(data.products?.length, 4);

  assert.equal(extractGumroadDataJson('<html><body>No script</body></html>'), null);
  assert.equal(
    extractGumroadDataJson('<script id="gumroad-data">{bad json</script>'),
    null,
  );
});

test('extractGumroadEmbedUrl resolves safe same/allowed embed iframe src and rejects untrusted hosts', () => {
  const wrapperHtml =
    '<iframe id="gumroad-landing-frame" src="/landing/embed" title="Store"></iframe>';
  assert.equal(
    extractGumroadEmbedUrl(wrapperHtml),
    'https://shop.farazkh.dev/landing/embed',
  );

  const evilHtml =
    '<iframe id="gumroad-landing-frame" src="https://evil.example.com/landing/embed"></iframe>';
  assert.equal(extractGumroadEmbedUrl(evilHtml), null);
});

test('selectLatestEligibleProduct skips unpublished/archived products and picks newest published one', () => {
  const data = extractGumroadDataJson(SAMPLE_CATALOGUE_HTML);
  const selected = selectLatestEligibleProduct(data);
  assert.deepEqual(selected, {
    name: 'New Study Pack',
    url: 'https://shop.farazkh.dev/l/new-study-pack',
    imageUrl: 'https://public-files.gumroad.com/newthumb',
    price: '$2.99',
    summary: 'Plan your semester cleanly.',
  });
});

test('selectLatestEligibleProduct falls back to cover_url when thumbnail_url is absent and returns null when empty', () => {
  const selected = selectLatestEligibleProduct({
    products: [
      {
        name: 'Cover Only Item',
        url: 'https://farazkayan.gumroad.com/l/cover-only',
        cover_url: 'https://public-files.gumroad.com/coveronly',
        description: 'A practical resource',
      },
    ],
  });
  assert.deepEqual(selected, {
    name: 'Cover Only Item',
    url: 'https://shop.farazkh.dev/l/cover-only',
    imageUrl: 'https://public-files.gumroad.com/coveronly',
    price: null,
    summary: 'A practical resource',
  });

  assert.equal(selectLatestEligibleProduct({ products: [] }), null);
});

test('formatGumroadSummary repairs missing spaces after sentence punctuation', () => {
  assert.equal(
    formatGumroadSummary(
      'Get your schoolwork organized.Keep deadlines clear.Extra text.',
    ),
    'Get your schoolwork organized.',
  );
});

test('normalizeStorefrontProductUrl keeps custom-domain links and rejects unsafe schemes', () => {
  assert.equal(
    normalizeStorefrontProductUrl('https://shop.farazkh.dev/l/the-student-deadline-kit'),
    'https://shop.farazkh.dev/l/the-student-deadline-kit',
  );
  assert.equal(
    normalizeStorefrontProductUrl('javascript:alert(1)'),
    null,
  );
});

test('fetchLatestGumroadRelease follows storefront iframe embed and extracts catalogue', async () => {
  const calls: string[] = [];
  const mockFetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    calls.push(url);
    if (url === 'https://shop.farazkh.dev/') {
      return new Response(
        '<html><body><iframe id="gumroad-landing-frame" src="/landing/embed"></iframe></body></html>',
        { status: 200 },
      );
    }
    if (url === 'https://shop.farazkh.dev/landing/embed') {
      return new Response(SAMPLE_CATALOGUE_HTML, { status: 200 });
    }
    return new Response('Not found', { status: 404 });
  }) as typeof fetch;

  const result = await fetchLatestGumroadRelease({
    fetchFn: mockFetch,
    now: () => new Date('2026-11-16T00:00:00.000Z'),
  });

  assert.deepEqual(calls, [
    'https://shop.farazkh.dev/',
    'https://shop.farazkh.dev/landing/embed',
  ]);
  assert.equal(result.status, 'ok');
  assert.equal(result.product?.name, 'New Study Pack');
  assert.equal(result.product?.url, 'https://shop.farazkh.dev/l/new-study-pack');
});

test('createGumroadReleaseResolver caches within TTL, refreshes after expiry, and returns stale/error appropriately', async () => {
  let clock = 1_000;
  let version = 1;
  let shouldFail = false;
  let fetchCalls = 0;

  const resolver = createGumroadReleaseResolver({
    ttlMs: 300_000,
    nowMs: () => clock,
    fetchRelease: async () => {
      fetchCalls++;
      if (shouldFail) throw new Error('Network timeout');
      return {
        status: 'ok',
        product: {
          name: `Release v${version}`,
          url: `https://shop.farazkh.dev/l/v${version}`,
          imageUrl: `https://public-files.gumroad.com/v${version}`,
          price: '$2.00',
          summary: `Release ${version} summary.`,
        },
        fetchedAt: new Date(clock).toISOString(),
      };
    },
  });

  const r1 = await resolver.resolve();
  assert.equal(r1.httpStatus, 200);
  assert.equal(r1.payload.cached, false);
  assert.equal(r1.payload.product?.name, 'Release v1');
  assert.equal(fetchCalls, 1);

  // Within TTL -> returns cached
  clock += 60_000;
  const r2 = await resolver.resolve();
  assert.equal(r2.payload.cached, true);
  assert.equal(r2.payload.product?.name, 'Release v1');
  assert.equal(fetchCalls, 1);

  // After TTL expires & new product published -> refreshes dynamically
  version = 2;
  clock += 300_000;
  const r3 = await resolver.resolve();
  assert.equal(r3.payload.cached, false);
  assert.equal(r3.payload.product?.name, 'Release v2');
  assert.equal(fetchCalls, 2);

  // After TTL expires & upstream fails -> gracefully serves stale cache
  shouldFail = true;
  clock += 350_000;
  const r4 = await resolver.resolve();
  assert.equal(r4.httpStatus, 200);
  assert.equal(r4.payload.cached, true);
  assert.equal(r4.payload.product?.name, 'Release v2');
});

test('resolveFeaturedOfferingViewModel keeps fallback on loading/error, updates on ok, and hides when empty', () => {
  const fallback = {
    label: 'Featured release',
    name: 'The Student Deadline Kit',
    subtitle: 'Fallback summary',
    url: 'https://shop.farazkh.dev/l/the-student-deadline-kit',
    imageUrl: '/ventures/student-deadline-kit.png',
    imageAlt: 'Fallback alt',
  };

  assert.deepEqual(resolveFeaturedOfferingViewModel(fallback, null), fallback);
  assert.deepEqual(
    resolveFeaturedOfferingViewModel(fallback, {
      status: 'error',
      product: null,
      fetchedAt: '2026-11-16T00:00:00Z',
      error: '502',
    }),
    fallback,
  );
  assert.equal(
    resolveFeaturedOfferingViewModel(fallback, {
      status: 'empty',
      product: null,
      fetchedAt: '2026-11-16T00:00:00Z',
    }),
    null,
  );
  assert.deepEqual(
    resolveFeaturedOfferingViewModel(fallback, {
      status: 'ok',
      product: {
        name: 'Brand New Kit',
        url: 'https://shop.farazkh.dev/l/brand-new-kit',
        imageUrl: 'https://public-files.gumroad.com/abc',
        price: '$4.99',
        summary: 'Freshly published.',
      },
      fetchedAt: '2026-11-16T00:00:00Z',
    }),
    {
      label: 'Featured release · $4.99',
      name: 'Brand New Kit',
      subtitle: 'Freshly published.',
      url: 'https://shop.farazkh.dev/l/brand-new-kit',
      imageUrl: 'https://public-files.gumroad.com/abc',
      imageAlt: 'Brand New Kit cover preview',
      price: '$4.99',
    },
  );
});
