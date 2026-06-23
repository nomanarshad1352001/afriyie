import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, MapPin, LayoutGrid, List } from 'lucide-react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import ListingCard from '@/components/shared/ListingCard';
import { listings } from '@/lib/data/listings';
import { LISTING_CATEGORIES, GHANA_REGIONS, GhanaRegion } from '@/lib/types';

export default function BrowseListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const regionFilter = searchParams.get('region') || '';
  const [searchInput, setSearchInput] = useState(query);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      if (listing.status !== 'active') return false;
      const matchesSearch = !query || listing.title.toLowerCase().includes(query.toLowerCase()) || listing.description.toLowerCase().includes(query.toLowerCase()) || listing.city.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !categoryFilter || listing.category === categoryFilter;
      const matchesRegion = !regionFilter || listing.region === regionFilter;
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [query, categoryFilter, regionFilter]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value); else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => { setSearchParams({}); setSearchInput(''); };
  const handleSearch = () => updateFilter('q', searchInput);
  const hasActiveFilters = query || categoryFilter || regionFilter;

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Hero Banner */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img src="https://images.pexels.com/photos/32490286/pexels-photo-32490286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=1600" alt="Ghana" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          <h1 className="text-3xl md:text-4xl font-black text-foreground animate-fade-in-up">Explore Ghana</h1>
          <p className="text-muted-foreground mt-1 animate-fade-in-up delay-100">Discover amazing experiences across all regions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up delay-200">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder="Search experiences, hotels, attractions..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-secondary transition-all font-semibold text-sm ${showFilters ? 'border-primary bg-primary/5' : 'border-border'}`}>
              <SlidersHorizontal className="w-4 h-4" /> Filters {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
            </button>
            <div className="hidden sm:flex border border-border rounded-xl overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}><LayoutGrid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-5 rounded-2xl border border-border bg-card animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Filters</h3>
              {hasActiveFilters && <button onClick={clearFilters} className="text-sm text-primary font-bold hover:underline flex items-center gap-1"><X className="w-3 h-3" /> Clear all</button>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select value={categoryFilter} onChange={(e) => updateFilter('category', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">All Categories</option>
                  {LISTING_CATEGORIES.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Region</label>
                <select value={regionFilter} onChange={(e) => updateFilter('region', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">All Regions</option>
                  {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5 animate-fade-in">
            {query && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">Search: &quot;{query}&quot; <button onClick={() => { updateFilter('q', ''); setSearchInput(''); }}><X className="w-3 h-3" /></button></span>}
            {categoryFilter && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">{LISTING_CATEGORIES.find((c) => c.value === categoryFilter)?.label} <button onClick={() => updateFilter('category', '')}><X className="w-3 h-3" /></button></span>}
            {regionFilter && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">{regionFilter as GhanaRegion} <button onClick={() => updateFilter('region', '')}><X className="w-3 h-3" /></button></span>}
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-5 font-medium">{filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} found</p>

        {filteredListings.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {filteredListings.map((listing) => <ListingCard key={listing.id} listing={listing} showFavorite />)}
            </div>
          ) : (
            <div className="space-y-4 stagger-children">
              {filteredListings.map((listing) => (
                <a key={listing.id} href={`/listings/${listing.id}`} className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-border bg-card card-hover">
                  <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{listing.city}, {listing.region}</p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-bold text-primary">{listing.priceRange}</span>
                      <span className="text-sm">⭐ {listing.rating} ({listing.reviewCount})</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <span className="text-7xl block mb-4">🔍</span>
            <h3 className="text-2xl font-black">No listings found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-5 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
