
import { useRef, useEffect, useState } from 'react';
import CulturalElementMedia from './CulturalElementMedia';
import CulturalElementDetails from './CulturalElementDetails';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Organized cultural elements by categories
const culturalCategories = {
  culture: [
    {
      id: 1,
      title: 'Yakshagana',
      description: 'A traditional theatre form that combines dance, music, dialogue, costume, and stage techniques with a unique style and form. This ancient art form tells stories from Hindu epics through elaborate costumes, face paintings, and energetic performances.',
      image: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://player.vimeo.com/external/253067087.sd.mp4?s=1b7b1b14eb51345f77fc80c843f0e1ebeacb2a6a&profile_id=165',
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
      id: 4,
      title: 'Bhuta Kola',
      description: 'A ritualistic folk dance and religious ceremony where performers embody spirits (Bhutas) and Daivas. This ancient tradition involves elaborate costumes, face paintings, and fire dancing, creating a mystical atmosphere that connects the community with their ancestral spirits.',
      image: 'https://images.pexels.com/photos/3944154/pexels-photo-3944154.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://player.vimeo.com/external/185045350.sd.mp4?s=befd13df95da561cd1e8d375e768bdfae8da50e1&profile_id=165',
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
  ],
  temples: [
    {
      id: 2,
      title: 'Sri Krishna Matha',
      description: 'One of the most sacred temples in Karnataka, established by the philosopher and theologian Madhvacharya in the 13th century. The temple is famous for its unique window (Kanakana Kindi) through which devotees can view the deity.',
      image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://player.vimeo.com/external/455577390.sd.mp4?s=11cc9a5c33b8d3af33c093ea3a2acac9779cc1bb&profile_id=165',
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
    }
  ],
  beaches: [
    {
      id: 3,
      title: "St. Mary's Islands",
      description: "A geological monument featuring unique hexagonal basalt rock formations created by volcanic activity millions of years ago. These pristine islands offer crystal clear waters and stunning natural beauty that attracts geologists and nature lovers alike.",
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://player.vimeo.com/external/403504372.sd.mp4?s=82ecbeedb08663a20ef7e9f1f21da433d0f1353f&profile_id=165',
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
    }
  ],
  food: [
    {
      id: 5,
      title: 'Udupi Cuisine',
      description: 'Traditional vegetarian cuisine known for its unique flavors, fresh ingredients, and innovative cooking techniques. Udupi cuisine has influenced South Indian cooking worldwide through its emphasis on coconut, curry leaves, and diverse preparations.',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1200',
      video: 'https://player.vimeo.com/external/253067087.sd.mp4?s=1b7b1b14eb51345f77fc80c843f0e1ebeacb2a6a&profile_id=165',
      fact: 'Over 2,000 Udupi restaurants worldwide serving authentic cuisine',
      details: [
        'Pure vegetarian tradition',
        'Unique cooking methods',
        'Fresh local ingredients',
        'Famous for dosas and sambar'
      ],
      location: 'Udupi region',
      bestTime: 'Year round',
      experience: 'Cooking workshops and food tours'
    }
  ]
};

const categoryNames = {
  culture: 'Cultural Arts',
  temples: 'Sacred Temples',
  beaches: 'Coastal Beauty',
  food: 'Culinary Heritage'
};

const CulturalShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('culture');

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
          
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed mb-12">
            Explore Tulu Nadu's rich cultural heritage through four distinct categories that showcase 
            the region's traditions, spirituality, natural beauty, and culinary excellence.
          </p>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {Object.entries(categoryNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-tulu-red text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm border border-tulu-sand/30 text-tulu-blue hover:bg-tulu-red/10 hover:border-tulu-red/30'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Cultural Elements for Active Category */}
        <div className="space-y-32">
          {culturalCategories[activeCategory as keyof typeof culturalCategories].map((element, index) => (
            <div
              key={element.id}
              className={`scroll-reveal ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row gap-12 items-center`}
            >
              <div className="lg:w-1/2">
                <CulturalElementMedia
                  image={element.image}
                  video={element.video}
                  title={element.title}
                  fact={element.fact}
                />
              </div>
              <CulturalElementDetails
                id={element.id}
                title={element.title}
                description={element.description}
                details={element.details}
                location={element.location}
                bestTime={element.bestTime}
                experience={element.experience}
              />
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
              asChild
            >
              <Link to="/booking">
                <Users className="mr-2" size={20} />
                Book Cultural Heritage Tour
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalShowcase;
