import { Link } from 'react-router-dom';
import { Users, Building2, List, MessageSquare, TrendingUp, Globe, DollarSign, Eye, ArrowRight, Activity, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import { users } from '@/lib/data/users';
import { partners } from '@/lib/data/partners';
import { listings } from '@/lib/data/listings';
import { inquiries } from '@/lib/data/inquiries';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

const categoryData = [
  { name: 'Accommodation', count: listings.filter((l) => l.category === 'accommodation').length, fill: '#22c55e' },
  { name: 'Experience', count: listings.filter((l) => l.category === 'experience').length, fill: '#8b5cf6' },
  { name: 'Attraction', count: listings.filter((l) => l.category === 'attraction').length, fill: '#f59e0b' },
  { name: 'Transport', count: listings.filter((l) => l.category === 'transportation').length, fill: '#3b82f6' },
  { name: 'Festival', count: listings.filter((l) => l.category === 'festival').length, fill: '#ec4899' },
  { name: 'Wellness', count: listings.filter((l) => l.category === 'wellness').length, fill: '#14b8a6' },
];

const monthlyData = [
  { month: 'Jan', users: 12, inquiries: 5, revenue: 2400 },
  { month: 'Feb', users: 18, inquiries: 8, revenue: 3200 },
  { month: 'Mar', users: 25, inquiries: 15, revenue: 4800 },
  { month: 'Apr', users: 32, inquiries: 22, revenue: 6100 },
  { month: 'May', users: 40, inquiries: 28, revenue: 7500 },
  { month: 'Jun', users: 48, inquiries: 35, revenue: 9200 },
  { month: 'Jul', users: 55, inquiries: 42, revenue: 11800 },
];

const regionData = [
  { name: 'Greater Accra', value: 35 },
  { name: 'Central', value: 25 },
  { name: 'Ashanti', value: 20 },
  { name: 'Volta', value: 12 },
  { name: 'Other', value: 8 },
];

const COLORS = ['#22c55e', '#f59e0b', '#3b82f6', '#8b5cf6', '#6b7280'];

const recentActivities = [
  { action: 'New user registered', detail: 'Fatima Mohammed from Nigeria', time: '2 hours ago', emoji: '👤', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { action: 'Partner application received', detail: 'Accra Street Food Tours', time: '5 hours ago', emoji: '🏢', color: 'bg-amber-100 dark:bg-amber-900/30' },
  { action: 'New inquiry received', detail: 'Safari booking for January', time: '8 hours ago', emoji: '💬', color: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { action: 'Listing approved', detail: 'Mole National Park Safari', time: '1 day ago', emoji: '✅', color: 'bg-green-100 dark:bg-green-900/30' },
  { action: 'AI itinerary generated', detail: '14-day cultural tour', time: '1 day ago', emoji: '🤖', color: 'bg-purple-100 dark:bg-purple-900/30' },
  { action: 'Payment received', detail: 'Premium partner subscription', time: '2 days ago', emoji: '💰', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { action: 'Review submitted', detail: '5-star for Cape Coast Tour', time: '2 days ago', emoji: '⭐', color: 'bg-orange-100 dark:bg-orange-900/30' },
  { action: 'Partner verified', detail: 'Ghana Express Transport', time: '3 days ago', emoji: '🛡️', color: 'bg-indigo-100 dark:bg-indigo-900/30' },
];

const tooltipStyle = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  color: 'var(--foreground)',
  fontSize: '12px',
  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/partners" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" /> Review Partners
          </Link>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard title="Total Users" value={users.length} icon={Users} change="+3 this week" changeType="positive" />
        <StatCard title="Partners" value={partners.length} icon={Building2} change={`${partners.filter((p) => p.status === 'pending').length} pending review`} changeType="neutral" />
        <StatCard title="Active Listings" value={listings.filter((l) => l.status === 'active').length} icon={List} change="+5 this month" changeType="positive" />
        <StatCard title="Inquiries" value={inquiries.length} icon={MessageSquare} change={`${inquiries.filter((i) => i.status === 'new').length} new`} changeType="positive" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        {[
          { icon: TrendingUp, label: 'Response Rate', value: '92%', color: 'text-emerald-500' },
          { icon: Globe, label: 'Countries', value: '30+', color: 'text-blue-500' },
          { icon: DollarSign, label: 'Est. Revenue', value: '$45K', color: 'text-amber-500' },
          { icon: Eye, label: 'Page Views', value: '12.5K', color: 'text-purple-500' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-2xl border border-border bg-card text-center card-hover">
            <stat.icon className={`w-7 h-7 ${stat.color} mx-auto mb-2`} />
            <p className="text-xl font-black">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Revenue Trend</h3>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">+38% ↑</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Chart */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> User & Inquiry Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="users" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#22c55e' }} />
              <Line type="monotone" dataKey="inquiries" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-3 text-xs text-muted-foreground justify-center font-medium">
            <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-emerald-500 rounded-full" /> Users</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-blue-500 rounded-full" /> Inquiries</span>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Bar Chart */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><List className="w-5 h-5 text-primary" /> By Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={10} width={85} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Region Pie Chart */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> By Region</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={regionData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} dataKey="value" paddingAngle={4} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {regionData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Activity Feed</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-glow" />
          </div>
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center text-sm shrink-0`}>
                  {activity.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Partners */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Pending Partner Reviews</h3>
            <Link to="/admin/partners" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {partners.filter((p) => p.status === 'pending').length > 0 ? (
            <div className="space-y-3">
              {partners.filter((p) => p.status === 'pending').map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{p.businessName}</p>
                    <p className="text-xs text-muted-foreground">{p.contactPerson} • {p.region}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(p.status)}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">All partners reviewed ✅</p>
          )}
        </div>

        {/* New Inquiries */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Latest Inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div key={inq.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  inq.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'
                }`}>
                  <MessageSquare className={`w-5 h-5 ${
                    inq.status === 'new' ? 'text-blue-600' : 'text-emerald-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{inq.subject}</p>
                  <p className="text-xs text-muted-foreground">{inq.travelerName} → {inq.partnerName}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">{formatRelativeTime(inq.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
