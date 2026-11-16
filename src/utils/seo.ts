/**
 * Lightweight, zero-dependency client-side SEO and document head synchronizer.
 * Updates title, meta descriptions, canonical URLs, and Open Graph tags across route transitions.
 */

export interface RouteSeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: string;
  ogImage?: string;
  breadcrumbs?: Array<{ name: string; item: string }>;
}

export const SEO_CONFIGS: Record<'home' | 'projects' | 'photography', RouteSeoConfig> = {
  home: {
    title: 'Faraz Kayan Haque | Student & Builder in Dhaka',
    description:
      'Faraz Kayan Haque is a student and builder in Dhaka, Bangladesh. Explore his software projects, technical experiments, and independent ventures.',
    canonicalUrl: 'https://farazkh.dev/',
    ogType: 'website',
    ogImage: 'https://farazkh.dev/og-image.png',
  },
  projects: {
    title: 'Projects & Software Archive | Faraz Kayan Haque',
    description:
      'Explore personal software projects, mobile apps, and technical experiments built by Faraz Kayan Haque in Dhaka, Bangladesh.',
    canonicalUrl: 'https://farazkh.dev/projects',
    ogType: 'website',
    ogImage: 'https://farazkh.dev/og-image.png',
    breadcrumbs: [
      { name: 'Home', item: 'https://farazkh.dev/' },
      { name: 'Projects', item: 'https://farazkh.dev/projects' },
    ],
  },
  photography: {
    title: 'Photography & Visual Observations | Faraz Kayan Haque',
    description:
      'Observational photography and moments captured through the lens of Faraz Kayan Haque in Dhaka, Bangladesh.',
    canonicalUrl: 'https://farazkh.dev/photography',
    ogType: 'website',
    ogImage: 'https://farazkh.dev/og-image.png',
    breadcrumbs: [
      { name: 'Home', item: 'https://farazkh.dev/' },
      { name: 'Photography', item: 'https://farazkh.dev/photography' },
    ],
  },
};

/**
 * Updates head meta tags and canonical link element for the current view.
 */
export function updateDocumentSeo(view: 'home' | 'projects' | 'photography'): void {
  if (typeof document === 'undefined') return;

  const config = SEO_CONFIGS[view] || SEO_CONFIGS.home;

  // 1. Update Title
  document.title = config.title;

  // Helper to upsert a meta tag
  const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Standard Search Meta
  setMeta('name', 'description', config.description);

  // 3. Canonical URL Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', config.canonicalUrl);

  // 4. Open Graph Meta
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:url', config.canonicalUrl);
  if (config.ogType) {
    setMeta('property', 'og:type', config.ogType);
  }
  if (config.ogImage) {
    setMeta('property', 'og:image', config.ogImage);
    setMeta('property', 'og:image:secure_url', config.ogImage);
  }

  // 5. Twitter Meta
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);
  if (config.ogImage) {
    setMeta('name', 'twitter:image', config.ogImage);
  }

  // 6. Dynamic BreadcrumbList JSON-LD for sub-pages
  const breadcrumbScriptId = 'schema-breadcrumbs-jsonld';
  let breadcrumbScript = document.getElementById(breadcrumbScriptId);

  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    const breadcrumbJson = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumbs.map((b, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: b.name,
        item: b.item,
      })),
    };

    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.setAttribute('type', 'application/ld+json');
      breadcrumbScript.id = breadcrumbScriptId;
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbJson);
  } else if (breadcrumbScript) {
    breadcrumbScript.remove();
  }
}
