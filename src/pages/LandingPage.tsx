import { Link } from 'react-router-dom';
import { Search, Star, Compass, Shield, Sparkles, ArrowRight, Globe, Users, Heart, MapPin, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import ListingCard from '@/components/shared/ListingCard';
import { listings } from '@/lib/data/listings';
import { LISTING_CATEGORIES } from '@/lib/types';

const HERO_IMAGES = [
  'https://images.pexels.com/photos/723534/pexels-photo-723534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
  'https://images.pexels.com/photos/5110556/pexels-photo-5110556.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
  'https://images.pexels.com/photos/32490286/pexels-photo-32490286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
];

const HERO_STATS = [
  { label: 'Experiences', value: '200+', icon: '🎭' },
  { label: 'Partners', value: '50+', icon: '🤝' },
  { label: 'Regions', value: '16', icon: '📍' },
  { label: 'Travelers', value: '5K+', icon: '✈️' },
];

const FEATURES = [
  { icon: Sparkles, title: 'AI Trip Planner', description: 'Get personalized itineraries powered by AI based on your budget, interests, and travel dates.', color: 'from-emerald-500 to-teal-500' },
  { icon: Compass, title: 'Curated Experiences', description: 'Hand-picked cultural tours, heritage visits, and adventure activities across all 16 regions.', color: 'from-amber-500 to-orange-500' },
  { icon: Shield, title: 'Verified Partners', description: 'Every partner is vetted to ensure quality, safety, and authentic Ghanaian hospitality.', color: 'from-blue-500 to-indigo-500' },
  { icon: Globe, title: 'All-In-One Platform', description: 'Book accommodations, experiences, transport, and festivals in a single marketplace.', color: 'from-purple-500 to-pink-500' },
];

const REGIONS_SHOWCASE = [
  { name: 'Greater Accra', tagline: 'The Vibrant Capital', emoji: '🏙️', img: 'https://images.pexels.com/photos/20236344/pexels-photo-20236344.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' },
  { name: 'Ashanti', tagline: 'Kingdom of Gold', emoji: '👑', img: 'https://images.pexels.com/photos/32490286/pexels-photo-32490286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' },
  { name: 'Central', tagline: 'Heritage & History', emoji: '🏛️', img: 'https://images.pexels.com/photos/5110556/pexels-photo-5110556.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' },
  { name: 'Volta', tagline: 'Nature\'s Paradise', emoji: '🌿', img: 'https://images.pexels.com/photos/15778472/pexels-photo-15778472.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' },
  { name: 'Northern', tagline: 'Safari & Savannah', emoji: '🦁', img: 'https://images.pexels.com/photos/15212404/pexels-photo-15212404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' },
  { name: 'Eastern', tagline: 'Mountains & Wellness', emoji: '⛰️', img: 'https://images.pexels.com/photos/7222170/pexels-photo-7222170.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' },
];

const TESTIMONIALS = [
  { name: 'Sarah J.', country: 'USA 🇺🇸', text: 'AfriYie made our Ghana trip absolutely magical. The AI planner saved us hours of research!', rating: 5 },
  { name: 'Emmanuel K.', country: 'UK 🇬🇧', text: 'As a Ghanaian in the diaspora, this platform helped me rediscover my heritage. Incredible experience.', rating: 5 },
  { name: 'Marie D.', country: 'France 🇫🇷', text: 'The cultural tours were authentic and life-changing. Best travel decision I\'ve ever made.', rating: 5 },
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [heroIdx] = useState(0);
  const featuredListings = listings.filter((l) => l.featured).slice(0, 4);
  const popularListings = listings.filter((l) => l.status === 'active').slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGES[heroIdx]}
            alt="Ghana landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" />
                AI-Powered Travel Planning
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] animate-fade-in-up delay-100">
              Experience<br />
              <span className="gradient-text" style={{ WebkitTextFillColor: 'transparent', background: 'linear-gradient(135deg, #22c55e 0%, #f59e0b 50%, #ef4444 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                Ghana.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-lg animate-fade-in-up delay-200">
              Discover rich culture, breathtaking landscapes, and warm hospitality.
              Plan your perfect trip with our AI-powered travel marketplace.
            </p>

            {/* Search Bar */}
            <div className="mt-8 animate-fade-in-up delay-300">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search experiences, hotels, attractions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl text-base"
                />
                <Link
                  to={`/listings${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all hover:shadow-lg active:scale-95"
                >
                  Search
                </Link>
              </div>
            </div>

            {/* Category Pills */}
            <div className="mt-5 flex flex-wrap gap-2 animate-fade-in-up delay-400">
              {LISTING_CATEGORIES.map((cat) => (
                <Link
                  key={cat.value}
                  to={`/listings?category=${cat.value}`}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/25 transition-all duration-200 hover:scale-105"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl animate-fade-in-up delay-500">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 transition-all duration-300">
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED LISTINGS ═══════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div className="animate-fade-in-up">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">Curated for you</span>
              <h2 className="text-3xl md:text-4xl font-black mt-2">Featured Experiences</h2>
              <p className="text-muted-foreground mt-2 text-lg">Handpicked highlights from across Ghana</p>
            </div>
            <Link
              to="/listings"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:bg-secondary text-sm font-semibold transition-all hover:shadow-md group"
            >
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} showFavorite isFavorited={false} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/listings" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
              View all listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ EXPLORE REGIONS ═══════ */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Discover</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">Explore Ghana&apos;s Regions</h2>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">Each region offers a unique blend of culture, landscapes, and unforgettable experiences</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 stagger-children">
            {REGIONS_SHOWCASE.map((region) => (
              <Link
                key={region.name}
                to={`/listings?region=${encodeURIComponent(region.name)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] card-hover"
              >
                <img src={region.img} alt={region.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <span className="text-3xl md:text-4xl block mb-1">{region.emoji}</span>
                  <h3 className="font-bold text-white text-lg md:text-xl">{region.name}</h3>
                  <p className="text-white/70 text-sm">{region.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-white/60 mt-2 group-hover:text-amber-400 transition-colors">
                    Explore <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ALL POPULAR LISTINGS ═══════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Popular</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">Trending Experiences</h2>
            <p className="text-muted-foreground mt-2 text-lg">What travelers love most about Ghana</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {popularListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} showFavorite isFavorited={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY AFRIYIE ═══════ */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 animate-fade-in-up">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">Everything You Need for Ghana</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="group relative p-6 rounded-2xl border border-border bg-card card-hover overflow-hidden">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{feature.description}</p>
                <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${feature.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ AI PLANNER CTA ═══════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/15212404/pexels-photo-15212404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1400"
              alt="Ghana safari"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-14 max-w-xl">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20 mb-5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Powered by AI
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Let AI Plan Your<br />Perfect Ghana Trip
                </h2>
                <p className="mt-4 text-white/75 text-lg leading-relaxed">
                  Share your dates, budget, and interests. Our AI generates a complete
                  itinerary with accommodations, activities, and cost estimates.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/signup" className="px-7 py-3.5 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95">
                    Get Started Free
                  </Link>
                  <Link to="/listings" className="flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                    <Play className="w-4 h-4" /> Watch Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">What Travelers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-border bg-card card-hover">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PARTNER CTA ═══════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">For Businesses</span>
              <h2 className="text-3xl md:text-4xl font-black mt-2">Grow Your Tourism Business</h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Join AfriYie and reach travelers worldwide. List your accommodations, tours,
                experiences, and transport services on Ghana&apos;s premier travel marketplace.
              </p>
              <ul className="mt-6 space-y-3">
                {['Reach international travelers', 'Dashboard analytics and insights', 'Manage bookings and inquiries', 'Professional business profile'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Star className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/partner/register" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95 group">
                Register as Partner <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 stagger-children">
              {[
                { icon: Users, label: 'Tourism Partners', value: '50+', color: 'from-emerald-500/10 to-teal-500/10' },
                { icon: MapPin, label: 'Active Locations', value: '120+', color: 'from-blue-500/10 to-indigo-500/10' },
                { icon: Heart, label: 'Favorites Saved', value: '2K+', color: 'from-rose-500/10 to-pink-500/10' },
                { icon: Globe, label: 'Countries Served', value: '30+', color: 'from-amber-500/10 to-orange-500/10' },
              ].map((stat) => (
                <div key={stat.label} className={`p-6 rounded-2xl border border-border bg-gradient-to-br ${stat.color} text-center card-hover`}>
                  <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-black">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-3xl">🌍</span>
                <span className="text-2xl font-black text-primary">AfriYie</span>
              </Link>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Connecting the world to Ghana&apos;s culture, heritage & experiences.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Experience Ghana. Experience Africa Well.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Explore</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link to="/listings" className="hover:text-primary transition-colors">All Listings</Link></li>
                <li><Link to="/listings?category=accommodation" className="hover:text-primary transition-colors">Accommodations</Link></li>
                <li><Link to="/listings?category=experience" className="hover:text-primary transition-colors">Experiences</Link></li>
                <li><Link to="/listings?category=attraction" className="hover:text-primary transition-colors">Attractions</Link></li>
                <li><Link to="/listings?category=festival" className="hover:text-primary transition-colors">Festivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/partner/register" className="hover:text-primary transition-colors">Partner With Us</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Support</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Safety</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} AfriYie. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
