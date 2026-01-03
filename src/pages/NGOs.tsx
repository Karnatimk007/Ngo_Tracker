import { useState } from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { NGOCard } from '@/components/shared/NGOCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockNGOs } from '@/lib/mock-data';

const categories = ['All', 'Water & Sanitation', 'Education', 'Environment', 'Healthcare'];

const NGOs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNGOs = mockNGOs.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ngo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">Verified NGOs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore verified NGOs with transparent milestone tracking and real-time fund utilization data.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search NGOs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {filteredNGOs.length} Verified
            </Badge>
          </div>

          {/* NGO Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNGOs.map((ngo, index) => (
              <div
                key={ngo.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <NGOCard ngo={ngo} />
              </div>
            ))}
          </div>

          {filteredNGOs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No NGOs found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NGOs;
