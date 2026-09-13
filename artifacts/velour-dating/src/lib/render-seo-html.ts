import {
  BRAND,
  CVR,
  LEGAL_LINE,
  LEGAL_NAME,
  NETWORK,
  SITE_URL,
  TAGLINE,
} from './brand';
import { homeSeo, seoPillars, type SeoPillar } from '../content/seo-pillars';

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function relatedLinks(pillar: SeoPillar): string {
  const items = pillar.related
    .map((slug) => seoPillars.find((item) => item.slug === slug))
    .filter((item): item is SeoPillar => Boolean(item))
    .map(
      (item) =>
        `<li><a href="${item.path}">${escapeHtml(item.eyebrow)}</a> — ${escapeHtml(item.h1)}</li>`,
    )
    .join('');
  return `<nav aria-label="Flere sider i SofiaDating-klyngen"><h2>Videre i klyngen</h2><ul>${items}</ul></nav>`;
}

function faqList(pillar: SeoPillar): string {
  const items = pillar.faqs
    .map(
      (faq) =>
        `<dt>${escapeHtml(faq.question)}</dt><dd>${escapeHtml(faq.answer)}</dd>`,
    )
    .join('');
  return `<section><h2>Spørgsmål, vi får ofte</h2><dl>${items}</dl></section>`;
}

export function renderPillarArticle(pillar: SeoPillar): string {
  const sections = pillar.sections
    .map((section) => {
      const paragraphs = section.paragraphs
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join('');
      return `<section><h2>${escapeHtml(section.heading)}</h2>${paragraphs}</section>`;
    })
    .join('');

  return `<article class="seo-prerender" lang="da-DK">
  <p>${escapeHtml(BRAND)}</p>
  <p>${escapeHtml(pillar.eyebrow)}</p>
  <h1>${escapeHtml(pillar.h1)}</h1>
  <p>${escapeHtml(pillar.lede)}</p>
  ${sections}
  ${faqList(pillar)}
  ${relatedLinks(pillar)}
  <p><a href="/">Til forsiden</a> · <a href="/#membership">Opret profil</a></p>
  <p>${escapeHtml(NETWORK)} · ${escapeHtml(LEGAL_LINE)}</p>
</article>`;
}

export function renderHomeArticle(): string {
  return `<article class="seo-prerender" lang="da-DK">
  <p>${escapeHtml(BRAND)}</p>
  <h1>${escapeHtml(TAGLINE)}</h1>
  <p>Eksklusiv betyder ikke job, indkomst eller status. Det betyder færre og mere relevante introduktioner — Select i ${escapeHtml(NETWORK)}.</p>
  <p>${escapeHtml(homeSeo.description)}</p>
  <nav aria-label="SofiaDating SEO-klynge">
    <ul>
      ${seoPillars.map((pillar) => `<li><a href="${pillar.path}">${escapeHtml(pillar.eyebrow)}</a></li>`).join('')}
    </ul>
  </nav>
  <p><a href="/#membership">Opret profil</a></p>
  <p>${escapeHtml(NETWORK)} · ${escapeHtml(LEGAL_LINE)}</p>
</article>`;
}

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    url: `${SITE_URL}/`,
    description:
      'SofiaDating is curated dating from Datez Network — fewer, better introductions. Exclusivity means quality of match, not wealth.',
    alternateName: `${BRAND} – ${NETWORK}`,
    legalName: LEGAL_NAME,
    identifier: { '@type': 'PropertyValue', name: 'CVR', value: CVR },
    sameAs: [
      'https://idatez.com',
      'https://partnerhub24.com',
      'https://queerdatez.com',
      'https://matchfetch.com',
      'https://dateznetwork.com',
    ],
  };
}

export function pillarJsonLd(pillar: SeoPillar) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd(),
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${pillar.path}#webpage`,
        url: `${SITE_URL}${pillar.path}`,
        name: pillar.title,
        description: pillar.description,
        inLanguage: 'da-DK',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}${pillar.path}#faq`,
        mainEntity: pillar.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd(),
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: BRAND,
        alternateName: `${BRAND} – ${NETWORK}`,
        description: homeSeo.description,
        inLanguage: 'da-DK',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: homeSeo.title,
        description: homeSeo.description,
        inLanguage: 'da-DK',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  };
}
