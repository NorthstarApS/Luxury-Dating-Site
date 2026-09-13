import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BRAND, LEGAL_LINE, NETWORK, TAGLINE } from '@/lib/brand';
import { seoPillars } from '@/content/seo-pillars';

export function BrandLogo({
  testId = 'link-logo',
}: {
  testId?: string;
}) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      data-testid={testId}
    >
      <span className="grid h-9 w-9 place-items-center border border-[#c4a574]/50 text-[#c4a574]">
        <span className="font-display text-xl italic">S</span>
      </span>
      <span className="text-sm font-semibold tracking-[.18em] text-[#f3eee8]">
        {BRAND}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="fixed top-0 z-40 w-full border-b hairline bg-[#160f17]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <BrandLogo />
        <nav
          className={`${menuOpen ? 'absolute left-0 right-0 top-[74px] flex flex-col border-b hairline bg-[#160f17] p-5' : 'hidden'} gap-5 text-[11px] uppercase tracking-[.16em] text-[#b6a9af] md:static md:flex md:flex-row md:flex-wrap md:border-0 md:bg-transparent md:p-0 md:gap-6`}
          aria-label="Primær navigation"
        >
          <Link
            href="/"
            className={`transition-colors hover:text-[#f3eee8] ${location === '/' ? 'text-[#f3eee8]' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Forside
          </Link>
          {seoPillars.map((pillar) => (
            <Link
              key={pillar.slug}
              href={pillar.path}
              className={`transition-colors hover:text-[#f3eee8] ${location === pillar.path ? 'text-[#c4a574]' : ''}`}
              onClick={() => setMenuOpen(false)}
              data-testid={`link-nav-${pillar.slug}`}
            >
              {pillar.eyebrow}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/#membership"
            className="hidden border border-[#c4a574] px-4 py-2 text-[10px] uppercase tracking-[.16em] text-[#c4a574] transition-colors hover:bg-[#c4a574] hover:text-[#160f17] md:block"
            data-testid="button-header-join"
          >
            {TAGLINE}
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Luk menu' : 'Åbn menu'}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <BrandLogo testId="link-footer-logo" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#b6a9af]">
              {TAGLINE} Eksklusiv betyder kvalitet i introduktionen — ikke
              formue, job eller titel. Select i {NETWORK}.
            </p>
          </div>
          <nav
            aria-label="SEO-klynge"
            className="grid gap-3 text-[11px] uppercase tracking-[.14em] text-[#82777e] sm:grid-cols-2"
          >
            {seoPillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={pillar.path}
                className="transition-colors hover:text-[#c4a574]"
                data-testid={`link-footer-${pillar.slug}`}
              >
                {pillar.eyebrow}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 border-t hairline pt-6 text-[10px] uppercase tracking-[.12em] text-[#5e4650] md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND} · {NETWORK}
          </span>
          <span data-testid="legal-cvr">{LEGAL_LINE}</span>
        </div>
      </div>
    </footer>
  );
}
