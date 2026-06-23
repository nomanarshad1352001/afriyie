import { useState } from 'react';
import { Search, MoreVertical, UserCheck, UserX, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { users as allUsers } from '@/lib/data/users';
import { formatDate, getInitials } from '@/lib/utils/formatters';
import { UserRole } from '@/lib/types';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    const styles: Record<UserRole, string> = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      partner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      traveler: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    return styles[role];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">{allUsers.length} total users</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Roles</option>
          <option value="traveler">Travelers</option>
          <option value="partner">Partners</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Role</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Country</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Joined</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="bg-card hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                      {getInitials(u.name)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(u.role)}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{u.country || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1 text-xs font-medium ${u.isActive ? 'text-green-600' : 'text-red-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{formatDate(u.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setActionMenu(actionMenu === u.id ? null : u.id)}
                      className="p-1 rounded hover:bg-secondary"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {actionMenu === u.id && (
                      <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border bg-popover shadow-lg z-10 animate-fade-in">
                        <button
                          onClick={() => { toast.success(`${u.name} ${u.isActive ? 'deactivated' : 'activated'}`); setActionMenu(null); }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-secondary text-left"
                        >
                          {u.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => { toast.success(`Role updated for ${u.name}`); setActionMenu(null); }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-secondary text-left"
                        >
                          <Shield className="w-4 h-4" />
                          Change Role
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredUsers.map((u) => (
          <div key={u.id} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                  {getInitials(u.name)}
                </div>
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(u.role)}`}>
                {u.role}
              </span>
            </div>
            <div className="flex justify-between mt-3 text-xs text-muted-foreground">
              <span>{u.country || 'Unknown'}</span>
              <span className={u.isActive ? 'text-green-600' : 'text-red-500'}>
                {u.isActive ? '● Active' : '● Inactive'}
              </span>
              <span>{formatDate(u.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <span className="text-5xl block mb-3">👥</span>
          <p className="text-muted-foreground">No users match your search</p>
        </div>
      )}
    </div>
  );
}
