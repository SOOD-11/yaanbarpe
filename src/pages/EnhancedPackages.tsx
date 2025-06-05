
import { useState } from 'react';
import { Package } from '@/lib/packageData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PackageSelector from '@/components/PackageSelector';
import RouteMap from '@/components/RouteMap';
import PackageComparison from '@/components/PackageComparison';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Users, Star, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

type ViewMode = 'packages' | 'comparison' | 'route' | 'details';

const EnhancedPackages = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('packages');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentView('details');
  };

  const handleRouteView = (routeId: string) => {
    setSelectedRoute(routeId);
    setCurrentView('route');
  };

  const handleBack = () => {
    setCurrentView('packages');
    setSelectedPackage(null);
    setSelectedRoute('');
  };

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="bg-gradient-to-b from-tulu-sand/20 to-background flex-1">
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-tulu-green">Pyramidal</span> Experience Packages
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                From quick cultural snapshots to deep immersive journeys - find your perfect Tulu Nadu experience
              </p>
              
              {/* Package Tier Overview */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 max-w-4xl mx-auto">
                {[
                  { name: 'Basic', icon: '🌱', desc: 'Entry Level' },
                  { name: 'Business', icon: '💼', desc: 'Executive Brief' },
                  { name: 'Intermediate', icon: '🎭', desc: 'Cultural Deep Dive' },
                  { name: 'Semi-Emulsive', icon: '🎨', desc: 'Immersive Experience' },
                  { name: 'Fully Emulsive', icon: '🏛️', desc: 'Complete Journey' },
                  { name: 'Supreme', icon: '👑', desc: 'Ultimate Luxury' }
                ].map((tier, index) => (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-3 bg-white/50 rounded-lg border"
                  >
                    <div className="text-2xl mb-1">{tier.icon}</div>
                    <div className="font-medium text-sm">{tier.name}</div>
                    <div className="text-xs text-muted-foreground">{tier.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          {currentView === 'packages' && (
            <Tabs defaultValue="browse" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="browse">Browse Packages</TabsTrigger>
                <TabsTrigger value="compare">Compare Packages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse">
                <PackageSelector 
                  onPackageSelect={handlePackageSelect}
                  onRouteView={handleRouteView}
                />
              </TabsContent>
              
              <TabsContent value="compare">
                <PackageComparison onPackageSelect={handlePackageSelect} />
              </TabsContent>
            </Tabs>
          )}

          {currentView === 'route' && (
            <RouteMap routeId={selectedRoute} onBack={handleBack} />
          )}

          {currentView === 'details' && selectedPackage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Packages
                </Button>
                <div className="flex gap-2">
                  <Button className="bg-tulu-blue hover:bg-tulu-green">
                    Book Now
                  </Button>
                  <Button variant="outline">
                    <Gift className="w-4 h-4 mr-2" />
                    Gift This Experience
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <div className="relative h-64 md:h-96 overflow-hidden rounded-t-lg">
                      <img 
                        src={selectedPackage.image} 
                        alt={selectedPackage.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-black/70 text-white">
                          {selectedPackage.tier}
                        </Badge>
                        {selectedPackage.featured && (
                          <Badge className="bg-tulu-gold text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded">
                        +{selectedPackage.points} Experience Points
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold">{selectedPackage.title}</h1>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-tulu-green">
                            {formatPrice(selectedPackage.price.min, selectedPackage.price.max)}
                          </div>
                          <div className="text-sm text-muted-foreground">per person</div>
                        </div>
                      </div>
                      
                      <p className="text-lg mb-6">{selectedPackage.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-tulu-blue" />
                          <div>
                            <div className="font-medium">Duration</div>
                            <div className="text-sm text-muted-foreground">{selectedPackage.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-tulu-blue" />
                          <div>
                            <div className="font-medium">Group Size</div>
                            <div className="text-sm text-muted-foreground">{selectedPackage.groupSize}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-tulu-blue" />
                          <div>
                            <div className="font-medium">Difficulty</div>
                            <div className="text-sm text-muted-foreground capitalize">{selectedPackage.difficulty}</div>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3">Experience Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {selectedPackage.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-tulu-gold mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Itinerary */}
                      <div>
                        <h3 className="font-semibold mb-3">Detailed Itinerary</h3>
                        <div className="space-y-4">
                          {selectedPackage.itinerary.map((day, index) => (
                            <Card key={index} className="border">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Day {day.day}: {day.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="font-medium mb-2">Activities</h4>
                                    <ul className="text-sm space-y-1">
                                      {day.activities.map((activity, actIndex) => (
                                        <li key={actIndex} className="flex items-start gap-2">
                                          <span className="text-tulu-blue">•</span>
                                          {activity}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Meals</h4>
                                    <ul className="text-sm space-y-1">
                                      {day.meals.map((meal, mealIndex) => (
                                        <li key={mealIndex} className="flex items-start gap-2">
                                          <span className="text-tulu-green">•</span>
                                          {meal}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* What's Included */}
                  <Card>
                    <CardHeader>
                      <CardTitle>What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedPackage.includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-tulu-green rounded-full mt-2 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Best For */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Perfect For</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedPackage.bestFor.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Booking Actions */}
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <Button className="w-full bg-tulu-blue hover:bg-tulu-green text-lg py-3">
                        Book This Experience
                      </Button>
                      <Button variant="outline" className="w-full">
                        Request Custom Quote
                      </Button>
                      <Button variant="ghost" className="w-full">
                        Download Brochure
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EnhancedPackages;
