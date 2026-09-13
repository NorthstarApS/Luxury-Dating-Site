import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import { SITE_URL } from '../src/lib/brand';
import { homeSeo, seoPillars } from '../src/content/seo-pillars';
import {
  homeJsonLd,
  pillarJsonLd,
  renderHomeArticle,
  renderPillarArticle,
} from '../src/lib/render-seo-html';

type PrerenderPage = {
  path: string;
  file: string;
  url: string;
  title: string;
  description: string;
  jsonLd: unknown;
  articleHtml: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function applyHead(
  html: string,
  page: Pick<
    PrerenderPage,
    'title' | 'description' | 'url' | 'jsonLd' | 'articleHtml'
  >,
): string {
  let next = html;
  next = next.replace(/<html lang="[^"]*"/, '<html lang="da-DK"');
  next = next.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(page.title)}</title>`,
  );
  next = next.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
  );
  next = next.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
  );
  next = next.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
  );
  next = next.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
  );
  next = next.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
  );

  const extraHead = [
    `<link rel="canonical" href="${page.url}" />`,
    `<meta property="og:url" content="${page.url}" />`,
    `<meta property="og:locale" content="da_DK" />`,
    `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`,
  ].join('\n    ');

  next = next.replace('</head>', `    ${extraHead}\n  </head>`);
  next = next.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${page.articleHtml}</div>`,
  );
  return next;
}

function assertUniqueCopy(pages: PrerenderPage[]) {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const openings = new Set<string>();

  for (const page of pages) {
    if (titles.has(page.title)) {
      throw new Error(`Duplicate title: ${page.title}`);
    }
    if (descriptions.has(page.description)) {
      throw new Error(`Duplicate description: ${page.description}`);
    }
    const opening = page.articleHtml
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 180);
    if (openings.has(opening)) {
      throw new Error(`Duplicate opening copy for ${page.path}`);
    }
    titles.add(page.title);
    descriptions.add(page.description);
    openings.add(opening);

    const text = page.articleHtml.replace(/<[^>]+>/g, ' ');
    if (page.path !== '/' && text.length < 1200) {
      throw new Error(`Thin prerender for ${page.path} (${text.length} chars)`);
    }
    if (/Sofia Dating/.test(page.articleHtml + page.title)) {
      throw new Error(`Brand must be one word on ${page.path}`);
    }
    if (
      /\b(4\.[0-9]\s*\/\s*5|★{3,})/.test(page.articleHtml) ||
      /member sentiment/i.test(page.articleHtml)
    ) {
      throw new Error(`Fake rating copy found on ${page.path}`);
    }
  }
}

function writeSitemap(pages: PrerenderPage[], distDir: string) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (page, index) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${index === 0 ? 'weekly' : 'monthly'}</changefreq>
    <priority>${index === 0 ? '1.0' : '0.8'}</priority>
  </url>`,
    )
    .join('\n');

  writeFileSync(
    join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  );
}

function rewritePillarRequest(req: { url?: string }) {
  const raw = req.url ?? '';
  const [pathOnly, query] = raw.split('?');
  const match = seoPillars.find((pillar) => pillar.path === pathOnly);
  if (!match) return;
  req.url = `${match.path}/index.html${query ? `?${query}` : ''}`;
}

export function sofiaPrerender(): Plugin {
  return {
    name: 'sofia-prerender',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewritePillarRequest(req);
        next();
      });
    },
    closeBundle() {
      const distDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist/public');
      const template = readFileSync(join(distDir, 'index.html'), 'utf8');

      const pages: PrerenderPage[] = [
        {
          path: '/',
          file: join(distDir, 'index.html'),
          url: `${SITE_URL}/`,
          title: homeSeo.title,
          description: homeSeo.description,
          jsonLd: homeJsonLd(),
          articleHtml: renderHomeArticle(),
        },
        ...seoPillars.map((pillar) => ({
          path: pillar.path,
          file: join(distDir, pillar.slug, 'index.html'),
          url: `${SITE_URL}${pillar.path}`,
          title: pillar.title,
          description: pillar.description,
          jsonLd: pillarJsonLd(pillar),
          articleHtml: renderPillarArticle(pillar),
        })),
      ];

      assertUniqueCopy(pages);

      for (const page of pages) {
        mkdirSync(dirname(page.file), { recursive: true });
        const html = applyHead(template, page);
        writeFileSync(page.file, html);
        if (page.path !== '/') {
          writeFileSync(join(distDir, `${page.path.slice(1)}.html`), html);
        }
      }

      writeSitemap(pages, distDir);
      writeFileSync(
        join(distDir, 'robots.txt'),
        `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
      );

      console.log(
        `SofiaDating prerender: ${pages.length} HTML routes + sitemap.xml`,
      );
    },
  };
}
