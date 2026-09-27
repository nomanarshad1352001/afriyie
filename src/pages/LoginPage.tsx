import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Crown, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/authStore';
import { demoCredentials } from '@/lib/data/users';
import ThemeToggle from '@/components/layout/ThemeToggle';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const DEMO_PASSWORD = 'demo1234';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autofilling, setAutofilling] = useState(false);
  const [typingField, setTypingField] = useState<'email' | 'password' | null>(null);
  const { login, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const abortRef = useRef(false);

  if (isAuthenticated && user) {
    const route = user.role === 'admin' ? '/admin/dashboard' : user.role === 'partner' ? '/partner/dashboard' : '/dashboard';
    navigate(route, { replace: true });
  }

  const goToDashboard = () => {
    const u = useAuthStore.getState().user;
    navigate(u?.role === 'admin' ? '/admin/dashboard' : u?.role === 'partner' ? '/partner/dashboard' : '/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Kindly complete both fields'); return; }
    setLoading(true);
    setTimeout(() => {
      if (login(email, password)) { toast.success('Welcome back to AfriYie'); goToDashboard(); }
      else toast.error('Credentials not recognized — try a demo account below');
      setLoading(false);
    }, 700);
  };

  /* Typewriter auto-fill: animates the demo credentials into the form character-by-character, then signs in */
  const handleDemoLogin = async (demoEmail: string) => {
    if (autofilling || loading) return;
    abortRef.current = false;
    setAutofilling(true);
    setEmail('');
    setPassword('');

    setTypingField('email');
    for (let i = 1; i <= demoEmail.length; i++) {
      if (abortRef.current) return;
      setEmail(demoEmail.slice(0, i));
      await sleep(40);
    }
    await sleep(220);

    setTypingField('password');
    for (let i = 1; i <= DEMO_PASSWORD.length; i++) {
      if (abortRef.current) return;
      setPassword(DEMO_PASSWORD.slice(0, i));
      await sleep(55);
    }
    setTypingField(null);
    await sleep(350);

    setLoading(true);
    await sleep(650);
    if (login(demoEmail, DEMO_PASSWORD)) {
      toast.success('Signed in with demo account');
      goToDashboard();
    }
    setLoading(false);
    setAutofilling(false);
  };

  return (
    <div className="min-h-screen flex bg-obsidian text-white">
      {/* ═══ Left — cinematic panel ═══ */}
      <div className="hidden lg:block lg:w-[55%] relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/31817160/pexels-photo-31817160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1000"
          alt="Luxury villa at sunset"
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Floating brand */}
        <Link to="/" className="absolute top-10 left-10 flex items-center gap-3 group z-10">
          <div className="w-11 h-11 rounded-full border-2 border-primary flex items-center justify-center group-hover:rotate-[20deg] transition-transform duration-500 bg-black/30 glass">
            <span className="font-display text-xl font-black text-primary">A</span>
          </div>
          <div className="leading-none">
            <span className="font-display text-2xl font-bold text-white">AfriYie</span>
            <span className="block text-[9px] tracking-luxe uppercase text-white/60 mt-0.5">Ghana · Reimagined</span>
          </div>
        </Link>

        {/* Bottom quote block */}
        <div className="absolute bottom-14 left-10 right-10 animate-fade-in-up delay-300">
          <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Members' Entrance</span>
          <h2 className="font-display text-4xl xl:text-5xl font-black mt-3 leading-tight">
            The doors of <br /><em className="gold-text">Ghana</em> await you.
          </h2>
          <div className="hairline w-40 my-5 opacity-70" />
          <p className="text-white/60 font-light max-w-sm">Sign in to your private suite of itineraries, estates and reserved experiences.</p>
        </div>
      </div>

      {/* ═══ Right — form ═══ */}
      <div className="flex-1 relative flex items-center justify-center p-5 sm:p-10 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-primary/10 animate-orbit-slow pointer-events-none" />

        {/* Mobile brand + theme */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <Link to="/" className="lg:hidden flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
              <span className="font-display text-base font-black text-primary">A</span>
            </div>
            <span className="font-display text-xl font-bold">AfriYie</span>
          </Link>
          <div className="lg:ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="relative w-full max-w-md z-10">
          <div className="animate-fade-in-up">
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Welcome back</span>
            <h1 className="font-display text-4xl font-black mt-2">Enter your <em className="gold-text">Suite</em></h1>
            <p className="text-white/50 mt-2 font-light">Your journey continues where it left off.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-9 space-y-5 animate-fade-in-up delay-200">
            {/* Email */}
            <div className="group">
              <label className="block text-[10px] font-bold tracking-luxe uppercase text-white/50 mb-2">Email Address</label>
              <div className={`relative rounded-2xl border transition-all duration-300 ${typingField === 'email' ? 'border-primary shadow-[0_0_0_3px_rgba(201,163,92,0.15)]' : 'border-white/15 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(201,163,92,0.15)]'}`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={autofilling}
                  placeholder="you@example.com"
                  className={`w-full px-5 py-4 rounded-2xl bg-white/[0.03] text-white placeholder:text-white/30 focus:outline-none ${typingField === 'email' ? 'type-caret' : ''}`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold tracking-luxe uppercase text-white/50 mb-2">Password</label>
              <div className={`relative rounded-2xl border transition-all duration-300 ${typingField === 'password' ? 'border-primary shadow-[0_0_0_3px_rgba(201,163,92,0.15)]' : 'border-white/15 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(201,163,92,0.15)]'}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={autofilling}
                  placeholder="••••••••"
                  className={`w-full px-5 py-4 pr-14 rounded-2xl bg-white/[0.03] text-white placeholder:text-white/30 focus:outline-none ${typingField === 'password' ? 'type-caret' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={() => toast.success('Reset link sent (demo)')} className="text-xs text-white/40 hover:text-primary transition-colors">Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={loading || autofilling}
              className="btn-shine w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm tracking-wide-luxe uppercase transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7 animate-fade-in-up delay-300">
            <div className="hairline flex-1 opacity-60" />
            <span className="text-[10px] tracking-luxe uppercase text-white/40 flex items-center gap-2"><Sparkles className="w-3 h-3" /> One-touch demo</span>
            <div className="hairline flex-1 opacity-60" />
          </div>

          {/* Demo accounts — click autofills via typewriter */}
          <div className="space-y-2.5 animate-fade-in-up delay-400">
            {demoCredentials.map((cred, i) => (
              <button
                key={cred.email}
                onClick={() => handleDemoLogin(cred.email)}
                disabled={autofilling || loading}
                className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-primary/50 hover:bg-primary/10 transition-all group disabled:opacity-50 animate-fade-in-up"
                style={{ animationDelay: `${0.45 + i * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black ${
                    cred.role === 'Admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' :
                    cred.role === 'Partner' ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' :
                    'bg-primary/20 text-primary border border-primary/30'
                  }`}>
                    {cred.role === 'Admin' ? <Crown className="w-4 h-4" /> : cred.role[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{cred.role} Demo</p>
                    <p className="text-[11px] text-white/40 font-mono">{cred.email}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-luxe uppercase text-white/40 group-hover:text-primary transition-colors">
                  Auto-fill <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            ))}
            <p className="text-center text-[11px] text-white/30 pt-1">Click any account — credentials type themselves in.</p>
          </div>

          <p className="mt-8 text-center text-sm text-white/50 animate-fade-in-up delay-600">
            New to AfriYie?{' '}
            <Link to="/signup" className="font-bold gold-text hover:opacity-80 transition-opacity">Request membership</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
