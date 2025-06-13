
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star, Users, MapPin, Sparkles, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const heroSlides = [
    {
      title: "Discover the Soul of Tulu Nadu",
      subtitle: "Ancient Traditions, Modern Adventures",
      description: "Immerse yourself in centuries-old culture through authentic experiences that connect you with the heart of coastal Karnataka.",
      image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200",
      stats: { experiences: "50+", locations: "25+", rating: "4.9" }
    },
    {
      title: "Live Yakshagana Performances",
      subtitle: "Traditional Theatre Comes Alive",
      description: "Witness the magic of Yakshagana with master performers in authentic settings, complete with traditional costumes and storytelling.",
      image: "https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1200",
      stats: { shows: "Weekly", artists: "15+", history: "500 Years" }
    },
    {
      title: "Sacred Temple Journeys",
      subtitle: "Spiritual Heritage & Architecture",
      description: "Explore ancient temples with expert guides who share stories passed down through generations of devotees and scholars.",
      image: "https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=1200",
      stats: { temples: "30+", guides: "Expert", heritage: "1000+ Years" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background with Parallax Effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
          style={{ backgroundImage: `url(${currentHero.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
        
        {/* Animated Geometric Patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-tulu-gold rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-tulu-teal rounded-full animate-bounce" />
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-tulu-red/30 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Floating Badge */}
          <div className="mb-6 animate-fade-in-up">
            <Badge className="bg-gradient-to-r from-tulu-gold via-tulu-red to-tulu-teal text-white px-6 py-2 text-sm font-medium shadow-2xl animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              {currentSlide === 0 && "🌟 Cultural Heritage Explorer"}
              {currentSlide === 1 && "🎭 Live Performance Experience"}
              {currentSlide === 2 && "🏛️ Sacred Architecture Journey"}
            </Badge>
          </div>

          {/* Main Title with Enhanced Typography */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-tulu-gold to-white bg-clip-text text-transparent animate-fade-in-up">
              {currentHero.title.split(' ').slice(0, -2).join(' ')}
            </span>
            <br />
            <span className="text-tulu-red animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {currentHero.title.split(' ').slice(-2).join(' ')}
            </span>
          </h1>

          {/* Subtitle */}
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-tulu-gold text-xl md:text-2xl font-medium tracking-wide">
              {currentHero.subtitle}
            </span>
          </div>

          {/* Description */}
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {currentHero.description}
          </p>

          {/* Stats Row */}
          <div className="flex justify-center gap-8 mb-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {Object.entries(currentHero.stats).map(([key, value], index) => (
              <div key={key} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-tulu-gold mb-1">{value}</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-tulu-red via-tulu-gold to-tulu-teal hover:from-tulu-teal hover:to-tulu-red text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
              asChild
            >
              <Link to="/packages">
                <Sparkles className="w-5 h-5 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full transition-all duration-300 group"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Play className={`w-5 h-5 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
              {isPlaying ? 'Playing Preview' : 'Watch Preview'}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-tulu-gold fill-current" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-sm">from 500+ reviews</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-tulu-teal" />
              <span className="font-semibold">2,500+</span>
              <span className="text-sm">happy travelers</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-tulu-red" />
              <span className="font-semibold">25+</span>
              <span className="text-sm">local guides</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-tulu-gold w-8' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white/60 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm tracking-wider">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;
