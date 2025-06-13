
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PackageSelector from '@/components/PackageSelector';
import RouteMap from '@/components/RouteMap';
import PackageComparison from '@/components/PackageComparison';
import { Package } from '@/lib/packageData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, Users, MapPin, Star, ArrowLeft, Heart, Filter, Search, Award, Zap, MessageCircle, Calendar, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Packages = () => {
  const [currentView, setCurrentView] = useState<'selector' | 'package' | 'route' | 'comparison'>('selector');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentView('package');
  };

  const handleRouteView = (routeId: string) => {
    setSelectedRoute(routeId);
    setCurrentView('route');
  };

  const handleBackToSelector = () => {
    setCurrentView('selector');
    setSelectedPackage(null);
    setSelectedRoute('');
  };

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tulu Nadu Cultural Packages',
        text: 'Discover authentic cultural experiences in Tulu Nadu',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share these packages with friends",
        duration: 2000,
      });
    }
  };

  const popularFilters = [
    { label: 'Trending', value: 'trending', count: 12 },
    { label: 'Best Rated', value: 'rated', count: 8 },
    { label: 'Best Value', value: 'value', count: 15 },
    { label: 'New Arrivals', value: 'new', count: 6 },
    { label: 'Family Perfect', value: 'family', count: 10 }
  ];

  const stats = [
    { label: 'Happy Travelers', value: '2,500+', icon: '👥', trend: '+15% this month' },
    { label: 'Cultural Sites', value: '50+', icon: '🏛️', trend: 'Authentic locations' },
    { label: 'Expert Guides', value: '25+', icon: '👨‍🏫', trend: 'Local specialists' },
    { label: 'Success Rate', value: '99.8%', icon: '✅', trend: 'Customer satisfaction' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation />
      
      {/* Professional Hero Section */}
      <div className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
        
        <div className="relative container mx-auto py-16 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 text-sm font-medium">
              Premium Cultural Experiences
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
              Cultural Travel Packages
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in the authentic heritage of Tulu Nadu through expertly crafted cultural experiences. 
              From ancient temples to living traditions, every journey creates lasting memories.
            </p>

            {/* Professional Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <Card key={index} className="border border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-slate-600 mb-1">{stat.label}</div>
                    <div className="text-xs text-slate-500">{stat.trend}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Professional Search Bar */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search experiences, temples, festivals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 rounded-lg border-slate-200 focus:border-slate-400 focus:ring-slate-400/20 bg-white text-base shadow-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Browse Packages
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-lg transition-all"
                onClick={handleShare}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Expert Consultation
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-current" />
                <span className="font-semibold">4.9/5</span>
                <span className="text-sm">from 500+ reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-500" />
                <span className="font-semibold">2,500+</span>
                <span className="text-sm">satisfied travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-slate-500" />
                <span className="font-semibold">Award</span>
                <span className="text-sm">winning service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-slate-50">
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
          {currentView === 'selector' && (
            <>
              {/* Professional Filters and Tabs */}
              <div className="mb-8">
                <Tabs defaultValue="packages" className="w-full">
                  <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    <TabsList className="grid w-full lg:w-auto grid-cols-2 bg-white border border-slate-200 shadow-sm">
                      <TabsTrigger value="packages" className="flex items-center gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white">
                        <Award className="w-4 h-4" />
                        Browse Packages
                      </TabsTrigger>
                      <TabsTrigger value="comparison" className="flex items-center gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white">
                        <Filter className="w-4 h-4" />
                        Compare Options
                      </TabsTrigger>
                    </TabsList>

                    {/* Professional Popular Filters */}
                    <div className="flex flex-wrap gap-3">
                      {popularFilters.map((filter, index) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className="cursor-pointer hover:bg-slate-200 transition-colors px-4 py-2 text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:text-slate-900"
                        >
                          <span>{filter.label}</span>
                          <span className="ml-2 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                            {filter.count}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <TabsContent value="packages" className="mt-6">
                    <PackageSelector 
                      onPackageSelect={handlePackageSelect}
                      onRouteView={handleRouteView}
                    />
                  </TabsContent>
                  
                  <TabsContent value="comparison" className="mt-6">
                    <PackageComparison onPackageSelect={handlePackageSelect} />
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}

          {currentView === 'package' && selectedPackage && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="outline" 
                  onClick={handleBackToSelector}
                  className="rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Packages
                </Button>
                <Badge className="bg-slate-100 text-slate-700 border border-slate-200">
                  <Heart className="w-3 h-3 mr-1" />
                  Popular Choice
                </Badge>
                <Badge className="bg-amber-50 text-amber-700 border border-amber-200">
                  <Star className="w-3 h-3 mr-1" />
                  Featured Experience
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Package Image and Basic Info */}
                <div className="lg:col-span-1">
                  <Card className="overflow-hidden shadow-sm border border-slate-200">
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={selectedPackage.image} 
                        alt={selectedPackage.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      {selectedPackage.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-amber-500 text-white shadow-sm">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-xl mb-2">{selectedPackage.title}</h3>
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current text-amber-400" />
                            <span>4.9</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>250+ bookings</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-3xl font-bold text-slate-900">
                              {formatPrice(selectedPackage.price.min, selectedPackage.price.max)}
                            </span>
                            <span className="text-sm text-slate-500 ml-2">per person</span>
                          </div>
                          <Badge variant="secondary" className="bg-amber-50 text-amber-700 border border-amber-200">
                            +{selectedPackage.points} points
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center text-sm bg-slate-50 rounded-lg p-3 border border-slate-100">
                            <Clock className="w-4 h-4 mr-3 text-slate-600" />
                            <span className="font-medium text-slate-700">{selectedPackage.duration}</span>
                          </div>
                          <div className="flex items-center text-sm bg-slate-50 rounded-lg p-3 border border-slate-100">
                            <Users className="w-4 h-4 mr-3 text-slate-600" />
                            <span className="font-medium text-slate-700">{selectedPackage.groupSize}</span>
                          </div>
                          <div className="flex items-center text-sm bg-slate-50 rounded-lg p-3 border border-slate-100">
                            <MapPin className="w-4 h-4 mr-3 text-slate-600" />
                            <span className="font-medium text-slate-700">{selectedPackage.routes.length} destinations</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
                            asChild
                          >
                            <Link to="/booking">
                              <Zap className="w-4 h-4 mr-2" />
                              Book Now
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Package Details */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border border-slate-200 shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-slate-900">About This Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">{selectedPackage.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentView === 'route' && (
            <RouteMap routeId={selectedRoute} onBack={handleBackToSelector} />
          )}
        </div>
      </div>

      {/* Professional Custom Package Section */}
      {currentView === 'selector' && (
        <div className="relative bg-white border-t border-slate-200">
          <div className="container mx-auto py-20 px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-slate-100 text-slate-700 border border-slate-200 px-6 py-3">
                Personalized Service
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
                Craft Your Perfect Cultural Journey
              </h2>
              <p className="text-slate-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                Can't find exactly what you're looking for? Our cultural specialists excel at creating completely 
                customized immersion programs tailored to your interests and timeline.
              </p>

              {/* Professional Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="border border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-slate-900">Flexible Scheduling</h4>
                    <p className="text-sm text-slate-600">Travel on your timeline with custom duration options</p>
                  </CardContent>
                </Card>
                <Card className="border border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-slate-900">Private Groups</h4>
                    <p className="text-sm text-slate-600">Intimate experiences for family & friends</p>
                  </CardContent>
                </Card>
                <Card className="border border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Camera className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-slate-900">Special Interests</h4>
                    <p className="text-sm text-slate-600">Photography, culinary arts, spiritual journeys & more</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button 
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                  asChild
                >
                  <Link to="/contact">
                    <Zap className="w-5 h-5 mr-2" />
                    Design My Adventure
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-4 rounded-lg transition-all"
                  asChild
                >
                  <Link to="/contact">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat with Specialist
                  </Link>
                </Button>
              </div>
              
              {/* Professional Social Proof */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-6 py-3 border border-slate-200">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-slate-300 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="font-medium text-slate-700">500+ custom journeys crafted</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-6 py-3 border border-slate-200">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-medium text-slate-700">4.9/5 satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-6 py-3 border border-slate-200">
                  <Award className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-700">Award-winning service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Packages;
