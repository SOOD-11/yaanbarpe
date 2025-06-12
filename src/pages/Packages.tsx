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
import { Clock, Users, MapPin, Star, ArrowLeft, Heart, Filter, Search, Sparkles, TrendingUp, Award, Zap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Packages = () => {
  const [currentView, setCurrentView] = useState<'selector' | 'package' | 'route' | 'comparison'>('selector');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedDuration, setSelectedDuration] = useState('all');

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

  const popularFilters = [
    { label: '🔥 Trending', value: 'trending' },
    { label: '⭐ Best Rated', value: 'rated' },
    { label: '💰 Best Value', value: 'value' },
    { label: '🆕 New', value: 'new' },
    { label: '👨‍👩‍👧‍👦 Family', value: 'family' }
  ];

  const stats = [
    { label: 'Happy Travelers', value: '2,500+', icon: '😊' },
    { label: 'Cultural Sites', value: '50+', icon: '🏛️' },
    { label: 'Local Guides', value: '25+', icon: '👨‍🏫' },
    { label: 'Success Rate', value: '99.8%', icon: '✅' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-tulu-sand/10 via-background to-tulu-beige/20">
      <Navigation />
      
      {/* Hero Section with Enhanced Visuals */}
      <div className="relative bg-gradient-to-r from-tulu-blue/10 via-tulu-teal/10 to-tulu-green/10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-tulu-gold/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-tulu-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-tulu-teal/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto py-20 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-tulu-gold/20 text-tulu-gold border-tulu-gold/30 animate-bounce">
              <Sparkles className="w-4 h-4 mr-1" />
              Curated Cultural Experiences
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-tulu-green via-tulu-blue to-tulu-teal bg-clip-text text-transparent">
                Tailored
              </span>{' '}
              <span className="text-tulu-red">Experiences</span>
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              Dive deep into Tulu Nadu's soul with our expertly crafted packages. From ancient temples to living traditions, 
              every experience is designed to connect you with authentic culture.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-tulu-blue">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search experiences... (temples, festivals, food)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-tulu-sand/30 focus:border-tulu-teal focus:ring-tulu-teal/20 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
          {currentView === 'selector' && (
            <>
              {/* Filters and Tabs */}
              <div className="mb-8">
                <Tabs defaultValue="packages" className="w-full">
                  <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    <TabsList className="grid w-full lg:w-auto grid-cols-2 bg-white/80 backdrop-blur-sm">
                      <TabsTrigger value="packages" className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Browse Packages
                      </TabsTrigger>
                      <TabsTrigger value="comparison" className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Compare Packages
                      </TabsTrigger>
                    </TabsList>

                    {/* Popular Filters */}
                    <div className="flex flex-wrap gap-2">
                      {popularFilters.map((filter, index) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className="cursor-pointer hover:bg-tulu-teal/20 hover:text-tulu-teal transition-colors px-3 py-1"
                        >
                          {filter.label}
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
                  className="rounded-full hover:bg-tulu-sand/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Packages
                </Button>
                <Badge className="bg-tulu-green/20 text-tulu-green">
                  <Heart className="w-3 h-3 mr-1" />
                  Popular Choice
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Package Image and Basic Info */}
                <div className="lg:col-span-1">
                  <Card className="overflow-hidden shadow-xl">
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={selectedPackage.image} 
                        alt={selectedPackage.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      {selectedPackage.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-tulu-gold text-white shadow-lg">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-xl mb-2">{selectedPackage.title}</h3>
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current text-tulu-gold" />
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
                            <span className="text-3xl font-bold bg-gradient-to-r from-tulu-green to-tulu-teal bg-clip-text text-transparent">
                              {formatPrice(selectedPackage.price.min, selectedPackage.price.max)}
                            </span>
                            <span className="text-sm text-muted-foreground ml-2">per person</span>
                          </div>
                          <Badge variant="secondary" className="bg-tulu-gold/20 text-tulu-gold">
                            +{selectedPackage.points} points
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center text-sm bg-tulu-sand/20 rounded-lg p-3">
                            <Clock className="w-4 h-4 mr-3 text-tulu-blue" />
                            <span className="font-medium">{selectedPackage.duration}</span>
                          </div>
                          <div className="flex items-center text-sm bg-tulu-blue/10 rounded-lg p-3">
                            <Users className="w-4 h-4 mr-3 text-tulu-green" />
                            <span className="font-medium">{selectedPackage.groupSize}</span>
                          </div>
                          <div className="flex items-center text-sm bg-tulu-teal/10 rounded-lg p-3">
                            <MapPin className="w-4 h-4 mr-3 text-tulu-red" />
                            <span className="font-medium">{selectedPackage.routes.length} destinations</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            className="bg-gradient-to-r from-tulu-red to-tulu-blue hover:from-tulu-blue hover:to-tulu-teal text-white rounded-xl transition-all duration-300 transform hover:scale-105"
                            asChild
                          >
                            <Link to="/booking">
                              <Zap className="w-4 h-4 mr-2" />
                              Book Now
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-tulu-teal text-tulu-teal hover:bg-tulu-teal hover:text-white rounded-xl transition-all duration-300"
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
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-tulu-gold" />
                        Experience Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        {selectedPackage.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-4 text-tulu-blue flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Experience Highlights
                          </h4>
                          <ul className="space-y-3">
                            {selectedPackage.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <span className="text-tulu-green mr-3 text-lg">✨</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-4 text-tulu-blue flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            What's Included
                          </h4>
                          <ul className="space-y-3">
                            {selectedPackage.includes.map((item, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <span className="text-tulu-teal mr-3 text-lg">🎁</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Itinerary */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-tulu-red" />
                        Your Journey Day by Day
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedPackage.itinerary.map((day, index) => (
                          <div key={index} className="relative">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-r from-tulu-blue to-tulu-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {day.day}
                                </div>
                                {index < selectedPackage.itinerary.length - 1 && (
                                  <div className="w-px h-16 bg-gradient-to-b from-tulu-blue/50 to-transparent mx-auto mt-2"></div>
                                )}
                              </div>
                              <div className="flex-1 pb-8">
                                <div className="bg-gradient-to-r from-tulu-sand/20 to-tulu-beige/20 rounded-xl p-4">
                                  <h5 className="font-bold text-lg mb-3 text-tulu-blue">{day.title}</h5>
                                  <div className="space-y-3">
                                    <div>
                                      <span className="text-sm font-medium text-tulu-green mb-2 block">🎯 Today's Adventures:</span>
                                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {day.activities.map((activity, actIndex) => (
                                          <li key={actIndex} className="text-sm flex items-start gap-2">
                                            <span className="text-tulu-teal">▶</span>
                                            <span>{activity}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="flex items-center gap-4 pt-2 border-t border-tulu-sand/30">
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">🍽️</span>
                                        <span className="text-sm font-medium text-muted-foreground">
                                          Meals: {day.meals.join(', ')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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

      {/* Enhanced Custom Package Section */}
      {currentView === 'selector' && (
        <div className="relative bg-gradient-to-r from-tulu-blue/5 via-tulu-teal/5 to-tulu-green/5 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-tulu-gold/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-tulu-red/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          <div className="relative container mx-auto py-16 px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-tulu-gold/20 text-tulu-gold border-tulu-gold/30">
                <Sparkles className="w-4 h-4 mr-1" />
                Personalized Just for You
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-tulu-blue via-tulu-teal to-tulu-green bg-clip-text text-transparent">
                  Create Your Dream
                </span>{' '}
                <span className="text-tulu-red">Cultural Journey</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                Can't find the perfect fit? No worries! We're experts at crafting completely customized cultural 
                immersion programs. Tell us your dreams, and we'll make them reality. ✨
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-tulu-green via-tulu-teal to-tulu-blue hover:from-tulu-blue hover:to-tulu-red text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link to="/contact">
                    <Zap className="w-5 h-5 mr-2" />
                    Request Custom Package
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-tulu-blue text-tulu-blue hover:bg-tulu-blue hover:text-white px-8 py-4 rounded-full transition-all duration-300"
                  asChild
                >
                  <Link to="/contact">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat with Expert
                  </Link>
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-tulu-blue to-tulu-teal rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span>500+ custom experiences crafted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-tulu-gold fill-current" />
                  <span>4.9/5 satisfaction rate</span>
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
