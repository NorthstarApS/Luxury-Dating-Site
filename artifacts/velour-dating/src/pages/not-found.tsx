import { Link } from 'wouter';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { SeoDocument } from '@/components/seo-document';
import { BRAND } from '@/lib/brand';
import { seoPillars } from '@/content/seo-pillars';

export default function NotFound() {
  return (
    <div className="velour-app">
      <SeoDocument
        title={`Siden findes ikke | ${BRAND}`}
        description="Den side findes ikke på SofiaDating. Gå til forsiden eller en af klyngens artikler."
        path="/404"
      />
      <SiteHeader />
      <main className="mx-auto max-w-[720px] px-5 pb-24 pt-36 md:px-10">
        <p className="eyebrow">404</p>
        <h1 className="editorial-title mt-4 text-5xl text-[#f3eee8] md:text-7xl">
          Rummet er tomt.
        </h1>
        <p className="mt-6 text-sm leading-7 text-[#b6a9af]">
          Siden findes ikke. Gå tilbage til forsiden, eller læs videre i
          SofiaDating-klyngen.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="bg-[#c4a574] px-5 py-3 text-[11px] font-bold uppercase tracking-[.16em] text-[#160f17]"
          >
            Forside
          </Link>
          {seoPillars.slice(0, 3).map((pillar) => (
            <Link
              key={pillar.slug}
              href={pillar.path}
              className="border border-[#5e4650] px-5 py-3 text-[11px] uppercase tracking-[.16em] text-[#c4a574]"
            >
              {pillar.eyebrow}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
