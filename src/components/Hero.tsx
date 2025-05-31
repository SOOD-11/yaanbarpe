
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [showInteraction, setShowInteraction] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [interactionPoints, setInteractionPoints] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  
  // Updated with reliable Pexels images
  const backgroundImages = [
    "https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1500",
    "https://images.pexels.com/photos/4388593/pexels-photo-4388593.jpeg?auto=compress&cs=tinysrgb&w=1500",
    "https://images.pexels.com/photos/7412095/pexels-photo-7412095.jpeg?auto=compress&cs=tinysrgb&w=1500",
    "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1500"
  ];
  
  useEffect(() => {
    // Preload images
    backgroundImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newLoaded = [...prev];
          newLoaded[index] = true;
          return newLoaded;
        });
      };
    });
    
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    // Show interaction hint after 3 seconds
    const interactionTimeout = setTimeout(() => {
      setShowInteraction(true);
    }, 3000);
    
    // Load interaction points from localStorage
    const storedPoints = localStorage.getItem('tuluPoints');
    if (storedPoints) {
      setInteractionPoints(parseInt(storedPoints));
    }
    
    return () => {
      clearInterval(imageInterval);
      clearTimeout(interactionTimeout);
    };
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
      incrementPoints(5);
    }
  };
  
  // Simplified point system
  const incrementPoints = (amount: number) => {
    // Update local state
    setInteractionPoints(prev => prev + amount);
    
    // Update global points in localStorage
    const currentPoints = Number(localStorage.getItem('tuluPoints') || '0');
    localStorage.setItem('tuluPoints', (currentPoints + amount).toString());
    
    // Show toast notification
    toast({
      title: `+${amount} points earned!`,
      description: "Keep exploring to earn more points and unlock content!",
      duration: 2000,
    });
  };
  
  const handleCultureClick = () => {
    incrementPoints(2);
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden parallax-container"
    >
      {/* Points counter */}
      <div className="absolute top-4 right-4 bg-tulu-teal/80 backdrop-blur-sm text-white px-4 py-2 rounded-full z-10 flex items-center gap-2">
        <span className="text-tulu-beige font-bold">{interactionPoints}</span>
        <span>Experience Points</span>
      </div>
      
      {/* Loading placeholder */}
      {backgroundImages.map((image, index) => !imagesLoaded[index] && currentImage === index && (
        <div key={`loading-${index}`} className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-white mb-4"></div>
            <p>Loading beautiful imagery...</p>
          </div>
        </div>
      ))}
      
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
            opacity: currentImage === index && imagesLoaded[index] ? 1 : 0,
          }}
        />
      ))}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4 md:px-8 max-w-5xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="block">Unveiling</span>
          <span className="text-tulu-beige">Tulu Nadu's</span>
          <span className="block">Cultural Treasures</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90 animate-fade-in-up animate-delay-200">
          Discover the hidden gems of Karnataka's coastal belt through authentic immersive experiences that connect you with our rich heritage and vibrant culture.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up animate-delay-300">
          <Button 
            className="bg-tulu-teal hover:bg-tulu-red transition-colors text-white border-white border px-6 py-6 text-lg group"
            size="lg"
            onClick={() => incrementPoints(10)}
          >
            Explore Our Experiences
            <ArrowDown className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          <Button 
            className="bg-transparent hover:bg-white/10 text-white border-white border px-6 py-6 text-lg" 
            variant="outline"
            size="lg"
            onClick={() => incrementPoints(5)}
          >
            Learn About Tulu Nadu
          </Button>
        </div>
        
        {/* Interactive elements - simplified */}
        <div className="absolute bottom-20 w-full max-w-4xl mx-auto grid grid-cols-3 gap-4 px-4">
          {[
            { title: "Yakshagana", desc: "Traditional dance-drama", points: 3 },
            { title: "Bhuta Kola", desc: "Sacred spirit worship", points: 4 },
            { title: "Kambala", desc: "Buffalo race tradition", points: 2 }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={cn(
                "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 transition-all cursor-pointer",
                showInteraction && "animate-pulse"
              )}
              onClick={() => {
                handleCultureClick();
                incrementPoints(item.points);
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
                <span className="bg-tulu-red/80 text-white text-xs px-2 py-1 rounded-full">+{item.points}</span>
              </div>
            </div>
          ))}
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
