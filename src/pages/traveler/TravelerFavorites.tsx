import { useState } from 'react';
import { Heart, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import ListingCard from '@/components/shared/ListingCard';
import Reveal from '@/components/shared/Reveal';
import { useAuthStore } from '@/lib/stores/authStore';
import { favorites as allFavorites } from '@/lib/data/trips';

export default function TravelerFavorites() {
  const { user } = useAuthStore();
  const [removed, setRemoved] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  if (!user) return null;

  const vault = allFavorites
    .filter((f) => f.userId === user.id && !removed.includes(f.listingId))
    .filter((f) => !search || f.listing.title.toLowerCase().includes(search.toLowerCase()));

  const handleRemove = (listingId: string) => {
    setRemoved((prev) => [...prev, listingId]);
    toast.success('Returned to the collection');
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Yours to keep</span>
            <h1 className="font-display text-4xl font-black mt-1">My <em className="gold-text not-italic font-display italic">Vault</em></h1>
            <p className="text-muted-foreground mt-2">{vault.length} treasures saved</p>
          </div>
          <div className="relative sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your vault..." className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
        </div>
      </Reveal>

      {vault.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {vault.map((f, i) => (
            <Reveal key={f.id} delay={(i % 3) * 100}>
              <ListingCard listing={f.listing} showFavorite isFavorited onToggleFavorite={handleRemove} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="text-center py-24 rounded-3xl border border-dashed border-border">
            <div className="w-20 h-20 mx-auto rounded-full border border-primary/40 flex items-center justify-center animate-float">
              <Heart className="w-9 h-9 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-black mt-5">An empty vault</h3>
            <p className="text-muted-foreground mt-2 text-sm">Save the estates and journeys that move you.</p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
