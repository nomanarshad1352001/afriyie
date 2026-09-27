import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, Globe, ArrowLeft, Heart, Send, CheckCircle2, Share2, X, Shield, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import PublicNavbar from '@/components/layout/PublicNavbar';
import Reveal from '@/components/shared/Reveal';
import { listings } from '@/lib/data/listings';
import { useAuthStore } from '@/lib/stores/authStore';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [message, setMessage] = useState('');
  const [favorited, setFavorited] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [sending, setSending] = useState(false);

  const listing = listings.find((l) => l.id === id);
  if (!listing) return <Navigate to="/404" replace />;

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) { toast.error('Please write a short message'); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setInquirySent(true);
      toast.success('Inquiry delivered to the house');
      setTimeout(() => { setInquiryOpen(false); setInquirySent(false); setMessage(''); }, 2200);
    }, 900);
  };

  const related = listings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Cinematic gallery */}
      <div className="relative pt-20">
        <div className="relative h-[62vh] min-h-[420px] overflow-hidden">
          <img src={listing.images[activeImg]} alt={listing.title} className="w-full h-full object-cover transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/40" />

          <div className="absolute inset-6 md:inset-10 border border-white/15 pointer-events-none rounded-sm" />

          <Link to="/listings" className="absolute top-6 md:top-10 left-6 md:left-10 z-10 flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Collections
          </Link>

          <div className="absolute bottom-8 md:bottom-12 left-6 md:left-10 right-6 md:right-10 z-10">
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">{listing.category} · {listing.region}</span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white mt-2 max-w-3xl leading-tight animate-fade-in-up">
              {listing.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 mt-4 text-white/75 text-sm animate-fade-in-up delay-200">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{listing.city}</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-gold text-gold" />{listing.rating} — {listing.reviewCount} reviews</span>
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-wide-luxe">{listing.priceRange}</span>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {listing.images.length > 1 && (
          <div className="absolute -bottom-1 right-6 md:right-10 translate-y-1/2 hidden md:flex gap-2 z-20">
            {listing.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-primary scale-110 shadow-xl' : 'border-white/30 opacity-70 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main */}
        <div className="lg:col-span-2 space-y-10">
          <Reveal>
            <h2 className="text-primary text-[10px] font-bold tracking-luxe uppercase">The Story</h2>
            <p className="font-display text-2xl md:text-3xl leading-relaxed mt-3 font-medium">{listing.description}</p>
            <div className="hairline mt-8 opacity-60" />
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-primary text-[10px] font-bold tracking-luxe uppercase mb-5">Privileges & Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {listing.amenities.map((a, i) => (
                <div key={a} className="flex items-center gap-3 p-4 rounded-2xl border border-border/60 bg-card card-luxe" style={{ transitionDelay: `${i * 30}ms` }}>
                  <span className="w-1.5 h-1.5 rotate-45 bg-primary shrink-0" />
                  <span className="text-sm font-semibold">{a}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, v: 'Verified', l: 'Partner house' },
                { icon: Star, v: `${listing.rating}`, l: `${listing.reviewCount} reviews` },
                { icon: Sparkles, v: 'AI Ready', l: 'Add to itinerary' },
              ].map((s) => (
                <div key={s.l} className="text-center p-5 rounded-2xl border border-border/60 bg-card">
                  <s.icon className="w-6 h-6 text-primary mx-auto" />
                  <p className="font-display text-lg font-bold mt-2">{s.v}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide-luxe">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="text-primary text-[10px] font-bold tracking-luxe uppercase mb-3">Setting</h2>
            <p className="text-muted-foreground text-sm mb-4">{listing.address}</p>
            <div className="h-56 rounded-3xl bg-secondary/60 border border-border/60 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
              <div className="text-center relative">
                <MapPin className="w-9 h-9 text-primary mx-auto animate-float" />
                <p className="font-display text-xl font-bold mt-2">{listing.city}, {listing.region}</p>
                <p className="text-xs text-muted-foreground mt-1">Interactive maps arrive with production</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <div>
          <Reveal variant="right" className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-border/60 bg-card p-7 shadow-xl shadow-black/5 frame-luxe">
              <p className="text-[10px] text-muted-foreground uppercase tracking-luxe">Investment</p>
              <p className="font-display text-3xl font-black gold-text mt-1">{listing.priceRange}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Star className="w-3 h-3 fill-gold text-gold" /> {listing.rating} · {listing.reviewCount} verified reviews</p>

              <div className="hairline my-6 opacity-50" />

              <div className="space-y-3">
                <button
                  onClick={() => { if (!user) { toast.error('Kindly sign in first'); return; } setInquiryOpen(true); }}
                  className="btn-shine w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide-luxe hover:shadow-xl hover:shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Enquire Now
                </button>
                <button
                  onClick={() => { setFavorited(!favorited); toast.success(favorited ? 'Removed from your vault' : 'Saved to your vault'); }}
                  className={`w-full py-4 rounded-2xl border-2 font-bold text-sm uppercase tracking-wide-luxe transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${favorited ? 'border-rose-300 bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:border-rose-500/40' : 'border-border hover:border-primary/50'}`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-400 text-rose-400' : ''}`} /> {favorited ? 'In Your Vault' : 'Save to Vault'}
                </button>
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied to clipboard'); }} className="w-full py-3 rounded-2xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> Share this house
                </button>
              </div>

              <div className="hairline my-6 opacity-50" />

              <p className="text-[10px] text-muted-foreground uppercase tracking-luxe mb-3">Direct to the house</p>
              <div className="space-y-3 text-sm">
                <a href={`mailto:${listing.contactEmail}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"><Mail className="w-4 h-4 text-primary shrink-0" />{listing.contactEmail}</a>
                <a href={`tel:${listing.contactPhone}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"><Phone className="w-4 h-4 text-primary shrink-0" />{listing.contactPhone}</a>
                {listing.website && <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"><Globe className="w-4 h-4 text-primary shrink-0" />Visit website</a>}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <Reveal>
            <div className="hairline opacity-60 mb-12" />
            <h2 className="font-display text-3xl md:text-4xl font-black text-center">In the Same <em className="gold-text not-italic font-display italic">Spirit</em></h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
            {related.map((l, i) => (
              <Reveal key={l.id} delay={i * 120} variant="scale">
                <Link to={`/listings/${l.id}`} className="group block">
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-muted card-luxe">
                    <img src={l.images[0]} alt={l.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[900ms]" />
                  </div>
                  <h3 className="font-display text-xl font-bold mt-4 group-hover:text-primary transition-colors">{l.title}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide-luxe mt-1">{l.city} · {l.region}</p>
                  <p className="font-display font-bold text-primary mt-1">{l.priceRange}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Enquiry modal */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 glass p-4 animate-fade-in" onClick={() => setInquiryOpen(false)}>
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl animate-scale-in relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setInquiryOpen(false)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary transition-colors"><X className="w-4 h-4" /></button>
            {inquirySent ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-black mt-5">Delivered</h3>
                <p className="text-muted-foreground mt-2 text-sm">The house will reply to you shortly by email.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-black">Enquire</h3>
                <p className="text-sm text-muted-foreground mt-1">Direct line to {listing.title}</p>
                <form onSubmit={handleSendInquiry} className="mt-6 space-y-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Dates, party size, special occasions..."
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                  <button type="submit" disabled={sending} className="btn-shine w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide-luxe hover:shadow-xl hover:shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2">
                    {sending ? <div className="w-5 h-5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Enquiry</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
