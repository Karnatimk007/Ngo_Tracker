import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Link } from 'react-router-dom';

export function CTASection() {
  const { wallet, connect, isConnecting } = useWallet();

  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16" style={{ background: 'var(--gradient-primary)' }}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              <span>Join the Transparency Revolution</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make a Verified Impact?
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you're a donor, NGO, or validator — join FundGuard to ensure 
              every contribution creates real, traceable change.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {wallet?.isConnected ? (
                <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/dashboard">
                    Open Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button 
                  onClick={connect} 
                  disabled={isConnecting} 
                  size="xl"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet & Start'}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              )}
              <Button asChild variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/transparency">View Public Data</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
