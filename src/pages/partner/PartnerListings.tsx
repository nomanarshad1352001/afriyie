import { useState } from 'react';
import { Plus, Star, MapPin, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/authStore';
import { partners } from '@/lib/data/partners';
import { listings as allListings } from '@/lib/data/listings';
import { getCategoryColor, getCategoryIcon, getStatusColor } from '@/lib/utils/formatters';
import { LISTING_CATEGORIES, GHANA_REGIONS } from '@/lib/types';

export default function PartnerListings() {
  const { user } = useAuthStore();
  const partner = partners.find((p) => p.userId === user?.id);
  const [partnerListings, setPartnerListings] = useState(
    partner ? allListings.filter((l) => l.partnerId === partner.id) : []
  );
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Simple form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('accommodation');
  const [formRegion, setFormRegion] = useState('Greater Accra');
  const [formCity, setFormCity] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formCity || !formDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newListing = {
      id: `lst_${String(allListings.length + partnerListings.length + 1).padStart(3, '0')}`,
      partnerId: partner?.id || '',
      title: formTitle,
      description: formDescription,
      category: formCategory as 'accommodation',
      region: formRegion as 'Greater Accra',
      city: formCity,
      address: formCity,
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
      priceRange: `$${formPrice} per night`,
      priceValue: Number(formPrice) || 0,
      currency: 'USD',
      contactEmail: user?.email || '',
      contactPhone: partner?.phone || '',
      amenities: ['WiFi'],
      rating: 0,
      reviewCount: 0,
      status: 'pending' as const,
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPartnerListings((prev) => [newListing, ...prev]);
    toast.success('Listing submitted for review!');
    setShowForm(false);
    setFormTitle('');
    setFormCity('');
    setFormPrice('');
    setFormDescription('');
  };

  const handleDelete = (id: string) => {
    setPartnerListings((prev) => prev.filter((l) => l.id !== id));
    setDeleteConfirm(null);
    toast.success('Listing deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Listings</h1>
          <p className="text-muted-foreground mt-1">{partnerListings.length} listings</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Listing</span>
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="p-5 rounded-xl border border-border bg-card animate-fade-in">
          <h3 className="font-semibold mb-4">Create New Listing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Beachfront Resort" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                {LISTING_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <select value={formRegion} onChange={(e) => setFormRegion(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input value={formCity} onChange={(e) => setFormCity(e.target.value)} placeholder="e.g. Accra" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (USD)</label>
              <input type="number" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="100" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} placeholder="Describe your listing..." className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">Submit for Review</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">Cancel</button>
          </div>
        </form>
      )}

      {/* Listings Grid */}
      {partnerListings.length > 0 ? (
        <div className="space-y-4">
          {partnerListings.map((listing) => (
            <div key={listing.id} className="p-4 rounded-xl border border-border bg-card flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{listing.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(listing.category)}`}>
                        {getCategoryIcon(listing.category)} {listing.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Link to={`/listings/${listing.id}`} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors" onClick={() => toast.success('Edit functionality — production feature')}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <div className="relative">
                      <button onClick={() => setDeleteConfirm(deleteConfirm === listing.id ? null : listing.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {deleteConfirm === listing.id && (
                        <div className="absolute right-0 top-full mt-1 p-3 rounded-lg border border-border bg-popover shadow-lg z-10 w-40 animate-fade-in">
                          <p className="text-xs mb-2">Delete listing?</p>
                          <div className="flex gap-2">
                            <button onClick={() => handleDelete(listing.id)} className="flex-1 px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded">Delete</button>
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-2 py-1 border border-border text-xs rounded">Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {listing.city}, {listing.region}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {listing.rating} ({listing.reviewCount})</span>
                  <span className="font-medium text-primary">{listing.priceRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">📋</span>
          <h3 className="text-xl font-semibold">No listings yet</h3>
          <p className="text-muted-foreground mt-2">Create your first listing to start attracting travelers.</p>
        </div>
      )}
    </div>
  );
}
