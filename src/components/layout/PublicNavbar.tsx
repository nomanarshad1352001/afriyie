import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { getInitials } from '@/lib/utils/formatters';
import ThemeToggle from './ThemeToggle';

export default function PublicNavbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const dashboardRoute = user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'partner' ? '/partner/dashboard' : '/dashboard';

  const handleLogout = () => { logout(); navigate('/'); setMobileOpen(false); };

  return (
    <header className="sticky top-0 z-50 bg-card/70 glass border-b border-border/50 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🌍</span>
            <span className="text-xl font-black text-primary">AfriYie</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { to: '/listings', label: 'Explore' },
              { to: '/partner/register', label: 'Become a Partner' },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link to={dashboardRoute} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-secondary transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold group-hover:scale-110 transition-transform">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-sm font-semibold">{user.name.split(' ')[0]}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </Link>
                <button onClick={handleLogout} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-all hover:text-destructive">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold hover:bg-secondary rounded-xl transition-all">Log in</Link>
                <Link to="/signup" className="px-5 py-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">Sign up</Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl hover:bg-secondary transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in-up">
          <div className="p-4 space-y-2">
            <Link to="/listings" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors">Explore Listings</Link>
            <Link to="/partner/register" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors">Become a Partner</Link>
            <hr className="border-border" />
            {isAuthenticated && user ? (
              <>
                <Link to={dashboardRoute} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{getInitials(user.name)}</div>
                  <span className="font-semibold">My Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors font-semibold">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-3 border border-border rounded-xl font-semibold hover:bg-secondary transition-colors">Log in</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
