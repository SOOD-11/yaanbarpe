import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Users, MapPin, Star, Heart, Bookmark, Share2, Calendar, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const experiences = [
  {
    id: 1,
    title: 'Yakshagana Masterclass',
    description: 'Learn from legendary performers in an immersive workshop combining theory, practice, and live performance.',
    image: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2500,
    originalPrice: 3500,
    duration: '6 hours',
    groupSize: '8-12',
    location: 'Udupi Heritage Center',
    rating: 4.9,
    reviews: 234,
    category: 'Cultural Arts',
    difficulty: 'Beginner Friendly',
    includes: ['Traditional costume', 'Expert instruction', 'Performance opportunity', 'Certificate'],
    nextDate: '2024-01-15',
    spotsLeft: 3,
    isPopular: true,
    isFeatured: true
  },
  {
    id: 2,
    title: 'Sacred Temple Circuit',
    description: 'Journey through ancient temples with archaeological insights and spiritual traditions.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 1800,
    originalPrice: 2200,
    duration: '8 hours',
    groupSize: '12-20',
    location: 'Udupi & Surroundings',
    rating: 4.8,
    reviews: 456,
    category: 'Spiritual Heritage',
    difficulty: 'Easy',
    includes: ['Expert guide', 'Temple entries', 'Traditional lunch', 'Prayer kit'],
    nextDate: '2024-01-12',
    spotsLeft: 8,
    isPopular: false,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Coastal Adventure & Culture',
    description: 'Combine beach exploration with fishing village culture and traditional cuisine.',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 3200,
    originalPrice: 4000,
    duration: 'Full day',
    groupSize: '6-10',
    location: "St. Mary's Islands",
    rating: 4.7,
    reviews: 189,
    category: 'Nature & Culture',
    difficulty: 'Moderate',
    includes: ['Boat transfers', 'Fresh seafood lunch', 'Snorkeling gear', 'Cultural guide'],
    nextDate: '2024-01-20',
    spotsLeft: 2,
    isPopular: true,
    isFeatured: false
  },
  {
    id: 4,
    title: 'Tulu Cuisine Secrets',
    description: 'Master authentic recipes with local grandmothers in traditional kitchens.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2200,
    originalPrice: 2800,
    duration: '5 hours',
    groupSize: '4-8',
    location: 'Traditional Home',
    rating: 4.9,
    reviews: 167,
    category: 'Culinary Arts',
    difficulty: 'All Levels',
    includes: ['Ingredients', 'Recipe book', 'Market tour', 'Family lunch'],
    nextDate: '2024-01-18',
    spotsLeft: 5,
    isPopular: true,
    isFeatured: true
  }
];

const ModernFeaturedExperiences = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Cultural Arts', 'Spiritual Heritage', 'Nature & Culture', 'Culinary Arts'];

  const filteredExperiences = activeFilter === 'All' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeFilter);

  const handleBookmark = (id: number) => {
    setBookmarked(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    toast({
      title: bookmarked.includes(id) ? "Removed from bookmarks" : "Added to bookmarks",
      description: "Find your saved experiences in your profile",
      duration: 2000,
    });
  };

  const handleShare = (experience: any) => {
    if (navigator.share) {
      navigator.share({
        title: experience.title,
        text: experience.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share this amazing experience with friends",
        duration: 2000,
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-tulu-sand/10 to-tulu-beige/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-tulu-red to-tulu-gold text-white px-6 py-2">
            <Award className="w-4 h-4 mr-2" />
            Handpicked Experiences
          </Badge>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-tulu-blue via-tulu-teal to-tulu-green bg-clip-text text-transparent">
              Extraordinary
            </span>{' '}
            <span className="text-tulu-red">Adventures</span>
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Dive deep into Tulu Nadu's soul through carefully curated experiences that blend ancient wisdom with modern comfort.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full transition-all duration-300 ${
                  activeFilter === category 
                    ? 'bg-gradient-to-r from-tulu-blue to-tulu-teal text-white shadow-lg' 
                    : 'hover:bg-tulu-sand/20'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredExperiences.map((experience, index) => (
            <Card 
              key={experience.id}
              className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-64 overflow-hidden">
                {/* Image */}
                <img 
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {experience.isPopular && (
                    <Badge className="bg-orange-500 text-white animate-pulse">
                      🔥 Popular
                    </Badge>
                  )}
                  {experience.isFeatured && (
                    <Badge className="bg-tulu-gold text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
                    onClick={() => handleBookmark(experience.id)}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked.includes(experience.id) ? 'fill-tulu-gold text-tulu-gold' : 'text-white'}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0"
                    onClick={() => handleShare(experience)}
                  >
                    <Share2 className="w-4 h-4 text-white" />
                  </Button>
                </div>

                {/* Spots Left Indicator */}
                {experience.spotsLeft <= 5 && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className={`${experience.spotsLeft <= 3 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'} text-white`}>
                      Only {experience.spotsLeft} spots left!
                    </Badge>
                  </div>
                )}

                {/* Price */}
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="text-white font-bold text-lg">₹{experience.price.toLocaleString()}</div>
                  <div className="text-white/60 text-sm line-through">₹{experience.originalPrice.toLocaleString()}</div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Category & Rating */}
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {experience.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-tulu-gold fill-current" />
                    <span className="text-sm font-medium">{experience.rating}</span>
                    <span className="text-xs text-muted-foreground">({experience.reviews})</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-tulu-blue transition-colors">
                  {experience.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {experience.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-tulu-blue" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-tulu-green" />
                    <span>{experience.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-tulu-red" />
                    <span className="truncate">{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-tulu-teal" />
                    <span>{new Date(experience.nextDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-tulu-blue to-tulu-teal hover:from-tulu-teal hover:to-tulu-green text-white rounded-xl transition-all duration-300 group/btn pointer-events-auto"
                  asChild
                >
                  <Link
                    to={`/booking?experience=${experience.id}`}
                    data-testid="book-experience"
                    className="pointer-events-auto flex items-center justify-center w-full"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Book Experience
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>

              {/* Hover Details Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b from-tulu-blue/95 to-tulu-teal/95 p-6 flex flex-col justify-center transition-all duration-500 ${
                hoveredCard === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <h4 className="text-white font-bold text-xl mb-4">What's Included:</h4>
                <ul className="space-y-2 text-white/90">
                  {experience.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-tulu-gold rounded-full"></span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span>Difficulty: {experience.difficulty}</span>
                    <span className="font-semibold">{experience.spotsLeft} spots left</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-tulu-red via-tulu-gold to-tulu-teal hover:from-tulu-teal hover:to-tulu-red text-white px-12 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
            asChild
          >
            <Link to="/experiences">
              <Heart className="w-5 h-5 mr-2 animate-pulse" />
              Explore All Adventures
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturedExperiences;
