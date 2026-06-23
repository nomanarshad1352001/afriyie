import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart } from 'lucide-react';
import { Listing } from '@/lib/types';
import { getCategoryColor, getCategoryIcon, truncateText } from '@/lib/utils/formatters';

interface ListingCardProps {
  listing: Listing;
  showFavorite?: boolean;
  isFavorited?: boolean;
  onToggleFavorite?: (listingId: string) => void;
}

export default function ListingCard({ listing, showFavorite, isFavorited, onToggleFavorite }: ListingCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden card-hover">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {!imgLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
        <img
          src={listing.images[0]}
          alt={listing.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${getCategoryColor(listing.category)}`}>
            {getCategoryIcon(listing.category)} {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
          </span>
        </div>

        {showFavorite && onToggleFavorite && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(listing.id); }}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
          </button>
        )}

        {listing.featured && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              ⭐ Featured
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-lg">
            {listing.priceRange.split('/')[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <Link to={`/listings/${listing.id}`} className="block p-4">
        <h3 className="text-base font-bold group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary/60" />
          <span>{listing.city}, {listing.region}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {truncateText(listing.description, 110)}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{listing.rating}</span>
            <span className="text-xs text-muted-foreground">({listing.reviewCount})</span>
          </div>
          <div className="text-sm font-bold text-primary">
            {listing.priceRange}
          </div>
        </div>
      </Link>
    </div>
  );
}
