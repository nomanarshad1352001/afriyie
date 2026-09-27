import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Eye, MapPin, Star, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Reveal from '@/components/shared/Reveal';
import { listings as allListings } from '@/lib/data/listings';
import { getStatusColor } from '@/lib/utils/formatters';
import { LISTING_CATEGORIES, Listing } from '@/lib/types';

export default function AdminListings() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [items, setItems] = useState<Listing[]>(allListings);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = items.filter((l) => {
    const s = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.city.toLowerCase().includes(search.toLowerCase());
    const c = !category || l.category === category;
    const st = !status || l.status === status;
    return s && c && st;
  });

  const decide = (id: string, ok: boolean) => {
    setItems((p) => p.map((x) => x.id === id ? { ...x, status: ok ? 'active' : 'rejected' } : x));
    toast.success(ok ? 'Collection made live' : 'Collection returned');
  };

  const remove = (id: string) => {
    setItems((p) => p.filter((x) => x.id !== id));
    setConfirmId(null);
    toast.success('Collection removed from the gallery');
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Moderation</span>
        <h1 className="font-display text-4xl font-black mt-1">The <em className="gold-text not-italic font-display italic">Gallery</em></h1>
        <p className="text-muted-foreground mt-2">{items.length} pieces on record</p>
      </Reveal>

      <Reveal delay={70}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search the gallery..." className="w-full pl-11 pr-4 py-3.5 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-5 py-3.5 rounded-full border border-border bg-card font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40">
            <option value="">All categories</option>
            {LISTING_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-5 py-3.5 rounded-full border border-border bg-card font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40">
            <option value="">All states</option>
            <option value="active">Live</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Reveal>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((l, i) => (
            <Reveal key={l.id} delay={i * 50}>
              <div className="rounded-3xl border border-border/60 bg-card p-4 card-luxe flex flex-col md:flex-row gap-5">
                <div className="md:w-48 h-36 rounded-2xl overflow-hidden bg-muted shrink-0">
                  <img src={l.images[0]} alt={l.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-xl font-bold">{l.title}</h3>
                    <span className="px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wide">{l.category}</span>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${getStatusColor(l.status)}`}>{l.status}</span>
                    {l.featured && <span className="px-3 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-black uppercase">✦</span>}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" />{l.city}, {l.region}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-gold text-gold" />{l.rating} ({l.reviewCount})</span>
                    <span className="font-bold text-primary">{l.priceRange}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 mt-4">
                    <Link to={`/listings/${l.id}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-bold hover:border-primary/50 hover:text-primary transition-colors"><Eye className="w-3.5 h-3.5" /> View</Link>
                    {l.status === 'pending' && (
                      <>
                        <button onClick={() => decide(l.id, true)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"><CheckCircle2 className="w-3.5 h-3.5" /> Go Live</button>
                        <button onClick={() => decide(l.id, false)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-rose-500/40 text-rose-500 text-xs font-bold hover:bg-rose-500/10 transition-colors"><XCircle className="w-3.5 h-3.5" /> Return</button>
                      </>
                    )}
                    {l.status !== 'pending' && (
                      <div className="relative">
                        <button onClick={() => setConfirmId(confirmId === l.id ? null : l.id)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors"><XCircle className="w-3.5 h-3.5" /> Remove</button>
                        {confirmId === l.id && (
                          <div className="absolute left-0 top-full mt-2 w-52 p-3.5 rounded-2xl border border-border bg-card shadow-2xl z-10 animate-scale-in">
                            <p className="text-xs font-semibold mb-2.5">Withdraw this piece from the gallery?</p>
                            <div className="flex gap-2">
                              <button onClick={() => remove(l.id)} className="flex-1 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-bold">Withdraw</button>
                              <button onClick={() => setConfirmId(null)} className="flex-1 py-1.5 rounded-lg border border-border text-xs font-bold">Keep</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-3xl border border-dashed border-border">
          <List className="w-12 h-12 text-primary mx-auto animate-float" />
          <p className="font-display text-2xl font-black mt-4">The gallery is quiet here</p>
          <p className="text-muted-foreground mt-2 text-sm">Loosen the filters.</p>
        </div>
      )}
    </div>
  );
}
