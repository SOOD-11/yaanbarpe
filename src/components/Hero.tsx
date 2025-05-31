
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, PlayCircle, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showInteraction, setShowInteraction] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [interactionPoints, setInteractionPoints] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false, false]);
  
  // High-quality, relevant images for Tulu Nadu culture
  const backgroundImages = [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1500&q=80", // Temple architecture
    "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1500&q=80", // Cultural performance
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1500&q=80", // Traditional food
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1500&q=80"  // Coastal landscape
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
    }, 6000);
    
    const interactionTimeout = setTimeout(() => {
      setShowInteraction(true);
    }, 2000);
    
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
      title: `+${amount} points earned! 🎉`,
      description: "Keep exploring to earn more points!",
      duration: 2000,
    });
    
    window.dispatchEvent(new Event('pointsUpdated'));
  };
  
  const handleCultureClick = (points: number) => {
    incrementPoints(points);
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Enhanced points counter */}
      <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm text-white px-6 py-3 rounded-full z-10 flex items-center gap-3 shadow-lg">
        <Sparkles className="text-yellow-300" size={20} />
        <div className="text-center">
          <div className="text-2xl font-bold">{interactionPoints}</div>
          <div className="text-xs">Cultural Points</div>
        </div>
      </div>
      
      {/* Background images with enhanced effects */}
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000"
          style={{
            backgroundImage: `url('${image}')`,
            filter: 'brightness(0.6) contrast(1.1)',
            opacity: currentImage === index && imagesLoaded[index] ? 1 : 0,
            transform: currentImage === index ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      ))}
      
      {/* Enhanced loading state */}
      {!imagesLoaded[currentImage] && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-yellow-400 mx-auto"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-pulse" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Loading Cultural Treasures...</h3>
            <p className="text-blue-200">Preparing your journey through Tulu Nadu</p>
          </div>
        </div>
      )}
      
      {/* Enhanced overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-purple-900/40" />
      
      {/* Main content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4 md:px-8 max-w-6xl mx-auto text-center">
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
            <span className="text-yellow-400 font-semibold text-lg">Discover Heritage • Earn Rewards</span>
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
          </div>
          
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
            <span className="block bg-gradient-to-r from-yellow-400 via-white to-blue-200 bg-clip-text text-transparent">
              Unveiling
            </span>
            <span className="text-yellow-300 text-5xl md:text-7xl lg:text-8xl font-extrabold">
              Tulu Nadu's
            </span>
            <span className="block bg-gradient-to-r from-blue-200 via-white to-yellow-400 bg-clip-text text-transparent">
              Cultural Treasures
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Discover the hidden gems of Karnataka's coastal belt through authentic immersive experiences that reward your curiosity.
          </p>
        </div>
        
        {/* Enhanced action buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-white border-2 border-white/20 px-8 py-4 text-lg group shadow-xl hover:shadow-2xl hover:scale-105"
            size="lg"
            onClick={() => incrementPoints(10)}
          >
            <PlayCircle className="mr-3" size={24} />
            Start Your Journey
            <ArrowDown className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button 
            className="bg-transparent hover:bg-white/20 text-white border-2 border-white px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105" 
            variant="outline"
            size="lg"
            onClick={() => incrementPoints(5)}
          >
            <Sparkles className="mr-3" size={20} />
            Explore Culture
          </Button>
        </div>
        
        {/* Enhanced interactive cultural elements */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { 
              title: "Yakshagana", 
              desc: "Traditional dance-drama art form", 
              points: 5,
              icon: "🎭",
              gradient: "from-orange-500/80 to-red-500/80"
            },
            { 
              title: "Bhuta Kola", 
              desc: "Sacred spirit worship rituals", 
              points: 6,
              icon: "🕯️",
              gradient: "from-purple-500/80 to-blue-500/80"
            },
            { 
              title: "Kambala", 
              desc: "Traditional buffalo racing", 
              points: 4,
              icon: "🏃‍♂️",
              gradient: "from-green-500/80 to-teal-500/80"
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={cn(
                `bg-gradient-to-br ${item.gradient} backdrop-blur-md rounded-xl p-6 border border-white/30 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl`,
                showInteraction && "animate-fade-in"
              )}
              onClick={() => handleCultureClick(item.points)}
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{item.icon}</div>
                <span className="bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
                  +{item.points} pts
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-white/90 leading-relaxed">{item.desc}</p>
              <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-white w-0 animate-pulse group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced scroll indicator */}
        <div 
          className="flex flex-col items-center cursor-pointer group"
          onClick={scrollToExplore}
        >
          <span className="text-lg mb-3 text-blue-200 group-hover:text-white transition-colors">
            Discover More Below
          </span>
          <div className="relative">
            <ArrowDown className="animate-bounce text-yellow-400 group-hover:text-white transition-colors" size={32} />
            <div className="absolute -inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
      
      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {backgroundImages.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
              currentImage === index ? "bg-yellow-400 scale-125" : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
