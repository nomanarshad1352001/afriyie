import { useState } from 'react';
import { Save, Upload, Globe, Phone, Mail, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/authStore';
import { partners } from '@/lib/data/partners';
import { BUSINESS_TYPES, GHANA_REGIONS } from '@/lib/types';
import { getStatusColor } from '@/lib/utils/formatters';

export default function PartnerProfile() {
  const { user } = useAuthStore();
  const partner = partners.find((p) => p.userId === user?.id);

  const [businessName, setBusinessName] = useState(partner?.businessName || '');
  const [contactPerson, setContactPerson] = useState(partner?.contactPerson || user?.name || '');
  const [email, setEmail] = useState(partner?.email || user?.email || '');
  const [phone, setPhone] = useState(partner?.phone || '');
  const [whatsapp, setWhatsapp] = useState(partner?.whatsapp || '');
  const [region, setRegion] = useState<string>(partner?.region || 'Greater Accra');
  const [city, setCity] = useState(partner?.city || '');
  const [businessType, setBusinessType] = useState<string>(partner?.businessType || 'hotel');
  const [website, setWebsite] = useState(partner?.website || '');
  const [description, setDescription] = useState(partner?.description || '');
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !email || !phone) {
      toast.error('Please fill required fields');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile updated successfully!');
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Business Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your business information</p>
        </div>
        {partner && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(partner.status)}`}>
            {partner.status}
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Info */}
        <div className="p-5 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Business Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Business Name *</label>
              <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Business Type</label>
              <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                {BUSINESS_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1"><Globe className="w-3 h-3" /> Website</label>
              <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="p-5 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Person</label>
              <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1"><Mail className="w-3 h-3" /> Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone *</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp</label>
              <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="p-5 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="p-5 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Business Photos</h3>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Drag & drop photos here or click to browse</p>
            <button type="button" onClick={() => toast.success('Photo upload — production feature')} className="mt-3 px-4 py-2 bg-secondary text-sm rounded-lg hover:bg-secondary/80 transition-colors">
              Select Files
            </button>
          </div>
          {partner?.photos && partner.photos.length > 0 && (
            <div className="flex gap-2 mt-4">
              {partner.photos.map((photo, i) => (
                <div key={i} className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                  <img src={photo} alt="Business" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Profile
        </button>
      </form>
    </div>
  );
}
