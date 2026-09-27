import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Heart, Map, MessageSquare, Sparkles,
  Building2, List, Mail, Users, ShieldCheck, ClipboardList,
  BarChart3, LogOut, Menu, X, ChevronRight, Bell,
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
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'My Vault', href: '/dashboard/favorites', icon: Heart, badge: 4 },
        { label: 'Journeys', href: '/dashboard/trips', icon: Map },
        { label: 'Correspondence', href: '/dashboard/inquiries', icon: MessageSquare, badge: 2 },
        { label: 'AI Composer', href: '/dashboard/ai-planner', icon: Sparkles },
      ];
    case 'partner':
      return [
        { label: 'Overview', href: '/partner/dashboard', icon: LayoutDashboard },
        { label: 'Collection', href: '/partner/listings', icon: List },
        { label: 'Correspondence', href: '/partner/inquiries', icon: Mail, badge: 3 },
        { label: 'House Profile', href: '/partner/profile', icon: Building2 },
      ];
    case 'admin':
      return [
        { label: 'Analytics', href: '/admin/dashboard', icon: BarChart3 },
        { label: 'Members', href: '/admin/users', icon: Users },
        { label: 'Partner Houses', href: '/admin/partners', icon: ShieldCheck, badge: 2 },
        { label: 'Collections', href: '/admin/listings', icon: ClipboardList },
        { label: 'Correspondence', href: '/admin/inquiries', icon: MessageSquare },
      ];
    default:
      return [];
  }
}

const ROLE_META: Record<string, { label: string; note: string }> = {
  traveler: { label: 'Traveler', note: 'Member' },
  partner: { label: 'Partner House', note: 'Host' },
  admin: { label: 'Administrator', note: 'Atelier' },
};

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const navItems = getNavItems(user.role);
  const meta = ROLE_META[user.role];

  const handleLogout = () => { logout(); navigate('/'); };

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentNavItem = navItems.find((item) => item.href === location.pathname);

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 glass lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar — obsidian luxury */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-obsidian text-white border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 animate-slide-in-left' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center group-hover:rotate-[20deg] transition-transform duration-500">
                <span className="font-display text-lg font-black text-primary">A</span>
              </div>
              <div className="leading-none">
                <span className="font-display text-xl font-bold">AfriYie</span>
                <span className="block text-[8px] tracking-luxe uppercase text-white/50 mt-0.5">{meta.note} Suite</span>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Member card */}
          <div className="p-5">
            <div className="p-4 rounded-2xl border border-primary/25 bg-primary/5 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="flex items-center gap-3 relative">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black animate-pulse-ring">
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold truncate">{user.name}</p>
                  <p className="text-[11px] text-white/50 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-black uppercase tracking-luxe">{meta.label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <p className="px-3 pb-2 text-[9px] font-bold text-white/35 tracking-luxe uppercase">Your Suite</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${isActive ? 'bg-primary/15 text-primary' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}
                >
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-primary" />}
                  <item.icon className={`w-[18px] h-[18px] shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black">{item.badge}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-1">
            <Link to="/listings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/55 hover:bg-white/5 hover:text-white transition-all">
              <ClipboardList className="w-[18px] h-[18px]" /> Browse Collections
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-rose-300/80 hover:bg-rose-500/10 hover:text-rose-300 transition-all">
              <LogOut className="w-[18px] h-[18px]" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-72">
        <header className="sticky top-0 z-30 flex items-center justify-between h-18 py-4 px-4 md:px-8 bg-background/80 glass border-b border-border/60">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-secondary transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <nav className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">AfriYie</Link>
              {pathSegments.map((seg, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-primary/50" />
                  <span className={idx === pathSegments.length - 1 ? 'font-display font-bold text-foreground' : ''}>
                    {currentNavItem && idx === pathSegments.length - 1 ? currentNavItem.label : seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ')}
                  </span>
                </span>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="relative p-2.5 rounded-xl hover:bg-secondary transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-ring" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        <main className="p-4 md:p-8 animate-fade-in-up">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
