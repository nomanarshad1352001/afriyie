import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Building2, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import Reveal from '@/components/shared/Reveal';
import { partners as allPartners } from '@/lib/data/partners';
import { formatDate, getStatusColor } from '@/lib/utils/formatters';
import { BUSINESS_TYPES, Partner } from '@/lib/types';

export default function AdminPartners() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [items, setItems] = useState<Partner[]>(allPartners);

  const filtered = items.filter((p) => {
    const s = !search || p.businessName.toLowerCase().includes(search.toLowerCase()) || p.contactPerson.toLowerCase().includes(search.toLowerCase());
    const st = !status || p.status === status;
    return s && st;
  });

  const decide = (id: string, approved: boolean) => {
    setItems((p) => p.map((x) => x.id === id ? { ...x, status: approved ? 'approved' : 'rejected' } : x));
    toast.success(approved ? 'House welcomed to the collective' : 'Application declined');
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Curation</span>
        <h1 className="font-display text-4xl font-black mt-1">Partner <em className="gold-text not-italic font-display italic">Houses</em></h1>
        <p className="text-muted-foreground mt-2">{items.length} houses · {items.filter((p) => p.status === 'pending').length} awaiting judgement</p>
      </Reveal>

      <Reveal delay={70}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search houses..." className="w-full pl-11 pr-4 py-3.5 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-5 py-3.5 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold">
            <option value="">All standings</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Reveal>

      <div className="space-y-4">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <div className="rounded-3xl border border-border/60 bg-card p-6 card-luxe">
              <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                <div className="w-14 h-14 rounded-2xl border border-primary/40 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-bold">{p.businessName}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${getStatusColor(p.status)}`}>{p.status}</span>
                    {p.status === 'approved' && <span className="text-[10px] font-bold text-primary uppercase tracking-luxe">✦ Verified</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{p.contactPerson} · {p.email} · {BUSINESS_TYPES.find((t) => t.value === p.businessType)?.label}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 max-w-3xl">{p.description}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-muted-foreground">
                    <span>◆ {p.city}, {p.region}</span>
                    <span>◆ {p.listingCount} collections</span>
                    <span>◆ {p.inquiryCount} letters</span>
                    <span>◆ Since {formatDate(p.createdAt)}</span>
                    {p.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-primary" /> Website</span>}
                  </div>
                </div>
                {p.status === 'pending' && (
                  <div className="flex lg:flex-col gap-2.5 shrink-0">
                    <button onClick={() => decide(p.id, true)} className="btn-shine flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wide hover:bg-emerald-500 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Admit
                    </button>
                    <button onClick={() => decide(p.id, false)} className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full border border-rose-500/40 text-rose-500 text-xs font-black uppercase tracking-wide hover:bg-rose-500/10 transition-colors">
                      <XCircle className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 rounded-3xl border border-dashed border-border">
          <p className="font-display text-2xl font-black">Nothing in this drawer</p>
          <p className="text-muted-foreground mt-2 text-sm">Widen the search.</p>
        </div>
      )}
    </div>
  );
}
