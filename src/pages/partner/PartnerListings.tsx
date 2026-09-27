import { useState } from 'react';
import { Plus, Star, MapPin, Trash2, Eye, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Reveal from '@/components/shared/Reveal';
import { useAuthStore } from '@/lib/stores/authStore';
import { partners } from '@/lib/data/partners';
import { listings as allListings } from '@/lib/data/listings';
import { getStatusColor } from '@/lib/utils/formatters';
import { LISTING_CATEGORIES, GHANA_REGIONS, Listing } from '@/lib/types';

export default function PartnerListings() {
  const { user } = useAuthStore();
  const partner = partners.find((p) => p.userId === user?.id);
  const [items, setItems] = useState<Listing[]>(partner ? allListings.filter((l) => l.partnerId === partner.id) : []);
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('accommodation');
  const [region, setRegion] = useState<string>('Greater Accra');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !city || !desc) { toast.error('Title, city and story are required'); return; }
    const fresh: Listing = {
      id: `lst_${Date.now()}`, partnerId: partner?.id || '', title, description: desc,
      category: category as Listing['category'], region: region as Listing['region'], city, address: city,
      images: ['https://images.pexels.com/photos/31817160/pexels-photo-31817160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'],
      priceRange: `From $${price || '100'} / night`, priceValue: Number(price) || 100, currency: 'USD',
      contactEmail: user?.email || '', contactPhone: partner?.phone || '', amenities: ['WiFi'],
      rating: 0, reviewCount: 0, status: 'pending', featured: false,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    setItems((p) => [fresh, ...p]);
    toast.success('Submitted for curation review');
    setShowForm(false); setTitle(''); setCity(''); setPrice(''); setDesc('');
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Your craft</span>
            <h1 className="font-display text-4xl font-black mt-1">My <em className="gold-text not-italic font-display italic">Collection</em></h1>
            <p className="text-muted-foreground mt-2">{items.length} pieces</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wide-luxe hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95">
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New Piece</span>
          </button>
        </div>
      </Reveal>

      {showForm && (
        <form onSubmit={create} className="rounded-3xl border border-border/60 bg-card p-7 animate-scale-in">
          <h3 className="font-display text-xl font-bold mb-5">New Addition</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2"><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The Sundowner Suite" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" /></div>
            <div><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40">
                {LISTING_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select></div>
            <div><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40">
                {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select></div>
            <div><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">City *</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Accra" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" /></div>
            <div><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">From (USD)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="180" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" /></div>
            <div className="sm:col-span-2"><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">The Story *</label>
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Tell it beautifully..." className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" /></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="submit" className="btn-shine px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold">Present for Review</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-7 py-3 rounded-full border border-border text-sm font-bold hover:bg-secondary">Cancel</button>
          </div>
        </form>
      )}

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((l, i) => (
            <Reveal key={l.id} delay={i * 70}>
              <div className="rounded-3xl border border-border/60 bg-card p-4 card-luxe flex flex-col sm:flex-row gap-5">
                <div className="sm:w-44 h-36 rounded-2xl overflow-hidden bg-muted shrink-0">
                  <img src={l.images[0]} alt={l.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-bold">{l.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wide">{l.category}</span>
                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${getStatusColor(l.status)}`}>{l.status}</span>
                        {l.featured && <span className="px-3 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-black uppercase tracking-wide">✦ Signature</span>}
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Link to={`/listings/${l.id}`} className="p-2.5 rounded-full hover:bg-secondary text-muted-foreground transition-colors"><Eye className="w-4 h-4" /></Link>
                      <div className="relative">
                        <button onClick={() => setConfirmId(confirmId === l.id ? null : l.id)} className="p-2.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                        {confirmId === l.id && (
                          <div className="absolute right-0 top-full mt-2 w-44 p-3 rounded-2xl border border-border bg-card shadow-2xl z-10 animate-scale-in">
                            <p className="text-xs font-semibold mb-2">Remove this piece?</p>
                            <div className="flex gap-2">
                              <button onClick={() => { setItems((p) => p.filter((x) => x.id !== l.id)); setConfirmId(null); toast.success('Removed'); }} className="flex-1 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-bold">Yes</button>
                              <button onClick={() => setConfirmId(null)} className="flex-1 py-1.5 rounded-lg border border-border text-xs font-bold">Keep</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" />{l.city}, {l.region}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-gold text-gold" />{l.rating} ({l.reviewCount})</span>
                    <span className="font-bold text-primary">{l.priceRange}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal><div className="text-center py-24 rounded-3xl border border-dashed border-border">
          <List className="w-12 h-12 text-primary mx-auto animate-float" />
          <h3 className="font-display text-2xl font-black mt-4">A bare gallery</h3>
          <p className="text-muted-foreground mt-2 text-sm">Present your first piece above.</p>
        </div></Reveal>
      )}
    </div>
  );
}
