import { Link } from 'react-router-dom';
import { Heart, Map, MessageSquare, Sparkles, ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import StatCard from '@/components/shared/StatCard';
import ListingCard from '@/components/shared/ListingCard';
import Reveal from '@/components/shared/Reveal';
import { useAuthStore } from '@/lib/stores/authStore';
import { favorites, savedTrips } from '@/lib/data/trips';
import { inquiries } from '@/lib/data/inquiries';
import { listings } from '@/lib/data/listings';
import { formatRelativeTime, formatDate, getStatusColor } from '@/lib/utils/formatters';

export default function TravelerDashboard() {
  const { user } = useAuthStore();
  if (!user) return null;

  const myFavs = favorites.filter((f) => f.userId === user.id);
  const myTrips = savedTrips.filter((t) => t.userId === user.id);
  const myInquiries = inquiries.filter((i) => i.travelerId === user.id);
  const forYou = listings.filter((l) => l.status === 'active').slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Welcome — obsidian card */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-obsidian text-white p-8 md:p-10">
          <img src="https://images.pexels.com/photos/723534/pexels-photo-723534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=1200" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="relative max-w-2xl">
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Your Suite</span>
            <h1 className="font-display text-3xl md:text-5xl font-black mt-2">Welcome back, <em className="gold-text">{user.name.split(' ')[0]}</em></h1>
            <p className="text-white/65 mt-3 font-light">Ghana continues to prepare wonders for you. Compose a new journey or revisit your collection.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/dashboard/ai-planner" className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95">
                <Sparkles className="w-4 h-4" /> Compose with AI
              </Link>
              <Link to="/listings" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-sm font-bold hover:bg-white/10 transition-all">
                Browse Collections <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[<StatCard key="a" title="In Your Vault" value={myFavs.length} icon={Heart} change="+2 this week" changeType="positive" />,
          <StatCard key="b" title="Journeys" value={myTrips.length} icon={Map} change="1 upcoming" changeType="positive" />,
          <StatCard key="c" title="Correspondence" value={myInquiries.length} icon={MessageSquare} change={`${myInquiries.filter((i) => i.status === 'replied').length} answered`} />,
          <StatCard key="d" title="Explorer Rank" value="Gold" icon={TrendingUp} change="Top 15%" changeType="positive" />,
        ].map((c, i) => <Reveal key={i} delay={i * 100}>{c}</Reveal>)}
      </div>

      {/* Trips + Correspondence */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Reveal variant="left">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-black">Upcoming Journeys</h2>
            <Link to="/dashboard/trips" className="text-xs font-bold uppercase tracking-wide-luxe text-primary hover:opacity-70 flex items-center gap-1">All <ArrowUpRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-4">
            {myTrips.slice(0, 2).map((trip) => (
              <div key={trip.id} className="p-5 rounded-3xl border border-border/60 bg-card card-luxe">
                <h3 className="font-display text-lg font-bold">{trip.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{formatDate(trip.startDate)} — {formatDate(trip.endDate)} · {trip.travelers} guests</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {trip.regions.map((r) => <span key={r} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold">◆ {r}</span>)}
                </div>
              </div>
            ))}
            {myTrips.length === 0 && (
              <div className="p-8 rounded-3xl border border-dashed border-border text-center">
                <Map className="w-10 h-10 text-primary mx-auto mb-3 animate-float" />
                <p className="font-display text-lg font-bold">No journeys yet</p>
                <Link to="/dashboard/trips" className="inline-block mt-3 text-sm font-bold text-primary">Plan one now →</Link>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-black">Recent Correspondence</h2>
            <Link to="/dashboard/inquiries" className="text-xs font-bold uppercase tracking-wide-luxe text-primary hover:opacity-70 flex items-center gap-1">All <ArrowUpRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-3">
            {myInquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border/60 bg-card card-luxe">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{inq.listingTitle}</p>
                  <p className="text-xs text-muted-foreground truncate">{inq.subject} · {formatRelativeTime(inq.createdAt)}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${getStatusColor(inq.status)}`}>{inq.status}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Recommendations */}
      <Reveal>
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">For you</span>
            <h2 className="font-display text-2xl font-black mt-1">Curated Tonight</h2>
          </div>
          <Link to="/listings" className="text-xs font-bold uppercase tracking-wide-luxe hover:text-primary transition-colors flex items-center gap-1">All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forYou.map((l, i) => <Reveal key={l.id} delay={i * 120} variant="scale"><ListingCard listing={l} showFavorite /></Reveal>)}
        </div>
      </Reveal>
    </div>
  );
}
