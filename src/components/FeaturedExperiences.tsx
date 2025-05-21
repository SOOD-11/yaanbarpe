
import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const experiences = [
  {
    id: 1,
    title: 'Yakshagana Experience',
    description: 'Immerse yourself in the colorful world of Yakshagana, a traditional theatre form that combines dance, music, dialogue, costume, and stage techniques.',
    image: 'https://source.unsplash.com/photo-1581092795360-fd1ca04f0952',
    price: '₹2,500',
    duration: '4 hours'
  },
  {
    id: 2,
    title: 'Sri Krishna Temple Tour',
    description: 'Visit the famous Sri Krishna Matha temple in Udupi and learn about its rich history, architecture, and spiritual significance from expert guides.',
    image: 'https://source.unsplash.com/photo-1466442929976-97f336a657be',
    price: '₹1,800',
    duration: '3 hours'
  },
  {
    id: 3,
    title: "St. Mary's Islands Adventure",
    description: "Explore the geological wonder of St. Mary's Islands with its unique hexagonal basalt rock formations and pristine beaches.",
    image: 'https://source.unsplash.com/photo-1500673922987-e212871fec22',
    price: '₹3,200',
    duration: 'Full day'
  },
  {
    id: 4,
    title: 'Tulu Cuisine Workshop',
    description: 'Learn the art of authentic Tulu cuisine through hands-on cooking classes with local experts using traditional techniques and ingredients.',
    image: 'https://source.unsplash.com/photo-1466721591366-2d5fba72006d',
    price: '₹2,200',
    duration: '5 hours'
  }
];

const FeaturedExperiences = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  
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
  
  return (
    <div 
      id="explore"
      ref={sectionRef} 
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-tulu-sand/30"
    >
      <div className="max-w-7xl mx-auto scroll-reveal">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-tulu-red">Featured</span> Experiences
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Immerse yourself in the authentic cultural experiences carefully curated to showcase the true essence and heritage of Tulu Nadu.
            </p>
          </div>
          <Button 
            className="mt-6 md:mt-0 bg-tulu-blue hover:bg-tulu-red text-white group hidden md:flex"
          >
            View All Experiences
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="exploration-card scroll-reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden border-none shadow-lg h-full">
                <div className="relative h-64 image-shine">
                  <img 
                    src={experience.image} 
                    alt={experience.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{experience.price}</span>
                      <span className="text-white/80 text-sm">{experience.duration}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-xl font-semibold mb-2">{experience.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{experience.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-tulu-blue text-tulu-blue hover:text-white hover:bg-tulu-blue"
                  >
                    Explore Experience
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:hidden">
          <Button 
            className="bg-tulu-blue hover:bg-tulu-red text-white group"
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
