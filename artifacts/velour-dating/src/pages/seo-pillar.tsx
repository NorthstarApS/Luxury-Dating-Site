import { Link } from 'wouter';
import { SeoDocument } from '@/components/seo-document';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { BRAND, TAGLINE } from '@/lib/brand';
import { pillarJsonLd } from '@/lib/render-seo-html';
import { findPillar, seoPillars, type SeoPillar } from '@/content/seo-pillars';

function RelatedPillars({ pillar }: { pillar: SeoPillar }) {
  const related = pillar.related
    .map((slug) => findPillar(slug))
    .filter((item): item is SeoPillar => Boolean(item));

  return (
    <nav aria-label="Flere sider i SofiaDating-klyngen" className="mt-20 border-t hairline pt-12">
      <div className="eyebrow">Videre i klyngen</div>
      <h2 className="editorial-title mt-4 text-4xl text-[#f3eee8] md:text-5xl">
        Samme hus. <em className="text-[#c4a574]">Andet rum.</em>
      </h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {related.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.path}
              className="block h-full border border-[#5e4650] bg-[#21151e] p-6 transition-colors hover:border-[#c4a574]"
              data-testid={`link-related-${item.slug}`}
            >
              <div className="eyebrow">{item.eyebrow}</div>
              <p className="mt-4 font-display text-2xl leading-snug text-[#f3eee8]">
                {item.h1}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SeoPillarPage({ slug }: { slug: string }) {
  const pillar = findPillar(slug);
  if (!pillar) return null;

  return (
    <div className="velour-app sofia-pillar">
      <SeoDocument
        title={pillar.title}
        description={pillar.description}
        path={pillar.path}
        jsonLd={pillarJsonLd(pillar)}
      />
      <SiteHeader />
      <main className="mx-auto max-w-[920px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
        <p className="eyebrow">{pillar.eyebrow}</p>
        <h1 className="editorial-title mt-5 text-5xl leading-[.95] text-[#f3eee8] md:text-7xl">
          {pillar.h1}
        </h1>
        <p className="mt-8 max-w-[640px] text-[17px] leading-8 text-[#cfc1c4]">
          {pillar.lede}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <span className="gold-rule" />
          <span className="text-[11px] uppercase tracking-[.18em] text-[#82777e]">
            {BRAND} · {TAGLINE}
          </span>
        </div>

        {pillar.sections.map((section) => (
          <section key={section.heading} className="mt-16 border-t hairline pt-10">
            <h2 className="font-display text-3xl leading-tight text-[#f3eee8] md:text-4xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="mt-5 text-[15px] leading-7 text-[#b6a9af]"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-16 border-t hairline pt-10">
          <h2 className="font-display text-3xl text-[#f3eee8] md:text-4xl">
            Spørgsmål, vi får ofte
          </h2>
          <dl className="mt-8 space-y-8">
            {pillar.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-display text-2xl text-[#f3eee8]">
                  {faq.question}
                </dt>
                <dd className="mt-3 text-[15px] leading-7 text-[#b6a9af]">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <RelatedPillars pillar={pillar} />

        <div className="mt-16 flex flex-wrap items-center gap-5 border-t hairline pt-10">
          <Link
            href="/#membership"
            className="bg-[#c4a574] px-6 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#160f17] transition-colors hover:bg-[#e1c897]"
            data-testid="button-pillar-join"
          >
            Opret profil
          </Link>
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[.18em] text-[#b6a9af] transition-colors hover:text-[#c4a574]"
          >
            Tilbage til forsiden
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function pillarRoutes() {
  return seoPillars;
}
