import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Loader2, Pause, Lock } from 'lucide-react';

type Status = 'pending' | 'in_progress' | 'awaiting_approval' | 'approved' | 'released' | 'frozen' | 'rejected' | 'confirmed' | 'refunded';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
}

const statusConfig: Record<Status, { label: string; icon: React.ElementType; className: string }> = {
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-muted text-muted-foreground',
  },
  in_progress: {
    label: 'In Progress',
    icon: Loader2,
    className: 'bg-info/10 text-info',
  },
  awaiting_approval: {
    label: 'Awaiting Approval',
    icon: Clock,
    className: 'bg-warning/10 text-warning',
  },
  approved: {
    label: 'Approved',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success',
  },
  released: {
    label: 'Released',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success',
  },
  frozen: {
    label: 'Frozen',
    icon: Pause,
    className: 'bg-destructive/10 text-destructive',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    className: 'bg-destructive/10 text-destructive',
  },
  confirmed: {
    label: 'Confirmed',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success',
  },
  refunded: {
    label: 'Refunded',
    icon: Lock,
    className: 'bg-muted text-muted-foreground',
  },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <Icon className={cn(size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', status === 'in_progress' && 'animate-spin')} />
      {config.label}
    </span>
  );
}
