import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, Globe, ArrowLeft, Heart, Send, CheckCircle, Share2, Clock, Users, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import PublicNavbar from '@/components/layout/PublicNavbar';
import { listings } from '@/lib/data/listings';
import { useAuthStore } from '@/lib/stores/authStore';
import { getCategoryColor, getCategoryIcon, formatDate } from '@/lib/utils/formatters';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [message, setMessage] = useState('');
  const [favorited, setFavorited] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const listing = listings.find((l) => l.id === id);
  if (!listing) return <Navigate to="/404" replace />;

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) { toast.error('Please enter a message'); return; }
    setInquirySent(true);
    toast.success('Inquiry sent successfully!');
    setTimeout(() => { setInquiryOpen(false); setInquirySent(false); setMessage(''); }, 2500);
  };

  const relatedListings = listings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Back */}
        <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </Link>

        {/* Hero Image Gallery */}
        <div className="rounded-3xl overflow-hidden relative animate-fade-in-up">
          <div className="aspect-[16/7] bg-muted relative">
            {!imgLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
            <img
              src={listing.images[activeImg]}
              alt={listing.title}
              className={`w-full h-full object-cover transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-5 left-5">
              <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm ${getCategoryColor(listing.category)}`}>
                {getCategoryIcon(listing.category)} {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
              </span>
            </div>

            {listing.featured && (
              <div className="absolute top-5 right-5">
                <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-xl">⭐ Featured</span>
              </div>
            )}

            {/* Action Buttons on Image */}
            <div className="absolute bottom-5 right-5 flex gap-2">
              <button onClick={() => { setFavorited(!favorited); toast.success(favorited ? 'Removed from favorites' : 'Saved!'); }} className="p-3 rounded-xl bg-white/90 dark:bg-black/60 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95 transition-all">
                <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-200'}`} />
              </button>
              <button onClick={() => toast.success('Link copied!')} className="p-3 rounded-xl bg-white/90 dark:bg-black/60 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95 transition-all">
                <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {listing.images.length > 1 && (
            <div className="flex gap-2 p-3 bg-card border-t border-border">
              {listing.images.map((img, idx) => (
                <button key={idx} onClick={() => { setActiveImg(idx); setImgLoaded(false); }} className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-primary scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up delay-100">
            <div>
              <h1 className="text-2xl md:text-3xl font-black">{listing.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4 text-primary" />{listing.city}, {listing.region}</span>
                <span className="flex items-center gap-1.5 font-medium"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />{listing.rating} ({listing.reviewCount} reviews)</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />Listed {formatDate(listing.createdAt)}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-bold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
            </div>

            {listing.amenities.length > 0 && (
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h2 className="text-lg font-bold mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listing.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, title: 'Verified', desc: 'Partner verified' },
                { icon: Users, title: `${listing.reviewCount}+`, desc: 'Reviews' },
                { icon: Star, title: `${listing.rating}/5`, desc: 'Rating' },
              ].map((signal) => (
                <div key={signal.title} className="text-center p-4 rounded-2xl border border-border bg-card">
                  <signal.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-bold">{signal.title}</p>
                  <p className="text-xs text-muted-foreground">{signal.desc}</p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-bold mb-3">Location</h2>
              <p className="text-muted-foreground text-sm mb-3">{listing.address}</p>
              <div className="rounded-xl bg-secondary h-52 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-2 animate-float" />
                  <p className="font-semibold">{listing.city}, {listing.region}</p>
                  <p className="text-xs text-muted-foreground mt-1">Interactive map in production</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 animate-fade-in-up delay-200">
            {/* Price Card */}
            <div className="p-6 rounded-2xl border border-border bg-card sticky top-20 shadow-lg">
              <div className="text-3xl font-black text-primary">{listing.priceRange}</div>
              <div className="mt-5 space-y-3">
                <button onClick={() => { if (!user) { toast.error('Please log in first'); return; } setInquiryOpen(true); }} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                  <Send className="w-5 h-5" /> Send Inquiry
                </button>
                <button onClick={() => { setFavorited(!favorited); toast.success(favorited ? 'Removed' : 'Saved!'); }} className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 border-2 font-bold rounded-xl transition-all active:scale-[0.98] ${favorited ? 'border-red-300 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-900/20' : 'border-border hover:border-primary/50 hover:bg-secondary'}`}>
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500' : ''}`} />
                  {favorited ? 'Saved ♥' : 'Save to Favorites'}
                </button>
              </div>

              <hr className="my-5 border-border" />

              <h3 className="font-bold mb-3">Contact</h3>
              <div className="space-y-3 text-sm">
                <a href={`mailto:${listing.contactEmail}`} className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />{listing.contactEmail}
                </a>
                <a href={`tel:${listing.contactPhone}`} className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />{listing.contactPhone}
                </a>
                {listing.website && (
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="w-4 h-4 shrink-0" />Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedListings.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black mb-6">Similar Experiences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {relatedListings.map((l) => (
                <Link key={l.id} to={`/listings/${l.id}`} className="group bg-card border border-border rounded-2xl overflow-hidden card-hover">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold group-hover:text-primary transition-colors">{l.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{l.city}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />{l.rating}</span>
                      <span className="text-sm font-bold text-primary">{l.priceRange}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-card rounded-2xl border border-border p-6 shadow-2xl animate-scale-in">
            {inquirySent ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black">Inquiry Sent!</h3>
                <p className="text-muted-foreground mt-2">The partner will respond via email shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-black mb-1">Contact Partner</h3>
                <p className="text-sm text-muted-foreground mb-5">Send a message about {listing.title}</p>
                <form onSubmit={handleSendInquiry} className="space-y-4">
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Hi, I'm interested in this listing..." className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setInquiryOpen(false)} className="flex-1 px-4 py-3 border border-border rounded-xl hover:bg-secondary transition-colors font-semibold">Cancel</button>
                    <button type="submit" className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-bold active:scale-95">Send</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
