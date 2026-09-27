import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Crown, Compass } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/authStore';
import { UserRole } from '@/lib/types';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('traveler');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error('Kindly complete all fields'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    setTimeout(() => {
      if (signup(name, email, password, role)) {
        toast.success('Welcome to the AfriYie collective');
        navigate(role === 'partner' ? '/partner/dashboard' : '/dashboard');
      } else toast.error('An account with this email already exists');
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen flex bg-obsidian text-white">
      {/* Left cinematic */}
      <div className="hidden lg:block lg:w-[55%] relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/32490286/pexels-photo-32490286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1000"
          alt="Ghanaian drummers in ceremony"
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        <Link to="/" className="absolute top-10 left-10 flex items-center gap-3 group z-10">
          <div className="w-11 h-11 rounded-full border-2 border-primary flex items-center justify-center group-hover:rotate-[20deg] transition-transform duration-500 bg-black/30 glass">
            <span className="font-display text-xl font-black text-primary">A</span>
          </div>
          <div className="leading-none">
            <span className="font-display text-2xl font-bold text-white">AfriYie</span>
            <span className="block text-[9px] tracking-luxe uppercase text-white/60 mt-0.5">Ghana · Reimagined</span>
          </div>
        </Link>
        <div className="absolute bottom-14 left-10 right-10 animate-fade-in-up delay-300">
          <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Membership</span>
          <h2 className="font-display text-4xl xl:text-5xl font-black mt-3 leading-tight">
            Begin your <br /><em className="gold-text">Ghanaian odyssey.</em>
          </h2>
          <div className="hairline w-40 my-5 opacity-70" />
          <div className="space-y-3 text-white/60 font-light">
            <p>◆ Bespoke AI-composed itineraries</p>
            <p>◆ Curated estates & reserved experiences</p>
            <p>◆ Direct dialogue with our partner houses</p>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 relative flex items-center justify-center p-5 sm:p-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <Link to="/" className="lg:hidden flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
              <span className="font-display text-base font-black text-primary">A</span>
            </div>
            <span className="font-display text-xl font-bold">AfriYie</span>
          </Link>
          <div className="lg:ml-auto"><ThemeToggle /></div>
        </div>

        <div className="relative w-full max-w-md z-10">
          <div className="animate-fade-in-up">
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">New membership</span>
            <h1 className="font-display text-4xl font-black mt-2">Join the <em className="gold-text">Collective</em></h1>
            <p className="text-white/50 mt-2 font-light">One account. Every corner of Ghana.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-9 space-y-5 animate-fade-in-up delay-200">
            <div>
              <label className="block text-[10px] font-bold tracking-luxe uppercase text-white/50 mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(201,163,92,0.15)] transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-luxe uppercase text-white/50 mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(201,163,92,0.15)] transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-luxe uppercase text-white/50 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Six characters or more" className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/[0.03] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(201,163,92,0.15)] transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-luxe uppercase text-white/50 mb-3">I join as</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: 'traveler' as const, icon: Compass, title: 'Traveler', sub: 'Discover & plan' },
                  { v: 'partner' as const, icon: Crown, title: 'Partner House', sub: 'Host & earn' },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => setRole(opt.v)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all active:scale-95 ${role === opt.v ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(201,163,92,0.15)]' : 'border-white/10 hover:border-white/25'}`}
                  >
                    <opt.icon className={`w-5 h-5 ${role === opt.v ? 'text-primary' : 'text-white/40'}`} />
                    <p className="font-bold mt-2 text-sm">{opt.title}</p>
                    <p className="text-[11px] text-white/40">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-shine w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm tracking-wide-luxe uppercase transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/50 animate-fade-in-up delay-400">
            Already a member? <Link to="/login" className="font-bold gold-text hover:opacity-80 transition-opacity">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
