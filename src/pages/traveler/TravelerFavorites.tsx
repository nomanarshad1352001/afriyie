import { useState } from 'react';
import { Heart, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import ListingCard from '@/components/shared/ListingCard';
import { useAuthStore } from '@/lib/stores/authStore';
import { favorites as allFavorites } from '@/lib/data/trips';

export default function TravelerFavorites() {
  const { user } = useAuthStore();
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  if (!user) return null;

  const userFavorites = allFavorites
    .filter((f) => f.userId === user.id && !removedIds.includes(f.listingId))
    .filter((f) => !search || f.listing.title.toLowerCase().includes(search.toLowerCase()));

  const handleRemove = (listingId: string) => {
    setRemovedIds((prev) => [...prev, listingId]);
    toast.success('Removed from favorites');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-black">My Favorites</h1>
          <p className="text-muted-foreground mt-1">{userFavorites.length} saved listings</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search favorites..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      {userFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {userFavorites.map((fav) => (
            <ListingCard key={fav.id} listing={fav.listing} showFavorite isFavorited onToggleFavorite={handleRemove} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-black">No favorites yet</h3>
          <p className="text-muted-foreground mt-2">Browse listings and save your favorites here.</p>
        </div>
      )}
    </div>
  );
}
