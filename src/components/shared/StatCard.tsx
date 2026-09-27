interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export default function StatCard({ title, value, icon: Icon, change, changeType = 'neutral' }: StatCardProps) {
  const changeColors = {
    positive: 'text-emerald-600 dark:text-emerald-400',
    negative: 'text-rose-600 dark:text-rose-400',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 card-luxe group">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-luxe">{title}</p>
          <p className="font-display text-4xl font-black mt-2">{value}</p>
          {change && (
            <p className={`text-xs font-bold mt-2 ${changeColors[changeType]}`}>
              {changeType === 'positive' && '▲ '}{changeType === 'negative' && '▼ '}{change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
          <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </div>
  );
}
