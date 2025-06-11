
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, MapPin, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const culturalElements = [
  {
    id: 1,
    title: 'Yakshagana',
    description: 'A traditional theatre form that combines dance, music, dialogue, costume, and stage techniques with a unique style and form. This ancient art form tells stories from Hindu epics through elaborate costumes, face paintings, and energetic performances.',
    image: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fact: '78 active troupes contribute ₹42 crore yearly through performances',
    details: [
      'Over 500 years old tradition',
      'Performed throughout the night',
      'Elaborate face paintings and costumes',
      'Stories from Ramayana and Mahabharata'
    ],
    location: 'Udupi, Mangalore',
    bestTime: 'October to March',
    experience: 'Join live performance workshops'
  },
  {
    id: 2,
    title: 'Sri Krishna Matha',
    description: 'One of the most sacred temples in Karnataka, established by the philosopher and theologian Madhvacharya in the 13th century. The temple is famous for its unique window (Kanakana Kindi) through which devotees can view the deity.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fact: 'Attracts 6.8 million pilgrims annually, generating ₹1,450 crore in revenue',
    details: [
      '700+ years of continuous worship',
      'Unique Kanakana Kindi viewing window',
      'Daily cultural programs',
      'Traditional prasadam distribution'
    ],
    location: 'Udupi',
    bestTime: 'Year round',
    experience: 'Temple architecture tours available'
  },
  {
    id: 3,
    title: "St. Mary's Islands",
    description: "A geological monument featuring unique hexagonal basalt rock formations created by volcanic activity millions of years ago. These pristine islands offer crystal clear waters and stunning natural beauty that attracts geologists and nature lovers alike.",
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fact: 'Recorded 1.1 million visitors in 2024, with 18% being international tourists',
    details: [
      '88 million years old rock formations',
      'Boat rides from Malpe beach',
      'Crystal clear turquoise waters',
      'Protected geological site'
    ],
    location: 'Malpe, Udupi',
    bestTime: 'November to February',
    experience: 'Geological tours and photography sessions'
  },
  {
    id: 4,
    title: 'Bhuta Kola',
    description: 'A ritualistic folk dance and religious ceremony where performers embody spirits (Bhutas) and Daivas. This ancient tradition involves elaborate costumes, face paintings, and fire dancing, creating a mystical atmosphere that connects the community with their ancestral spirits.',
    image: 'https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fact: 'Over 400 different spirit forms documented across 200+ villages',
    details: [
      'Ancient spirit worship tradition',
      'Fire dancing performances',
      'Community blessing ceremonies',
      'Elaborate spirit costumes'
    ],
    location: 'Coastal Karnataka villages',
    bestTime: 'December to March',
    experience: 'Witness authentic village ceremonies'
  }
];

const CulturalShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);

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
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background via-tulu-beige/5 to-tulu-sand/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 scroll-reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-tulu-red rounded-full"></div>
            <span className="text-tulu-red font-medium uppercase tracking-wider text-sm">
              Cultural Heritage
            </span>
            <div className="w-12 h-1 bg-tulu-red rounded-full"></div>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-tulu-teal">Living</span> Heritage of{' '}
            <span className="text-tulu-red">Tulu Nadu</span>
          </h2>
          
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
            Tulu Nadu's rich cultural tapestry features ancient traditions, vibrant art forms, and spiritual landmarks 
            that have shaped the region's unique identity for centuries. Each tradition tells a story of devotion, 
            artistry, and community spirit that continues to thrive today.
          </p>
        </div>
        
        {/* Cultural Elements Grid */}
        <div className="space-y-32">
          {culturalElements.map((element, index) => (
            <div
              key={element.id}
              ref={(el) => (elementsRef.current[index] = el)}
              className={`scroll-reveal ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row gap-12 items-center`}
              onMouseEnter={() => setHoveredElement(index)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              {/* Image Section */}
              <div className="lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <img 
                    src={element.image} 
                    alt={element.title}
                    className={`w-full h-[500px] object-cover transition-all duration-700 ${
                      hoveredElement === index ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  
                  {/* Overlay with fact */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                        <span className="text-tulu-beige text-sm font-semibold uppercase tracking-wide">Amazing Fact</span>
                        <p className="text-white text-lg font-medium mt-2">{element.fact}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner badge */}
                  <div className="absolute top-4 right-4 bg-tulu-red text-white px-4 py-2 rounded-full text-sm font-bold">
                    Heritage Site
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="lg:w-1/2 space-y-8">
                <div>
                  <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-tulu-blue">
                    {element.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {element.description}
                  </p>
                </div>
                
                {/* Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {element.details.map((detail, idx) => (
                    <Card key={idx} className="border-tulu-sand/20 hover:border-tulu-teal/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-tulu-teal rounded-full"></div>
                          <span className="text-sm font-medium">{detail}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Info Pills */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-tulu-sand/20 px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4 text-tulu-blue" />
                    <span className="text-sm font-medium">{element.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-tulu-sand/20 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4 text-tulu-green" />
                    <span className="text-sm font-medium">Best: {element.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-tulu-sand/20 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-tulu-gold" />
                    <span className="text-sm font-medium">{element.experience}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-tulu-teal hover:bg-tulu-blue text-white group flex-1"
                    size="lg"
                  >
                    Explore {element.title}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-tulu-red text-tulu-red hover:bg-tulu-red hover:text-white flex-1"
                    size="lg"
                  >
                    Book Experience
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action Section */}
        <div className="mt-32 text-center scroll-reveal">
          <div className="bg-gradient-to-r from-tulu-teal/10 via-tulu-blue/5 to-tulu-red/10 rounded-3xl p-12 border border-tulu-sand/20">
            <h3 className="font-display text-3xl font-bold mb-6 text-tulu-blue">
              Ready to Experience Tulu Nadu's Heritage?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our guided cultural tours and immerse yourself in the authentic traditions, 
              stories, and experiences that make Tulu Nadu truly special.
            </p>
            <Button 
              className="bg-tulu-red hover:bg-tulu-blue text-white group"
              size="lg"
            >
              <Users className="mr-2" size={20} />
              Book Cultural Heritage Tour
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalShowcase;
