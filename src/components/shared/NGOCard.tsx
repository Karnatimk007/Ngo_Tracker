import { CheckCircle2, Star, MapPin, Users, Heart, ExternalLink, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { NGO } from '@/lib/types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

interface NGOCardProps {
  ngo: NGO;
  featured?: boolean;
}

export function NGOCard({ ngo, featured = false }: NGOCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const completionRate = Math.round((ngo.completedMilestones / ngo.totalMilestones) * 100);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removed from favorites" : "Added to favorites",
      { description: isFavorite ? `${ngo.name} removed from your watchlist` : `${ngo.name} added to your watchlist` }
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Water & Sanitation': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Education': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'Environment': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Healthcare': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 ${featured ? 'ring-2 ring-primary/20' : ''}`}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
            ⭐ Featured
          </Badge>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white"
      >
        <Heart className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} />
      </button>

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={ngo.image || `https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop`}
          alt={ngo.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Overlay Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className={`${getCategoryColor(ngo.category)} border`}>
              {ngo.category}
            </Badge>
            {ngo.verified && (
              <Badge className="bg-emerald-500/90 text-white border-0 gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          <h3 className="font-display text-xl font-bold text-white leading-tight">
            {ngo.name}
          </h3>
          {ngo.location && (
            <div className="flex items-center gap-1 mt-1 text-white/80 text-sm">
              <MapPin className="h-3 w-3" />
              {ngo.location}
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {ngo.description}
        </p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Milestone Progress</span>
            <span className="font-semibold text-primary">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {ngo.completedMilestones} of {ngo.totalMilestones} milestones completed
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
            <TrendingUp className="h-4 w-4 mx-auto text-primary mb-1" />
            <p className="font-bold text-sm">{ngo.totalReceived}</p>
            <p className="text-xs text-muted-foreground">ETH</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-amber-500/5 to-amber-500/10 border border-amber-500/10">
            <Star className="h-4 w-4 mx-auto text-amber-500 mb-1" />
            <p className="font-bold text-sm">{ngo.rating}</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border border-emerald-500/10">
            <Users className="h-4 w-4 mx-auto text-emerald-500 mb-1" />
            <p className="font-bold text-sm">{ngo.donorCount || 0}</p>
            <p className="text-xs text-muted-foreground">Donors</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1 group/btn">
            <Link to={`/ngos/${ngo.id}`} className="flex items-center justify-center gap-2">
              View Projects
              <ExternalLink className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
          <Button variant="outline" className="px-4">
            Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
