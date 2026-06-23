import { MessageSquare } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { inquiries } from '@/lib/data/inquiries';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

export default function TravelerInquiries() {
  const { user } = useAuthStore();
  if (!user) return null;

  const userInquiries = inquiries.filter((i) => i.travelerId === user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Inquiries</h1>
        <p className="text-muted-foreground mt-1">{userInquiries.length} inquiries sent</p>
      </div>

      {userInquiries.length > 0 ? (
        <div className="space-y-4">
          {userInquiries.map((inq) => (
            <div key={inq.id} className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <h3 className="font-semibold">{inq.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    To: <span className="font-medium text-foreground">{inq.partnerName}</span> • {inq.listingTitle}
                  </p>
                </div>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(inq.status)}`}>
                  {inq.status}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 text-sm">
                <p className="text-muted-foreground">{inq.message}</p>
              </div>

              {inq.reply && (
                <div className="mt-3 p-3 rounded-lg bg-primary/5 border-l-2 border-primary text-sm">
                  <p className="text-xs font-medium text-primary mb-1">Partner Reply:</p>
                  <p className="text-foreground">{inq.reply}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                {inq.travelDates && <span>📅 {inq.travelDates}</span>}
                {inq.numberOfGuests && <span>👥 {inq.numberOfGuests} guests</span>}
                <span>⏱️ {formatRelativeTime(inq.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold">No inquiries yet</h3>
          <p className="text-muted-foreground mt-2">
            Browse listings and send inquiries to tourism partners.
          </p>
        </div>
      )}
    </div>
  );
}
