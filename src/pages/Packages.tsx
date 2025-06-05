
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
import { Clock, Users, MapPin, Star, ArrowLeft } from 'lucide-react';

const Packages = () => {
  const [currentView, setCurrentView] = useState<'selector' | 'package' | 'route' | 'comparison'>('selector');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('');

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="bg-gradient-to-b from-tulu-sand/20 to-background">
        <div className="container mx-auto py-16 px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-tulu-green">Tailored</span> Experiences
            </h1>
            <p className="text-muted-foreground text-lg">
              Immerse yourself in the authentic essence of Tulu Nadu with our carefully crafted packages, designed to provide deep cultural immersion
            </p>
          </div>

          {/* Main Content */}
          {currentView === 'selector' && (
            <>
              <Tabs defaultValue="packages" className="w-full mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="packages">Browse Packages</TabsTrigger>
                  <TabsTrigger value="comparison">Compare Packages</TabsTrigger>
                </TabsList>
                
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
            </>
          )}

          {currentView === 'package' && selectedPackage && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" onClick={handleBackToSelector}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Packages
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Package Image and Basic Info */}
                <div className="lg:col-span-1">
                  <Card>
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <img 
                        src={selectedPackage.image} 
                        alt={selectedPackage.title}
                        className="w-full h-full object-cover"
                      />
                      {selectedPackage.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-tulu-gold text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-tulu-green">
                            {formatPrice(selectedPackage.price.min, selectedPackage.price.max)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            +{selectedPackage.points} points
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {selectedPackage.duration}
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-2" />
                            {selectedPackage.groupSize}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            {selectedPackage.routes.length} route{selectedPackage.routes.length > 1 ? 's' : ''}
                          </div>
                        </div>

                        <Button className="w-full bg-tulu-blue hover:bg-tulu-green">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Package Details */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedPackage.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{selectedPackage.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Highlights</h4>
                          <ul className="space-y-2">
                            {selectedPackage.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <span className="text-tulu-green mr-2">✓</span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Package Includes</h4>
                          <ul className="space-y-2">
                            {selectedPackage.includes.map((item, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <span className="text-tulu-green mr-2">✓</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Itinerary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Day-by-Day Itinerary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedPackage.itinerary.map((day, index) => (
                          <div key={index} className="border-l-2 border-tulu-blue/20 pl-4">
                            <h5 className="font-semibold mb-2">Day {day.day}: {day.title}</h5>
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Activities:</span>
                                <ul className="list-disc list-inside text-sm mt-1">
                                  {day.activities.map((activity, actIndex) => (
                                    <li key={actIndex}>{activity}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Meals:</span>
                                <span className="text-sm ml-2">{day.meals.join(', ')}</span>
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

          {/* Custom Package Section */}
          <div className="bg-tulu-blue/5 rounded-2xl p-6 md:p-10 mt-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-tulu-blue">Personalize Your Cultural Journey</h2>
            <p className="mb-6">
              Can't find the perfect fit? We specialize in creating fully customized cultural immersion programs tailored to your specific interests, timeframe, and learning objectives.
            </p>
            <Button className="bg-tulu-green hover:bg-tulu-blue transition-colors">
              Request Custom Package
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
