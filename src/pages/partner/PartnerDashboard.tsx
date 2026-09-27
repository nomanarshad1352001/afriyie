import { Link } from 'react-router-dom';
import { List, Mail, TrendingUp, Eye, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import Reveal from '@/components/shared/Reveal';
import { useAuthStore } from '@/lib/stores/authStore';
import { partners } from '@/lib/data/partners';
import { inquiries } from '@/lib/data/inquiries';
import { listings } from '@/lib/data/listings';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters';

const perf = [
  { m: 'Jan', views: 45, inq: 3 }, { m: 'Feb', views: 62, inq: 5 }, { m: 'Mar', views: 78, inq: 8 },
  { m: 'Apr', views: 95, inq: 12 }, { m: 'May', views: 118, inq: 15 }, { m: 'Jun', views: 145, inq: 20 }, { m: 'Jul', views: 172, inq: 25 },
];

export default function PartnerDashboard() {
  const { user } = useAuthStore();
  if (!user) return null;

  const partner = partners.find((p) => p.userId === user.id);
  const myInquiries = partner ? inquiries.filter((i) => i.partnerId === partner.id) : [];
  const myListings = partner ? listings.filter((l) => l.partnerId === partner.id) : [];
  const unread = myInquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-obsidian text-white p-8 md:p-10">
          <img src="https://images.pexels.com/photos/31817160/pexels-photo-31817160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=1200" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="relative">
            <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">Partner House</span>
            <h1 className="font-display text-3xl md:text-5xl font-black mt-2">{partner?.businessName || 'Your House'}</h1>
            <div className="flex flex-wrap gap-2.5 mt-4">
              <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-luxe ${partner?.status === 'approved' ? 'bg-primary text-primary-foreground' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'}`}>
                {partner?.status === 'approved' ? '✦ Verified House' : '◆ Under Review'}
              </span>
              {partner && <span className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-luxe border border-white/20">{partner.region}</span>}
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[<StatCard key="a" title="Live Collections" value={myListings.length} icon={List} change="+1 this month" changeType="positive" />,
          <StatCard key="b" title="Correspondence" value={myInquiries.length} icon={Mail} change={`${unread} awaiting`} changeType={unread > 0 ? 'positive' : 'neutral'} />,
          <StatCard key="c" title="House Views" value="284" icon={Eye} change="+18% this week" changeType="positive" />,
          <StatCard key="d" title="Reply Rate" value="92%" icon={TrendingUp} change="Exemplary" changeType="positive" />]
          .map((c, i) => <Reveal key={i} delay={i * 100}>{c}</Reveal>)}
      </div>

      <Reveal>
        <div className="rounded-3xl border border-border/60 bg-card p-7">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl font-bold">House Performance</h3>
            <div className="flex gap-4 text-xs text-muted-foreground font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded-full bg-gold" /> Views</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded-full bg-emerald-500" /> Inquiries</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={perf}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c9a35c" stopOpacity={0.35} /><stop offset="95%" stopColor="#c9a35c" stopOpacity={0} /></linearGradient>
                <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', color: 'var(--foreground)', fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#c9a35c" strokeWidth={2.5} fill="url(#gv)" />
              <Area type="monotone" dataKey="inq" stroke="#10b981" strokeWidth={2.5} fill="url(#gi)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-8">
        <Reveal variant="left">
          <h2 className="font-display text-2xl font-black mb-5">Quick Deeds</h2>
          <div className="space-y-3">
            {[
              { to: '/partner/listings', icon: List, t: 'Curate Collections', s: `${myListings.length} live` },
              { to: '/partner/inquiries', icon: Mail, t: 'Answer Correspondence', s: `${unread} awaiting` },
              { to: '/partner/profile', icon: ArrowUpRight, t: 'Polish House Profile', s: 'Keep it fetching' },
            ].map((a) => (
              <Link key={a.to} to={a.to} className="group flex items-center gap-4 p-5 rounded-2xl border border-border/60 bg-card card-luxe">
                <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                  <a.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm group-hover:text-primary transition-colors">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.s}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-black">Awaiting Reply</h2>
            <Link to="/partner/inquiries" className="text-xs font-bold uppercase tracking-wide-luxe text-primary hover:opacity-70">All</Link>
          </div>
          <div className="space-y-3">
            {myInquiries.slice(0, 4).map((inq) => (
              <div key={inq.id} className="p-4 rounded-2xl border border-border/60 bg-card card-luxe">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-sm truncate">{inq.subject}</p>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide shrink-0 ${getStatusColor(inq.status)}`}>{inq.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{inq.travelerName} · {formatRelativeTime(inq.createdAt)}</p>
              </div>
            ))}
            {myInquiries.length === 0 && <div className="p-8 rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">No letters yet — publish a collection.</div>}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
