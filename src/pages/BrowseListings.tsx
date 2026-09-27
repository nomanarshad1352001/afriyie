import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, MapPin } from 'lucide-react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import ListingCard from '@/components/shared/ListingCard';
import Reveal from '@/components/shared/Reveal';
import { listings } from '@/lib/data/listings';
import { LISTING_CATEGORIES, GHANA_REGIONS, GhanaRegion } from '@/lib/types';

export default function BrowseListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

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

      {/* Slim hero banner (offset for fixed navbar) */}
      <div className="relative h-64 md:h-72 pt-20 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3561109/pexels-photo-3561109.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1600"
          alt="Elmina fishing boats"
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-8">
          <Reveal>
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">The Collection</span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mt-2">Our <em className="gold-text">Collections</em></h1>
            <p className="text-white/70 mt-2 font-light">{filteredListings.length} curated estates, journeys & celebrations</p>
          </Reveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by name, place or feeling..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-full border font-bold text-sm transition-all ${showFilters ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40'}`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Refine
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary animate-pulse-ring" />}
          </button>
        </div>

        {showFilters && (
          <div className="mb-7 p-6 rounded-3xl border border-border bg-card animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold">Refine the Collection</h3>
              {hasActiveFilters && <button onClick={clearFilters} className="text-xs font-bold text-primary uppercase tracking-wide-luxe hover:opacity-70 flex items-center gap-1"><X className="w-3 h-3" /> Clear</button>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select value={categoryFilter} onChange={(e) => updateFilter('category', e.target.value)} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">All Categories</option>
                {LISTING_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <select value={regionFilter} onChange={(e) => updateFilter('region', e.target.value)} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">All Regions</option>
                {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 [&::-webkit-scrollbar]:hidden">
          <button onClick={() => updateFilter('category', '')} className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide-luxe whitespace-nowrap transition-all ${!categoryFilter ? 'bg-primary text-primary-foreground' : 'border border-border hover:border-primary/40'}`}>All</button>
          {LISTING_CATEGORIES.map((c) => (
            <button key={c.value} onClick={() => updateFilter('category', categoryFilter === c.value ? '' : c.value)} className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide-luxe whitespace-nowrap transition-all ${categoryFilter === c.value ? 'bg-primary text-primary-foreground' : 'border border-border hover:border-primary/40'}`}>
              {c.label}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5 animate-fade-in">
            {query && <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">“{query}” <button onClick={() => { updateFilter('q', ''); setSearchInput(''); }}><X className="w-3 h-3" /></button></span>}
            {regionFilter && <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">{regionFilter as GhanaRegion} <button onClick={() => updateFilter('region', '')}><X className="w-3 h-3" /></button></span>}
          </div>
        )}

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredListings.map((listing, i) => (
              <Reveal key={listing.id} delay={(i % 3) * 120}>
                <ListingCard listing={listing} showFavorite />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in-up">
            <MapPin className="w-14 h-14 text-primary mx-auto mb-4 animate-float" />
            <h3 className="font-display text-3xl font-black">Nothing matches — yet</h3>
            <p className="text-muted-foreground mt-2">Adjust your refinement or explore the full collection.</p>
            <button onClick={clearFilters} className="mt-6 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all">View Everything</button>
          </div>
        )}
      </div>
    </div>
  );
}
