import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
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
    if (!name || !email || !password) { toast.error('Please fill in all fields'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    setTimeout(() => {
      const success = signup(name, email, password, role);
      if (success) { toast.success('Account created!'); navigate(role === 'partner' ? '/partner/dashboard' : '/dashboard'); }
      else toast.error('Email already exists');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="https://images.pexels.com/photos/32490286/pexels-photo-32490286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" alt="Ghana culture" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-12 animate-fade-in-up">
          <span className="text-5xl block mb-4">🌍</span>
          <h1 className="text-4xl font-black text-white">Join AfriYie</h1>
          <p className="text-xl text-white/80 mt-2">Start your Ghana journey today.</p>
          <div className="mt-8 space-y-3">
            {['🗺️ AI-powered trip planning', '❤️ Save favorite experiences', '💬 Connect with local partners', '🎉 Discover festivals & culture'].map((item) => (
              <p key={item} className="text-white/70 flex items-center gap-3">{item}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2"><span className="text-2xl">🌍</span><span className="text-xl font-black text-primary">AfriYie</span></Link>
            <ThemeToggle />
          </div>

          <h2 className="text-3xl font-black">Create account</h2>
          <p className="text-muted-foreground mt-1">Join the AfriYie community</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ v: 'traveler' as const, emoji: '🧳', label: 'Traveler' }, { v: 'partner' as const, emoji: '🏢', label: 'Tourism Partner' }].map((opt) => (
                  <button key={opt.v} type="button" onClick={() => setRole(opt.v)} className={`p-4 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${role === opt.v ? 'border-primary bg-primary/5 text-primary shadow-md' : 'border-border hover:border-primary/30'}`}>
                    <span className="text-2xl block mb-1">{opt.emoji}</span>{opt.label}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]">
              {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <><UserPlus className="w-4 h-4" /> Create account</>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
