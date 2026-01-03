import { ArrowRight, Shield, Eye, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const { wallet, connect, isConnecting } = useWallet();

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Shield className="h-4 w-4" />
            <span>Blockchain-Powered Transparency</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            Track Every Donation.{' '}
            <span className="gradient-text">Trust Every NGO.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            FundGuard ensures transparent, milestone-based fund management for NGOs using 
            smart contracts, validator approvals, and immutable proof-of-work tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {wallet?.isConnected ? (
              <>
                <Button asChild variant="hero" size="xl">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/ngos">Explore NGOs</Link>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={connect} disabled={isConnecting} variant="hero" size="xl">
                  {isConnecting ? 'Connecting...' : 'Start Donating'}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/transparency">View Transparency</Link>
                </Button>
              </>
            )}
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: Shield, text: 'Multisig Approvals' },
              { icon: Eye, text: 'IPFS Proof Storage' },
              { icon: Zap, text: 'Real-time Tracking' },
              { icon: CheckCircle2, text: 'Fraud Detection' },
            ].map((feature, i) => (
              <div
                key={feature.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-sm font-medium"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                {feature.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
