
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogPost from '@/components/BlogPost';
import RecentPosts from '@/components/RecentPosts';
import BlogRecommendations from '@/components/BlogRecommendations';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Blog = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Initialize scroll reveal animation
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
    
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });
    
    // Load user points and level
    const storedPoints = localStorage.getItem('tuluPoints');
    if (storedPoints) {
      setUserPoints(parseInt(storedPoints));
    }
    
    const storedLevel = localStorage.getItem('tuluLevel');
    if (storedLevel) {
      setUserLevel(parseInt(storedLevel));
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Simplified point system
  const addPoints = (amount: number, message: string) => {
    // Update user points
    setUserPoints(prev => prev + amount);
    localStorage.setItem('tuluPoints', (userPoints + amount).toString());
    
    // Show toast notification
    toast({
      title: `+${amount} points`,
      description: message,
      duration: 2000,
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      addPoints(3, "Searching for content");
      
      // Show a helpful message about search
      toast({
        title: "Search in progress",
        description: "Finding the best content for you!",
        duration: 2000,
      });
    }
  };
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(prev => prev === category ? null : category);
    if (activeCategory !== category) {
      addPoints(2, `Browsing ${category}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="bg-gradient-to-b from-tulu-beige/20 to-background pt-32">
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-tulu-teal">
              Discover Tulu Nadu's <span className="text-tulu-red">Living Heritage</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore our collection of stories, insights, and experiences that showcase the rich cultural tapestry of Tulu Nadu
            </p>
            
            {/* Simplified user stats display */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-tulu-teal/10 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-tulu-red font-bold">{userPoints}</span>
                <span className="text-tulu-teal">Total Points</span>
              </div>
              
              <div className="bg-tulu-red/10 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-tulu-red font-bold">Level {userLevel}</span>
              </div>
            </div>
            
            <form className="mt-8 max-w-xl mx-auto" onSubmit={handleSearch}>
              <div className="relative">
                <Input 
                  placeholder="Search our stories..." 
                  className="pl-10 py-6 rounded-full border-tulu-teal/30 focus:border-tulu-teal"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Button 
                  type="submit"
                  className="absolute right-1 top-1 bg-tulu-teal hover:bg-tulu-red rounded-full h-10"
                >
                  Search
                </Button>
              </div>
            </form>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {["Cultural Heritage", "Food & Cuisine", "Festivals", "Art Forms", "History"].map((category) => (
                <Button 
                  key={category}
                  variant="outline" 
                  className={`rounded-full border-tulu-teal/30 hover:bg-tulu-teal hover:text-white ${
                    activeCategory === category ? "bg-tulu-teal text-white" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <BlogPost 
            featured={true}
            title="The Intricate Artistry of Yakshagana: A 700-Year Legacy"
            excerpt="Delve into the vibrant world of Yakshagana, the traditional theatre form that has shaped Tulu Nadu's cultural identity for centuries, featuring elaborate costumes, mesmerizing dance movements, and compelling storytelling techniques."
            image="https://images.pexels.com/photos/2773927/pexels-photo-2773927.jpeg?auto=compress&cs=tinysrgb&w=800"
            date="May 18, 2025"
            readTime="12 min read"
            author="Deepak Shetty"
            category="Cultural Heritage"
            audioAvailable={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <BlogPost 
              title="Sacred Rituals of Bhuta Kola: Connecting with Guardian Spirits"
              excerpt="Experience the mystical ancient ritual of Bhuta Kola, where elaborate ceremonies invoke guardian spirits through sacred performances that have sustained coastal Karnataka's spiritual ecosystem."
              image="https://images.pexels.com/photos/2675268/pexels-photo-2675268.jpeg?auto=compress&cs=tinysrgb&w=800"
              date="May 12, 2025"
              readTime="8 min read"
              author="Radha Hegde"
              category="Spiritual Traditions"
              audioAvailable={true}
            />

            <BlogPost 
              title="Tulu Nadu's Culinary Secrets: Beyond the Coast"
              excerpt="Journey through the distinctive flavors of Tulu cuisine, from the fermented toddy-based Moode to the delicate Patrode, exploring ingredients, techniques, and cultural significance."
              image="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"
              date="May 8, 2025"
              readTime="10 min read"
              author="Akshay Kamath"
              category="Food & Culture"
              audioAvailable={false}
            />
            
            <BlogPost 
              title="The Ancient Tiger Dance of Mangaluru"
              excerpt="Discover the vibrant Pili Vesha (Tiger Dance) tradition that brings color and energy to Mangaluru's Dasara celebrations, with performers adorned in striking tiger body paint and costumes."
              image="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800"
              date="May 5, 2025"
              readTime="7 min read"
              author="Pramod Shetty"
              category="Folk Traditions"
              audioAvailable={false}
            />
          </div>

          <div className="mt-12 text-center">
            <Button 
              className="bg-tulu-teal hover:bg-tulu-red transition-colors group"
              onClick={() => addPoints(5, "Exploring more articles")}
            >
              View All Articles
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        </div>
      </div>

      <BlogRecommendations />
      <RecentPosts />
      <Footer />
    </div>
  );
};

export default Blog;
