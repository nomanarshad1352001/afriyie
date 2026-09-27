import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PublicNavbar from '@/components/layout/PublicNavbar';
import Reveal from '@/components/shared/Reveal';
import { BUSINESS_TYPES, GHANA_REGIONS } from '@/lib/types';
import { useAuthStore } from '@/lib/stores/authStore';

export default function PartnerRegister() {
  const { user, isAuthenticated } = useAuthStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('Greater Accra');
  const [city, setCity] = useState('');
  const [businessType, setBusinessType] = useState('hotel');
  const [description, setDescription] = useState('');

  const field = 'w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all';
  const label = 'block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !contactPerson || !email || !phone || !city) { toast.error('Complete the required fields'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); toast.success('Application received'); }, 1100);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNavbar />
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 pt-20">
          <div className="text-center max-w-md animate-scale-in">
            <div className="w-24 h-24 mx-auto rounded-full border-2 border-primary flex items-center justify-center animate-pulse-ring">
              <CheckCircle2 className="w-11 h-11 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-black mt-8">Received with <em className="gold-text not-italic font-display italic">Thanks</em></h1>
            <p className="text-muted-foreground mt-4 font-light leading-relaxed">
              Your application has joined our review queue. Our curation team examines every
              house personally — expect a letter within 24–48 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-9">
              {isAuthenticated ? (
                <Link to="/partner/dashboard" className="btn-shine px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide-luxe">Enter Your House</Link>
              ) : (
                <Link to="/login" className="btn-shine px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide-luxe">Sign In</Link>
              )}
              <Link to="/" className="px-8 py-3.5 rounded-full border border-border font-bold text-sm uppercase tracking-wide-luxe hover:bg-secondary transition-colors">Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="pt-20">
        <div className="relative h-56 overflow-hidden">
          <img src="https://images.pexels.com/photos/32490286/pexels-photo-32490286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=1600" alt="Ghanaian ceremony" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30" />
          <div className="absolute bottom-6 left-0 right-0 text-center px-4">
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Join the Collective</span>
            <h1 className="font-display text-3xl md:text-5xl font-black text-white mt-2">Partner <em className="gold-text">Registration</em></h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <Reveal>
            <div className="text-center mb-10">
              <Crown className="w-10 h-10 text-primary mx-auto mb-3 animate-float" />
              <p className="text-muted-foreground font-light max-w-md mx-auto">Present your house to an audience of discerning travelers from thirty nations.</p>
            </div>
          </Reveal>

          <form onSubmit={submit} className="space-y-6">
            <Reveal delay={80}>
              <div className="rounded-3xl border border-border/60 bg-card p-7">
                <h3 className="font-display text-xl font-bold mb-5">The House</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2"><label className={label}>Business Name *</label><input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Your house's name" className={field} /></div>
                  <div><label className={label}>Type *</label><select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className={field}>{BUSINESS_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
                  <div><label className={label}>Region *</label><select value={region} onChange={(e) => setRegion(e.target.value)} className={field}>{GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}</select></div>
                  <div><label className={label}>City *</label><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Accra" className={field} /></div>
                  <div className="sm:col-span-2"><label className={label}>Your Story</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="In a few elegant lines..." className={`${field} resize-none`} /></div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-3xl border border-border/60 bg-card p-7">
                <h3 className="font-display text-xl font-bold mb-5">Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={label}>Contact Person *</label><input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className={field} /></div>
                  <div><label className={label}>Email *</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} /></div>
                  <div><label className={label}>Phone *</label><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+233 ..." className={field} /></div>
                </div>
              </div>
            </Reveal>

            <button type="submit" disabled={loading} className="btn-shine w-full py-5 rounded-full bg-primary text-primary-foreground font-black text-sm uppercase tracking-luxe hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" /> : <><Crown className="w-4 h-4" /> Present for Review</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
