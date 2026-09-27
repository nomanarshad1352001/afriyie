import { Link } from 'react-router-dom';
import { Users, Building2, List, MessageSquare, TrendingUp, Globe, DollarSign, Eye, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import Reveal from '@/components/shared/Reveal';
import { users } from '@/lib/data/users';
import { partners } from '@/lib/data/partners';
import { listings } from '@/lib/data/listings';
import { inquiries } from '@/lib/data/inquiries';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

const monthly = [
  { m: 'Jan', users: 12, inq: 5, rev: 2400 }, { m: 'Feb', users: 18, inq: 8, rev: 3200 },
  { m: 'Mar', users: 25, inq: 15, rev: 5100 }, { m: 'Apr', users: 32, inq: 22, rev: 6400 },
  { m: 'May', users: 40, inq: 28, rev: 7900 }, { m: 'Jun', users: 48, inq: 35, rev: 9800 }, { m: 'Jul', users: 55, inq: 42, rev: 12100 },
];
const categories = [
  { name: 'Estates', n: listings.filter((l) => l.category === 'accommodation').length },
  { name: 'Journeys', n: listings.filter((l) => l.category === 'experience').length },
  { name: 'Wonders', n: listings.filter((l) => l.category === 'attraction').length },
  { name: 'Transit', n: listings.filter((l) => l.category === 'transportation').length },
  { name: 'Festivals', n: listings.filter((l) => l.category === 'festival').length },
  { name: 'Wellness', n: listings.filter((l) => l.category === 'wellness').length },
];
const regions = [
  { name: 'Greater Accra', v: 35 }, { name: 'Central', v: 25 }, { name: 'Ashanti', v: 20 }, { name: 'Volta', v: 12 }, { name: 'Other', v: 8 },
];
const GOLD = ['#c9a35c', '#8b7355', '#d9c29a', '#6b5a3e', '#e8dcc4'];

const activity = [
  { t: 'New member joined', d: 'Fatima Mohammed — Nigeria', time: '2h ago', icon: Users },
  { t: 'House application', d: 'Accra Street Food Tours', time: '5h ago', icon: Building2 },
  { t: 'Inquiry received', d: 'Safari enquiry for January', time: '8h ago', icon: MessageSquare },
  { t: 'Collection approved', d: 'Mole Private Safari', time: '1d ago', icon: CheckCircle2 },
  { t: 'Journey composed', d: '14-day heritage programme', time: '1d ago', icon: TrendingUp },
  { t: 'House verified', d: 'Ghana Black Car Concierge', time: '2d ago', icon: CheckCircle2 },
];

const tip = { backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', color: 'var(--foreground)', fontSize: 12 };

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">The Atelier</span>
            <h1 className="font-display text-4xl font-black mt-1">Command <em className="gold-text not-italic font-display italic">Analytics</em></h1>
            <p className="text-muted-foreground mt-2">The collective, precisely measured</p>
          </div>
          <Link to="/admin/partners" className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-luxe active:scale-95 transition-all">
            <Building2 className="w-4 h-4" /> Review Houses
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[<StatCard key="a" title="Members" value={users.length} icon={Users} change="+3 this week" changeType="positive" />,
          <StatCard key="b" title="Partner Houses" value={partners.length} icon={Building2} change={`${partners.filter((p) => p.status === 'pending').length} awaiting`} />,
          <StatCard key="c" title="Live Collections" value={listings.filter((l) => l.status === 'active').length} icon={List} change="+5 this month" changeType="positive" />,
          <StatCard key="d" title="Letters" value={inquiries.length} icon={MessageSquare} change={`${inquiries.filter((i) => i.status === 'new').length} fresh`} changeType="positive" />]
          .map((c, i) => <Reveal key={i} delay={i * 90}>{c}</Reveal>)}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, v: '92%', l: 'Reply Rate', c: 'text-emerald-500' },
          { icon: Globe, v: '30+', l: 'Nations', c: 'text-sky-500' },
          { icon: DollarSign, v: '$48.5K', l: 'Revenue', c: 'text-gold' },
          { icon: Eye, v: '12.6K', l: 'Visits', c: 'text-purple-500' },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 80}>
            <div className="p-5 rounded-3xl border border-border/60 bg-card card-luxe text-center">
              <s.icon className={`w-7 h-7 ${s.c} mx-auto`} />
              <p className="font-display text-2xl font-black mt-2">{s.v}</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-luxe mt-0.5">{s.l}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Reveal variant="left">
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-bold">Revenue Composition</h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-black">▲ 38%</span>
            </div>
            <ResponsiveContainer width="100%" height={270}>
              <AreaChart data={monthly}>
                <defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c9a35c" stopOpacity={0.35} /><stop offset="95%" stopColor="#c9a35c" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tip} />
                <Area type="monotone" dataKey="rev" stroke="#c9a35c" strokeWidth={3} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <h3 className="font-display text-xl font-bold mb-5">Members & Letters</h3>
            <ResponsiveContainer width="100%" height={270}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tip} />
                <Line type="monotone" dataKey="users" stroke="#c9a35c" strokeWidth={3} dot={{ r: 4, fill: '#c9a35c' }} />
                <Line type="monotone" dataKey="inq" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9' }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-3 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded-full bg-gold" /> Members</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded-full bg-sky-500" /> Letters</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Reveal>
          <div className="rounded-3xl border border-border/60 bg-card p-7 h-full">
            <h3 className="font-display text-xl font-bold mb-5">By Category</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categories} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={10} width={72} />
                <Tooltip contentStyle={tip} />
                <Bar dataKey="n" fill="#c9a35c" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl border border-border/60 bg-card p-7 h-full">
            <h3 className="font-display text-xl font-bold mb-5">By Region</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={regions} cx="50%" cy="50%" innerRadius={50} outerRadius={88} dataKey="v" paddingAngle={4} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {regions.map((_, i) => <Cell key={i} fill={GOLD[i % GOLD.length]} />)}
                </Pie>
                <Tooltip contentStyle={tip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="rounded-3xl border border-border/60 bg-card p-7 h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-bold">Pulse</h3>
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse-ring" />
            </div>
            <div className="space-y-4 max-h-[240px] overflow-y-auto pr-1">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <a.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold">{a.t}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.d}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 mt-1">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-bold">Houses Awaiting</h3>
              <Link to="/admin/partners" className="text-xs font-bold uppercase tracking-wide-luxe text-primary flex items-center gap-1">All <ArrowUpRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-3">
              {partners.filter((p) => p.status === 'pending').map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3.5 rounded-2xl bg-secondary/50">
                  <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center shrink-0"><Building2 className="w-4 h-4 text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{p.businessName}</p>
                    <p className="text-xs text-muted-foreground">{p.contactPerson} · {p.region}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${getStatusColor(p.status)}`}>{p.status}</span>
                </div>
              ))}
              {partners.filter((p) => p.status === 'pending').length === 0 && <p className="text-sm text-muted-foreground text-center py-4">The queue is clear ✦</p>}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl border border-border/60 bg-card p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-bold">Latest Letters</h3>
              <Link to="/admin/inquiries" className="text-xs font-bold uppercase tracking-wide-luxe text-primary flex items-center gap-1">All <ArrowUpRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-3">
              {inquiries.slice(0, 4).map((inq) => (
                <div key={inq.id} className="flex items-center gap-3 p-3.5 rounded-2xl bg-secondary/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><MessageSquare className="w-4 h-4 text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{inq.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{inq.travelerName} → {inq.partnerName}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">{formatRelativeTime(inq.createdAt)}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
