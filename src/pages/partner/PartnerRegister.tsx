import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PublicNavbar from '@/components/layout/PublicNavbar';
import { BUSINESS_TYPES, GHANA_REGIONS } from '@/lib/types';
import { useAuthStore } from '@/lib/stores/authStore';

export default function PartnerRegister() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !contactPerson || !email || !phone || !city) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Registration submitted!');
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNavbar />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold">Registration Submitted!</h1>
          <p className="text-muted-foreground mt-3">
            Thank you for registering as an AfriYie partner. Our team will review your 
            application and get back to you within 24-48 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {isAuthenticated ? (
              <Link to="/partner/dashboard" className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90">
                Log In
              </Link>
            )}
            <Link to="/" className="px-6 py-2.5 border border-border font-medium rounded-lg hover:bg-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold">Become an AfriYie Partner</h1>
          <p className="text-muted-foreground mt-2">
            Register your tourism business and reach travelers worldwide
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-4">Business Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Business Name *</label>
                <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Your Business Name" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Business Type *</label>
                <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {BUSINESS_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Region *</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Accra" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Tell us about your business..." className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Person *</label>
                <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+233..." className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Building2 className="w-5 h-5" />
                Submit Registration
              </>
            )}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already a partner?{' '}
            <button type="button" onClick={() => navigate('/login')} className="text-primary font-medium hover:underline">
              Sign in to your dashboard
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
