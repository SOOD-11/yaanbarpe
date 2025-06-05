
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, MapPin, Star, Calendar, Camera, Utensils, Music, Heart } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Yakshagana Experience',
    description: 'Immerse yourself in the colorful world of Yakshagana, a traditional theatre form that combines dance, music, dialogue, costume, and stage techniques.',
    image: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { min: 2500, max: 2500 },
    duration: '4 hours',
    groupSize: '10-15 people',
    category: 'Cultural',
    featured: true,
    highlights: [
      'Traditional costume demonstration',
      'Live performance by local artists',
      'Hands-on makeup session',
      'Historical storytelling'
    ],
    includes: [
      'Expert guide',
      'Traditional snacks',
      'Photography session',
      'Certificate of participation'
    ]
  },
  {
    id: 2,
    title: 'Sri Krishna Temple Tour',
    description: 'Visit the famous Sri Krishna Matha temple in Udupi and learn about its rich history, architecture, and spiritual significance.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { min: 1800, max: 1800 },
    duration: '3 hours',
    groupSize: '15-20 people',
    category: 'Spiritual',
    featured: false,
    highlights: [
      'Ancient temple architecture',
      'Spiritual rituals participation',
      'Meeting with temple priests',
      'Historical manuscripts viewing'
    ],
    includes: [
      'Temple entry fees',
      'Guided tour',
      'Prasadam',
      'Cultural booklet'
    ]
  },
  {
    id: 3,
    title: "St. Mary's Islands Adventure",
    description: "Explore the geological wonder of St. Mary's Islands with its unique hexagonal basalt rock formations and pristine beaches.",
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { min: 3200, max: 3200 },
    duration: 'Full day',
    groupSize: '8-12 people',
    category: 'Nature',
    featured: true,
    highlights: [
      'Boat ride to the islands',
      'Geological formation study',
      'Beach activities',
      'Photography opportunities'
    ],
    includes: [
      'Boat transportation',
      'Lunch',
      'Safety equipment',
      'Professional guide'
    ]
  },
  {
    id: 4,
    title: 'Tulu Cuisine Workshop',
    description: 'Learn the art of authentic Tulu cuisine through hands-on cooking classes with local experts using traditional techniques.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { min: 2200, max: 2200 },
    duration: '5 hours',
    groupSize: '6-10 people',
    category: 'Culinary',
    featured: false,
    highlights: [
      'Traditional cooking methods',
      'Local spice knowledge',
      'Recipe collection',
      'Market visit'
    ],
    includes: [
      'All ingredients',
      'Cooking utensils',
      'Recipe booklet',
      'Take-home spices'
    ]
  },
  {
    id: 5,
    title: 'Cultural Festival Immersion',
    description: 'Experience authentic Tulu festivals like Kambala, Bhoota Kola, and seasonal celebrations with local communities.',
    image: 'https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { min: 2800, max: 4500 },
    duration: '6-8 hours',
    groupSize: '12-18 people',
    category: 'Cultural',
    featured: true,
    highlights: [
      'Traditional festival participation',
      'Local community interaction',
      'Cultural storytelling',
      'Traditional games'
    ],
    includes: [
      'Festival entry',
      'Traditional attire rental',
      'Local meals',
      'Cultural guide'
    ]
  },
  {
    id: 6,
    title: 'Heritage Village Walk',
    description: 'Walk through traditional Tulu villages, experience rural life, and learn about ancient customs and traditions.',
    image: 'https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { min: 1500, max: 2000 },
    duration: '4-5 hours',
    groupSize: '8-15 people',
    category: 'Heritage',
    featured: false,
    highlights: [
      'Traditional house visits',
      'Local artisan workshops',
      'Agricultural practices',
      'Folk story sessions'
    ],
    includes: [
      'Village guide',
      'Traditional snacks',
      'Handicraft demonstrations',
      'Photo opportunities'
    ]
  }
];

const categories = ['All', 'Cultural', 'Spiritual', 'Nature', 'Culinary', 'Heritage'];

const Experiences = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  const filteredExperiences = selectedCategory === 'All' 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

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
              <span className="text-tulu-green">Authentic</span> Experiences
            </h1>
            <p className="text-muted-foreground text-lg">
              Dive deep into the heart of Tulu Nadu through immersive cultural experiences that connect you with authentic traditions, local communities, and timeless heritage.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-tulu-blue text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  {experience.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-tulu-gold text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{experience.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{experience.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{experience.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-tulu-blue" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-tulu-blue" />
                      {experience.groupSize}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-tulu-green">
                      <span>{formatPrice(experience.price.min, experience.price.max)}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-tulu-blue hover:bg-tulu-green"
                    onClick={() => setSelectedExperience(experience)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Experience Details Modal */}
          {selectedExperience && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="relative">
                  <img 
                    src={selectedExperience.image} 
                    alt={selectedExperience.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <button 
                    onClick={() => setSelectedExperience(null)}
                    className="absolute top-4 right-4 bg-white/80 rounded-full p-2 text-black hover:bg-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">{selectedExperience.title}</h2>
                      <p className="text-muted-foreground mb-6">{selectedExperience.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Experience Highlights</h4>
                          <ul className="space-y-1">
                            {selectedExperience.highlights.map((highlight: string, index: number) => (
                              <li key={index} className="flex items-start text-sm">
                                <span className="text-tulu-green mr-2">✓</span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">What's Included</h4>
                          <ul className="space-y-1">
                            {selectedExperience.includes.map((item: string, index: number) => (
                              <li key={index} className="flex items-start text-sm">
                                <span className="text-tulu-blue mr-2">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-tulu-sand/10 p-6 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <span className="text-2xl font-bold text-tulu-green">
                            {formatPrice(selectedExperience.price.min, selectedExperience.price.max)}
                          </span>
                          <span className="text-muted-foreground ml-2">per person</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm">{selectedExperience.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            <span className="text-sm">{selectedExperience.groupSize}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">Available daily</span>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-tulu-red hover:bg-tulu-blue text-white">
                          Book This Experience
                        </Button>
                        
                        <Button variant="outline" className="w-full">
                          Contact for Custom Plans
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Why Choose Our Experiences */}
          <div className="bg-tulu-blue/5 rounded-2xl p-8 mt-16">
            <h2 className="font-display text-3xl font-bold mb-8 text-center text-tulu-blue">
              Why Choose Our Experiences?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Heart className="w-8 h-8 text-tulu-red mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Authentic Connections</h4>
                <p className="text-sm text-muted-foreground">Connect with local communities and experience genuine Tulu traditions</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-tulu-green mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Expert Guides</h4>
                <p className="text-sm text-muted-foreground">Learn from passionate local experts with deep cultural knowledge</p>
              </div>
              <div className="text-center">
                <Camera className="w-8 h-8 text-tulu-gold mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Memorable Moments</h4>
                <p className="text-sm text-muted-foreground">Create lasting memories through immersive hands-on experiences</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-tulu-teal mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Quality Assured</h4>
                <p className="text-sm text-muted-foreground">Carefully curated experiences with highest quality standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Experiences;
