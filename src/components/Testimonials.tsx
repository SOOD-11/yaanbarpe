
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 5,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "The Yakshagana experience was absolutely magical! Our guide brought the ancient stories to life with such passion. I learned so much about Tulu culture and traditions. Highly recommend!",
    experience: "Yakshagana Experience"
  },
  {
    id: 2,
    name: "Rajesh Patel",
    location: "Mumbai, India",
    rating: 5,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "YaanBarpe provided an authentic glimpse into Tulu Nadu's rich heritage. The temple tour was incredibly insightful, and the local cuisine workshop was a delightful surprise!",
    experience: "Temple & Cuisine Tour"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    rating: 5,
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "St. Mary's Islands were breathtaking! The geological formations are unique, and our guide explained everything beautifully. Perfect day trip with stunning photography opportunities.",
    experience: "St. Mary's Islands Adventure"
  },
  {
    id: 4,
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "The cultural festival immersion was beyond my expectations. Being part of the Bhuta Kola ceremony was a once-in-a-lifetime experience. Truly transformative!",
    experience: "Cultural Festival"
  },
  {
    id: 5,
    name: "Priya Sharma",
    location: "Delhi, India",
    rating: 5,
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "The heritage village walk opened my eyes to rural Tulu life. Meeting local artisans and learning traditional crafts was incredibly enriching. Excellent organization!",
    experience: "Heritage Village Walk"
  },
  {
    id: 6,
    name: "James Wilson",
    location: "California, USA",
    rating: 5,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    text: "Outstanding cultural experience! The team at YaanBarpe really knows how to showcase the best of Tulu Nadu. Professional, knowledgeable, and passionate guides.",
    experience: "Complete Cultural Package"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

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
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  const getVisibleTestimonials = () => {
    const itemsPerSlide = 3;
    const startIndex = currentSlide * itemsPerSlide;
    return testimonials.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <div
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-tulu-sand/10 via-background to-tulu-beige/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-tulu-green rounded-full"></div>
            <span className="text-tulu-green font-medium uppercase tracking-wider text-sm">
              Traveler Experiences
            </span>
            <div className="w-12 h-1 bg-tulu-green rounded-full"></div>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            What Our <span className="text-tulu-teal">Travelers</span> Say
          </h2>
          
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Read authentic experiences from travelers who have discovered the magic of Tulu Nadu 
            through our carefully curated cultural journeys.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {getVisibleTestimonials().map((testimonial) => (
              <Card key={testimonial.id} className="h-full hover:shadow-lg transition-shadow border-tulu-sand/20">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-tulu-teal mb-4" />
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-tulu-gold fill-current" />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-tulu-blue">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        <p className="text-xs text-tulu-teal font-medium">{testimonial.experience}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-tulu-teal text-tulu-teal hover:bg-tulu-teal hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-tulu-teal scale-125' : 'bg-tulu-sand hover:bg-tulu-teal/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-tulu-teal text-tulu-teal hover:bg-tulu-teal hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 scroll-reveal">
          <div className="bg-gradient-to-r from-tulu-teal/10 to-tulu-blue/10 rounded-2xl p-8 border border-tulu-sand/20">
            <h3 className="font-display text-2xl font-bold mb-4 text-tulu-blue">
              Ready to Create Your Own Story?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join hundreds of satisfied travelers and discover the authentic spirit of Tulu Nadu
            </p>
            <Button className="bg-tulu-red hover:bg-tulu-blue text-white">
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
