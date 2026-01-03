import { Eye, TrendingUp, Users, Target, ShieldCheck, ExternalLink, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { 
  DonationTrendsChart, 
  MilestoneStatusChart, 
  CategoryDistributionChart,
  DonorActivityChart 
} from '@/components/transparency/TransparencyCharts';
import { mockTransparencyStats, mockMilestones, mockDonations, mockExpenses } from '@/lib/mock-data';
import { format } from 'date-fns';

const Transparency = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Eye className="h-4 w-4" />
              <span>Public Transparency Dashboard</span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">
              Complete Transparency, Zero Trust Required
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              All data on this page is pulled directly from blockchain events and IPFS. 
              Every transaction, approval, and expense is immutably recorded and publicly verifiable.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Total Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold">{mockTransparencyStats.totalDonations} ETH</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  +12.5% this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Verified NGOs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold">{mockTransparencyStats.totalNGOs}</p>
                <p className="text-sm text-muted-foreground mt-1">100% verified</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Milestone Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold">
                  {Math.round((mockTransparencyStats.completedMilestones / mockTransparencyStats.totalMilestones) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockTransparencyStats.completedMilestones}/{mockTransparencyStats.totalMilestones} completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Frauds Prevented
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold">{mockTransparencyStats.fraudsPrevented}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ${(mockTransparencyStats.fraudsPrevented * 15000).toLocaleString()} protected
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <DonationTrendsChart />
            <MilestoneStatusChart />
            <CategoryDistributionChart />
            <DonorActivityChart />
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockDonations.map(donation => (
                    <div key={donation.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">{donation.amount} ETH</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {donation.donorAddress}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={donation.status} size="sm" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(donation.timestamp, 'MMM d, HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Milestone Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockMilestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center justify-between p-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{milestone.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {milestone.currentAmount}/{milestone.targetAmount} ETH
                        </p>
                      </div>
                      <div className="ml-4">
                        <StatusBadge status={milestone.status} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verified Expenses */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Verified Expenses with IPFS Proofs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">IPFS Hash</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockExpenses.map(expense => (
                        <tr key={expense.id} className="border-b last:border-0">
                          <td className="py-3 px-4">{expense.description}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">{expense.category}</Badge>
                          </td>
                          <td className="py-3 px-4 font-medium">{expense.amount} ETH</td>
                          <td className="py-3 px-4">
                            <a 
                              href="#" 
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              <code className="text-xs">{expense.proofHash}</code>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge status={expense.status} size="sm" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transparency;
