import { CheckCircle2, Star, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NGO } from '@/lib/types';
import { Link } from 'react-router-dom';

interface NGOCardProps {
  ngo: NGO;
}

export function NGOCard({ ngo }: NGOCardProps) {
  const completionRate = Math.round((ngo.completedMilestones / ngo.totalMilestones) * 100);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="font-display font-bold text-primary text-lg">
                {ngo.name.charAt(0)}
              </span>
            </div>
            <div>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                {ngo.name}
                {ngo.verified && (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                {ngo.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {ngo.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <TrendingUp className="h-4 w-4 mx-auto text-primary mb-1" />
            <p className="font-semibold text-sm">{ngo.totalReceived} ETH</p>
            <p className="text-xs text-muted-foreground">Received</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Target className="h-4 w-4 mx-auto text-info mb-1" />
            <p className="font-semibold text-sm">{completionRate}%</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Star className="h-4 w-4 mx-auto text-warning mb-1" />
            <p className="font-semibold text-sm">{ngo.rating}</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link to={`/ngos/${ngo.id}`}>View Projects</Link>
          </Button>
          <Button variant="outline" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
