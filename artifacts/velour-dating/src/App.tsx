import { useMemo, useState } from 'react';
import { Bell, Bookmark, Check, ChevronDown, ChevronRight, CircleHelp, Crown, Heart, MapPin, Menu, MessageCircle, RotateCcw, Search, SlidersHorizontal, Sparkles, Star, X, Zap } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { SeoDocument } from '@/components/seo-document';
import { BrandLogo } from '@/components/site-chrome';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { homeSeo, seoPillars } from '@/content/seo-pillars';
import { BRAND, LEGAL_LINE, NETWORK, TAGLINE } from '@/lib/brand';
import { homeJsonLd } from '@/lib/render-seo-html';
import NotFound from '@/pages/not-found';
import { SeoPillarPage } from '@/pages/seo-pillar';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

type Profile = {
  id: number;
  name: string;
  age: number;
  city: string;
  role: string;
  company: string;
  image: string;
  fit: number;
  verified?: boolean;
  tags: string[];
  note: string;
  prompt: string;
  answer: string;
  availability: string;
};

const profiles: Profile[] = [
  { id: 1, name: 'Elena', age: 31, city: 'Notting Hill, London', role: 'Creative Director', company: 'Independent', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200', fit: 94, verified: true, tags: ['Art fairs', 'Long lunches', 'Ceramics'], note: 'You both save Sundays for the city.', prompt: 'An ideal first Sunday together', answer: 'A morning gallery opening, a table in the corner at Bocca di Lupo, then walking until the light turns blue.', availability: 'Open to a drink this week' },
  { id: 2, name: 'Thomas', age: 36, city: 'Tribeca, New York', role: 'Architect', company: 'Northline Studio', image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200', fit: 89, verified: true, tags: ['Modernism', 'Sailing', 'Jazz'], note: 'A shared instinct for considered spaces.', prompt: 'The hill I will die on', answer: 'A restaurant should have one excellent dessert, not a page of indecision.', availability: 'Last active 2h ago' },
  { id: 3, name: 'Noor', age: 29, city: 'Le Marais, Paris', role: 'Venture Partner', company: 'Atelier Capital', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200', fit: 87, tags: ['Start-ups', 'Literature', 'Piano'], note: 'Your curiosity scores are unusually aligned.', prompt: 'Currently reading', answer: 'A battered copy of The Waves. I like books that feel like weather.', availability: 'Open to a drink this week' },
  { id: 4, name: 'Julian', age: 34, city: 'Mayfair, London', role: 'Film Producer', company: 'Grey House', image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1200', fit: 83, tags: ['Cinema', 'Alps', 'Natural wine'], note: 'Both of you believe taste is a form of attention.', prompt: 'A perfect hotel bar', answer: 'Somewhere with low lamps, no playlist, and a bartender who remembers your second order.', availability: 'Last active yesterday' },
  { id: 5, name: 'Amara', age: 32, city: 'Clapham, London', role: 'Legal Counsel', company: 'Arc & Co.', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200', fit: 81, tags: ['Sculpture', 'Tennis', 'Cooks'], note: 'You both prefer directness over small talk.', prompt: 'My underrated pleasure', answer: 'A very early train with a paper bag of still-warm pastries.', availability: 'Last active 4h ago' },
  { id: 6, name: 'Luca', age: 38, city: 'Shoreditch, London', role: 'Restaurateur', company: 'Cinder Group', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200', fit: 78, tags: ['Food', 'Architecture', 'Vinyl'], note: 'A shared appetite for the unexpected.', prompt: 'The table I always return to', answer: 'The one by the kitchen. The room is warmer when you can see it work.', availability: 'Open to a drink this week' },
];

const queryClient = new QueryClient();

function Logo() {
  return <BrandLogo />;
}

function Header({ onMembership, savedCount }: { onMembership: () => void; savedCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="fixed top-0 z-40 w-full border-b hairline bg-[#160f17]/90 backdrop-blur-xl">
    <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 md:px-10">
      <Logo />
      <nav className={`${menuOpen ? 'absolute left-0 right-0 top-[74px] flex flex-col border-b hairline bg-[#160f17] p-5' : 'hidden'} gap-7 text-[11px] uppercase tracking-[.18em] text-[#b6a9af] md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`} aria-label="Primary navigation">
        <a href="#discover" className="transition-colors hover:text-[#f3eee8]" data-testid="link-discover">Discover</a>
        <a href="#how-it-works" className="transition-colors hover:text-[#f3eee8]" data-testid="link-how-it-works">Sådan virker det</a>
        <Link href="/kvalitet-frem-for-kvantitet" className="transition-colors hover:text-[#f3eee8]" data-testid="link-quality">Kvalitet</Link>
        <Link href="/rolig-dating" className="transition-colors hover:text-[#f3eee8]" data-testid="link-calm">Rolig dating</Link>
        <a href="#membership" className="transition-colors hover:text-[#f3eee8]" data-testid="link-membership">Profil</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="relative hidden text-[#b6a9af] transition-colors hover:text-[#f3eee8] md:block" aria-label="Saved profiles" data-testid="button-saved"><Bookmark size={17} strokeWidth={1.5} />{savedCount > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center bg-[#9b2549] px-1 font-mono-custom text-[9px] text-[#f3eee8]">{savedCount}</span>}</button>
        <button className="hidden border border-[#c4a574] px-4 py-2 text-[10px] uppercase tracking-[.16em] text-[#c4a574] transition-colors hover:bg-[#c4a574] hover:text-[#160f17] md:block" onClick={onMembership} data-testid="button-header-membership">{TAGLINE}</button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation menu" data-testid="button-mobile-menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </div>
  </header>;
}

function Hero({ onExplore }: { onExplore: () => void }) {
  return <section id="top" className="relative mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-10 px-5 pb-14 pt-32 md:grid-cols-[1.15fr_.85fr] md:px-10 md:pt-36">
    <div className="relative z-10 veil">
      <div className="mb-7 flex items-center gap-4"><span className="gold-rule"></span><span className="eyebrow">{BRAND} · {NETWORK}</span></div>
      <h1 className="editorial-title hero-title max-w-[920px] text-[#f3eee8]">Færre.<br /><em className="text-[#c4a574]">Bedre.</em></h1>
      <p className="mt-9 max-w-[410px] text-[15px] leading-7 text-[#b6a9af]">Eksklusiv betyder ikke job, indkomst eller status. Det betyder færre og mere relevante introduktioner — Select i Datez Network.</p>
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <button onClick={onExplore} className="group flex items-center gap-5 bg-[#c4a574] px-6 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#160f17] transition-all hover:bg-[#e1c897]" data-testid="button-explore">Se dit udsnit <ArrowUpRightIcon /></button>
        <a href="#how-it-works" className="flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-[#b6a9af] transition-colors hover:text-[#c4a574]" data-testid="link-learn-more">Sådan virker det <ChevronRight size={15} /></a>
      </div>
      <div className="mt-16 flex items-center gap-8 border-t hairline pt-5">
        <div><div className="font-display text-2xl text-[#f3eee8]">Select</div><div className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#82777e]">Kvalitet, ikke formue</div></div>
        <div className="h-8 w-px bg-[#5e4650]"></div>
        <div><div className="font-display text-2xl text-[#f3eee8]">Gratis</div><div className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#82777e]">Profil. Synlighed er dit valg.</div></div>
      </div>
    </div>
    <div className="relative mx-auto h-[500px] w-full max-w-[530px] veil delay-2 md:h-[580px]">
      <div className="absolute right-0 top-0 h-[76%] w-[70%] overflow-hidden border border-[#c4a574]/30">
        <img src="https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1200" className="h-full w-full object-cover object-center opacity-85" alt="A warmly lit intimate restaurant" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160f17]/70 via-transparent to-[#160f17]/10"></div>
      </div>
      <div className="absolute bottom-0 left-0 h-[62%] w-[62%] overflow-hidden border-[6px] border-[#160f17] border-r-0">
        <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900" className="h-full w-full object-cover object-center grayscale-[15%]" alt="Portræt i SofiaDating-udsnittet" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#160f17] p-5 pt-16"><div className="eyebrow">{BRAND} · Select</div><div className="mt-1 font-display text-2xl">Kvalitet. Ikke formue.</div></div>
      </div>
      <div className="absolute left-[56%] top-[47%] grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center border border-[#c4a574] bg-[#160f17] text-[#c4a574]"><Sparkles size={21} strokeWidth={1} /></div>
      <div className="absolute right-0 bottom-1 text-right font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#82777e]">London · Paris · New York<br />Curated daily</div>
    </div>
  </section>;
}

function ArrowUpRightIcon() {
  return <span className="grid h-5 w-5 place-items-center rounded-full border border-[#160f17]/35 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><ChevronRight size={14} /></span>;
}

function ProfileCard({ profile, saved, liked, onSelect, onSave, onLike }: { profile: Profile; saved: boolean; liked: boolean; onSelect: () => void; onSave: () => void; onLike: () => void }) {
  return <article className="profile-card border border-[#5e4650] bg-[#21151e]" data-testid={`card-profile-${profile.id}`}>
    <div className="image-sheen relative aspect-[.82] cursor-pointer" onClick={onSelect}>
      <img src={profile.image} alt={`${profile.name}, ${profile.role}`} className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <span className="bg-[#160f17]/75 px-2 py-1 font-mono-custom text-[9px] uppercase tracking-[.15em] text-[#c4a574]">{profile.fit}% fit</span>
        <div className="flex gap-2">
          <button className={`grid h-8 w-8 place-items-center border border-[#f3eee8]/30 bg-[#160f17]/65 transition-colors hover:border-[#c4a574] ${saved ? 'text-[#c4a574]' : 'text-[#f3eee8]'}`} onClick={(event) => { event.stopPropagation(); onSave(); }} aria-label={`Save ${profile.name}`} data-testid={`button-save-profile-${profile.id}`}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.5} /></button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#160f17] to-transparent p-4 pt-14">
        <div><h3 className="font-display text-[29px] leading-none text-[#f3eee8]">{profile.name}, {profile.age}</h3><div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#cfc1c4]"><MapPin size={11} />{profile.city}</div></div>
        {profile.verified && <span className="mb-1 flex items-center gap-1 text-[9px] uppercase tracking-[.12em] text-[#c4a574]"><Check size={12} /> Verified</span>}
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between text-xs"><span className="text-[#b6a9af]">{profile.role}</span><span className="font-mono-custom text-[9px] text-[#82777e]">{profile.availability}</span></div>
      <div className="mt-4 flex items-center gap-2 border-t border-[#5e4650]/70 pt-3"><span className="text-[11px] italic text-[#cfc1c4]">{profile.note}</span><button className={`ml-auto grid h-8 w-8 shrink-0 place-items-center border transition-all ${liked ? 'border-[#9b2549] bg-[#9b2549] text-[#f3eee8]' : 'border-[#5e4650] text-[#b6a9af] hover:border-[#c4a574] hover:text-[#c4a574]'}`} onClick={onLike} aria-label={`Like ${profile.name}`} data-testid={`button-like-profile-${profile.id}`}><Heart size={15} fill={liked ? 'currentColor' : 'none'} strokeWidth={1.5} /></button></div>
    </div>
  </article>;
}

function FilterBar({ city, setCity, selectedTag, setSelectedTag, onReset }: { city: string; setCity: (value: string) => void; selectedTag: string; setSelectedTag: (value: string) => void; onReset: () => void }) {
  const tags = ['All instincts', 'Creative', 'Founder', 'Culture'];
  return <div className="border border-[#5e4650] bg-[#21151e] p-4 md:p-5">
    <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
      <div className="flex items-center gap-3"><SlidersHorizontal size={16} className="text-[#c4a574]" /><span className="eyebrow text-[#f3eee8]">Refine your edit</span></div>
      <div className="hidden h-5 w-px bg-[#5e4650] xl:block"></div>
      <div className="flex flex-wrap gap-2">{tags.map((tag) => <button key={tag} onClick={() => setSelectedTag(tag)} className={`border px-3 py-2 text-[10px] uppercase tracking-[.12em] transition-colors ${selectedTag === tag ? 'border-[#c4a574] bg-[#c4a574] text-[#160f17]' : 'border-[#5e4650] text-[#b6a9af] hover:border-[#c4a574] hover:text-[#c4a574]'}`} data-testid={`button-filter-${tag.toLowerCase().replaceAll(' ', '-')}`}>{tag}</button>)}</div>
      <label className="flex items-center gap-3 border-b border-[#5e4650] py-2 text-xs text-[#b6a9af] xl:ml-auto xl:border-b-0 xl:py-0"><MapPin size={14} className="text-[#c4a574]" /><select value={city} onChange={(event) => setCity(event.target.value)} className="bg-transparent text-[#f3eee8] outline-none" aria-label="Filter by city" data-testid="select-city"><option className="bg-[#21151e]" value="All cities">All cities</option><option className="bg-[#21151e]" value="London">London</option><option className="bg-[#21151e]" value="New York">New York</option><option className="bg-[#21151e]" value="Paris">Paris</option></select><ChevronDown size={13} /></label>
      <button onClick={onReset} className="flex items-center gap-2 text-[10px] uppercase tracking-[.12em] text-[#82777e] transition-colors hover:text-[#c4a574]" data-testid="button-reset-filters"><RotateCcw size={13} /> Reset</button>
    </div>
  </div>;
}

function ProfileModal({ profile, liked, onClose, onLike, onMessage }: { profile: Profile; liked: boolean; onClose: () => void; onLike: () => void; onMessage: () => void }) {
  return <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[#080509]/80 p-0 backdrop-blur-sm md:items-center md:p-8" role="dialog" aria-modal="true" aria-label={`${profile.name}'s profile`}><div className="modal-panel relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto border border-[#c4a574]/40 bg-[#21151e] md:grid md:grid-cols-[.85fr_1.15fr]">
    <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center border border-[#f3eee8]/30 bg-[#160f17]/70 text-[#f3eee8] transition-colors hover:border-[#c4a574] hover:text-[#c4a574]" aria-label="Close profile" data-testid="button-close-profile"><X size={17} /></button>
    <div className="relative min-h-[380px] md:min-h-[600px]"><img src={profile.image} alt={`${profile.name} portrait`} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#160f17] via-transparent to-transparent"></div><div className="absolute bottom-6 left-6"><div className="eyebrow">{profile.fit}% considered fit</div><h2 className="mt-2 font-display text-5xl text-[#f3eee8]">{profile.name}, {profile.age}</h2><div className="mt-2 flex items-center gap-2 text-xs text-[#cfc1c4]"><MapPin size={13} />{profile.city}</div></div></div>
    <div className="p-6 md:p-10"><div className="eyebrow">A closer look</div><div className="mt-5 flex items-start justify-between gap-4"><div><h3 className="font-display text-3xl text-[#f3eee8]">{profile.role}</h3><p className="mt-1 text-sm text-[#b6a9af]">{profile.company}</p></div>{profile.verified && <span className="mt-2 flex items-center gap-1 text-[9px] uppercase tracking-[.13em] text-[#c4a574]"><Check size={13} /> Member verified</span>}</div><p className="mt-8 border-l border-[#c4a574] pl-4 text-[15px] leading-7 text-[#cfc1c4]">{profile.note}</p><div className="mt-10 border-t hairline pt-6"><div className="eyebrow text-[#82777e]">{profile.prompt}</div><p className="mt-3 font-display text-2xl leading-snug text-[#f3eee8]">{profile.answer}</p></div><div className="mt-8 flex flex-wrap gap-2">{profile.tags.map((tag) => <span key={tag} className="border border-[#5e4650] px-3 py-2 text-[10px] uppercase tracking-[.12em] text-[#b6a9af]">{tag}</span>)}</div><div className="mt-10 flex gap-3"><button onClick={onLike} className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[.15em] transition-colors ${liked ? 'bg-[#9b2549] text-[#f3eee8]' : 'bg-[#c4a574] text-[#160f17] hover:bg-[#e1c897]'}`} data-testid="button-modal-like">{liked ? <Check size={15} /> : <Heart size={15} />} {liked ? 'Interest sent' : 'Send interest'}</button><button onClick={onMessage} className="grid h-11 w-12 place-items-center border border-[#5e4650] text-[#c4a574] transition-colors hover:border-[#c4a574]" aria-label="Message profile" data-testid="button-modal-message"><MessageCircle size={17} /></button></div></div>
  </div></div>;
}

function MembershipModal({ onClose }: { onClose: () => void }) {
  const [plan, setPlan] = useState('private');
  return <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#080509]/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="SofiaDating profil"><div className="modal-panel relative w-full max-w-2xl border border-[#c4a574]/45 bg-[#21151e] p-6 md:p-10"><button onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-[#f3eee8]/20 text-[#b6a9af] hover:text-[#f3eee8]" aria-label="Luk" data-testid="button-close-membership"><X size={17} /></button><div className="eyebrow">{TAGLINE}</div><h2 className="editorial-title mt-4 max-w-lg text-5xl leading-[.95] text-[#f3eee8]">Vælg, hvor synligt dit signal skal være.</h2><p className="mt-5 max-w-md text-sm leading-6 text-[#b6a9af]">Gratis profil. Synlighed er dit valg. Eksklusiv betyder færre, bedre introduktioner — ikke formue.</p><div className="mt-8 grid gap-3 md:grid-cols-2">{[{ id: 'open', label: 'Profil', price: 'Gratis', copy: 'Et stille første skridt', features: ['Opret profil', 'Grundlæggende præferencer', 'Færre, relevante introduktioner'] }, { id: 'private', label: 'PLUS', price: '29 kr. / md.', copy: 'Tydeligere signal i Datez Network', features: ['Øget synlighed', 'DATEZ+ 49 kr. som næste trin', 'Stadig kvalitet frem for mængde'] }].map((item) => <button key={item.id} onClick={() => setPlan(item.id)} className={`text-left border p-5 transition-colors ${plan === item.id ? 'border-[#c4a574] bg-[#321c2a]' : 'border-[#5e4650] hover:border-[#c4a574]/60'}`} data-testid={`button-plan-${item.id}`}><div className="flex items-start justify-between"><div><div className="eyebrow text-[#c4a574]">{item.label}</div><div className="mt-2 font-display text-2xl text-[#f3eee8]">{item.price}</div></div>{plan === item.id && <span className="grid h-6 w-6 place-items-center bg-[#c4a574] text-[#160f17]"><Check size={14} /></span>}</div><p className="mt-2 text-xs text-[#b6a9af]">{item.copy}</p><ul className="mt-5 space-y-2 text-xs text-[#cfc1c4]">{item.features.map((feature) => <li className="flex items-center gap-2" key={feature}><span className="h-1 w-1 bg-[#c4a574]"></span>{feature}</li>)}</ul></button>)}</div><button onClick={onClose} className="mt-7 flex w-full items-center justify-center gap-3 bg-[#c4a574] py-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#160f17] hover:bg-[#e1c897]" data-testid="button-confirm-membership">{plan === 'private' ? 'Fortsæt med PLUS' : 'Opret gratis profil'} <ArrowUpRightIcon /></button><p className="mt-3 text-center font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#82777e]">Ingen opdigtede anmeldelser. Ingen statusport.</p></div></div>;
}

function HowItWorks() {
  const steps = [{ number: '01', title: 'Sig, hvad der betyder noget', copy: 'Et roligt udsnit af det tempo, de værdier og den hverdag, du faktisk vil dele.' }, { number: '02', title: 'Mød de få, der er relevante', copy: 'Vi viser et lille sæt introduktioner — hver med en grund til at begynde.' }, { number: '03', title: 'Lad rummet være stille', copy: 'Ingen evig rulle. Bare nok kontekst til, at den første besked kan være ærlig.' }];
  return <section id="how-it-works" className="mx-auto max-w-[1440px] border-t hairline px-5 py-24 md:px-10 md:py-36"><div className="grid gap-14 md:grid-cols-[.75fr_1.25fr]"><div><div className="eyebrow">Sådan virker det</div><h2 className="editorial-title mt-5 max-w-[380px] text-5xl leading-[.98] text-[#f3eee8] md:text-6xl">Ikke flere valg.<br /><em className="text-[#c4a574]">Bedre</em> valg.</h2><p className="mt-7 max-w-[310px] text-sm leading-6 text-[#b6a9af]">En god introduktion har en grund. Vi bruger din, så rummet bliver mindre og mere relevant — ikke dyrere.</p></div><div className="grid border-t hairline md:grid-cols-3 md:border-t-0">{steps.map((step) => <div key={step.number} className="border-b hairline py-7 md:border-b-0 md:border-l md:px-7 md:py-0"><div className="font-mono-custom text-xs text-[#c4a574]">{step.number}</div><h3 className="mt-12 font-display text-3xl leading-tight text-[#f3eee8]">{step.title}</h3><p className="mt-5 text-sm leading-6 text-[#b6a9af]">{step.copy}</p></div>)}</div></div></section>;
}

function Home() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [city, setCity] = useState('All cities');
  const [selectedTag, setSelectedTag] = useState('All instincts');
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProfiles = useMemo(() => profiles.filter((profile) => {
    const cityMatch = city === 'All cities' || profile.city.includes(city);
    const tagMatch = selectedTag === 'All instincts' || (selectedTag === 'Creative' ? ['Creative Director', 'Film Producer'].includes(profile.role) : selectedTag === 'Founder' ? ['Venture Partner', 'Restaurateur'].includes(profile.role) : profile.tags.some((tag) => ['Art fairs', 'Literature', 'Architecture', 'Sculpture', 'Cinema'].includes(tag)));
    return cityMatch && tagMatch;
  }), [city, selectedTag]);

  const showNotice = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2800); };
  const toggleSaved = (id: number) => { setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]); showNotice(saved.includes(id) ? 'Removed from your private list.' : 'Saved to your private list.'); };
  const toggleLiked = (id: number) => { setLiked((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]); showNotice(liked.includes(id) ? 'Interest withdrawn.' : 'Interest sent quietly.'); };
  const resetFilters = () => { setCity('All cities'); setSelectedTag('All instincts'); };
  const explore = () => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });

  return <div className="velour-app" id="top">
    <SeoDocument title={homeSeo.title} description={homeSeo.description} path="/" jsonLd={homeJsonLd()} />
    <Header onMembership={() => setMembershipOpen(true)} savedCount={saved.length} />
    <main>
      <Hero onExplore={explore} />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10"><div className="flex items-center gap-4 border-y hairline py-4"><span className="eyebrow text-[#82777e]">Kvalitet frem for mængde — aldrig formue</span><span className="h-px flex-1 bg-[#5e4650]/70"></span><span className="font-mono-custom text-[9px] uppercase tracking-[.17em] text-[#82777e]">Datez Network · Select</span></div></div>
      <section id="discover" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-32"><div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="eyebrow">Your first room</div><h2 className="editorial-title mt-4 text-5xl text-[#f3eee8] md:text-7xl">People worth<br /><em className="text-[#c4a574]">leaving the house for.</em></h2></div><div className="max-w-[250px] text-sm leading-6 text-[#b6a9af]">A new edit, made for you. Every profile carries a little more context than a photograph.</div></div><div className="mb-5 flex items-center justify-between md:hidden"><button onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="flex items-center gap-2 border border-[#5e4650] px-3 py-2 text-[10px] uppercase tracking-[.13em] text-[#c4a574]" data-testid="button-mobile-filters"><SlidersHorizontal size={13} /> {mobileFiltersOpen ? 'Hide filters' : 'Show filters'}</button><span className="font-mono-custom text-[10px] text-[#82777e]">{filteredProfiles.length} introductions</span></div><div className={`${mobileFiltersOpen ? 'block' : 'hidden'} mb-6 md:block`}><FilterBar city={city} setCity={setCity} selectedTag={selectedTag} setSelectedTag={setSelectedTag} onReset={resetFilters} /></div><div className="mb-6 hidden items-center justify-between md:flex"><span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#82777e]">Et redigeret udsnit — {filteredProfiles.length} introduktioner</span><button className="flex items-center gap-2 text-[10px] uppercase tracking-[.15em] text-[#b6a9af] hover:text-[#c4a574]" onClick={() => showNotice('Dine præferencer er allerede opdateret.')} data-testid="button-preferences"><Search size={14} /> Rediger præferencer</button></div>{filteredProfiles.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredProfiles.map((profile, index) => <div className={`veil delay-${Math.min(index + 1, 4)}`} key={profile.id}><ProfileCard profile={profile} saved={saved.includes(profile.id)} liked={liked.includes(profile.id)} onSelect={() => setSelectedProfile(profile)} onSave={() => toggleSaved(profile.id)} onLike={() => toggleLiked(profile.id)} /></div>)}</div> : <div className="border border-dashed border-[#c4a574]/50 py-20 text-center"><CircleHelp className="mx-auto text-[#c4a574]" size={28} strokeWidth={1} /><h3 className="mt-5 font-display text-3xl text-[#f3eee8]">The room is quiet.</h3><p className="mx-auto mt-3 max-w-sm text-sm text-[#b6a9af]">Try widening your edit. The right introduction may be just outside this particular frame.</p><button onClick={resetFilters} className="mt-6 border border-[#c4a574] px-5 py-3 text-[10px] uppercase tracking-[.15em] text-[#c4a574] hover:bg-[#c4a574] hover:text-[#160f17]" data-testid="button-empty-reset">Reset edit</button></div>}</section>
      <section className="relative border-y border-[#c4a574]/25 bg-[#2a1723]"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[.8fr_1.2fr] md:px-10 md:py-24"><div><div className="eyebrow">En note fra huset</div><h2 className="editorial-title mt-5 max-w-[480px] text-5xl leading-[.95] text-[#f3eee8]">Ikke flere profiler. Et skarpere ja.</h2><div className="mt-6 flex items-center gap-3 text-xs text-[#b6a9af]"><span className="grid h-8 w-8 place-items-center rounded-full border border-[#c4a574] font-display text-lg text-[#c4a574]">S</span> {BRAND} · {TAGLINE}</div></div><div className="flex items-end md:justify-end"><div className="max-w-md border-l border-[#c4a574] pl-6 text-sm leading-7 text-[#cfc1c4]">SofiaDating er bygget til pausen før et ærligt ja. Eksklusiv er kvaliteten af introduktionen — ikke et visitkort. Ingen opdigtede anmeldelser. Ingen stjerner, der skal spille bevis.</div></div></div></section>
      <HowItWorks />
      <section id="membership" className="mx-auto max-w-[1440px] scroll-mt-20 border-t hairline px-5 py-24 md:px-10 md:py-32"><div className="grid items-end gap-12 md:grid-cols-[1.2fr_.8fr]"><div><div className="eyebrow">{TAGLINE}</div><h2 className="editorial-title mt-5 max-w-3xl text-6xl leading-[.9] text-[#f3eee8] md:text-8xl">Et mindre rum.<br /><em className="text-[#c4a574]">Et bedre ja.</em></h2></div><div><p className="text-sm leading-6 text-[#b6a9af]">Begynd med en gratis profil. PLUS 29 kr. eller DATEZ+ 49 kr., hvis du vil stå tydeligere. Synlighed er dit valg — ikke en statusport.</p><button onClick={() => setMembershipOpen(true)} className="mt-7 flex items-center gap-4 border border-[#c4a574] px-5 py-4 text-[10px] font-bold uppercase tracking-[.17em] text-[#c4a574] transition-colors hover:bg-[#c4a574] hover:text-[#160f17]" data-testid="button-membership-cta"><Crown size={15} strokeWidth={1.5} /> Opret profil <ChevronRight size={14} /></button></div></div><div className="mt-20 grid gap-0 border-y hairline md:grid-cols-3"><div className="border-b hairline p-7 md:border-b-0 md:border-r"><Zap size={18} className="text-[#c4a574]" strokeWidth={1.5} /><h3 className="mt-10 font-display text-3xl">Et skarpere signal</h3><p className="mt-3 text-sm leading-6 text-[#b6a9af]">Se hvorfor introduktionen er der — ikke kun hvem.</p></div><div className="border-b hairline p-7 md:border-b-0 md:border-r"><Star size={18} className="text-[#c4a574]" strokeWidth={1.5} /><h3 className="mt-10 font-display text-3xl">Et roligere tempo</h3><p className="mt-3 text-sm leading-6 text-[#b6a9af]">Intet feed, der belønner dig for at blive oppe og swipe.</p></div><div className="p-7"><Bell size={18} className="text-[#c4a574]" strokeWidth={1.5} /><h3 className="mt-10 font-display text-3xl">Et ærligt rum</h3><p className="mt-3 text-sm leading-6 text-[#b6a9af]">Færre møder. Tydelig intention. Kvalitet, ikke formue.</p></div></div></section>
    </main>
    <footer className="border-t hairline"><div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 md:px-10"><div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"><Logo /><div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[.14em] text-[#82777e]">{seoPillars.map((pillar) => <Link key={pillar.slug} href={pillar.path} data-testid={`link-footer-${pillar.slug}`}>{pillar.eyebrow}</Link>)}<a href="#membership" data-testid="link-footer-membership">Profil</a></div></div><div className="flex flex-col gap-2 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#5e4650] md:flex-row md:justify-between"><span>© {new Date().getFullYear()} {BRAND} · {NETWORK}</span><span data-testid="legal-cvr">{LEGAL_LINE}</span></div></div></footer>
    {notice && <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 border border-[#c4a574]/60 bg-[#2a1723] px-5 py-3 text-xs text-[#f3eee8] shadow-2xl" role="status" data-testid="status-notice"><span className="grid h-5 w-5 place-items-center bg-[#c4a574] text-[#160f17]"><Check size={13} /></span>{notice}</div>}
    {selectedProfile && <ProfileModal profile={selectedProfile} liked={liked.includes(selectedProfile.id)} onClose={() => setSelectedProfile(null)} onLike={() => toggleLiked(selectedProfile.id)} onMessage={() => { setSelectedProfile(null); setMembershipOpen(true); }} />}
    {membershipOpen && <MembershipModal onClose={() => setMembershipOpen(false)} />}
  </div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} />
    {seoPillars.map((pillar) => (
      <Route key={pillar.slug} path={pillar.path}>
        <SeoPillarPage slug={pillar.slug} />
      </Route>
    ))}
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;