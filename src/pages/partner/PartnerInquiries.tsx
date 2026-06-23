import { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/authStore';
import { partners } from '@/lib/data/partners';
import { inquiries as allInquiries } from '@/lib/data/inquiries';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

export default function PartnerInquiries() {
  const { user } = useAuthStore();
  const partner = partners.find((p) => p.userId === user?.id);
  const partnerInquiries = partner
    ? allInquiries.filter((i) => i.partnerId === partner.id)
    : [];

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [repliedIds, setRepliedIds] = useState<string[]>([]);

  const handleReply = (inquiryId: string) => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }
    setRepliedIds((prev) => [...prev, inquiryId]);
    setReplyingTo(null);
    setReplyText('');
    toast.success('Reply sent successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <p className="text-muted-foreground mt-1">{partnerInquiries.length} total inquiries</p>
      </div>

      {partnerInquiries.length > 0 ? (
        <div className="space-y-4">
          {partnerInquiries.map((inq) => {
            const isReplied = repliedIds.includes(inq.id) || inq.status === 'replied' || inq.status === 'closed';
            return (
              <div key={inq.id} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold">{inq.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      From: <span className="font-medium text-foreground">{inq.travelerName}</span> ({inq.travelerEmail})
                    </p>
                    <p className="text-sm text-muted-foreground">Re: {inq.listingTitle}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                    isReplied ? getStatusColor('replied') : getStatusColor(inq.status)
                  }`}>
                    {isReplied ? 'replied' : inq.status}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-secondary/50 text-sm mb-3">
                  <p>{inq.message}</p>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                  {inq.travelDates && <span>📅 {inq.travelDates}</span>}
                  {inq.numberOfGuests && <span>👥 {inq.numberOfGuests} guests</span>}
                  <span>⏱️ {formatRelativeTime(inq.createdAt)}</span>
                </div>

                {(inq.reply || isReplied) && (
                  <div className="p-3 rounded-lg bg-primary/5 border-l-2 border-primary text-sm mb-3">
                    <p className="text-xs font-medium text-primary mb-1">Your Reply:</p>
                    <p>{inq.reply || 'Thank you for your inquiry. We will get back to you shortly with more details.'}</p>
                  </div>
                )}

                {!isReplied && (
                  <>
                    {replyingTo === inq.id ? (
                      <div className="space-y-2 animate-fade-in">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          placeholder="Type your reply..."
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleReply(inq.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            <Send className="w-3 h-3" /> Send Reply
                          </button>
                          <button
                            onClick={() => { setReplyingTo(null); setReplyText(''); }}
                            className="px-3 py-1.5 border border-border text-sm rounded-lg hover:bg-secondary transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingTo(inq.id)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-border text-sm rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Send className="w-3 h-3" /> Reply
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold">No inquiries yet</h3>
          <p className="text-muted-foreground mt-2">You&apos;ll receive inquiries once travelers find your listings.</p>
        </div>
      )}
    </div>
  );
}
