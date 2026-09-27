import { useState } from 'react';
import { Search, MessageSquare, ArrowRight } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { inquiries as allInquiries } from '@/lib/data/inquiries';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

export default function AdminInquiries() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const filtered = allInquiries.filter((i) => {
    const s = !search || i.subject.toLowerCase().includes(search.toLowerCase()) || i.travelerName.toLowerCase().includes(search.toLowerCase()) || i.partnerName.toLowerCase().includes(search.toLowerCase());
    const st = !status || i.status === status;
    return s && st;
  });

  const counts = { new: 0, read: 0, replied: 0, closed: 0 };
  allInquiries.forEach((i) => { counts[i.status as keyof typeof counts] += 1; });

  return (
    <div className="space-y-8">
      <Reveal>
        <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Oversight</span>
        <h1 className="font-display text-4xl font-black mt-1">All <em className="gold-text not-italic font-display italic">Correspondence</em></h1>
        <p className="text-muted-foreground mt-2">Every letter between guest and house</p>
      </Reveal>

      <Reveal delay={60}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.entries(counts) as [string, number][]).map(([k, v]) => (
            <button key={k} onClick={() => setStatus(status === k ? '' : k)} className={`p-4 rounded-2xl border text-center transition-all active:scale-95 ${status === k ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10' : 'border-border bg-card card-luxe'}`}>
              <p className="font-display text-3xl font-black gold-text">{v}</p>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-luxe mt-0.5">{k}</p>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by guest, house or subject..." className="w-full pl-11 pr-4 py-3.5 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </Reveal>

      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((inq, i) => (
            <Reveal key={inq.id} delay={i * 50}>
              <div className="rounded-3xl border border-border/60 bg-card p-6 card-luxe">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold">{inq.subject}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-foreground">{inq.travelerName}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                      <span className="font-bold text-foreground">{inq.partnerName}</span>
                      <span>· {inq.listingTitle}</span>
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${getStatusColor(inq.status)}`}>{inq.status}</span>
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-secondary/50 text-sm leading-relaxed">{inq.message}</div>
                {inq.reply && (
                  <div className="mt-3 p-4 rounded-2xl border-l-2 border-primary bg-primary/5 text-sm">
                    <p className="text-[10px] font-black uppercase tracking-luxe text-primary mb-1.5">House reply</p>
                    {inq.reply}
                  </div>
                )}
                <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
                  {inq.travelDates && <span>◆ {inq.travelDates}</span>}
                  {inq.numberOfGuests && <span>◆ {inq.numberOfGuests} guests</span>}
                  <span>◆ {formatRelativeTime(inq.createdAt)}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-3xl border border-dashed border-border">
          <MessageSquare className="w-12 h-12 text-primary mx-auto animate-float" />
          <p className="font-display text-2xl font-black mt-4">No letters here</p>
          <p className="text-muted-foreground mt-2 text-sm">Adjust your filters.</p>
        </div>
      )}
    </div>
  );
}
