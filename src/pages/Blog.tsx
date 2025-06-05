import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogPost from '@/components/BlogPost';
import RecentPosts from '@/components/RecentPosts';
import BlogRecommendations from '@/components/BlogRecommendations';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Trophy, Star, Filter, Calendar, BookOpen, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserPoints, getUserLevel, addPoints } from '@/lib/gamification';
import { blogPosts } from '@/lib/blogData';
import AdSpace from '@/components/blog-parts/AdSpace';

const Blog = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  
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
    
    // Listen for points updates
    const handlePointsUpdate = () => {
      setUserPoints(getUserPoints());
      setUserLevel(getUserLevel());
    };
    
    window.addEventListener('pointsUpdated', handlePointsUpdate);
    
    // Show newsletter popup after 3 seconds, but make it non-intrusive
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 3000);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('pointsUpdated', handlePointsUpdate);
      clearTimeout(timer);
    };
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      addPoints(3, "Searching for content");
      
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

  const getBadgeCount = () => {
    return Math.floor(userPoints / 30);
  };
  
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

  const featuredPosts = blogPosts.slice(0, 3);
  const allPosts = blogPosts;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Newsletter popup with fixed positioning and higher z-index */}
      {showNewsletter && (
        <div className="fixed bottom-4 right-4 z-[100] max-w-sm">
          <div className="bg-white rounded-lg shadow-xl border border-[#00555A]/20 p-4 animate-slide-up">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[#00555A] text-sm">Cultural Newsletter</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setShowNewsletter(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Weekly insights into Tulu Nadu's heritage</p>
            <Button 
              size="sm" 
              className="bg-[#00555A] hover:bg-[#CC4E5C] text-white w-full"
              onClick={() => {
                addPoints(5, "Subscribed to newsletter");
                setShowNewsletter(false);
                toast({
                  title: "Subscribed! +5 points",
                  description: "Welcome to our cultural newsletter!",
                  duration: 3000,
                });
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-b from-[#EDE8D0]/20 to-background pt-32">
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#00555A]">
              Discover Tulu Nadu's <span className="text-[#CC4E5C]">Living Heritage</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Explore our collection of stories, insights, and experiences that showcase the rich cultural tapestry of Tulu Nadu
            </p>
            
            {/* User-friendly gamification display */}
            <div className="flex justify-center gap-4 mb-8">
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
              {featuredPosts.length > 0 && (
                <BlogPost 
                  featured={true}
                  title={featuredPosts[0].title}
                  excerpt={featuredPosts[0].excerpt}
                  image={featuredPosts[0].image}
                  date={featuredPosts[0].date}
                  readTime={featuredPosts[0].readTime}
                  author={featuredPosts[0].author}
                  category={featuredPosts[0].category}
                  audioAvailable={featuredPosts[0].audioAvailable}
                  postId={featuredPosts[0].id}
                />
              )}
            </TabsContent>

            <TabsContent value="popular" className="animate-fade-in">
              {allPosts.length > 1 && (
                <BlogPost 
                  featured={true}
                  title={allPosts[1].title}
                  excerpt={allPosts[1].excerpt}
                  image={allPosts[1].image}
                  date={allPosts[1].date}
                  readTime={allPosts[1].readTime}
                  author={allPosts[1].author}
                  category={allPosts[1].category}
                  audioAvailable={allPosts[1].audioAvailable}
                  postId={allPosts[1].id}
                />
              )}
            </TabsContent>

            <TabsContent value="recent" className="animate-fade-in">
              {allPosts.length > 2 && (
                <BlogPost 
                  featured={true}
                  title={allPosts[2].title}
                  excerpt={allPosts[2].excerpt}
                  image={allPosts[2].image}
                  date={allPosts[2].date}
                  readTime={allPosts[2].readTime}
                  author={allPosts[2].author}
                  category={allPosts[2].category}
                  audioAvailable={allPosts[2].audioAvailable}
                  postId={allPosts[2].id}
                />
              )}
            </TabsContent>

            <TabsContent value="recommended" className="animate-fade-in">
              <div className="bg-[#EDE8D0]/20 p-4 rounded-lg mb-8 animate-fade-in">
                <div className="flex gap-2 items-center mb-2">
                  <BookOpen className="h-4 w-4 text-[#00555A]" />
                  <h3 className="text-sm font-medium text-[#00555A]">Recommended based on your reading history</h3>
                </div>
                <p className="text-sm text-muted-foreground">These are personalized selections based on articles you've enjoyed previously.</p>
              </div>

              {allPosts.length > 3 && (
                <BlogPost 
                  featured={true}
                  title={allPosts[3].title}
                  excerpt={allPosts[3].excerpt}
                  image={allPosts[3].image}
                  date={allPosts[3].date}
                  readTime={allPosts[3].readTime}
                  author={allPosts[3].author}
                  category={allPosts[3].category}
                  audioAvailable={allPosts[3].audioAvailable}
                  postId={allPosts[3].id}
                />
              )}
            </TabsContent>
          </Tabs>

          {/* Top Ad Space */}
          <div className="mb-12">
            <AdSpace position="top" size="large" />
          </div>

          {/* All blog posts grid with better spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {allPosts.map((post, index) => (
              <BlogPost 
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                date={post.date}
                readTime={post.readTime}
                author={post.author}
                category={post.category}
                audioAvailable={post.audioAvailable}
                postId={post.id}
              />
            ))}
          </div>

          {/* All blog posts grid with better spacing */}
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
