
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Premium Background with Parallax Effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
          style={{ backgroundImage: `url(${currentHero.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/90" />
        
        {/* Elegant Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-amber-400/30 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-emerald-400/30 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-rose-400/20 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="mb-8 animate-fade-in-up">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 text-base font-medium shadow-2xl border-0">
              <Sparkles className="w-5 h-5 mr-2" />
              {currentSlide === 0 && "🌟 Premium Cultural Experiences"}
              {currentSlide === 1 && "🎭 Authentic Performance Arts"}
              {currentSlide === 2 && "🏛️ Sacred Heritage Tours"}
            </Badge>
          </div>

          {/* Main Title with Professional Typography */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent animate-fade-in-up">
              {currentHero.title.split(' ').slice(0, -2).join(' ')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {currentHero.title.split(' ').slice(-2).join(' ')}
            </span>
          </h1>

          {/* Refined Subtitle */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-amber-300 text-2xl md:text-3xl font-light tracking-wide">
              {currentHero.subtitle}
            </span>
          </div>

          {/* Professional Description */}
          <p className="text-slate-200 text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {currentHero.description}
          </p>

          {/* Premium Stats Row */}
          <div className="flex justify-center gap-12 mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {Object.entries(currentHero.stats).map(([key, value], index) => (
              <div key={key} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform">{value}</div>
                <div className="text-slate-300 text-sm uppercase tracking-wider font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-14 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-5 rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 group text-lg font-semibold"
              asChild
            >
              <Link to="/packages">
                <Globe className="w-6 h-6 mr-3" />
                Explore Experiences
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-slate-300/50 text-white hover:bg-white/10 backdrop-blur-md bg-white/5 px-10 py-5 rounded-full transition-all duration-300 group text-lg font-medium"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Play className={`w-6 h-6 mr-3 ${isPlaying ? 'animate-pulse' : ''}`} />
              {isPlaying ? 'Playing Preview' : 'Watch Preview'}
            </Button>
          </div>

          {/* Professional Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-200 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center gap-3 group">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
              <span className="text-slate-400">from 500+ reviews</span>
            </div>
            <div className="w-px h-6 bg-slate-400/30" />
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-emerald-400" />
              <span className="font-semibold">2,500+</span>
              <span className="text-slate-400">satisfied travelers</span>
            </div>
            <div className="w-px h-6 bg-slate-400/30" />
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-rose-400" />
              <span className="font-semibold">25+</span>
              <span className="text-slate-400">expert guides</span>
            </div>
          </div>
        </div>
      </div>

      {/* Refined Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-amber-400 w-8' 
                : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
          />
        ))}
      </div>

      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-slate-300 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm tracking-wider font-light">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;
