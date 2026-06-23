import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { partners as allPartners } from '@/lib/data/partners';
import { formatDate, getStatusColor } from '@/lib/utils/formatters';
import { BUSINESS_TYPES } from '@/lib/types';

export default function AdminPartners() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [localPartners, setLocalPartners] = useState(allPartners);

  const filteredPartners = localPartners.filter((p) => {
    const matchesSearch = !search ||
      p.businessName.toLowerCase().includes(search.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setLocalPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' as const } : p))
    );
    toast.success('Partner approved!');
  };

  const handleReject = (id: string) => {
    setLocalPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'rejected' as const } : p))
    );
    toast.success('Partner rejected');
  };

  const getTypeLabel = (type: string) => {
    return BUSINESS_TYPES.find((t) => t.value === type)?.label || type;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Partner Management</h1>
        <p className="text-muted-foreground mt-1">
          {allPartners.length} partners • {allPartners.filter((p) => p.status === 'pending').length} pending review
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search partners..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Partner Cards */}
      {filteredPartners.length > 0 ? (
        <div className="space-y-4">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="p-5 rounded-xl border border-border bg-card">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{partner.businessName}</h3>
                    <p className="text-sm text-muted-foreground">{partner.contactPerson} • {partner.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                        {partner.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground">
                        {getTypeLabel(partner.businessType)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {partner.region}, {partner.city}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{partner.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>📋 {partner.listingCount} listings</span>
                      <span>💬 {partner.inquiryCount} inquiries</span>
                      <span>📅 Joined {formatDate(partner.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {partner.status === 'pending' && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(partner.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(partner.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                )}

                {partner.status === 'approved' && (
                  <span className="flex items-center gap-1 text-green-600 text-sm shrink-0">
                    <CheckCircle className="w-4 h-4" /> Verified
                  </span>
                )}

                {partner.status === 'rejected' && (
                  <span className="flex items-center gap-1 text-red-500 text-sm shrink-0">
                    <XCircle className="w-4 h-4" /> Rejected
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No partners match your search</p>
        </div>
      )}
    </div>
  );
}
