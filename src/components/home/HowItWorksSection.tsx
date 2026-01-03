import { Wallet, Target, FileCheck, CheckCircle2, Coins } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Connect your Web3 wallet to access the platform and manage donations.',
  },
  {
    icon: Target,
    title: 'Choose a Milestone',
    description: 'Select an NGO project and specific milestone you want to fund.',
  },
  {
    icon: FileCheck,
    title: 'Funds Locked',
    description: 'Your donation is locked in a smart contract until milestone completion.',
  },
  {
    icon: CheckCircle2,
    title: 'Validator Approval',
    description: '2/3 validators verify milestone completion with IPFS proofs.',
  },
  {
    icon: Coins,
    title: 'Funds Released',
    description: 'Approved funds are released to the NGO for the next phase.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How FundGuard Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple, transparent process from donation to verified impact.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex gap-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Number & Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center shadow-lg">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
