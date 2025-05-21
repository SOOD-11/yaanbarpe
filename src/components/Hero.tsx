
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = () => {
    if (heroRef.current) {
      setScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToExplore = () => {
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden parallax-container"
    >
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://source.unsplash.com/photo-1472396961693-142e6e269027')",
          transform: `translateY(${scrollY * 0.4}px)`,
          backgroundPosition: 'center center',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4 md:px-8 max-w-5xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="block">Unveiling</span>
          <span className="text-tulu-gold">Tulu Nadu's</span>
          <span className="block">Cultural Treasures</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90 animate-fade-in-up animate-delay-200">
          Discover the hidden gems of Karnataka's coastal belt through authentic immersive experiences that connect you with our rich heritage and vibrant culture.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up animate-delay-300">
          <Button 
            className="bg-tulu-blue hover:bg-tulu-red transition-colors text-white border-white border px-6 py-6 text-lg"
            size="lg"
          >
            Explore Our Experiences
          </Button>
          <Button 
            className="bg-transparent hover:bg-white/10 text-white border-white border px-6 py-6 text-lg" 
            variant="outline"
            size="lg"
          >
            Learn About Tulu Nadu
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer animate-fade-in animate-delay-500"
          onClick={scrollToExplore}
        >
          <span className="text-sm mb-2">Scroll to Explore</span>
          <ArrowDown className="animate-bounce" size={24} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
