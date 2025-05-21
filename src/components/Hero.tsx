
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const backgroundImages = [
    "https://source.unsplash.com/photo-1472396961693-142e6e269027",
    "https://source.unsplash.com/photo-1517022812141-23620dba5c23",
    "https://source.unsplash.com/photo-1581092795360-fd1ca04f0952",
    "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9"
  ];
  
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(imageInterval);
  }, []);
  
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
      {/* Background images with fade transition */}
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${image}')`,
            transform: `translateY(${scrollY * 0.4}px)`,
            backgroundPosition: 'center center',
            filter: 'brightness(0.7)',
            opacity: currentImage === index ? 1 : 0,
          }}
        />
      ))}
      
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
            className="bg-tulu-blue hover:bg-tulu-red transition-colors text-white border-white border px-6 py-6 text-lg group"
            size="lg"
          >
            Explore Our Experiences
            <ArrowDown className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          <Button 
            className="bg-transparent hover:bg-white/10 text-white border-white border px-6 py-6 text-lg" 
            variant="outline"
            size="lg"
          >
            Learn About Tulu Nadu
          </Button>
        </div>
        
        {/* Interactive elements */}
        <div className="absolute bottom-20 w-full max-w-4xl mx-auto grid grid-cols-3 gap-4 px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
            <h3 className="text-xl font-medium">Yakshagana</h3>
            <p className="text-sm text-white/70">Traditional dance-drama</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
            <h3 className="text-xl font-medium">Bhuta Kola</h3>
            <p className="text-sm text-white/70">Sacred spirit worship</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
            <h3 className="text-xl font-medium">Kambala</h3>
            <p className="text-sm text-white/70">Buffalo race tradition</p>
          </div>
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
