import { useState } from 'react';
import { Plus, Calendar, Users, Trash2, Map } from 'lucide-react';
import toast from 'react-hot-toast';
import Reveal from '@/components/shared/Reveal';
import { useAuthStore } from '@/lib/stores/authStore';
import { savedTrips } from '@/lib/data/trips';
import { formatDate, formatCurrency } from '@/lib/utils/formatters';
import { GHANA_REGIONS, GhanaRegion, SavedTrip } from '@/lib/types';

export default function TravelerTrips() {
  const { user } = useAuthStore();
  const [trips, setTrips] = useState<SavedTrip[]>(savedTrips.filter((t) => t.userId === user?.id));
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [budget, setBudget] = useState('');
  const [guests, setGuests] = useState('2');
  const [regions, setRegions] = useState<GhanaRegion[]>([]);

  if (!user) return null;

  const toggleRegion = (r: GhanaRegion) => setRegions((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]);

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !start || !end) { toast.error('Name and dates are required'); return; }
    setTrips((prev) => [{
      id: `trp_${Date.now()}`, userId: user.id, name, startDate: start, endDate: end,
      regions, budget: Number(budget) || 0, travelers: Number(guests) || 1,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }, ...prev]);
    toast.success('Journey added to your suite');
    setShowForm(false); setName(''); setStart(''); setEnd(''); setBudget(''); setGuests('2'); setRegions([]);
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Where the road leads</span>
            <h1 className="font-display text-4xl font-black mt-1">My <em className="gold-text not-italic font-display italic">Journeys</em></h1>
            <p className="text-muted-foreground mt-2">{trips.length} planned</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wide-luxe hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95">
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New Journey</span>
          </button>
        </div>
      </Reveal>

      {showForm && (
        <form onSubmit={create} className="rounded-3xl border border-border/60 bg-card p-7 animate-scale-in">
          <h3 className="font-display text-xl font-bold mb-5">Design a Journey</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Title *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="The Golden Coast, revisited" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">From *</label><input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" /></div>
            <div><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Until *</label><input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" /></div>
            <div><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Budget (USD)</label><input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="3500" className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" /></div>
            <div><label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2">Party</label><input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" /></div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-3">Regions</label>
              <div className="flex flex-wrap gap-2">
                {GHANA_REGIONS.slice(0, 8).map((r) => (
                  <button key={r} type="button" onClick={() => toggleRegion(r)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${regions.includes(r) ? 'bg-primary text-primary-foreground' : 'border border-border hover:border-primary/50'}`}>◆ {r}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="submit" className="btn-shine px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:shadow-lg hover:shadow-primary/25 transition-all">Create</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-7 py-3 rounded-full border border-border text-sm font-bold hover:bg-secondary transition-colors">Cancel</button>
          </div>
        </form>
      )}

      {trips.length > 0 ? (
        <div className="space-y-4">
          {trips.map((trip, i) => (
            <Reveal key={trip.id} delay={i * 80}>
              <div className="p-6 rounded-3xl border border-border/60 bg-card card-luxe flex flex-col md:flex-row md:items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-obsidian dark:bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0">
                  <span className="font-display text-2xl font-black text-primary">{trip.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold">{trip.name}</h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" />{formatDate(trip.startDate)} — {formatDate(trip.endDate)}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" />{trip.travelers} guests</span>
                    {trip.budget > 0 && <span className="font-bold text-primary">{formatCurrency(trip.budget)}</span>}
                  </div>
                  {trip.regions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">{trip.regions.map((r) => <span key={r} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold">◆ {r}</span>)}</div>
                  )}
                </div>
                <div className="relative shrink-0">
                  <button onClick={() => setConfirmId(confirmId === trip.id ? null : trip.id)} className="p-3 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {confirmId === trip.id && (
                    <div className="absolute right-0 top-full mt-2 w-48 p-3 rounded-2xl border border-border bg-card shadow-2xl z-10 animate-scale-in">
                      <p className="text-sm font-semibold mb-2.5">Forever gone?</p>
                      <div className="flex gap-2">
                        <button onClick={() => { setTrips((p) => p.filter((t) => t.id !== trip.id)); setConfirmId(null); toast.success('Journey removed'); }} className="flex-1 py-2 rounded-lg bg-destructive text-destructive-foreground text-xs font-bold">Remove</button>
                        <button onClick={() => setConfirmId(null)} className="flex-1 py-2 rounded-lg border border-border text-xs font-bold">Keep</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal><div className="text-center py-24 rounded-3xl border border-dashed border-border">
          <Map className="w-12 h-12 text-primary mx-auto animate-float" />
          <h3 className="font-display text-2xl font-black mt-4">No journeys yet</h3>
          <p className="text-muted-foreground mt-2 text-sm">Your odyssey begins with one click above.</p>
        </div></Reveal>
      )}
    </div>
  );
}
