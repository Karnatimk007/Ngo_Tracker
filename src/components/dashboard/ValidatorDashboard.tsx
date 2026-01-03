import { useState } from 'react';
import { Shield, CheckCircle2, XCircle, Clock, FileCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockMilestones, mockFraudAlerts, mockNGOs } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function ValidatorDashboard() {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const pendingApprovals = mockMilestones.filter(m => m.status === 'awaiting_approval');
  const activeAlerts = mockFraudAlerts.filter(a => a.status === 'active');

  const handleVote = (milestoneId: string, vote: 'approve' | 'reject') => {
    toast({
      title: vote === 'approve' ? "Vote Submitted: Approve" : "Vote Submitted: Reject",
      description: `Your vote has been recorded on-chain. ${vote === 'approve' ? '2/3 approvals required for release.' : 'Funds remain locked.'}`,
      variant: vote === 'approve' ? "default" : "destructive",
    });
    setSelectedMilestone(null);
    setComment('');
  };

  const handleFreezeAlert = (alertId: string) => {
    toast({
      title: "Funds Frozen",
      description: "Emergency freeze has been triggered. The NGO's funds are now locked pending investigation.",
      variant: "destructive",
    });
  };

  const handleDismissAlert = (alertId: string) => {
    toast({
      title: "Alert Dismissed",
      description: "This alert has been marked as resolved.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Validator Dashboard</h1>
        <p className="text-muted-foreground">
          Review milestone proofs, vote on fund releases, and monitor for fraud.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">{pendingApprovals.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Approved This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejected This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">2</p>
          </CardContent>
        </Card>

        <Card className={activeAlerts.length > 0 ? 'border-destructive/50 bg-destructive/5' : ''}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">{activeAlerts.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-6">Pending Milestone Approvals</h2>
        
        {pendingApprovals.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No pending approvals at this time.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingApprovals.map(milestone => {
              const ngo = mockNGOs[0];
              return (
                <Card key={milestone.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <StatusBadge status={milestone.status} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          NGO: <span className="font-medium">{ngo.name}</span> ({ngo.walletAddress})
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{milestone.targetAmount} ETH</p>
                        <p className="text-sm text-muted-foreground">
                          {milestone.validatorApprovals}/{milestone.requiredApprovals} approved
                        </p>
                      </div>
                    </div>

                    {milestone.proofHash && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 mb-4">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span className="text-sm">IPFS Proof:</span>
                        <code className="bg-background px-2 py-1 rounded text-xs flex-1">
                          {milestone.proofHash}
                        </code>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        variant="success" 
                        className="flex-1"
                        onClick={() => setSelectedMilestone(milestone.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleVote(milestone.id, 'reject')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Fraud Alerts */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Fraud Detection Alerts
        </h2>

        <div className="space-y-4">
          {mockFraudAlerts.map(alert => (
            <Card 
              key={alert.id}
              className={alert.status === 'active' ? 'border-destructive/50' : ''}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium
                        ${alert.severity === 'critical' ? 'bg-destructive text-destructive-foreground' : ''}
                        ${alert.severity === 'high' ? 'bg-destructive/80 text-destructive-foreground' : ''}
                        ${alert.severity === 'medium' ? 'bg-warning text-warning-foreground' : ''}
                        ${alert.severity === 'low' ? 'bg-muted text-muted-foreground' : ''}
                      `}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-sm capitalize">{alert.type.replace(/_/g, ' ')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">{alert.ngoAddress}</p>
                  </div>
                  <StatusBadge status={alert.status === 'active' ? 'pending' : 'approved'} size="sm" />
                </div>

                {alert.status === 'active' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleFreezeAlert(alert.id)}
                    >
                      Freeze Funds
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDismissAlert(alert.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Approval Dialog */}
      <Dialog open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Milestone Release</DialogTitle>
            <DialogDescription>
              Confirm your approval for fund release. This action will be recorded on-chain.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="comment">Comment (Optional)</Label>
              <Textarea 
                id="comment"
                placeholder="Add any notes about your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="success" 
                className="flex-1"
                onClick={() => selectedMilestone && handleVote(selectedMilestone, 'approve')}
              >
                Confirm Approval
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setSelectedMilestone(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
