import { useState } from 'react';
import { Building2, TrendingUp, Target, FileUp, Plus, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockMilestones, mockExpenses, mockNGOs } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function NGODashboard() {
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const ngo = mockNGOs[0];

  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Expense Submitted",
      description: "Your expense report has been uploaded to IPFS and is awaiting validation.",
    });
    setExpenseDialogOpen(false);
  };

  const handleSubmitMilestoneProof = (milestoneId: string) => {
    toast({
      title: "Proof Submitted",
      description: "Your milestone completion proof is now pending validator approval.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">NGO Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your projects, submit expenses, and track milestone progress.
          </p>
        </div>
        <Dialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileUp className="h-4 w-4 mr-2" />
              Log Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Expense Report</DialogTitle>
              <DialogDescription>
                Upload your expense with IPFS proof for validator review.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitExpense} className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (ETH)</Label>
                <Input id="amount" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Equipment, Labor, Materials" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the expense..." />
              </div>
              <div>
                <Label htmlFor="proof">Upload Proof (Receipt/Invoice)</Label>
                <Input id="proof" type="file" accept="image/*,.pdf" />
                <p className="text-xs text-muted-foreground mt-1">
                  File will be uploaded to IPFS for immutable verification.
                </p>
              </div>
              <Button type="submit" className="w-full">Submit Expense</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* NGO Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold">{ngo.name}</h2>
              <p className="text-sm text-muted-foreground">{ngo.category}</p>
              <p className="text-xs font-mono text-muted-foreground mt-1">{ngo.walletAddress}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{ngo.totalReceived} ETH</p>
              <p className="text-sm text-muted-foreground">Total Received</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              Active Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">
              {mockMilestones.filter(m => m.status === 'in_progress').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">
              {Math.round((ngo.completedMilestones / ngo.totalMilestones) * 100)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              Pending Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">
              {mockExpenses.filter(e => e.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold">Your Milestones</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Create Milestone
          </Button>
        </div>

        <div className="space-y-4">
          {mockMilestones.map(milestone => {
            const progress = (parseFloat(milestone.currentAmount) / parseFloat(milestone.targetAmount)) * 100;
            return (
              <Card key={milestone.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    <StatusBadge status={milestone.status} />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-medium">{milestone.currentAmount} / {milestone.targetAmount} ETH</span>
                    </div>
                    <Progress value={Math.min(progress, 100)} className="h-2" />
                  </div>

                  {milestone.status === 'in_progress' && progress >= 100 && (
                    <Button 
                      onClick={() => handleSubmitMilestoneProof(milestone.id)}
                      className="w-full"
                    >
                      <FileUp className="h-4 w-4 mr-2" />
                      Submit Completion Proof
                    </Button>
                  )}

                  {milestone.proofHash && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                      <span>IPFS Proof:</span>
                      <code className="bg-muted px-2 py-1 rounded text-xs">{milestone.proofHash}</code>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Expenses */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-6">Recent Expenses</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockExpenses.map(expense => (
                <div key={expense.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{expense.amount} ETH</p>
                    <StatusBadge status={expense.status} size="sm" />
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
