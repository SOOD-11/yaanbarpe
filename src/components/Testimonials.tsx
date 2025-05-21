
import { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Aishwarya Rai',
    location: 'Bengaluru, India',
    rating: 5,
    text: 'The Yakshagana experience was absolutely mesmerizing. Our guide provided fascinating insights into this traditional art form, and we even got to try on some of the costumes!',
    image: 'https://source.unsplash.com/photo-1466442929976-97f336a657be'
  },
  {
    id: 2,
    name: 'John Smith',
    location: 'London, UK',
    rating: 5,
    text: "St. Mary's Islands was a hidden gem I wouldn't have discovered without YaanBarpe. The geological formations were stunning, and our guide's knowledge made it even more special.",
    image: 'https://source.unsplash.com/photo-1500673922987-e212871fec22'
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    location: 'Delhi, India',
    rating: 5,
    text: 'The Sri Krishna Temple tour opened my eyes to the deep spiritual significance of this place. The authentic cultural immersion YaanBarpe provides is unmatched.',
    image: 'https://source.unsplash.com/photo-1472396961693-142e6e269027'
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-tulu-gold/10"
    >
      <div className="max-w-7xl mx-auto scroll-reveal">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-tulu-gold">Traveler</span> Experiences
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Hear from our guests who have immersed themselves in the cultural treasures of Tulu Nadu through our carefully curated experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="scroll-reveal"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.name}'s experience`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#E5B31B" color="#E5B31B" />
                    ))}
                  </div>
                  <p className="italic mb-6 text-gray-700">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
