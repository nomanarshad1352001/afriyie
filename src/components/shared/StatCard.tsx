interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  gradient?: string;
}

export default function StatCard({ title, value, icon: Icon, change, changeType = 'neutral', gradient }: StatCardProps) {
  const changeColors = {
    positive: 'text-emerald-600 dark:text-emerald-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border p-5 card-hover ${gradient || 'bg-card'}`}>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-extrabold mt-1 animate-count-up">{value}</p>
          {change && (
            <p className={`text-xs font-medium mt-1.5 ${changeColors[changeType]}`}>
              {changeType === 'positive' && '↑ '}{changeType === 'negative' && '↓ '}{change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      {/* Decorative gradient blob */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
    </div>
  );
}
