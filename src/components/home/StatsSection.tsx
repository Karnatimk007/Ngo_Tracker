import { TrendingUp, Users, Target, ShieldCheck } from 'lucide-react';
import { mockTransparencyStats } from '@/lib/mock-data';

const stats = [
  {
    label: 'Total Donations',
    value: `${mockTransparencyStats.totalDonations} ETH`,
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    label: 'Verified NGOs',
    value: mockTransparencyStats.totalNGOs.toString(),
    icon: Users,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    label: 'Milestones Completed',
    value: `${mockTransparencyStats.completedMilestones}/${mockTransparencyStats.totalMilestones}`,
    icon: Target,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    label: 'Frauds Prevented',
    value: mockTransparencyStats.fraudsPrevented.toString(),
    icon: ShieldCheck,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

export function StatsSection() {
  return (
    <section className="py-16 border-y bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="font-display text-2xl sm:text-3xl font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
