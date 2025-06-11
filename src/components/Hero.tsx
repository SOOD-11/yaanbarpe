
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [showInteraction, setShowInteraction] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [interactionPoints, setInteractionPoints] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  
  // Enhanced high-quality background images
  const backgroundImages = [
    "https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=1920"
  ];
  
  useEffect(() => {
    // Preload images with better loading handling
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
    }, 6000); // Slower transition for better viewing
    
    const interactionTimeout = setTimeout(() => {
      setShowInteraction(true);
    }, 3000);
    
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
  
  const incrementPoints = (amount: number) => {
    setInteractionPoints(prev => prev + amount);
    const currentPoints = Number(localStorage.getItem('tuluPoints') || '0');
    localStorage.setItem('tuluPoints', (currentPoints + amount).toString());
    
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
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Welcome subtitle */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <p className="font-display text-tulu-beige text-lg md:text-xl italic">
          Welcome to YaanBarpe
        </p>
      </div>

      {/* Enhanced points counter */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-md text-white px-6 py-3 rounded-full z-20 flex items-center gap-3 border border-white/20">
        <div className="w-2 h-2 bg-tulu-beige rounded-full animate-pulse"></div>
        <span className="text-tulu-beige font-bold text-lg">{interactionPoints}</span>
        <span className="text-sm">Experience Points</span>
      </div>
      
      {/* Enhanced background images with better transitions */}
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-in-out"
          style={{
            backgroundImage: `url('${image}')`,
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`,
            backgroundPosition: 'center center',
            filter: 'brightness(0.6) contrast(1.1)',
            opacity: currentImage === index && imagesLoaded[index] ? 1 : 0,
          }}
        />
      ))}
      
      {/* Enhanced overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-tulu-teal/20 via-transparent to-tulu-red/20 z-10" />
      
      {/* Main content with better positioning */}
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4 md:px-8 max-w-6xl mx-auto text-center z-20">
        <div className="mb-8">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block transform hover:scale-105 transition-transform duration-500">Unveiling</span>
            <span className="text-tulu-beige block transform hover:scale-105 transition-transform duration-500 delay-100">Tulu Nadu's</span>
            <span className="block transform hover:scale-105 transition-transform duration-500 delay-200">Cultural Treasures</span>
          </h1>
          
          <div className="w-24 h-1 bg-tulu-beige mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/95 leading-relaxed">
            Discover the hidden gems of Karnataka's coastal belt through authentic immersive experiences that connect you with our rich heritage and vibrant culture.
          </p>
        </div>
        
        {/* Enhanced buttons with better styling */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <Button 
            className="bg-tulu-teal hover:bg-tulu-red transition-all duration-300 text-white border-2 border-tulu-beige px-8 py-4 text-lg group transform hover:scale-105 shadow-lg"
            size="lg"
            onClick={() => incrementPoints(10)}
          >
            <Play className="mr-3 opacity-80 group-hover:opacity-100 transition-opacity" size={20} />
            Explore Our Experiences
            <ArrowDown className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-1" />
          </Button>
          <Button 
            className="bg-transparent hover:bg-white/15 text-white border-2 border-white/60 hover:border-white px-8 py-4 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300" 
            variant="outline"
            size="lg"
            onClick={() => incrementPoints(5)}
          >
            Learn About Tulu Nadu
          </Button>
        </div>
        
        {/* Enhanced interactive culture cards */}
        <div className="absolute bottom-32 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {[
            { title: "Yakshagana", desc: "Traditional dance-drama storytelling", points: 3, icon: "🎭" },
            { title: "Bhuta Kola", desc: "Sacred spirit worship rituals", points: 4, icon: "🔥" },
            { title: "Kambala", desc: "Buffalo racing tradition", points: 2, icon: "🏃‍♂️" }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={cn(
                "group bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/30 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl",
                showInteraction && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${idx * 200}ms` }}
              onClick={() => {
                handleCultureClick();
                incrementPoints(item.points);
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="bg-tulu-red text-white text-sm px-3 py-1 rounded-full font-medium">
                  +{item.points} pts
                </span>
              </div>
              <h3 className="text-xl font-display font-bold mb-2 group-hover:text-tulu-beige transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-white/80 group-hover:text-white/95 transition-colors">
                {item.desc}
              </p>
              <div className="mt-4 w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-tulu-beige transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group z-30"
          onClick={scrollToExplore}
        >
          <span className="text-sm mb-3 text-white/90 group-hover:text-white transition-colors">Scroll to Explore</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
