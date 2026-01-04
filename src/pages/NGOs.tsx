import { useState, useMemo } from 'react';
import { Search, Filter, CheckCircle2, SlidersHorizontal, Grid3X3, LayoutList, Sparkles, ArrowUpDown, TrendingUp, Users, Target } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { NGOCard } from '@/components/shared/NGOCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockNGOs } from '@/lib/mock-data';

const categories = ['All', 'Water & Sanitation', 'Education', 'Environment', 'Healthcare'];
const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'received', label: 'Most Funded' },
  { value: 'completion', label: 'Best Progress' },
  { value: 'donors', label: 'Most Donors' },
  { value: 'newest', label: 'Newest' },
];

const NGOs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredAndSortedNGOs = useMemo(() => {
    let result = mockNGOs.filter(ngo => {
      const matchesSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ngo.category === selectedCategory;
      const matchesVerified = !showVerifiedOnly || ngo.verified;
      return matchesSearch && matchesCategory && matchesVerified;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'received':
          return parseFloat(b.totalReceived) - parseFloat(a.totalReceived);
        case 'completion':
          return (b.completedMilestones / b.totalMilestones) - (a.completedMilestones / a.totalMilestones);
        case 'donors':
          return (b.donorCount || 0) - (a.donorCount || 0);
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy, showVerifiedOnly]);

  const stats = useMemo(() => ({
    total: mockNGOs.length,
    verified: mockNGOs.filter(n => n.verified).length,
    totalFunded: mockNGOs.reduce((acc, n) => acc + parseFloat(n.totalReceived), 0).toFixed(1),
    totalDonors: mockNGOs.reduce((acc, n) => acc + (n.donorCount || 0), 0),
  }), []);

  const featuredNGO = filteredAndSortedNGOs.find(n => n.verified && n.rating >= 4.8);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="text-xs">Blockchain Verified</Badge>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
                Discover Verified NGOs
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Explore organizations with transparent milestone tracking, real-time fund utilization, 
                and blockchain-verified accountability. Every donation creates measurable impact.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total NGOs</p>
                </div>
              </div>
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.verified}</p>
                  <p className="text-xs text-muted-foreground">Verified</p>
                </div>
              </div>
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalFunded}</p>
                  <p className="text-xs text-muted-foreground">ETH Funded</p>
                </div>
              </div>
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalDonors.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Donors</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters Section */}
          <div className="glass-card rounded-2xl p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, description, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-300 ${selectedCategory === category ? 'shadow-md' : 'hover:bg-primary/5'}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Secondary Filters */}
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters:</span>
              </div>

              <Button
                variant={showVerifiedOnly ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                className="gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Only
              </Button>

              <div className="flex items-center gap-2 ml-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-9">
                    <ArrowUpDown className="h-3.5 w-3.5 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="hidden md:flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-none h-9 px-3"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-none h-9 px-3"
                    onClick={() => setViewMode('list')}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {filteredAndSortedNGOs.length} {filteredAndSortedNGOs.length === 1 ? 'Result' : 'Results'}
              </Badge>
              {searchQuery && (
                <span className="text-sm text-muted-foreground">
                  for "{searchQuery}"
                </span>
              )}
            </div>
          </div>

          {/* Featured NGO */}
          {featuredNGO && !searchQuery && selectedCategory === 'All' && (
            <div className="mb-8">
              <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Featured Organization
              </h2>
              <div className="max-w-md">
                <NGOCard ngo={featuredNGO} featured />
              </div>
            </div>
          )}

          {/* NGO Grid */}
          {filteredAndSortedNGOs.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'flex flex-col gap-4'
            }>
              {filteredAndSortedNGOs.map((ngo, index) => (
                <div
                  key={ngo.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }}
                >
                  <NGOCard ngo={ngo} featured={ngo.id === featuredNGO?.id && !searchQuery} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">No NGOs Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any organizations matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setShowVerifiedOnly(false);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NGOs;
