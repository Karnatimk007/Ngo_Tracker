import { 
  Lock, 
  FileCheck, 
  Users, 
  AlertTriangle, 
  Wallet, 
  BarChart3,
  ArrowRight 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Lock,
    title: 'Milestone-Based Locking',
    description: 'Funds are locked in smart contracts and released only when milestones are verified and approved by validators.',
  },
  {
    icon: FileCheck,
    title: 'IPFS Proof Storage',
    description: 'All expense receipts and milestone proofs are stored on IPFS with immutable hash verification.',
  },
  {
    icon: Users,
    title: '2/3 Multisig Validation',
    description: 'Critical fund releases require approval from at least 2 out of 3 independent validators.',
  },
  {
    icon: AlertTriangle,
    title: 'Fraud Detection',
    description: 'Automated monitoring detects suspicious patterns and can freeze funds to protect donors.',
  },
  {
    icon: Wallet,
    title: 'Emergency Withdrawals',
    description: 'Donors can withdraw their contributions if milestones fail or fraud is detected.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track donations, milestone progress, and NGO performance with live blockchain data.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Built for Trust & Transparency
          </h2>
          <p className="text-muted-foreground text-lg">
            Every feature designed to ensure your donations make real impact, with complete visibility into fund utilization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-2 w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-display text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
