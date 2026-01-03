import { Calendar, Target, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { Milestone } from '@/lib/types';
import { format } from 'date-fns';

interface MilestoneCardProps {
  milestone: Milestone;
  onDonate?: () => void;
  onApprove?: () => void;
  showActions?: boolean;
  role?: 'donor' | 'validator' | 'ngo' | 'public';
}

export function MilestoneCard({ 
  milestone, 
  onDonate, 
  onApprove, 
  showActions = true,
  role = 'public'
}: MilestoneCardProps) {
  const progress = (parseFloat(milestone.currentAmount) / parseFloat(milestone.targetAmount)) * 100;
  const isFunded = progress >= 100;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="font-display text-lg">{milestone.title}</CardTitle>
          <StatusBadge status={milestone.status} size="sm" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {milestone.description}
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {milestone.currentAmount} / {milestone.targetAmount} ETH
            </span>
          </div>
          <Progress value={Math.min(progress, 100)} className="h-2" />
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{format(milestone.deadline, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{milestone.validatorApprovals}/{milestone.requiredApprovals} approved</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="pt-2 flex gap-2">
            {role === 'donor' && !isFunded && milestone.status === 'pending' && (
              <Button onClick={onDonate} size="sm" className="flex-1">
                <Target className="h-4 w-4 mr-1" />
                Donate
              </Button>
            )}
            {role === 'validator' && milestone.status === 'awaiting_approval' && (
              <Button onClick={onApprove} size="sm" variant="success" className="flex-1">
                Approve Release
              </Button>
            )}
            {role === 'public' && (
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
