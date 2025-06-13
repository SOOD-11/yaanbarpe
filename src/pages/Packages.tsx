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
import { Clock, Users, MapPin, Star, ArrowLeft, Heart, Filter, Search, Sparkles, TrendingUp, Award, Zap, MessageCircle, Play, Share2, Calendar, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Packages = () => {
  const [currentView, setCurrentView] = useState<'selector' | 'package' | 'route' | 'comparison'>('selector');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
        title: 'Amazing Tulu Nadu Packages',
        text: 'Discover authentic cultural experiences in Tulu Nadu',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share these amazing packages with friends",
        duration: 2000,
      });
    }
  };

  const popularFilters = [
    { label: '🔥 Trending', value: 'trending', count: 12 },
    { label: '⭐ Best Rated', value: 'rated', count: 8 },
    { label: '💰 Best Value', value: 'value', count: 15 },
    { label: '🆕 New Arrivals', value: 'new', count: 6 },
    { label: '👨‍👩‍👧‍👦 Family Perfect', value: 'family', count: 10 }
  ];

  const stats = [
    { label: 'Happy Travelers', value: '2,500+', icon: '😊', trend: '+15% this month' },
    { label: 'Cultural Sites', value: '50+', icon: '🏛️', trend: 'Authentic locations' },
    { label: 'Expert Guides', value: '25+', icon: '👨‍🏫', trend: 'Local specialists' },
    { label: 'Success Rate', value: '99.8%', icon: '✅', trend: 'Customer satisfaction' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-tulu-sand/10 via-background to-tulu-beige/20">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-tulu-blue/10 via-tulu-teal/10 to-tulu-green/10 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-tulu-gold/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-tulu-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-tulu-teal/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto py-20 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-tulu-gold via-tulu-red to-tulu-teal text-white px-6 py-3 animate-bounce shadow-lg">
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Premium Cultural Experiences
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-tulu-green via-tulu-blue to-tulu-teal bg-clip-text text-transparent animate-fade-in-up">
                Extraordinary
              </span>{' '}
              <span className="text-tulu-red animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Adventures
              </span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Immerse yourself in the authentic soul of Tulu Nadu through expertly crafted packages. From ancient temples to living traditions, 
              every journey is designed to create memories that last forever.
            </p>

            {/* Enhanced Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-tulu-blue mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-tulu-green">{stat.trend}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-lg mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search experiences... (temples, festivals, cuisine, adventures)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 rounded-full border-2 border-tulu-sand/30 focus:border-tulu-teal focus:ring-tulu-teal/20 bg-white/90 backdrop-blur-sm text-lg shadow-lg"
                />
                {searchQuery && (
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-tulu-teal hover:bg-tulu-blue"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-tulu-red via-tulu-gold to-tulu-teal hover:from-tulu-teal hover:to-tulu-red text-white px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              >
                <Play className={`w-5 h-5 mr-2 ${isVideoPlaying ? 'animate-pulse' : ''}`} />
                {isVideoPlaying ? 'Playing Preview' : 'Watch Preview'}
                <Sparkles className="w-5 h-5 ml-2 animate-spin" style={{ animationDuration: '3s' }} />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-tulu-blue/50 text-tulu-blue hover:bg-tulu-blue hover:text-white backdrop-blur-sm px-10 py-4 rounded-full transition-all duration-300 group"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Share with Friends
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-tulu-gold fill-current animate-pulse" />
                <span className="font-semibold">4.9/5</span>
                <span className="text-sm">from 500+ reviews</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-5 h-5 text-tulu-teal" />
                <span className="font-semibold">2,500+</span>
                <span className="text-sm">happy adventurers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-5 h-5 text-tulu-red animate-bounce" />
                <span className="font-semibold">Award</span>
                <span className="text-sm">winning service</span>
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
              {/* Enhanced Filters and Tabs */}
              <div className="mb-8">
                <Tabs defaultValue="packages" className="w-full">
                  <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    <TabsList className="grid w-full lg:w-auto grid-cols-2 bg-white/80 backdrop-blur-sm shadow-lg border border-tulu-sand/30">
                      <TabsTrigger value="packages" className="flex items-center gap-2 data-[state=active]:bg-tulu-blue data-[state=active]:text-white">
                        <Award className="w-4 h-4" />
                        Browse Packages
                      </TabsTrigger>
                      <TabsTrigger value="comparison" className="flex items-center gap-2 data-[state=active]:bg-tulu-teal data-[state=active]:text-white">
                        <TrendingUp className="w-4 h-4" />
                        Compare Options
                      </TabsTrigger>
                    </TabsList>

                    {/* Enhanced Popular Filters */}
                    <div className="flex flex-wrap gap-3">
                      {popularFilters.map((filter, index) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className="cursor-pointer hover:bg-tulu-teal/20 hover:text-tulu-teal transition-all duration-300 px-4 py-2 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 group"
                        >
                          <span>{filter.label}</span>
                          <span className="ml-2 bg-tulu-gold/20 text-tulu-gold px-2 py-0.5 rounded-full text-xs group-hover:bg-tulu-gold group-hover:text-white transition-colors">
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
                  className="rounded-full hover:bg-tulu-sand/20 border-2 hover:border-tulu-blue hover:text-tulu-blue transition-all duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Packages
                </Button>
                <Badge className="bg-gradient-to-r from-tulu-green via-tulu-blue to-tulu-teal text-white px-4 py-2 animate-pulse">
                  <Heart className="w-3 h-3 mr-1 animate-pulse" />
                  Popular Choice
                </Badge>
                <Badge className="bg-tulu-gold/20 text-tulu-gold border border-tulu-gold/30">
                  <Star className="w-3 h-3 mr-1" />
                  Featured Experience
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
          <div className="relative container mx-auto py-20 px-4 md:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-6 bg-gradient-to-r from-tulu-gold via-tulu-red to-tulu-teal text-white px-6 py-3 border-2 border-tulu-gold/30 shadow-xl">
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Personalized Just for You
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-tulu-blue via-tulu-teal to-tulu-green bg-clip-text text-transparent">
                  Craft Your Perfect
                </span>{' '}
                <span className="text-tulu-red">Cultural Journey</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed">
                Can't find exactly what you're looking for? No problem! Our cultural specialists excel at creating completely 
                customized immersion programs. Share your dreams, and we'll craft them into unforgettable realities. ✨
              </p>

              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-12 h-12 text-tulu-blue mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">Flexible Scheduling</h4>
                    <p className="text-sm text-muted-foreground">Travel on your timeline with custom duration options</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-tulu-green mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">Private Groups</h4>
                    <p className="text-sm text-muted-foreground">Intimate experiences for family & friends</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <Camera className="w-12 h-12 text-tulu-red mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">Special Interests</h4>
                    <p className="text-sm text-muted-foreground">Photography, culinary arts, spiritual journeys & more</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-tulu-green via-tulu-teal to-tulu-blue hover:from-tulu-blue hover:to-tulu-red text-white px-12 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
                  asChild
                >
                  <Link to="/contact">
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    Design My Adventure
                    <Sparkles className="w-5 h-5 ml-2 group-hover:animate-spin" />
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-tulu-blue text-tulu-blue hover:bg-tulu-blue hover:text-white px-12 py-4 rounded-full transition-all duration-300 group"
                  asChild
                >
                  <Link to="/contact">
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Chat with Specialist
                  </Link>
                </Button>
              </div>
              
              {/* Enhanced Social Proof */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-tulu-blue to-tulu-teal rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="font-medium">500+ custom journeys crafted</span>
                </div>
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3">
                  <Star className="w-5 h-5 text-tulu-gold fill-current animate-pulse" />
                  <span className="font-medium">4.9/5 satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3">
                  <Award className="w-5 h-5 text-tulu-red animate-bounce" />
                  <span className="font-medium">Award-winning service</span>
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
