
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const experiences = [
  {
    id: 1,
    title: 'Yakshagana Experience',
    description: 'Immerse yourself in the colorful world of Yakshagana, a traditional theatre form that combines dance, music, dialogue, costume, and stage techniques.',
    image: 'photo-1581092795360-fd1ca04f0952',
    price: '₹2,500',
    duration: '4 hours',
    tags: ['Cultural', 'Performance', 'Interactive'],
    points: 25
  },
  {
    id: 2,
    title: 'Sri Krishna Temple Tour',
    description: 'Visit the famous Sri Krishna Matha temple in Udupi and learn about its rich history, architecture, and spiritual significance from expert guides.',
    image: 'photo-1466442929976-97f336a657be',
    price: '₹1,800',
    duration: '3 hours',
    tags: ['Spiritual', 'Historical', 'Architecture'],
    points: 20
  },
  {
    id: 3,
    title: "St. Mary's Islands Adventure",
    description: "Explore the geological wonder of St. Mary's Islands with its unique hexagonal basalt rock formations and pristine beaches.",
    image: 'photo-1500673922987-e212871fec22',
    price: '₹3,200',
    duration: 'Full day',
    tags: ['Nature', 'Adventure', 'Photography'],
    points: 30
  },
  {
    id: 4,
    title: 'Tulu Cuisine Workshop',
    description: 'Learn the art of authentic Tulu cuisine through hands-on cooking classes with local experts using traditional techniques and ingredients.',
    image: 'photo-1466721591366-2d5fba72006d',
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
  
  // Simulation of unlocking experiences (in real app, this would be tied to user progress)
  useEffect(() => {
    // Start with just the first experience unlocked
    setUnlocked([1]);
    
    // Unlock more experiences as user scrolls and interacts
    const unlockTimer = setTimeout(() => {
      setUnlocked([1, 2]);
      setTimeout(() => setUnlocked([1, 2, 3, 4]), 10000);
    }, 5000);
    
    return () => clearTimeout(unlockTimer);
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
  
  const handleExperienceClick = (experiencePoints: number) => {
    // Add points animation
    setPoints(prev => prev + experiencePoints);
    
    // Create points indicator
    const pointsIndicator = document.createElement('div');
    pointsIndicator.className = 'fixed top-20 right-8 bg-tulu-gold text-white px-3 py-1 rounded-full animate-bounce z-50';
    pointsIndicator.textContent = `+${experiencePoints} points`;
    document.body.appendChild(pointsIndicator);
    
    setTimeout(() => {
      document.body.removeChild(pointsIndicator);
    }, 2000);
  };
  
  return (
    <div 
      id="explore"
      ref={sectionRef} 
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-tulu-sand/30"
    >
      <div className="max-w-7xl mx-auto scroll-reveal">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative">
              <span className="text-tulu-red">Featured</span> Experiences
              <div className="absolute -bottom-3 left-0 w-20 h-1 bg-tulu-gold"></div>
            </h2>
            <p className="text-muted-foreground max-w-2xl mt-6">
              Immerse yourself in the authentic cultural experiences carefully curated to showcase the true essence and heritage of Tulu Nadu.
            </p>
          </div>
          
          {/* Experience Points Counter */}
          <div className="mt-6 md:mt-0 flex items-center gap-2 bg-tulu-blue/10 px-4 py-2 rounded-lg border border-tulu-blue/20">
            <span className="text-tulu-blue font-medium">Experience Points:</span>
            <span className="text-tulu-gold font-bold text-xl">{points}</span>
          </div>
          
          <Button 
            className="mt-6 md:mt-0 bg-tulu-blue hover:bg-tulu-red text-white group hidden md:flex"
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
                    <img 
                      src={`https://source.unsplash.com/${experience.image}`}
                      alt={experience.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${hoveredCard === index && isUnlocked ? 'scale-110' : 'scale-100'}`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{experience.price}</span>
                        <span className="text-white/80 text-sm bg-black/30 px-2 py-1 rounded-full">{experience.duration}</span>
                      </div>
                    </div>
                    
                    {/* Points indicator */}
                    <div className="absolute top-4 right-4 bg-tulu-gold text-white text-xs px-3 py-1 rounded-full">
                      +{experience.points} points
                    </div>
                    
                    {/* Lock overlay for locked experiences */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-5xl mb-2">🔒</div>
                          <p className="font-medium">Unlock this experience</p>
                          <p className="text-sm mt-1">Keep exploring to unlock</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Hovering overlay with tags */}
                    {isUnlocked && (
                      <div className={`absolute inset-0 bg-gradient-to-b from-tulu-blue/70 to-tulu-blue/90 flex items-center justify-center p-4 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}>
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
                          ? "border-tulu-blue text-tulu-blue hover:text-white hover:bg-tulu-blue" 
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
                    <div className="absolute top-4 left-4 bg-tulu-gold text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg">
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
            className="bg-tulu-blue hover:bg-tulu-red text-white group"
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
