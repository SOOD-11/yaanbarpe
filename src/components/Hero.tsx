
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
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false, false]);
  
  // Reliable fallback images
  const backgroundImages = [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1500&q=80",
    "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1500&q=80", 
    "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1500&q=80",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1500&q=80"
  ];
  
  useEffect(() => {
    // Preload images
    backgroundImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => {
          const newLoaded = [...prev];
          newLoaded[index] = true;
          return newLoaded;
        });
      };
      img.onerror = () => {
        // Set as loaded even on error to prevent infinite loading
        setImagesLoaded(prev => {
          const newLoaded = [...prev];
          newLoaded[index] = true;
          return newLoaded;
        });
      };
      img.src = src;
    });
    
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    const interactionTimeout = setTimeout(() => {
      setShowInteraction(true);
    }, 3000);
    
    // Load interaction points from localStorage
    const storedPoints = localStorage.getItem('tuluPoints');
    if (storedPoints) {
      setInteractionPoints(parseInt(storedPoints) || 0);
    }
    
    return () => {
      clearInterval(imageInterval);
      clearTimeout(interactionTimeout);
    };
  }, []);
  
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToExplore = () => {
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
      incrementPoints(5);
    }
  };
  
  const incrementPoints = (amount: number) => {
    const newPoints = interactionPoints + amount;
    setInteractionPoints(newPoints);
    localStorage.setItem('tuluPoints', newPoints.toString());
    
    toast({
      title: `+${amount} points earned!`,
      description: "Keep exploring to earn more points!",
      duration: 2000,
    });
    
    // Dispatch event for other components
    window.dispatchEvent(new Event('pointsUpdated'));
  };
  
  const handleCultureClick = (points: number) => {
    incrementPoints(points);
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ transform: `translateY(${scrollY * 0.4}px)` }}
    >
      {/* Points counter */}
      <div className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full z-10 flex items-center gap-2">
        <span className="text-yellow-200 font-bold">{interactionPoints}</span>
        <span>Points</span>
      </div>
      
      {/* Background images */}
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${image}')`,
            filter: 'brightness(0.7)',
            opacity: currentImage === index && imagesLoaded[index] ? 1 : 0,
          }}
        />
      ))}
      
      {/* Loading state */}
      {!imagesLoaded[currentImage] && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-white mb-4 mx-auto"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4 md:px-8 max-w-5xl mx-auto text-center">
        <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl mb-6">
          <span className="block">Unveiling</span>
          <span className="text-yellow-300">Tulu Nadu's</span>
          <span className="block">Cultural Treasures</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
          Discover the hidden gems of Karnataka's coastal belt through authentic immersive experiences.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Button 
            className="bg-blue-600 hover:bg-red-600 transition-colors text-white border-white border px-6 py-6 text-lg group"
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
        
        {/* Interactive elements */}
        <div className="absolute bottom-20 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {[
            { title: "Yakshagana", desc: "Traditional dance-drama", points: 3 },
            { title: "Bhuta Kola", desc: "Sacred spirit worship", points: 4 },
            { title: "Kambala", desc: "Buffalo race tradition", points: 2 }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={cn(
                "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 transition-all cursor-pointer hover:bg-white/20",
                showInteraction && "animate-pulse"
              )}
              onClick={() => handleCultureClick(item.points)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
                <span className="bg-red-600/80 text-white text-xs px-2 py-1 rounded-full">+{item.points}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
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
