import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Crown } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { getInitials } from '@/lib/utils/formatters';
import ThemeToggle from './ThemeToggle';

export default function PublicNavbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = onLanding && !scrolled;
  const dashboardRoute = user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'partner' ? '/partner/dashboard' : '/dashboard';

  const handleLogout = () => { logout(); navigate('/'); setMobileOpen(false); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent ? 'bg-transparent border-transparent' : 'bg-background/85 glass border-b border-border/60'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center group-hover:rotate-[20deg] transition-transform duration-500">
              <span className="font-display text-lg font-black text-primary">A</span>
            </div>
            <div className="leading-none">
              <span className={`font-display text-xl font-bold tracking-wide ${transparent ? 'text-white' : 'text-foreground'}`}>AfriYie</span>
              <span className={`block text-[9px] tracking-luxe uppercase mt-0.5 ${transparent ? 'text-white/60' : 'text-muted-foreground'}`}>Ghana · Reimagined</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[{ to: '/listings', label: 'Collections' }, { to: '/partner/register', label: 'Partner With Us' }].map((link) => (
              <Link key={link.to} to={link.to} className={`relative px-5 py-2 text-sm font-semibold tracking-wide transition-colors group ${transparent ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                {link.label}
                <span className="absolute left-5 right-5 -bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className={transparent ? '[&_button]:text-white [&_button:hover]:bg-white/10' : ''}>
              <ThemeToggle />
            </div>
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link to={dashboardRoute} className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all hover:scale-[1.03] active:scale-95 ${transparent ? 'border-white/30 text-white hover:bg-white/10' : 'border-border hover:border-primary/50'}`}>
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[11px] font-black">{getInitials(user.name)}</div>
                  <span className="text-sm font-semibold">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className={`p-2 rounded-full transition-colors ${transparent ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-muted-foreground hover:text-destructive'}`} aria-label="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className={`text-sm font-semibold transition-colors ${transparent ? 'text-white/85 hover:text-white' : 'text-foreground/80 hover:text-foreground'}`}>Sign In</Link>
                <Link to="/signup" className="btn-shine px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 flex items-center gap-2">
                  <Crown className="w-3.5 h-3.5" /> Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <div className={transparent ? '[&_button]:text-white [&_button:hover]:bg-white/10' : ''}>
              <ThemeToggle />
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`p-2 rounded-lg transition-colors ${transparent ? 'text-white hover:bg-white/10' : 'hover:bg-secondary'}`} aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in-up">
          <div className="p-5 space-y-1">
            <Link to="/listings" onClick={() => setMobileOpen(false)} className="block px-4 py-3.5 rounded-xl font-display text-lg font-semibold hover:bg-secondary transition-colors">Collections</Link>
            <Link to="/partner/register" onClick={() => setMobileOpen(false)} className="block px-4 py-3.5 rounded-xl font-display text-lg font-semibold hover:bg-secondary transition-colors">Partner With Us</Link>
            <div className="hairline my-3" />
            {isAuthenticated && user ? (
              <>
                <Link to={dashboardRoute} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-secondary transition-colors">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-black">{getInitials(user.name)}</div>
                  <span className="font-semibold">My Suite</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-destructive hover:bg-destructive/10 transition-colors font-semibold">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-center px-4 py-3.5 border border-border rounded-full font-bold hover:bg-secondary transition-colors">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-center px-4 py-3.5 bg-primary text-primary-foreground rounded-full font-bold transition-colors">Join Us</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
