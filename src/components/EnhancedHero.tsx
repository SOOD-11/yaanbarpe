import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star, Users, Heart, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const driveVideo =
  "https://drive.google.com/uc?export=preview&id=1ve-_zZEtaOjbdLnIRjc4tygvrA4FrntQ";

const localVideo = "/hero-bg.mp4"; // Use your own mp4 file in public/

const fallbackImage =
  "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200";

const heroSlides = [
  {
    title: "Discover the Soul of Tulu Nadu",
    subtitle: "Ancient Traditions, Modern Adventures",
    description: "Immerse yourself in centuries-old culture through authentic experiences that connect you with the heart of coastal Karnataka.",
    video: driveVideo,
    image: fallbackImage,
    stats: { experiences: "50+", locations: "25+", rating: "4.9" }
  },
  {
    title: "Live Yakshagana Performances",
    subtitle: "Traditional Theatre Comes Alive",
    description: "Witness the magic of Yakshagana with master performers in authentic settings, complete with traditional costumes and storytelling.",
    video: driveVideo,
    image: "https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: { shows: "Weekly", artists: "15+", history: "500 Years" }
  },
  {
    title: "Sacred Temple Journeys",
    subtitle: "Spiritual Heritage & Architecture",
    description: "Explore ancient temples with expert guides who share stories passed down through generations of devotees and scholars.",
    video: driveVideo,
    image: "https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: { temples: "30+", guides: "Expert", heritage: "1000+ Years" }
  }
];

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            src={localVideo}
            className="absolute inset-0 w-full h-full object-cover bg-black"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            style={{ zIndex: 1 }}
            onCanPlayThrough={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          />
        ) : (
          <img
            src={currentHero.image}
            alt="Cultural experience background"
            className="absolute inset-0 w-full h-full object-cover bg-black"
            style={{ zIndex: 1 }}
          />
        )}
        {/* Lighter, nearly transparent overlay for readability only */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/10 to-black/20 pointer-events-none z-10" />
        {/* No heavy overlay anymore */}

        {/* Decor elements (still very low opacity) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30h30v30H30V30zm15 15v15h15V45H45z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 border border-slate-400/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-slate-300/20 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-slate-200/10 rounded-full animate-bounce" />
        </div>
      </div>
      {/* fallback message for video error */}
      {videoError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 text-white text-lg px-6 py-4 rounded-lg shadow-2xl">
            Video could not be loaded. Showing fallback image.
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Professional Badge */}
          <div className="mb-8 animate-fade-in-up">
            <Badge className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 text-slate-200 px-8 py-3 text-base font-medium shadow-2xl">
              <Sparkles className="w-5 h-5 mr-2" />
              {currentSlide === 0 && "🌟 Premium Cultural Experiences"}
              {currentSlide === 1 && "🎭 Authentic Performance Arts"}
              {currentSlide === 2 && "🏛️ Sacred Heritage Tours"}
            </Badge>
          </div>

          {/* Main Title with Professional Typography */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent animate-fade-in-up">
              {currentHero.title.split(' ').slice(0, -2).join(' ')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {currentHero.title.split(' ').slice(-2).join(' ')}
            </span>
          </h1>

          {/* Refined Subtitle */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-slate-300 text-2xl md:text-3xl font-light tracking-wide">
              {currentHero.subtitle}
            </span>
          </div>

          {/* Professional Description */}
          <p className="text-slate-200 text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {currentHero.description}
          </p>

          {/* Professional Stats Row */}
          <div className="flex justify-center gap-12 mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {Object.entries(currentHero.stats).map(([key, value], index) => (
              <div key={key} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 group-hover:scale-110 transition-transform">{value}</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>

          {/* Professional Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-14 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Button 
              size="lg"
              className="bg-slate-100 hover:bg-white text-slate-900 px-10 py-5 rounded-lg shadow-2xl hover:shadow-slate-500/25 transition-all duration-300 transform hover:scale-105 group text-lg font-semibold"
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
              className="border-2 border-slate-300/50 text-white hover:bg-slate-800/50 backdrop-blur-md bg-slate-800/20 px-10 py-5 rounded-lg transition-all duration-300 group text-lg font-medium"
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
                  <Star key={star} className="w-5 h-5 text-slate-300 fill-current" />
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
              <span className="text-slate-400">from 500+ reviews</span>
            </div>
            <div className="w-px h-6 bg-slate-400/30" />
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-slate-300" />
              <span className="font-semibold">2,500+</span>
              <span className="text-slate-400">satisfied travelers</span>
            </div>
            <div className="w-px h-6 bg-slate-400/30" />
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-slate-300" />
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
                ? 'bg-slate-200 w-8' 
                : 'bg-slate-500/40 hover:bg-slate-400/60 w-2'
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
