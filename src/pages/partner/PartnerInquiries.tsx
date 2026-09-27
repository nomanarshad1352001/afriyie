import { useState } from 'react';
import { Send, MailOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import Reveal from '@/components/shared/Reveal';
import { useAuthStore } from '@/lib/stores/authStore';
import { partners } from '@/lib/data/partners';
import { inquiries as allInquiries } from '@/lib/data/inquiries';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

export default function PartnerInquiries() {
  const { user } = useAuthStore();
  const partner = partners.find((p) => p.userId === user?.id);
  const mine = partner ? allInquiries.filter((i) => i.partnerId === partner.id) : [];
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replied, setReplied] = useState<string[]>([]);

  const send = (id: string) => {
    if (!replyText.trim()) { toast.error('Write a line first'); return; }
    setReplied((p) => [...p, id]);
    setReplyingTo(null);
    setReplyText('');
    toast.success('Letter sent to the traveler');
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Guest letters</span>
        <h1 className="font-display text-4xl font-black mt-1">Correspon<em className="gold-text not-italic font-display italic">dence</em></h1>
        <p className="text-muted-foreground mt-2">{mine.length} letters received</p>
      </Reveal>

      {mine.length > 0 ? (
        <div className="space-y-5">
          {mine.map((inq, i) => {
            const answered = replied.includes(inq.id) || inq.status === 'replied' || inq.status === 'closed';
            return (
              <Reveal key={inq.id} delay={i * 70}>
                <div className="rounded-3xl border border-border/60 bg-card p-6 card-luxe">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold">{inq.subject}</h3>
                      <p className="text-sm text-muted-foreground mt-1">From <span className="font-bold text-foreground">{inq.travelerName}</span> · {inq.travelerEmail} · re: {inq.listingTitle}</p>
                    </div>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${getStatusColor(answered ? 'replied' : inq.status)}`}>{answered ? 'replied' : inq.status}</span>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-secondary/50 text-sm leading-relaxed">{inq.message}</div>

                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                    {inq.travelDates && <span>◆ {inq.travelDates}</span>}
                    {inq.numberOfGuests && <span>◆ {inq.numberOfGuests} guests</span>}
                    <span>◆ {formatRelativeTime(inq.createdAt)}</span>
                  </div>

                  {(inq.reply || answered) && (
                    <div className="mt-4 p-4 rounded-2xl border-l-2 border-primary bg-primary/5 text-sm">
                      <p className="text-[10px] font-black uppercase tracking-luxe text-primary mb-1.5">Your reply</p>
                      {inq.reply || 'Thank you for reaching out — we shall return with full details within the day.'}
                    </div>
                  )}

                  {!answered && (
                    replyingTo === inq.id ? (
                      <div className="mt-4 space-y-3 animate-fade-in-up">
                        <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} placeholder="Reply with grace..." className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none text-sm" />
                        <div className="flex gap-2.5">
                          <button onClick={() => send(inq.id)} className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide-luxe"><Send className="w-3.5 h-3.5" /> Send</button>
                          <button onClick={() => { setReplyingTo(null); setReplyText(''); }} className="px-5 py-2.5 rounded-full border border-border text-xs font-bold">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setReplyingTo(inq.id)} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-xs font-bold hover:border-primary/50 hover:text-primary transition-all">
                        <Send className="w-3.5 h-3.5" /> Compose reply
                      </button>
                    )
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <Reveal><div className="text-center py-24 rounded-3xl border border-dashed border-border">
          <MailOpen className="w-12 h-12 text-primary mx-auto animate-float" />
          <h3 className="font-display text-2xl font-black mt-4">The inbox rests</h3>
          <p className="text-muted-foreground mt-2 text-sm">Travelers will write once your collection is live.</p>
        </div></Reveal>
      )}
    </div>
  );
}
