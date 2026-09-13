import { useEffect } from 'react';
import { SITE_URL, THEME_COLOR } from '@/lib/brand';

type SeoDocumentProps = {
  title: string;
  description: string;
  path: string;
  jsonLd?: unknown;
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}

export function SeoDocument({
  title,
  description,
  path,
  jsonLd,
}: SeoDocumentProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path === '/' ? '/' : path}`;
    document.title = title;
    document.documentElement.lang = 'da-DK';

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: 'index, follow',
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: url,
    });
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    });
    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: 'da_DK',
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    upsertMeta('meta[name="theme-color"]', {
      name: 'theme-color',
      content: THEME_COLOR,
    });

    let canonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const existing = document.getElementById('sofia-jsonld');
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'sofia-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, jsonLd ? JSON.stringify(jsonLd) : '']);

  return null;
}
