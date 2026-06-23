import { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { listings as allListings } from '@/lib/data/listings';
import { getCategoryColor, getCategoryIcon, getStatusColor } from '@/lib/utils/formatters';
import { LISTING_CATEGORIES } from '@/lib/types';

export default function AdminListings() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [localListings, setLocalListings] = useState(allListings);

  const filteredListings = localListings.filter((l) => {
    const matchesSearch = !search ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || l.category === categoryFilter;
    const matchesStatus = !statusFilter || l.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setLocalListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'active' as const } : l))
    );
    toast.success('Listing approved!');
  };

  const handleReject = (id: string) => {
    setLocalListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'rejected' as const } : l))
    );
    toast.success('Listing rejected');
  };

  const handleRemove = (id: string) => {
    setLocalListings((prev) => prev.filter((l) => l.id !== id));
    toast.success('Listing removed');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Listings Management</h1>
        <p className="text-muted-foreground mt-1">
          {allListings.length} total listings • {allListings.filter((l) => l.status === 'pending').length} pending
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Categories</option>
          {LISTING_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Listings */}
      {filteredListings.length > 0 ? (
        <div className="space-y-3">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="p-4 rounded-xl border border-border bg-card flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-28 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-sm">{listing.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(listing.category)}`}>
                        {getCategoryIcon(listing.category)} {listing.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                      {listing.featured && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">⭐ Featured</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Link to={`/listings/${listing.id}`} className="p-1.5 rounded hover:bg-secondary text-muted-foreground">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {listing.city}, {listing.region}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {listing.rating} ({listing.reviewCount})</span>
                  <span className="font-medium text-primary">{listing.priceRange}</span>
                </div>
                {listing.status === 'pending' && (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleApprove(listing.id)} className="flex items-center gap-1 px-2.5 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700">
                      <CheckCircle className="w-3 h-3" /> Approve
                    </button>
                    <button onClick={() => handleReject(listing.id)} className="flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700">
                      <XCircle className="w-3 h-3" /> Reject
                    </button>
                  </div>
                )}
                {listing.status !== 'pending' && (
                  <button onClick={() => handleRemove(listing.id)} className="mt-2 text-xs text-destructive hover:underline">
                    Remove listing
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <span className="text-5xl block mb-3">📋</span>
          <p className="text-muted-foreground">No listings match your criteria</p>
        </div>
      )}
    </div>
  );
}
