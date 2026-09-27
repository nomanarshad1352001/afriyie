import { useState } from 'react';
import { Search, UserCheck, UserX, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import Reveal from '@/components/shared/Reveal';
import { users as allUsers } from '@/lib/data/users';
import { formatDate, getInitials } from '@/lib/utils/formatters';
import { UserRole } from '@/lib/types';

const roleStyles: Record<UserRole, string> = {
  admin: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30',
  partner: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30',
  traveler: 'bg-primary/15 text-primary border border-primary/30',
};

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [deactivated, setDeactivated] = useState<string[]>(allUsers.filter((u) => !u.isActive).map((u) => u.id));

  const filtered = allUsers.filter((u) => {
    const s = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const r = !roleFilter || u.role === roleFilter;
    return s && r;
  });

  const toggleActive = (id: string, name: string) => {
    setDeactivated((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
    toast.success(`${name} ${deactivated.includes(id) ? 'reinstated' : 'suspended'}`);
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <span className="text-primary text-[10px] font-bold tracking-luxe uppercase">The registry</span>
        <h1 className="font-display text-4xl font-black mt-1">Members</h1>
        <p className="text-muted-foreground mt-2">{allUsers.length} souls on the books</p>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search names or emails..." className="w-full pl-11 pr-4 py-3.5 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-5 py-3.5 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold">
            <option value="">All roles</option>
            <option value="traveler">Travelers</option>
            <option value="partner">Partners</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </Reveal>

      <div className="space-y-3">
        {filtered.map((u, i) => {
          const inactive = deactivated.includes(u.id);
          return (
            <Reveal key={u.id} delay={i * 50}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-3xl border border-border/60 bg-card card-luxe">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shrink-0 border ${inactive ? 'bg-secondary text-muted-foreground border-border' : 'bg-primary text-primary-foreground border-primary'}`}>
                    {getInitials(u.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-5 flex-wrap pl-16 sm:pl-0">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${roleStyles[u.role]}`}>{u.role}</span>
                  <span className="text-xs text-muted-foreground hidden md:block">{u.country || '—'}</span>
                  <span className="text-xs text-muted-foreground hidden md:block">{formatDate(u.createdAt)}</span>
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${inactive ? 'text-rose-500' : 'text-emerald-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${inactive ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse-ring'}`} />
                    {inactive ? 'Suspended' : 'Active'}
                  </span>
                  <div className="flex gap-1.5">
                    <button onClick={() => toggleActive(u.id, u.name)} className="p-2.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title={inactive ? 'Reinstate' : 'Suspend'}>
                      {inactive ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                    </button>
                    <button onClick={() => toast.success('Role editor (demo)')} className="p-2.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Change role">
                      <Shield className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 rounded-3xl border border-dashed border-border">
          <p className="font-display text-2xl font-black">No souls match</p>
          <p className="text-muted-foreground mt-2 text-sm">Adjust your search.</p>
        </div>
      )}
    </div>
  );
}
