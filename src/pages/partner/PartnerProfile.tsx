import { useState } from 'react';
import { Save, Upload, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Reveal from '@/components/shared/Reveal';
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
  const [region, setRegion] = useState<string>(partner?.region || 'Greater Accra');
  const [city, setCity] = useState(partner?.city || '');
  const [businessType, setBusinessType] = useState<string>(partner?.businessType || 'hotel');
  const [website, setWebsite] = useState(partner?.website || '');
  const [description, setDescription] = useState(partner?.description || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !email || !phone) { toast.error('Name, email and phone are essential'); return; }
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); toast.success('Profile polished'); setTimeout(() => setSaved(false), 2500); }, 900);
  };

  const field = 'w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all';
  const label = 'block text-[10px] font-bold uppercase tracking-luxe text-muted-foreground mb-2';

  return (
    <div className="space-y-8 max-w-3xl">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Your identity</span>
            <h1 className="font-display text-4xl font-black mt-1">House <em className="gold-text not-italic font-display italic">Profile</em></h1>
          </div>
          {partner && <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-luxe ${getStatusColor(partner.status)}`}>{partner.status}</span>}
        </div>
      </Reveal>

      <form onSubmit={save} className="space-y-6">
        <Reveal delay={80}>
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <h3 className="font-display text-xl font-bold mb-5">The House</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2"><label className={label}>Business Name *</label><input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className={field} /></div>
              <div><label className={label}>Category</label>
                <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className={field}>
                  {BUSINESS_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select></div>
              <div><label className={label}>Website</label><input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" className={field} /></div>
              <div className="sm:col-span-2"><label className={label}>Your Story</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${field} resize-none`} /></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <h3 className="font-display text-xl font-bold mb-5">Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className={label}>Contact Person</label><input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className={field} /></div>
              <div><label className={label}>Email *</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} /></div>
              <div><label className={label}>Phone *</label><input value={phone} onChange={(e) => setPhone(e.target.value)} className={field} /></div>
              <div><label className={label}>Region</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className={field}>
                  {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select></div>
              <div><label className={label}>City</label><input value={city} onChange={(e) => setCity(e.target.value)} className={field} /></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <h3 className="font-display text-xl font-bold mb-5">Imagery</h3>
            <button type="button" onClick={() => toast.success('Storage arrives with production')} className="w-full border-2 border-dashed border-border rounded-2xl p-10 hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <Upload className="w-10 h-10 text-primary mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-sm font-semibold mt-3">Drop imagery or browse</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
            </button>
          </div>
        </Reveal>

        <button type="submit" disabled={saving} className="btn-shine inline-flex items-center gap-2 px-9 py-4 rounded-full bg-primary text-primary-foreground font-black text-sm uppercase tracking-luxe hover:shadow-xl hover:shadow-primary/25 transition-all active:scale-95 disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Polished' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
