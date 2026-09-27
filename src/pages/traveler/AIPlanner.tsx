import { useState } from 'react';
import { Sparkles, Loader2, DollarSign, Plane, Hotel, Bus, CheckCircle2, ArrowUpRight, Shirt } from 'lucide-react';
import { sampleAIItinerary } from '@/lib/data/trips';
import { GHANA_REGIONS, GhanaRegion } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatters';

const INTERESTS = ['Culture', 'Heritage', 'Wildlife', 'Gastronomy', 'Beach', 'Wellness', 'Festivals', 'Photography', 'Art', 'Adventure'];
const STEPS = ['Reading your preferences', 'Selecting estates & tables', 'Composing daily programmes', 'Pricing the journey', 'Final polish'];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function AIPlanner() {
  const [phase, setPhase] = useState<'form' | 'composing' | 'result'>('form');
  const [doneSteps, setDoneSteps] = useState(0);
  const [country, setCountry] = useState('United States');
  const [start, setStart] = useState('2024-12-15');
  const [end, setEnd] = useState('2024-12-28');
  const [budget, setBudget] = useState('3500');
  const [guests, setGuests] = useState('2');
  const [regions, setRegions] = useState<GhanaRegion[]>(['Greater Accra', 'Central', 'Ashanti']);
  const [interests, setInterests] = useState<string[]>(['Culture', 'Heritage']);

  const toggleList = <T,>(list: T[], item: T, setter: (v: T[]) => void) =>
    setter(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

  const compose = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('composing');
    setDoneSteps(0);
    for (let i = 1; i <= STEPS.length; i++) {
      await sleep(650);
      setDoneSteps(i);
    }
    await sleep(500);
    setPhase('result');
  };

  const it = sampleAIItinerary;

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-obsidian text-white p-8 md:p-10 animate-fade-in-up">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl animate-float" />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border border-primary/50 flex items-center justify-center animate-pulse-ring">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">AfriYie Intelligence</span>
            <h1 className="font-display text-3xl md:text-4xl font-black">The AI <em className="gold-text">Composer</em></h1>
          </div>
        </div>
        <p className="relative text-white/60 mt-4 max-w-xl font-light">State your wishes. Our composer drafts a complete Ghanaian odyssey — timed, priced and polished.</p>
      </div>

      {phase === 'form' && (
        <form onSubmit={compose} className="space-y-6 animate-fade-in-up delay-100">
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <h3 className="font-display text-xl font-bold mb-5">The Brief</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Departing From</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Party</label>
                <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">From</label>
                <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Until</label>
                <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">All-in Budget (USD)</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <h3 className="font-display text-xl font-bold mb-4">Regions of Interest</h3>
            <div className="flex flex-wrap gap-2">
              {GHANA_REGIONS.slice(0, 10).map((r) => (
                <button key={r} type="button" onClick={() => toggleList(regions, r, setRegions)} className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide-luxe transition-all active:scale-95 ${regions.includes(r) ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'border border-border hover:border-primary/50'}`}>
                  ◆ {r}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <h3 className="font-display text-xl font-bold mb-4">Inclinations</h3>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button key={i} type="button" onClick={() => toggleList(interests, i, setInterests)} className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide-luxe transition-all active:scale-95 ${interests.includes(i) ? 'bg-foreground text-background dark:bg-primary dark:text-primary-foreground' : 'border border-border hover:border-primary/50'}`}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-shine w-full sm:w-auto px-12 py-5 rounded-full bg-primary text-primary-foreground font-black text-sm uppercase tracking-luxe hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5" /> Compose My Journey
          </button>
        </form>
      )}

      {phase === 'composing' && (
        <div className="flex flex-col items-center py-24 animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />
          </div>
          <h3 className="font-display text-3xl font-black mt-9">Composing<span className="gold-text">…</span></h3>
          <div className="mt-7 space-y-3.5 w-full max-w-xs">
            {STEPS.map((s, i) => (
              <div key={s} className={`flex items-center gap-3 text-sm transition-all duration-500 ${i < doneSteps ? 'opacity-100' : 'opacity-30'}`}>
                {i < doneSteps ? <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-border shrink-0" />}
                <span className={i < doneSteps ? 'font-semibold' : ''}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-8 animate-fade-in-up">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-display text-3xl font-black">Your Composition <em className="gold-text not-italic font-display italic">✦</em></h2>
            <button onClick={() => setPhase('form')} className="text-xs font-bold uppercase tracking-wide-luxe text-primary hover:opacity-70">Compose anew</button>
          </div>

          {/* Cost */}
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Investment</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger-children">
              {Object.entries(it.costEstimate).map(([k, v]) => (
                <div key={k} className={`p-4 rounded-2xl ${k === 'total' ? 'bg-primary/10 border border-primary/30 sm:col-span-3' : 'bg-secondary/60'}`}>
                  <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{k}</p>
                  <p className={`font-display text-2xl font-black mt-1 ${k === 'total' ? 'gold-text' : ''}`}>{formatCurrency(v)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Days */}
          <div className="space-y-5">
            {it.days.map((day) => (
              <div key={day.day} className="rounded-3xl border border-border/60 bg-card p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-obsidian dark:bg-primary text-primary dark:text-primary-foreground flex items-center justify-center font-display text-xl font-black border border-primary/40">
                    {day.day}
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold">Day {day.day} — {day.region}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide-luxe">{day.date}</p>
                  </div>
                </div>
                <div className="ml-6 border-l-2 border-primary/25 pl-6 space-y-4">
                  {day.activities.map((a, i) => (
                    <div key={i} className="relative group">
                      <span className="absolute -left-[29px] top-1.5 w-3 h-3 rotate-45 border-2 border-primary bg-card group-hover:scale-125 transition-transform" />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] text-primary font-bold uppercase tracking-wide-luxe">{a.time}</p>
                          <p className="font-bold text-sm mt-0.5">{a.activity}</p>
                          <p className="text-xs text-muted-foreground">{a.location}{a.notes ? ` — ${a.notes}` : ''}</p>
                        </div>
                        {a.cost > 0 && <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black shrink-0">{formatCurrency(a.cost)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Counsel */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-3xl border border-border/60 bg-card p-6">
              <h4 className="font-display font-bold flex items-center gap-2 mb-4"><Bus className="w-4 h-4 text-primary" /> In Transit</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">{it.transportRecommendations.map((r, i) => <li key={i} className="flex gap-2"><span className="text-primary">◆</span>{r}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-6">
              <h4 className="font-display font-bold flex items-center gap-2 mb-4"><Hotel className="w-4 h-4 text-primary" /> Houses of Rest</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">{it.accommodationRecommendations.map((r, i) => <li key={i} className="flex gap-2"><span className="text-primary">◆</span>{r}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-6">
              <h4 className="font-display font-bold flex items-center gap-2 mb-4"><Shirt className="w-4 h-4 text-primary" /> The Valise</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">{it.packingSuggestions.slice(0, 6).map((s, i) => <li key={i} className="flex gap-2 items-center"><Plane className="w-3 h-3 text-primary shrink-0" />{s}</li>)}</ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="px-6 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-bold inline-flex items-center gap-2">Saved to your journeys <CheckCircle2 className="w-4 h-4" /></span>
            <span className="px-6 py-3.5 rounded-full border border-border text-sm font-bold inline-flex items-center gap-2">Share itinerary <ArrowUpRight className="w-4 h-4" /></span>
          </div>
        </div>
      )}
    </div>
  );
}
