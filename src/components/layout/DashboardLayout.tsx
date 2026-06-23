import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Heart, Map, MessageSquare, Sparkles,
  Building2, List, Mail, UserCircle, Users, ShieldCheck,
  ClipboardList, BarChart3, LogOut, Menu, X, ChevronRight,
  Bell, Search, Settings,
} from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { getInitials } from '@/lib/utils/formatters';
import ThemeToggle from './ThemeToggle';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

function getNavItems(role: string): NavItem[] {
  switch (role) {
    case 'traveler':
      return [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Favorites', href: '/dashboard/favorites', icon: Heart, badge: 4 },
        { label: 'My Trips', href: '/dashboard/trips', icon: Map },
        { label: 'Inquiries', href: '/dashboard/inquiries', icon: MessageSquare, badge: 2 },
        { label: 'AI Planner', href: '/dashboard/ai-planner', icon: Sparkles },
      ];
    case 'partner':
      return [
        { label: 'Dashboard', href: '/partner/dashboard', icon: LayoutDashboard },
        { label: 'My Listings', href: '/partner/listings', icon: List },
        { label: 'Inquiries', href: '/partner/inquiries', icon: Mail, badge: 3 },
        { label: 'Business Profile', href: '/partner/profile', icon: Building2 },
      ];
    case 'admin':
      return [
        { label: 'Analytics', href: '/admin/dashboard', icon: BarChart3 },
        { label: 'Users', href: '/admin/users', icon: Users },
        { label: 'Partners', href: '/admin/partners', icon: ShieldCheck, badge: 2 },
        { label: 'Listings', href: '/admin/listings', icon: ClipboardList },
        { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
      ];
    default:
      return [];
  }
}

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  if (!user) return null;

  const navItems = getNavItems(user.role);
  const roleBadge = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentNavItem = navItems.find((item) => item.href === location.pathname);

  const roleColors: Record<string, string> = {
    admin: 'from-purple-600 to-indigo-600',
    partner: 'from-blue-600 to-cyan-600',
    traveler: 'from-emerald-600 to-teal-600',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-card border-r border-border transform transition-transform duration-300 ease-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 animate-slide-in-left' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="text-2xl">🌍</span>
              <span className="text-xl font-black text-primary">AfriYie</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-secondary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Card */}
          <div className="p-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${roleColors[user.role]} text-white`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{user.name}</p>
                  <p className="text-xs text-white/70">{user.email}</p>
                  <span className="inline-block px-2 py-0.5 text-[10px] rounded-full bg-white/20 font-bold mt-1 uppercase tracking-wide">
                    {roleBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Navigation
            </p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? '' : 'group-hover:text-primary'} transition-colors`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-border space-y-1">
            <Link to="/listings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <UserCircle className="w-5 h-5 shrink-0" />
              Browse Listings
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all">
              <LogOut className="w-5 h-5 shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-card/80 glass border-b border-border">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-secondary transition-colors">
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <nav className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              {pathSegments.map((segment, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" />
                  <span className={idx === pathSegments.length - 1 ? 'text-foreground font-semibold' : ''}>
                    {currentNavItem && idx === pathSegments.length - 1
                      ? currentNavItem.label
                      : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')}
                  </span>
                </span>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={`hidden md:block relative transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Quick search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-background transition-all"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-card animate-pulse-glow" />
            </button>

            <ThemeToggle />

            <button className="p-2 rounded-xl hover:bg-secondary transition-colors hidden md:block">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8 animate-fade-in-up">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
