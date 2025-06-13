
import { useState, useMemo } from 'react';
import { packages, packageTiers, Package } from '@/lib/packageData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, MapPin, Star, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface PackageSelectorProps {
  onPackageSelect: (pkg: Package) => void;
  onRouteView: (routeId: string) => void;
}

const PackageSelector = ({ onPackageSelect, onRouteView }: PackageSelectorProps) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 150000]);
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const tierMatch = selectedTier === 'all' || pkg.tier === selectedTier;
      const priceMatch = pkg.price.min >= priceRange[0] && pkg.price.max <= priceRange[1];
      const durationMatch = durationFilter === 'all' || 
        (durationFilter === 'short' && pkg.duration.includes('hour')) ||
        (durationFilter === 'medium' && pkg.duration.includes('day') && !pkg.duration.includes('7-9')) ||
        (durationFilter === 'long' && (pkg.duration.includes('7-9') || pkg.duration === 'Custom'));
      const difficultyMatch = difficultyFilter === 'all' || pkg.difficulty === difficultyFilter;
      
      return tierMatch && priceMatch && durationMatch && difficultyMatch;
    });
  }, [selectedTier, priceRange, durationFilter, difficultyFilter]);

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Professional Filters */}
      <Card className="border border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Filter className="w-5 h-5 text-slate-600" />
            Filter Packages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block text-slate-700">Package Tier</label>
              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400/20">
                  <SelectValue placeholder="All tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  {Object.entries(packageTiers).map(([key, tier]) => (
                    <SelectItem key={key} value={key}>
                      {tier.icon} {tier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block text-slate-700">Duration</label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400/20">
                  <SelectValue placeholder="All durations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">Half/Full Day</SelectItem>
                  <SelectItem value="medium">2-4 Days</SelectItem>
                  <SelectItem value="long">7+ Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block text-slate-700">Difficulty</label>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400/20">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="challenging">Challenging</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block text-slate-700">
                Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={150000}
                min={0}
                step={5000}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Package Tier Tabs */}
      <Tabs value={selectedTier} onValueChange={setSelectedTier} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-white border border-slate-200 shadow-sm">
          <TabsTrigger value="all" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">All</TabsTrigger>
          {Object.entries(packageTiers).map(([key, tier]) => (
            <TabsTrigger key={key} value={key} className="text-xs data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              {tier.icon}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <PackageGrid packages={filteredPackages} onPackageSelect={onPackageSelect} onRouteView={onRouteView} />
        </TabsContent>
        
        {Object.keys(packageTiers).map(tierKey => (
          <TabsContent key={tierKey} value={tierKey} className="mt-6">
            <PackageGrid 
              packages={filteredPackages.filter(pkg => pkg.tier === tierKey)} 
              onPackageSelect={onPackageSelect} 
              onRouteView={onRouteView}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface PackageGridProps {
  packages: Package[];
  onPackageSelect: (pkg: Package) => void;
  onRouteView: (routeId: string) => void;
}

const PackageGrid = ({ packages, onPackageSelect, onRouteView }: PackageGridProps) => {
  const formatPrice = (min: number, max: number) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`h-full relative overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white ${pkg.featured ? 'ring-1 ring-amber-200' : ''}`}>
            {pkg.featured && (
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-amber-500 text-white shadow-sm">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </Badge>
              </div>
            )}
            
            <div className="relative h-48 overflow-hidden">
              <img 
                src={pkg.image} 
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-slate-700 border border-slate-200 shadow-sm">
                  {packageTiers[pkg.tier].icon} {packageTiers[pkg.tier].name}
                </Badge>
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-2 py-1 rounded text-sm">
                +{pkg.points} points
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-slate-900">{pkg.title}</h3>
                <span className="text-slate-900 font-semibold">
                  {formatPrice(pkg.price.min, pkg.price.max)}
                </span>
              </div>
              
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {pkg.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  <Clock className="w-3 h-3 mr-1" />
                  {pkg.duration}
                </div>
                <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  <Users className="w-3 h-3 mr-1" />
                  {pkg.groupSize}
                </div>
                <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  <MapPin className="w-3 h-3 mr-1" />
                  {pkg.routes.length} route{pkg.routes.length > 1 ? 's' : ''}
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={() => onPackageSelect(pkg)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
                  disabled={!pkg.available}
                >
                  {pkg.available ? 'View Details' : 'Coming Soon'}
                </Button>
                
                {pkg.routes.length > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={() => onRouteView(pkg.routes[0])}
                    className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    View Route Map
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PackageSelector;
