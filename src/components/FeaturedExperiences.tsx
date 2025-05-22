
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

const experiences = [
  {
    id: 1,
    title: 'Yakshagana Experience',
    description: 'Immerse yourself in the colorful world of Yakshagana, a traditional theatre form that combines dance, music, dialogue, costume, and stage techniques.',
    image: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹2,500',
    duration: '4 hours',
    tags: ['Cultural', 'Performance', 'Interactive'],
    points: 25
  },
  {
    id: 2,
    title: 'Sri Krishna Temple Tour',
    description: 'Visit the famous Sri Krishna Matha temple in Udupi and learn about its rich history, architecture, and spiritual significance from expert guides.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹1,800',
    duration: '3 hours',
    tags: ['Spiritual', 'Historical', 'Architecture'],
    points: 20
  },
  {
    id: 3,
    title: "St. Mary's Islands Adventure",
    description: "Explore the geological wonder of St. Mary's Islands with its unique hexagonal basalt rock formations and pristine beaches.",
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹3,200',
    duration: 'Full day',
    tags: ['Nature', 'Adventure', 'Photography'],
    points: 30
  },
  {
    id: 4,
    title: 'Tulu Cuisine Workshop',
    description: 'Learn the art of authentic Tulu cuisine through hands-on cooking classes with local experts using traditional techniques and ingredients.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '₹2,200',
    duration: '5 hours',
    tags: ['Food', 'Cooking', 'Cultural'],
    points: 15
  }
];

const FeaturedExperiences = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  // Simplified unlocking - always make first 2 experiences available
  useEffect(() => {
    // Start with the first two experiences unlocked
    setUnlocked([1, 2]);
    
    // Load points from localStorage
    const storedPoints = localStorage.getItem('tuluPoints');
    if (storedPoints) {
      const userPoints = parseInt(storedPoints);
      setPoints(userPoints);
      
      // Unlock more based on points (simple progression)
      if (userPoints >= 10) {
        setUnlocked([1, 2, 3]);
      }
      if (userPoints >= 20) {
        setUnlocked([1, 2, 3, 4]);
      }
    }
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };
  
  // Simplified point system
  const handleExperienceClick = (experiencePoints: number) => {
    // Add points to local state
    setPoints(prev => prev + experiencePoints);
    
    // Update global points in localStorage
    const currentPoints = Number(localStorage.getItem('tuluPoints') || '0');
    localStorage.setItem('tuluPoints', (currentPoints + experiencePoints).toString());
    
    // Show toast notification
    toast({
      title: `+${experiencePoints} points earned!`,
      description: "Keep exploring to unlock more experiences!",
      duration: 2000,
    });
  };
  
  return (
    <div 
      id="explore"
      ref={sectionRef} 
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-tulu-beige/30"
    >
      <div className="max-w-7xl mx-auto scroll-reveal">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative">
              <span className="text-tulu-red">Featured</span> Experiences
              <div className="absolute -bottom-3 left-0 w-20 h-1 bg-tulu-red"></div>
            </h2>
            <p className="text-muted-foreground max-w-2xl mt-6">
              Immerse yourself in the authentic cultural experiences carefully curated to showcase the true essence and heritage of Tulu Nadu.
            </p>
          </div>
          
          {/* Experience Points Counter */}
          <div className="mt-6 md:mt-0 flex items-center gap-2 bg-tulu-teal/10 px-4 py-2 rounded-lg border border-tulu-teal/20">
            <span className="text-tulu-teal font-medium">Experience Points:</span>
            <span className="text-tulu-red font-bold text-xl">{points}</span>
          </div>
          
          <Button 
            className="mt-6 md:mt-0 bg-tulu-teal hover:bg-tulu-red text-white group hidden md:flex"
            onClick={() => handleExperienceClick(10)}
          >
            View All Experiences
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {experiences.map((experience, index) => {
            const isUnlocked = unlocked.includes(experience.id);
            
            return (
              <div
                key={experience.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`scroll-reveal ${isUnlocked ? '' : 'opacity-70'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card 
                  className={`overflow-hidden border-none shadow-lg h-full transition-all duration-300 relative group ${
                    !isUnlocked ? 'grayscale' : 'hover:shadow-2xl'
                  }`}
                >
                  <div className="relative h-64">
                    {/* Loading placeholder */}
                    {!imagesLoaded[experience.id] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <span className="text-gray-400">Loading image...</span>
                      </div>
                    )}
                    
                    <img 
                      src={experience.image}
                      alt={experience.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredCard === index && isUnlocked ? 'scale-110' : 'scale-100'
                      } ${imagesLoaded[experience.id] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(experience.id)}
                      onError={(e) => {
                        // Reliable fallback image
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=800";
                        handleImageLoad(experience.id);
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{experience.price}</span>
                        <span className="text-white/80 text-sm bg-black/30 px-2 py-1 rounded-full">{experience.duration}</span>
                      </div>
                    </div>
                    
                    {/* Points indicator */}
                    <div className="absolute top-4 right-4 bg-tulu-red text-white text-xs px-3 py-1 rounded-full">
                      +{experience.points} points
                    </div>
                    
                    {/* Simplified lock overlay with clear unlock instructions */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <div className="text-5xl mb-2">🔒</div>
                          <p className="font-medium">Locked Experience</p>
                          <p className="text-sm mt-1">
                            {experience.id === 3 ? "Earn 10+ points to unlock" : "Earn 20+ points to unlock"}
                          </p>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="mt-3 text-white border-white hover:bg-white/20"
                            onClick={() => {
                              toast({
                                title: "How to unlock",
                                description: "Read articles and interact with the blog to earn points!",
                                duration: 3000,
                              });
                            }}
                          >
                            How to unlock?
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* Hovering overlay with tags */}
                    {isUnlocked && (
                      <div className={`absolute inset-0 bg-gradient-to-b from-tulu-teal/70 to-tulu-teal/90 flex items-center justify-center p-4 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-center">
                          <h4 className="text-white font-display text-xl mb-4">Experience Features</h4>
                          <div className="flex flex-wrap justify-center gap-2">
                            {experience.tags.map((tag) => (
                              <span key={tag} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display text-xl font-semibold mb-2">{experience.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{experience.description}</p>
                    <Button 
                      variant="outline" 
                      className={`w-full ${
                        isUnlocked 
                          ? "border-tulu-teal text-tulu-teal hover:text-white hover:bg-tulu-teal" 
                          : "border-gray-400 text-gray-400 cursor-not-allowed"
                      }`}
                      onClick={() => isUnlocked && handleExperienceClick(experience.points)}
                      disabled={!isUnlocked}
                    >
                      {isUnlocked ? "Explore Experience" : "Locked Experience"}
                    </Button>
                  </CardContent>
                  
                  {/* Badge - new or popular */}
                  {index === 0 && (
                    <div className="absolute top-4 left-4 bg-tulu-red text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg animate-pulse">
                      POPULAR
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute top-4 left-4 bg-tulu-red text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg">
                      NEW
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 flex justify-center md:hidden">
          <Button 
            className="bg-tulu-teal hover:bg-tulu-red text-white group"
            onClick={() => handleExperienceClick(10)}
          >
            View All Experiences
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedExperiences;
