export type UserRole = 'donor' | 'ngo' | 'validator' | 'admin' | 'public';

export interface Wallet {
  address: string;
  balance: string;
  isConnected: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: string;
  currentAmount: string;
  status: 'pending' | 'in_progress' | 'awaiting_approval' | 'approved' | 'released' | 'frozen';
  deadline: Date;
  proofHash?: string;
  validatorApprovals: number;
  requiredApprovals: number;
  createdAt: Date;
}

export interface Donation {
  id: string;
  donorAddress: string;
  amount: string;
  milestoneId: string;
  transactionHash: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'released' | 'refunded';
}

export interface Expense {
  id: string;
  ngoAddress: string;
  milestoneId: string;
  amount: string;
  description: string;
  category: string;
  proofHash: string;
  ipfsLink: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
}

export interface NGO {
  id: string;
  name: string;
  walletAddress: string;
  description: string;
  category: string;
  verified: boolean;
  totalReceived: string;
  totalMilestones: number;
  completedMilestones: number;
  rating: number;
  createdAt: Date;
  image?: string;
  location?: string;
  donorCount?: number;
}

export interface FraudAlert {
  id: string;
  ngoAddress: string;
  type: 'suspicious_activity' | 'failed_milestone' | 'invalid_proof' | 'unusual_withdrawal';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'active' | 'resolved' | 'dismissed';
  timestamp: Date;
}

export interface ValidatorVote {
  validatorAddress: string;
  milestoneId: string;
  vote: 'approve' | 'reject';
  timestamp: Date;
  comment?: string;
}

export interface TransparencyStats {
  totalDonations: string;
  totalNGOs: number;
  totalMilestones: number;
  completedMilestones: number;
  averageCompletionTime: number;
  fraudsPrevented: number;
}
