import { Link } from 'react-router-dom';
import { Heart, Map, MessageSquare, Sparkles, ArrowRight, TrendingUp, Calendar, Globe, Clock } from 'lucide-react';
import StatCard from '@/components/shared/StatCard';
import ListingCard from '@/components/shared/ListingCard';
import { useAuthStore } from '@/lib/stores/authStore';
import { favorites } from '@/lib/data/trips';
import { inquiries } from '@/lib/data/inquiries';
import { savedTrips } from '@/lib/data/trips';
import { listings } from '@/lib/data/listings';
import { formatRelativeTime, formatDate } from '@/lib/utils/formatters';

export default function TravelerDashboard() {
  const { user } = useAuthStore();
  if (!user) return null;

  const userFavorites = favorites.filter((f) => f.userId === user.id);
  const userTrips = savedTrips.filter((t) => t.userId === user.id);
  const userInquiries = inquiries.filter((i) => i.travelerId === user.id);
  const recentListings = listings.filter((l) => l.status === 'active').slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 md:p-8 text-white animate-fade-in-up">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black">
            Welcome back, {user.name.split(' ')[0]}! 🌍
          </h1>
          <p className="text-white/80 mt-2 text-lg max-w-lg">
            Ready for your next adventure? Explore Ghana&apos;s amazing destinations or let our AI plan the perfect trip.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link to="/dashboard/ai-planner" className="px-5 py-2.5 bg-white text-emerald-700 font-bold rounded-xl hover:bg-white/90 transition-all shadow-lg active:scale-95 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Plan with AI
            </Link>
            <Link to="/listings" className="px-5 py-2.5 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
              Explore
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <Globe className="w-full h-full" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard title="Saved Favorites" value={userFavorites.length} icon={Heart} change="+2 this week" changeType="positive" />
        <StatCard title="Planned Trips" value={userTrips.length} icon={Map} change="1 upcoming" changeType="positive" />
        <StatCard title="Inquiries" value={userInquiries.length} icon={MessageSquare} change={`${userInquiries.filter((i) => i.status === 'replied').length} replied`} changeType="neutral" />
        <StatCard title="Explore Score" value="85" icon={TrendingUp} change="Top 15%" changeType="positive" />
      </div>

      {/* Quick Actions + Upcoming Trip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-bold">Quick Actions</h2>
          {[
            { to: '/dashboard/ai-planner', icon: Sparkles, title: 'AI Trip Planner', desc: 'Get a personalized itinerary', color: 'from-emerald-500/10 to-teal-500/10', iconColor: 'text-emerald-600' },
            { to: '/listings', icon: Map, title: 'Explore Listings', desc: 'Discover new experiences', color: 'from-blue-500/10 to-indigo-500/10', iconColor: 'text-blue-600' },
            { to: '/dashboard/trips', icon: Calendar, title: 'My Trips', desc: 'Manage your travel plans', color: 'from-amber-500/10 to-orange-500/10', iconColor: 'text-amber-600' },
          ].map((action) => (
            <Link key={action.to} to={action.to} className={`group flex items-center gap-4 p-4 rounded-2xl border border-border bg-gradient-to-r ${action.color} card-hover`}>
              <div className="p-3 rounded-xl bg-card shadow-sm">
                <action.icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        {/* Upcoming Trip */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold mb-3">Upcoming Trips</h2>
          {userTrips.length > 0 ? (
            <div className="space-y-3">
              {userTrips.slice(0, 2).map((trip) => (
                <div key={trip.id} className="p-5 rounded-2xl border border-border bg-card card-hover">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{trip.name}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary" />
                          {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Map className="w-4 h-4 text-primary" />
                          {trip.travelers} travelers
                        </span>
                      </div>
                      {trip.regions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {trip.regions.map((r) => (
                            <span key={r} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                              📍 {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Link to="/dashboard/trips" className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-border text-center">
              <Map className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold">No trips planned yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start planning your Ghana adventure!</p>
              <Link to="/dashboard/trips" className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90">
                Plan a Trip
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Inquiries */}
      {userInquiries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Inquiries</h2>
            <Link to="/dashboard/inquiries" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3 stagger-children">
            {userInquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="p-4 rounded-2xl border border-border bg-card card-hover flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  inq.status === 'replied' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                  inq.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <MessageSquare className={`w-5 h-5 ${
                    inq.status === 'replied' ? 'text-emerald-600' :
                    inq.status === 'new' ? 'text-blue-600' :
                    'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{inq.listingTitle}</p>
                  <p className="text-xs text-muted-foreground truncate">{inq.subject}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    inq.status === 'replied' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
                    inq.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {inq.status}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" /> {formatRelativeTime(inq.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recommended for You</h2>
          <Link to="/listings" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
            See more <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {recentListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} showFavorite />
          ))}
        </div>
      </div>
    </div>
  );
}
