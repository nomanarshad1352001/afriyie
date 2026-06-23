import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/authStore';
import { demoCredentials } from '@/lib/data/users';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  if (isAuthenticated && user) {
    const route = user.role === 'admin' ? '/admin/dashboard' : user.role === 'partner' ? '/partner/dashboard' : '/dashboard';
    navigate(route, { replace: true });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast.success('Welcome back!');
        const u = useAuthStore.getState().user;
        navigate(u?.role === 'admin' ? '/admin/dashboard' : u?.role === 'partner' ? '/partner/dashboard' : '/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
      setLoading(false);
    }, 600);
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo1234');
    setLoading(true);
    setTimeout(() => {
      const success = login(demoEmail, 'demo1234');
      if (success) {
        toast.success('Logged in!');
        const u = useAuthStore.getState().user;
        navigate(u?.role === 'admin' ? '/admin/dashboard' : u?.role === 'partner' ? '/partner/dashboard' : '/dashboard');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/723534/pexels-photo-723534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
          alt="Ghana beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="animate-fade-in-up">
            <span className="text-5xl block mb-4">🌍</span>
            <h1 className="text-4xl font-black text-white">AfriYie</h1>
            <p className="text-xl text-white/80 mt-2">Experience Ghana. Experience Africa Well.</p>
            <div className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-fit">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/80">AI-Powered Travel Planning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="text-xl font-black text-primary">AfriYie</span>
            </Link>
            <ThemeToggle />
          </div>

          <h2 className="text-3xl font-black">Welcome back</h2>
          <p className="text-muted-foreground mt-1">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 pr-12 transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]">
              {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <><LogIn className="w-4 h-4" /> Sign in</>}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-5 rounded-2xl border border-border bg-card">
            <p className="font-bold text-sm mb-3 flex items-center gap-2">
              🔑 Demo Accounts
              <span className="text-xs text-muted-foreground font-normal">(click to login)</span>
            </p>
            <div className="space-y-2">
              {demoCredentials.map((cred) => (
                <button key={cred.email} onClick={() => handleDemoLogin(cred.email)} disabled={loading} className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:bg-secondary hover:border-primary/30 transition-all text-sm disabled:opacity-50 group">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      cred.role === 'Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                      cred.role === 'Partner' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                    }`}>{cred.role}</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{cred.email}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{cred.password}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
