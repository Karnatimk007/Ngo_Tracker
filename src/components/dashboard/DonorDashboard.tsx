import { useState } from 'react';
import { Wallet, TrendingUp, Clock, AlertTriangle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MilestoneCard } from '@/components/shared/MilestoneCard';
import { mockMilestones, mockDonations } from '@/lib/mock-data';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';

export function DonorDashboard() {
  const { wallet } = useWallet();
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const totalDonated = mockDonations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
  const pendingDonations = mockDonations.filter(d => d.status === 'confirmed').length;
  const releasedDonations = mockDonations.filter(d => d.status === 'released').length;

  const handleDonate = (milestoneId: string) => {
    toast({
      title: "Donation Initiated",
      description: "Please confirm the transaction in your wallet.",
    });
  };

  const handleEmergencyWithdraw = () => {
    toast({
      title: "Emergency Withdrawal",
      description: "This action requires validator review. Your request has been submitted.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Donor Dashboard</h1>
        <p className="text-muted-foreground">
          Track your donations and their impact across verified NGO projects.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Donated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">{totalDonated.toFixed(2)} ETH</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Release
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">{pendingDonations}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Released Funds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">{releasedDonations}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Emergency Action
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleEmergencyWithdraw}
              className="w-full"
            >
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Milestones */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold">Active Milestones</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Find Projects
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMilestones
            .filter(m => m.status !== 'released')
            .map(milestone => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                role="donor"
                onDonate={() => handleDonate(milestone.id)}
              />
            ))}
        </div>
      </div>

      {/* Recent Donations */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-6">Recent Donations</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockDonations.map(donation => (
                <div key={donation.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{donation.amount} ETH</p>
                    <p className="text-sm text-muted-foreground">
                      Milestone: {mockMilestones.find(m => m.id === donation.milestoneId)?.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium capitalize">{donation.status}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {donation.transactionHash.slice(0, 16)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
