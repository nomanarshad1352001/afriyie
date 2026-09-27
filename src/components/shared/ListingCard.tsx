import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart, ArrowUpRight } from 'lucide-react';
import { Listing } from '@/lib/types';

interface ListingCardProps {
  listing: Listing;
  showFavorite?: boolean;
  isFavorited?: boolean;
  onToggleFavorite?: (listingId: string) => void;
}

export default function ListingCard({ listing, showFavorite, isFavorited, onToggleFavorite }: ListingCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group relative bg-card border border-border/60 rounded-3xl overflow-hidden card-luxe">
      {/* Image */}
      <div className="relative aspect-[16/11] overflow-hidden bg-muted">
        {!imgLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
        <img
          src={listing.images[0]}
          alt={listing.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Category tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full bg-white/15 glass border border-white/25 text-white text-[11px] font-bold uppercase tracking-wide-luxe">
            {listing.category}
          </span>
        </div>

        {/* Favorite */}
        {showFavorite && onToggleFavorite && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(listing.id); }}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/15 glass border border-white/25 hover:bg-white/30 transition-all hover:scale-110 active:scale-95"
            aria-label="Save to favorites"
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-rose-400 text-rose-400' : 'text-white'}`} />
          </button>
        )}

        {/* Price chip — slides in on hover */}
        <div className="absolute bottom-4 left-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="px-4 py-2 rounded-full gold-text bg-black/60 glass border border-white/10 text-sm font-bold">
            {listing.priceRange}
          </span>
        </div>

        {listing.featured && (
          <div className="absolute bottom-4 right-4 z-10">
            <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wide-luxe shadow-lg">
              Signature
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <Link to={`/listings/${listing.id}`} className="block p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {listing.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-primary shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium tracking-wide-luxe uppercase">{listing.city} · {listing.region}</span>
        </div>
        <div className="hairline my-3.5 opacity-50" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sm font-bold font-display">{listing.rating}</span>
            <span className="text-xs text-muted-foreground">({listing.reviewCount} reviews)</span>
          </div>
          <span className="text-xs font-bold text-primary uppercase tracking-wide-luxe">
            {listing.priceRange.split('/')[1]?.trim().includes('night') ? 'per night' : listing.priceRange.split('/')[1]?.trim().includes('journey') || listing.priceRange.split('/')[1]?.trim().includes('trip') ? 'per journey' : 'per person'}
          </span>
        </div>
      </Link>
    </div>
  );
}
