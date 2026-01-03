import { Layout } from '@/components/layout/Layout';
import { useWallet } from '@/contexts/WalletContext';
import { DonorDashboard } from '@/components/dashboard/DonorDashboard';
import { NGODashboard } from '@/components/dashboard/NGODashboard';
import { ValidatorDashboard } from '@/components/dashboard/ValidatorDashboard';
import { Button } from '@/components/ui/button';
import { Wallet, Shield, Users, Building2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const roleDescriptions = {
  donor: { icon: Users, title: 'Donor Dashboard', description: 'Track your donations and their impact' },
  ngo: { icon: Building2, title: 'NGO Dashboard', description: 'Manage projects and submit expenses' },
  validator: { icon: Shield, title: 'Validator Dashboard', description: 'Review proofs and approve releases' },
  public: { icon: Eye, title: 'Public View', description: 'View transparency data' },
};

const Dashboard = () => {
  const { wallet, role, connect, isConnecting, setRole } = useWallet();

  if (!wallet?.isConnected) {
    return (
      <Layout>
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
                <Wallet className="h-12 w-12 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">Connect Your Wallet</h1>
              <p className="text-muted-foreground mb-8">
                Connect your Web3 wallet to access the dashboard and manage your donations, projects, or validation duties.
              </p>
              <Button onClick={connect} disabled={isConnecting} variant="hero" size="xl">
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Role selector for demo purposes
  if (role === 'public') {
    return (
      <Layout>
        <div className="min-h-screen py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="font-display text-3xl font-bold mb-4 text-center">Select Your Role</h1>
              <p className="text-muted-foreground text-center mb-8">
                Choose how you want to interact with FundGuard. (Demo mode - switch anytime from header)
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {(['donor', 'ngo', 'validator'] as const).map(roleOption => {
                  const config = roleDescriptions[roleOption];
                  return (
                    <Card 
                      key={roleOption}
                      className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                      onClick={() => setRole(roleOption)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                          <config.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2 capitalize">{roleOption}</h3>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {role === 'donor' && <DonorDashboard />}
          {role === 'ngo' && <NGODashboard />}
          {role === 'validator' && <ValidatorDashboard />}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
