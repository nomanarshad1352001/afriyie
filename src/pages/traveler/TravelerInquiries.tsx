import { MessageSquare } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { useAuthStore } from '@/lib/stores/authStore';
import { inquiries } from '@/lib/data/inquiries';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

export default function TravelerInquiries() {
  const { user } = useAuthStore();
  if (!user) return null;

  const mine = inquiries.filter((i) => i.travelerId === user.id);

  return (
    <div className="space-y-8">
      <Reveal>
        <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">With our houses</span>
        <h1 className="font-display text-4xl font-black mt-1">My <em className="gold-text not-italic font-display italic">Correspondence</em></h1>
        <p className="text-muted-foreground mt-2">{mine.length} letters exchanged</p>
      </Reveal>

      {mine.length > 0 ? (
        <div className="space-y-5">
          {mine.map((inq, i) => (
            <Reveal key={inq.id} delay={i * 80}>
              <div className="rounded-3xl border border-border/60 bg-card p-6 card-luxe">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold">{inq.subject}</h3>
                    <p className="text-sm text-muted-foreground mt-1">To <span className="font-bold text-foreground">{inq.partnerName}</span> · {inq.listingTitle}</p>
                  </div>
                  <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${getStatusColor(inq.status)}`}>{inq.status}</span>
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-secondary/50 text-sm leading-relaxed">{inq.message}</div>
                {inq.reply && (
                  <div className="mt-3 p-4 rounded-2xl border-l-2 border-primary bg-primary/5 text-sm">
                    <p className="text-[10px] font-black uppercase tracking-luxe text-primary mb-1.5">Reply from the house</p>
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
        <Reveal>
          <div className="text-center py-24 rounded-3xl border border-dashed border-border">
            <MessageSquare className="w-12 h-12 text-primary mx-auto animate-float" />
            <h3 className="font-display text-2xl font-black mt-4">Silence, for now</h3>
            <p className="text-muted-foreground mt-2 text-sm">Enquire at any house and your letters will gather here.</p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
