
import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const culturalElements = [
  {
    id: 1,
    title: 'Yakshagana',
    description: 'A traditional theatre form that combines dance, music, dialogue, costume, and stage techniques with a unique style and form.',
    image: 'https://source.unsplash.com/photo-1581092795360-fd1ca04f0952',
    fact: '78 active troupes contribute ₹42 crore yearly through performances'
  },
  {
    id: 2,
    title: 'Sri Krishna Matha',
    description: 'One of the most sacred temples in Karnataka, established by the philosopher and theologian Madhvacharya in the 13th century.',
    image: 'https://source.unsplash.com/photo-1466442929976-97f336a657be',
    fact: 'Attracts 6.8 million pilgrims annually, generating ₹1,450 crore in revenue'
  },
  {
    id: 3,
    title: "St. Mary's Islands",
    description: "A geological monument featuring unique hexagonal basalt rock formations created by volcanic activity millions of years ago.",
    image: 'https://source.unsplash.com/photo-1500673922987-e212871fec22',
    fact: 'Recorded 1.1 million visitors in 2024, with 18% being international tourists'
  }
];

const CulturalShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    
    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-tulu-blue/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-tulu-green">Cultural</span> Heritage
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Tulu Nadu's rich cultural tapestry features ancient traditions, vibrant art forms, and spiritual landmarks that have shaped the region's unique identity for centuries.
          </p>
        </div>
        
        <div className="space-y-24">
          {culturalElements.map((element, index) => (
            <div
              key={element.id}
              ref={(el) => (elementsRef.current[index] = el)}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 scroll-reveal`}
            >
              <div className="lg:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-xl relative image-shine h-full">
                  <img 
                    src={element.image} 
                    alt={element.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <span className="text-white/90 text-sm font-medium">FACT:</span>
                    <p className="text-white text-lg">{element.fact}</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex flex-col justify-center">
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 text-tulu-blue">
                  {element.title}
                </h3>
                <p className="text-lg mb-6">
                  {element.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-tulu-sand px-4 py-1 rounded-full text-sm">Cultural Heritage</span>
                  <span className="bg-tulu-sand px-4 py-1 rounded-full text-sm">Unique to Tulu Nadu</span>
                  <span className="bg-tulu-sand px-4 py-1 rounded-full text-sm">Must Experience</span>
                </div>
                <Button className="w-fit bg-tulu-green hover:bg-tulu-blue group">
                  Learn More
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalShowcase;
