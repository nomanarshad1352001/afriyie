import { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { inquiries as allInquiries } from '@/lib/data/inquiries';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

export default function AdminInquiries() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredInquiries = allInquiries.filter((inq) => {
    const matchesSearch = !search ||
      inq.subject.toLowerCase().includes(search.toLowerCase()) ||
      inq.travelerName.toLowerCase().includes(search.toLowerCase()) ||
      inq.partnerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    new: allInquiries.filter((i) => i.status === 'new').length,
    read: allInquiries.filter((i) => i.status === 'read').length,
    replied: allInquiries.filter((i) => i.status === 'replied').length,
    closed: allInquiries.filter((i) => i.status === 'closed').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Inquiries</h1>
        <p className="text-muted-foreground mt-1">Monitor traveler-partner communications</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
            className={`p-3 rounded-xl border text-center transition-colors ${
              statusFilter === status ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-secondary'
            }`}
          >
            <p className="text-lg font-bold">{count}</p>
            <p className="text-xs text-muted-foreground capitalize">{status}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inquiries..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Inquiries List */}
      {filteredInquiries.length > 0 ? (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div key={inq.id} className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold">{inq.subject}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium text-foreground">{inq.travelerName}</span>
                    {' → '}
                    <span className="font-medium text-foreground">{inq.partnerName}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Listing: {inq.listingTitle}</p>
                </div>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(inq.status)}`}>
                  {inq.status}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 text-sm mb-2">
                <p className="text-muted-foreground">{inq.message}</p>
              </div>

              {inq.reply && (
                <div className="p-3 rounded-lg bg-primary/5 border-l-2 border-primary text-sm mb-2">
                  <p className="text-xs font-medium text-primary mb-1">Partner Reply:</p>
                  <p>{inq.reply}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                {inq.travelDates && <span>📅 {inq.travelDates}</span>}
                {inq.numberOfGuests && <span>👥 {inq.numberOfGuests} guests</span>}
                <span>⏱️ {formatRelativeTime(inq.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No inquiries match your criteria</p>
        </div>
      )}
    </div>
  );
}
