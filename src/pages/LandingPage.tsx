import { Link } from 'react-router-dom';
import { Search, Star, ArrowRight, ArrowUpRight, Sparkles, Crown, Shield, Compass, Quote } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import ListingCard from '@/components/shared/ListingCard';
import Reveal from '@/components/shared/Reveal';
import { listings } from '@/lib/data/listings';

const MARQUEE_ITEMS = ['Cape Coast Castle', 'Mole Safari', 'Kumasi Kente', 'Labadi Beach', 'Aburi Sanctuary', 'Wli Falls', 'Kakum Canopy', 'Homowo Festival', 'Volta Highlands', 'Elmina Ramparts'];

const DESTINATIONS = [
  { name: 'Greater Accra', line: 'The Gilded Coast', img: 'https://images.pexels.com/photos/723534/pexels-photo-723534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { name: 'Ashanti', line: 'Kingdom of Gold', img: 'https://images.pexels.com/photos/32490286/pexels-photo-32490286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { name: 'Central', line: 'Echoes of Heritage', img: 'https://images.pexels.com/photos/5110556/pexels-photo-5110556.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { name: 'Northern', line: 'Savannah Majesty', img: 'https://images.pexels.com/photos/15212404/pexels-photo-15212404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
];

const PILLARS = [
  { icon: Crown, title: 'Curated Excellence', text: 'Every estate, tour and festival is hand-selected by our Accra atelier and verified in person.' },
  { icon: Sparkles, title: 'AI Bespoke Itineraries', text: 'Our intelligence crafts day-by-day journeys tailored to your tastes, pace and budget.' },
  { icon: Shield, title: 'Discretion & Trust', text: 'Vetted partners, private concierges and white-glove service at every stage of your voyage.' },
  { icon: Compass, title: 'Sixteen Regions', text: 'From golden coastlines to elephant savannahs — one marketplace for the whole of Ghana.' },
];

const TESTIMONIALS = [
  { quote: 'The most refined way to discover one\'s roots. Every detail — down to the champagne at the Castle — was impeccable.', name: 'Sarah Johnson', place: 'New York, USA', avatar: 'https://i.pravatar.cc/100?img=47' },
  { quote: 'AfriYie\'s itinerary planner understood our family better than any agent we\'ve used. Ghana, in breathtaking detail.', name: 'Emma Williams', place: 'London, UK', avatar: 'https://i.pravatar.cc/100?img=32' },
  { quote: 'From the Mole SkyDeck to the royal enclosure at Homowo — pure theatre of the finest kind.', name: 'Marie Dupont', place: 'Paris, France', avatar: 'https://i.pravatar.cc/100?img=44' },
];

/* Animated counter that ticks up when scrolled into view */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const featured = listings.filter((l) => l.featured).slice(0, 3);
  const signature = listings.filter((l) => l.status === 'active').slice(5, 9);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <PublicNavbar />

      {/* ═══════════ CINEMATIC HERO ═══════════ */}
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/723534/pexels-photo-723534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800"
            alt="Ghana's golden coastline at dusk"
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75" />
        </div>

        {/* Ornamental corners */}
        <div className="absolute inset-6 md:inset-10 border border-white/15 pointer-events-none z-10" />
        <div className="absolute top-6 left-6 md:top-10 md:left-10 w-14 h-14 border-t-2 border-l-2 border-primary z-10" />
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 border-b-2 border-r-2 border-primary z-10" />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center">
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center gap-3 text-champagne text-[11px] md:text-xs font-bold tracking-luxe uppercase">
              <span className="w-10 h-px bg-primary" /> The Luxury Ghana Collective <span className="w-10 h-px bg-primary" />
            </span>
          </div>

          <h1 className="font-display text-white mt-6 leading-[1.04]">
            <span className="block text-4xl sm:text-6xl lg:text-8xl font-black animate-fade-in-up delay-100">Experience Ghana.</span>
            <span className="block text-3xl sm:text-5xl lg:text-7xl italic font-medium gold-text mt-2 animate-fade-in-up delay-300">Experience Africa Well.</span>
          </h1>

          <p className="mt-6 max-w-xl text-white/70 text-base md:text-lg font-light leading-relaxed animate-fade-in-up delay-500">
            Bespoke journeys across sixteen regions — golden beaches, royal kingdoms
            and elephant savannahs, tailored by intelligence and delivered with elegance.
          </p>

          {/* Search */}
          <div className="mt-9 w-full max-w-xl animate-fade-in-up delay-700">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (window.location.href = `/listings${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`)}
                placeholder="Search estates, safaris, festivals..."
                className="w-full pl-14 pr-32 py-5 rounded-full bg-white/95 text-foreground placeholder:text-muted-foreground shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
              />
              <Link
                to={`/listings${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
                className="btn-shine absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold transition-all hover:shadow-lg active:scale-95"
              >
                Discover
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 md:gap-14 animate-fade-in-up delay-1000">
            {[{ n: 200, s: '+', l: 'Curated Stays' }, { n: 16, s: '', l: 'Regions' }, { n: 5000, s: '+', l: 'Guests Hosted' }].map((stat) => (
              <div key={stat.l} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-black text-white"><Counter target={stat.n} suffix={stat.s} /></p>
                <p className="text-[10px] md:text-xs text-primary tracking-luxe uppercase mt-1">{stat.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-[9px] tracking-luxe uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <div className="py-7 border-y border-border/60 bg-card overflow-hidden">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="font-display italic text-lg md:text-xl text-muted-foreground px-6">{item}</span>
              <span className="text-primary text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ FEATURED COLLECTIONS ═══════════ */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-primary text-xs font-bold tracking-luxe uppercase">The Edit</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-3 leading-tight">Signature <em className="gold-text not-italic font-display italic">Collections</em></h2>
            <p className="text-muted-foreground mt-3 max-w-md">Our most coveted experiences — reserved for those who accept nothing less.</p>
          </div>
          <Link to="/listings" className="group inline-flex items-center gap-2 text-sm font-bold tracking-wide-luxe uppercase text-foreground hover:text-primary transition-colors">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {featured.map((l, i) => (
            <Reveal key={l.id} delay={i * 150}>
              <ListingCard listing={l} showFavorite />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ EDITORIAL SPLIT — AI ═══════════ */}
      <section className="py-24 md:py-32 bg-obsidian dark:bg-card text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center relative">
          <Reveal variant="left">
            <span className="inline-flex items-center gap-2 text-primary text-xs font-bold tracking-luxe uppercase"><Sparkles className="w-4 h-4" /> AfriYie Intelligence</span>
            <h2 className="font-display text-4xl md:text-6xl font-black mt-4 leading-[1.08]">
              Your Journey, <br /><em className="gold-text">Composed by AI.</em>
            </h2>
            <p className="text-white/60 mt-6 text-lg font-light leading-relaxed max-w-md">
              Share your dates, tastes and budget. Within moments, our composer drafts a
              complete day-by-day odyssey — stays, tables, transport and cost, precisely estimated.
            </p>
            <ul className="mt-8 space-y-4">
              {['Day-by-day itinerary with timings', 'Curated stays & tables per region', 'Precise cost composition', 'Packing and travel counsel'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rotate-45 bg-primary" /> {t}
                </li>
              ))}
            </ul>
            <Link to="/signup" className="btn-shine inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-xl hover:shadow-primary/25 transition-all active:scale-95">
              Compose My Journey <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal variant="right" className="relative">
            <div className="relative rounded-3xl overflow-hidden frame-luxe">
              <img src="https://images.pexels.com/photos/15212404/pexels-photo-15212404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Savannah elephants" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-luxe uppercase text-white/60">Sample Output</p>
                  <p className="font-display text-xl font-bold">Mole Savannah Retreat</p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-bold">3 Days · $1,840</span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary rounded-tr-3xl hidden md:block" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary rounded-bl-3xl hidden md:block" />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ DESTINATIONS ═══════════ */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-14">
          <span className="text-primary text-xs font-bold tracking-luxe uppercase">Destinations</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3">Four Worlds, <em className="gold-text not-italic font-display italic">One Nation</em></h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.name} delay={i * 120}>
              <Link to={`/listings?region=${encodeURIComponent(d.name)}`} className="group relative block rounded-3xl overflow-hidden aspect-[3/4] card-luxe">
                <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1100ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="text-primary text-[10px] font-bold tracking-luxe uppercase">{d.line}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <h3 className="font-display text-2xl font-bold text-white">{d.name}</h3>
                    <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ PILLARS ═══════════ */}
      <section className="py-24 md:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-14">
            <span className="text-primary text-xs font-bold tracking-luxe uppercase">The AfriYie Standard</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-3">Poised. Precise. <em className="gold-text not-italic font-display italic">Personal.</em></h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div className="group p-7 rounded-3xl bg-card border border-border/60 card-luxe h-full">
                  <div className="w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <p.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-bold mt-5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MORE COLLECTIONS ═══════════ */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="flex items-end justify-between mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-black">Now in <em className="gold-text not-italic font-display italic">Season</em></h2>
          <Link to="/listings" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide-luxe hover:text-primary transition-colors">All <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" /></Link>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signature.map((l, i) => (
            <Reveal key={l.id} delay={i * 100} variant="scale">
              <ListingCard listing={l} showFavorite />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-24 md:py-32 bg-obsidian dark:bg-card text-white relative overflow-hidden">
        <Quote className="absolute top-16 left-8 w-40 h-40 text-primary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <Reveal className="text-center mb-14">
            <span className="text-primary text-xs font-bold tracking-luxe uppercase">Voices of Our Guests</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-3">Stories Written in <em className="gold-text">Gold</em></h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 130}>
                <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 h-full card-luxe">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-gold text-gold" />)}
                  </div>
                  <p className="font-display text-lg italic leading-relaxed text-white/85">“{t.quote}”</p>
                  <div className="flex items-center gap-3 mt-7 pt-6 border-t border-white/10">
                    <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border-2 border-primary/50" loading="lazy" />
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-white/50 tracking-wide-luxe uppercase">{t.place}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PARTNER ═══════════ */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal variant="left" className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-5">
              <img src="https://images.pexels.com/photos/31817160/pexels-photo-31817160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Luxury villa" className="rounded-3xl aspect-[3/4] object-cover mt-10 card-luxe" loading="lazy" />
              <img src="https://images.pexels.com/photos/32490286/pexels-photo-32490286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Cultural drummers" className="rounded-3xl aspect-[3/4] object-cover card-luxe" loading="lazy" />
            </div>
          </Reveal>
          <Reveal variant="right" className="order-1 lg:order-2">
            <span className="text-primary text-xs font-bold tracking-luxe uppercase">For Partners</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-3 leading-tight">An Audience Worthy of <em className="gold-text not-italic font-display italic">Your Craft</em></h2>
            <p className="text-muted-foreground mt-5 text-lg font-light leading-relaxed max-w-md">
              Present your estate, cuisine or curation to a global clientele with a taste
              for the exceptional. One elegant dashboard for listings, inquiries and analytics.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              {[{ n: 50, s: '+', l: 'Partner Houses' }, { n: 30, s: '+', l: 'Guest Countries' }].map((s) => (
                <div key={s.l} className="p-5 rounded-2xl border border-border/60 bg-card">
                  <p className="font-display text-3xl font-black text-primary"><Counter target={s.n} suffix={s.s} /></p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide-luxe mt-1">{s.l}</p>
                </div>
              ))}
            </div>
            <Link to="/partner/register" className="btn-shine inline-flex items-center gap-2 mt-9 px-8 py-4 rounded-full bg-foreground text-background dark:bg-primary dark:text-primary-foreground font-bold transition-all hover:shadow-xl active:scale-95">
              Join the Collective <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-obsidian text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center pb-12 border-b border-white/10">
            <div className="w-14 h-14 mx-auto rounded-full border-2 border-primary flex items-center justify-center">
              <span className="font-display text-2xl font-black text-primary">A</span>
            </div>
            <p className="font-display text-3xl font-bold mt-4">AfriYie</p>
            <p className="text-white/50 text-sm mt-1 tracking-luxe uppercase">Experience Ghana · Experience Africa Well</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 text-sm">
            {[
              { h: 'Collections', links: [{ t: 'All Collections', u: '/listings' }, { t: 'Estates & Hotels', u: '/listings?category=accommodation' }, { t: 'Signature Experiences', u: '/listings?category=experience' }, { t: 'Festivals', u: '/listings?category=festival' }] },
              { h: 'House', links: [{ t: 'Our Story', u: '/' }, { t: 'Partner With Us', u: '/partner/register' }, { t: 'Journal', u: '/' }, { t: 'Careers', u: '/' }] },
              { h: 'Concierge', links: [{ t: 'Plan My Journey', u: '/signup' }, { t: 'Contact', u: '/' }, { t: 'Gift Cards', u: '/' }, { t: 'FAQ', u: '/' }] },
              { h: 'Legal', links: [{ t: 'Privacy', u: '/' }, { t: 'Terms', u: '/' }, { t: 'Cookies', u: '/' }, { t: 'Accessibility', u: '/' }] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="text-primary text-[11px] font-bold tracking-luxe uppercase mb-4">{col.h}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => <li key={l.t}><Link to={l.u} className="text-white/60 hover:text-primary transition-colors">{l.t}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} AfriYie — All rights reserved. Crafted in Accra.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">X</a>
              <a href="#" className="hover:text-primary transition-colors">Pinterest</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
