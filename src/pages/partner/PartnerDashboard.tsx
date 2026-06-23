import { Link } from 'react-router-dom';
import { List, Mail, TrendingUp, Eye, ArrowRight, Star, DollarSign, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import { useAuthStore } from '@/lib/stores/authStore';
import { partners } from '@/lib/data/partners';
import { inquiries } from '@/lib/data/inquiries';
import { listings } from '@/lib/data/listings';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

const performanceData = [
  { month: 'Jan', views: 45, inquiries: 3 },
  { month: 'Feb', views: 62, inquiries: 5 },
  { month: 'Mar', views: 78, inquiries: 8 },
  { month: 'Apr', views: 95, inquiries: 12 },
  { month: 'May', views: 110, inquiries: 15 },
  { month: 'Jun', views: 145, inquiries: 20 },
  { month: 'Jul', views: 168, inquiries: 25 },
];

export default function PartnerDashboard() {
  const { user } = useAuthStore();
  if (!user) return null;

  const partner = partners.find((p) => p.userId === user.id);
  const partnerInquiries = partner ? inquiries.filter((i) => i.partnerId === partner.id) : [];
  const partnerListings = partner ? listings.filter((l) => l.partnerId === partner.id) : [];
  const newInquiries = partnerInquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-6 md:p-8 text-white animate-fade-in-up">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black">Partner Dashboard</h1>
          <p className="text-white/80 mt-1">{partner ? partner.businessName : 'Complete your business profile'}</p>
          {partner && (
            <div className="flex flex-wrap gap-3 mt-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${partner.status === 'approved' ? 'bg-white/20' : 'bg-amber-400/30'}`}>
                {partner.status === 'approved' ? '✅ Verified Partner' : '⏳ Pending Review'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20">
                📍 {partner.region}
              </span>
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
          <TrendingUp className="w-full h-full" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard title="Active Listings" value={partnerListings.length} icon={List} change="+1 this month" changeType="positive" />
        <StatCard title="Total Inquiries" value={partnerInquiries.length} icon={Mail} change={`${newInquiries} new`} changeType={newInquiries > 0 ? 'positive' : 'neutral'} />
        <StatCard title="Profile Views" value="284" icon={Eye} change="+18% vs last week" changeType="positive" />
        <StatCard title="Response Rate" value="92%" icon={TrendingUp} change="Above average" changeType="positive" />
      </div>

      {/* Performance Chart */}
      <div className="p-5 rounded-2xl border border-border bg-card animate-fade-in-up delay-200">
        <h3 className="font-bold text-lg mb-4">Performance Overview</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="inqGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--foreground)', fontSize: '12px' }} />
            <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fill="url(#viewsGrad)" />
            <Area type="monotone" dataKey="inquiries" stroke="#22c55e" strokeWidth={2} fill="url(#inqGrad)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-3 text-xs text-muted-foreground justify-center font-medium">
          <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-blue-500 rounded-full" /> Views</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-emerald-500 rounded-full" /> Inquiries</span>
        </div>
      </div>

      {/* Quick Actions + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Quick Actions</h2>
          {[
            { to: '/partner/listings', icon: List, title: 'Manage Listings', desc: `${partnerListings.length} active`, color: 'text-blue-600' },
            { to: '/partner/inquiries', icon: Mail, title: 'View Inquiries', desc: `${newInquiries} unread`, color: 'text-emerald-600' },
            { to: '/partner/profile', icon: Users, title: 'Edit Profile', desc: 'Update your info', color: 'text-amber-600' },
          ].map((action) => (
            <Link key={action.to} to={action.to} className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card card-hover">
              <div className="p-3 rounded-xl bg-secondary"><action.icon className={`w-5 h-5 ${action.color}`} /></div>
              <div className="flex-1">
                <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Key Metrics</h2>
          {[
            { icon: Star, label: 'Avg Rating', value: '4.7 / 5', trend: '+0.2' },
            { icon: DollarSign, label: 'Est. Bookings', value: '$12,400', trend: '+28%' },
            { icon: Eye, label: 'Click-through', value: '8.2%', trend: '+1.4%' },
          ].map((metric) => (
            <div key={metric.label} className="p-4 rounded-2xl border border-border bg-card flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <metric.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="font-bold">{metric.value}</p>
              </div>
              <span className="text-xs font-bold text-emerald-600">↑ {metric.trend}</span>
            </div>
          ))}
        </div>

        {/* Recent Inquiries */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Recent Inquiries</h2>
            <Link to="/partner/inquiries" className="text-xs font-bold text-primary hover:underline">View all</Link>
          </div>
          {partnerInquiries.length > 0 ? (
            <div className="space-y-3">
              {partnerInquiries.slice(0, 4).map((inq) => (
                <div key={inq.id} className="p-3 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors">
                  <p className="font-semibold text-sm truncate">{inq.subject}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-muted-foreground">{inq.travelerName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(inq.status)}`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{formatRelativeTime(inq.createdAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-border text-center">
              <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No inquiries yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
