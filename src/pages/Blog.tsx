
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogPost from '@/components/BlogPost';
import RecentPosts from '@/components/RecentPosts';
import BlogRecommendations from '@/components/BlogRecommendations';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Trophy, Star, Filter, Calendar, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserPoints, getUserLevel, addPoints } from '@/lib/gamification';

const Blog = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showLevelToast, setShowLevelToast] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
    const points = getUserPoints();
    setUserPoints(points);
    
    const level = getUserLevel();
    setUserLevel(level);
    
    // Check for any existing level up notifications
    const levelUpPending = localStorage.getItem('levelUpPending');
    if (levelUpPending === 'true') {
      setShowLevelToast(true);
      localStorage.removeItem('levelUpPending');
    }
    
    // Listen for points updates
    const handlePointsUpdate = () => {
      setUserPoints(getUserPoints());
      setUserLevel(getUserLevel());
    };
    
    window.addEventListener('pointsUpdated', handlePointsUpdate);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('pointsUpdated', handlePointsUpdate);
    };
  }, []);
  
  // Show level up toast if needed
  useEffect(() => {
    if (showLevelToast) {
      toast({
        title: "🎉 Level Up!",
        description: `Congratulations! You're now Level ${userLevel}!`,
        duration: 5000,
      });
      setShowLevelToast(false);
    }
  }, [showLevelToast, userLevel]);
  
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

  // Function to get badge count based on points
  const getBadgeCount = () => {
    return Math.floor(userPoints / 30);
  };
  
  // Available categories
  const categories = [
    "Cultural Heritage",
    "Food & Cuisine",
    "Festivals",
    "Art Forms", 
    "History",
    "Traditions",
    "Nature",
    "Travel"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="bg-gradient-to-b from-[#EDE8D0]/20 to-background pt-32">
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#00555A]">
              Discover Tulu Nadu's <span className="text-[#CC4E5C]">Living Heritage</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore our collection of stories, insights, and experiences that showcase the rich cultural tapestry of Tulu Nadu
            </p>
            
            {/* User-friendly gamification display */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <Star className="text-[#E5B31B] w-5 h-5 fill-[#E5B31B]" />
                    <span className="font-bold text-xl">{userPoints}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Points</span>
                </div>
                
                <div className="h-10 border-l border-gray-200 mx-2"></div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <Trophy className="text-[#00555A] w-5 h-5" />
                    <span className="font-bold text-xl">Level {userLevel}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Explorer</span>
                </div>
                
                <div className="h-10 border-l border-gray-200 mx-2"></div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl">🏆 {getBadgeCount()}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Badges</span>
                </div>
              </div>
            </div>
            
            <form className="mt-8 max-w-xl mx-auto" onSubmit={handleSearch}>
              <div className="relative">
                <Input 
                  placeholder="Search our stories..." 
                  className="pl-10 py-6 rounded-full border-[#00555A]/30 focus:border-[#00555A]"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Button 
                  type="submit"
                  className="absolute right-1 top-1 bg-[#00555A] hover:bg-[#CC4E5C] rounded-full h-10 group"
                >
                  Search
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
            
            {/* Filter toggle button */}
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex gap-1 items-center border-[#00555A]/30"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span>{isFilterOpen ? "Hide filters" : "Show filters"}</span>
              </Button>
            </div>
            
            {/* Expanded filter options */}
            {isFilterOpen && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-md animate-fade-in">
                <h3 className="font-medium text-[#00555A] mb-3">Filter by:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Reading Time</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">Under 5 min</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">5-10 min</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">10+ min</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Content Type</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">Article</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">Guide</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">Interview</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Date</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">This Week</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">This Month</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">This Year</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Level</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">Beginner</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">Intermediate</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#00555A]/10">Advanced</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant="outline" 
                  size="sm"
                  className={`rounded-full border-[#00555A]/30 hover:bg-[#00555A] hover:text-white transition-colors ${
                    activeCategory === category ? "bg-[#00555A] text-white" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="featured" className="mb-12">
            <TabsList className="mb-6 mx-auto max-w-md">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="animate-fade-in">
              <BlogPost 
                featured={true}
                title="The Intricate Artistry of Yakshagana: A 700-Year Legacy"
                excerpt="Delve into the vibrant world of Yakshagana, the traditional theatre form that has shaped Tulu Nadu's cultural identity for centuries, featuring elaborate costumes, mesmerizing dance movements, and compelling storytelling techniques."
                image="https://images.pexels.com/photos/2773927/pexels-photo-2773927.jpeg"
                date="May 18, 2025"
                readTime="12 min read"
                author="Deepak Shetty"
                category="Cultural Heritage"
                audioAvailable={true}
              />
            </TabsContent>

            <TabsContent value="popular" className="animate-fade-in">
              <BlogPost 
                featured={true}
                title="Sacred Rituals of Bhuta Kola: Connecting with Guardian Spirits"
                excerpt="Experience the mystical ancient ritual of Bhuta Kola, where elaborate ceremonies invoke guardian spirits through sacred performances that have sustained coastal Karnataka's spiritual ecosystem for generations."
                image="https://images.pexels.com/photos/5859323/pexels-photo-5859323.jpeg"
                date="May 12, 2025"
                readTime="8 min read"
                author="Radha Hegde"
                category="Spiritual Traditions"
                audioAvailable={true}
              />
            </TabsContent>

            <TabsContent value="recent" className="animate-fade-in">
              <BlogPost 
                featured={true}
                title="Coastal Cuisine: The Flavors that Define Tulu Nadu"
                excerpt="Explore the distinctive culinary traditions of coastal Karnataka, where coconut, fresh seafood, and unique spice blends come together to create a cuisine unlike any other in India."
                image="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
                date="May 21, 2025"
                readTime="10 min read"
                author="Akshay Kamath"
                category="Food & Cuisine"
                audioAvailable={false}
              />
            </TabsContent>

            <TabsContent value="recommended" className="animate-fade-in">
              <div className="bg-[#EDE8D0]/20 p-4 rounded-lg mb-8 animate-fade-in">
                <div className="flex gap-2 items-center mb-2">
                  <BookOpen className="h-4 w-4 text-[#00555A]" />
                  <h3 className="text-sm font-medium text-[#00555A]">Recommended based on your reading history</h3>
                </div>
                <p className="text-sm text-muted-foreground">These are personalized selections based on articles you've enjoyed previously.</p>
              </div>

              <BlogPost 
                featured={true}
                title="The Ancient Tiger Dance of Mangaluru"
                excerpt="Discover the vibrant Pili Vesha (Tiger Dance) tradition that brings color and energy to Mangaluru's Dasara celebrations, with performers adorned in striking tiger body paint and costumes."
                image="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
                date="May 5, 2025"
                readTime="7 min read"
                author="Pramod Shetty"
                category="Folk Traditions"
                audioAvailable={false}
              />
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <BlogPost 
              title="Sacred Rituals of Bhuta Kola: Connecting with Guardian Spirits"
              excerpt="Experience the mystical ancient ritual of Bhuta Kola, where elaborate ceremonies invoke guardian spirits through sacred performances that have sustained coastal Karnataka's spiritual ecosystem."
              image="https://images.pexels.com/photos/5859323/pexels-photo-5859323.jpeg"
              date="May 12, 2025"
              readTime="8 min read"
              author="Radha Hegde"
              category="Spiritual Traditions"
              audioAvailable={true}
            />

            <BlogPost 
              title="Tulu Nadu's Culinary Secrets: Beyond the Coast"
              excerpt="Journey through the distinctive flavors of Tulu cuisine, from the fermented toddy-based Moode to the delicate Patrode, exploring ingredients, techniques, and cultural significance."
              image="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
              date="May 8, 2025"
              readTime="10 min read"
              author="Akshay Kamath"
              category="Food & Culture"
              audioAvailable={false}
            />
            
            <BlogPost 
              title="The Ancient Tiger Dance of Mangaluru"
              excerpt="Discover the vibrant Pili Vesha (Tiger Dance) tradition that brings color and energy to Mangaluru's Dasara celebrations, with performers adorned in striking tiger body paint and costumes."
              image="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
              date="May 5, 2025"
              readTime="7 min read"
              author="Pramod Shetty"
              category="Folk Traditions"
              audioAvailable={false}
            />
            
            {/* Add more blog posts */}
            <BlogPost 
              title="The Temples of Udupi: A Spiritual Journey"
              excerpt="Explore the architectural marvels and spiritual significance of Udupi's ancient temples, including the famous Krishna Temple that draws pilgrims from across the country."
              image="https://images.pexels.com/photos/6444367/pexels-photo-6444367.jpeg"
              date="May 3, 2025"
              readTime="9 min read"
              author="Veena Rao"
              category="Spiritual Traditions"
              audioAvailable={true}
            />
            
            <BlogPost 
              title="Kambala: The Buffalo Race Tradition"
              excerpt="Dive into the controversial yet culturally significant buffalo race of Tulu Nadu, its history, modern adaptations, and the communities that keep this ancient tradition alive."
              image="https://images.pexels.com/photos/2959610/pexels-photo-2959610.jpeg"
              date="April 28, 2025"
              readTime="11 min read"
              author="Ganesh Shetty"
              category="Folk Traditions"
              audioAvailable={false}
            />
            
            <BlogPost 
              title="The Linguistic Treasures of Tulu"
              excerpt="Learn about efforts to preserve the endangered Tulu language, its unique grammatical structures, rich oral traditions, and the cultural knowledge embedded within it."
              image="https://images.pexels.com/photos/6457521/pexels-photo-6457521.jpeg"
              date="April 22, 2025"
              readTime="8 min read"
              author="Dr. Sulochana Nayak"
              category="Language & Heritage"
              audioAvailable={true}
            />
          </div>

          <div className="mt-12 text-center">
            <Button 
              className="bg-[#00555A] hover:bg-[#CC4E5C] transition-colors group"
              onClick={() => addPoints(5, "Exploring more articles")}
            >
              View All Articles
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-[#00555A]" />
                <h3 className="font-display text-xl font-bold text-[#00555A]">Upcoming Events</h3>
              </div>
              <ul className="space-y-4">
                <li className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Yakshagana Workshop</span>
                    <span className="text-sm text-[#CC4E5C]">May 25, 2025</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Learn the basics of Yakshagana makeup and movements</p>
                </li>
                <li className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tulu Cultural Festival</span>
                    <span className="text-sm text-[#CC4E5C]">June 10-12, 2025</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Three-day celebration of Tulu Nadu's diverse traditions</p>
                </li>
                <li>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cooking Class: Coastal Cuisine</span>
                    <span className="text-sm text-[#CC4E5C]">June 18, 2025</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Master the art of traditional Mangalorean seafood dishes</p>
                </li>
              </ul>
              <Button variant="ghost" className="mt-4 text-[#00555A] p-0 h-auto">
                View all events
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-5 w-5 text-[#00555A]" />
                <h3 className="font-display text-xl font-bold text-[#00555A]">Reading Collections</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 border-b border-gray-100 pb-3">
                  <span className="bg-[#EDE8D0] text-[#00555A] font-bold w-8 h-8 rounded-full flex items-center justify-center">7</span>
                  <div>
                    <h4 className="font-medium">Beginner's Guide to Tulu Nadu</h4>
                    <p className="text-sm text-muted-foreground">Essential reading for first-time visitors</p>
                  </div>
                </li>
                <li className="flex gap-3 border-b border-gray-100 pb-3">
                  <span className="bg-[#EDE8D0] text-[#00555A] font-bold w-8 h-8 rounded-full flex items-center justify-center">5</span>
                  <div>
                    <h4 className="font-medium">Sacred Spaces & Temples</h4>
                    <p className="text-sm text-muted-foreground">Exploring the spiritual heritage of the region</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-[#EDE8D0] text-[#00555A] font-bold w-8 h-8 rounded-full flex items-center justify-center">4</span>
                  <div>
                    <h4 className="font-medium">Culinary Journey</h4>
                    <p className="text-sm text-muted-foreground">Deep dive into Tulu Nadu's food traditions</p>
                  </div>
                </li>
              </ul>
              <Button variant="ghost" className="mt-4 text-[#00555A] p-0 h-auto">
                Browse collections
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
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
