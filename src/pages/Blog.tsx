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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      <Navigation />
      
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 pt-32">
        <div className="container mx-auto py-16 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16 scroll-reveal">
            <Badge className="mb-6 bg-slate-100 text-slate-900 hover:bg-white px-6 py-2 text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Cultural Insights & Stories
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Discover Tulu Nadu's{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Living Heritage
              </span>
            </h1>
            
            <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Explore our collection of stories, insights, and experiences that showcase the rich cultural tapestry of Tulu Nadu through expert perspectives and authentic narratives.
            </p>
            
            {/* Professional gamification display */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="text-yellow-400 w-5 h-5 fill-yellow-400" />
                      <span className="font-bold text-xl text-white">{userPoints}</span>
                    </div>
                    <span className="text-sm text-slate-300">Points</span>
                  </div>
                  
                  <div className="h-12 border-l border-slate-600"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="text-blue-400 w-5 h-5" />
                      <span className="font-bold text-xl text-white">Level {userLevel}</span>
                    </div>
                    <span className="text-sm text-slate-300">Explorer</span>
                  </div>
                  
                  <div className="h-12 border-l border-slate-600"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xl text-white">🏆 {getBadgeCount()}</span>
                    </div>
                    <span className="text-sm text-slate-300">Badges</span>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="mt-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
              <div className="relative">
                <Input 
                  placeholder="Search stories, insights, and cultural content..." 
                  className="pl-12 pr-16 py-4 rounded-2xl border-slate-600 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 text-lg"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl h-10 px-6 group transition-all duration-300"
                >
                  Search
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant="outline" 
                  size="sm"
                  className={`rounded-full border-slate-600 bg-slate-800/30 backdrop-blur-sm text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all duration-300 ${
                    activeCategory === category ? "bg-slate-700 text-white border-slate-500" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <Tabs defaultValue="featured" className="mb-16">
          <TabsList className="mb-8 mx-auto bg-white shadow-lg border border-slate-200 rounded-xl p-1">
            <TabsTrigger value="featured" className="rounded-lg px-6 py-2 font-medium">Featured</TabsTrigger>
            <TabsTrigger value="popular" className="rounded-lg px-6 py-2 font-medium">Popular</TabsTrigger>
            <TabsTrigger value="recent" className="rounded-lg px-6 py-2 font-medium">Recent</TabsTrigger>
            <TabsTrigger value="recommended" className="rounded-lg px-6 py-2 font-medium">Recommended</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="animate-fade-in">
            {featuredPosts.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                <BlogPost 
                  featured={true}
                  title={featuredPosts[0].title}
                  excerpt={featuredPosts[0].excerpt}
           video={featuredPosts[0].video}
           
                  date={featuredPosts[0].date}
                  readTime={featuredPosts[0].readTime}
                  author={featuredPosts[0].author}
                  category={featuredPosts[0].category}
                  audioAvailable={featuredPosts[0].audioAvailable}
                  postId={featuredPosts[0].id}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular" className="animate-fade-in">
            {allPosts.length > 1 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                <BlogPost 
                  featured={true}
                  title={allPosts[1].title}
                  excerpt={allPosts[1].excerpt}
                  video={allPosts[1].video}
                  date={allPosts[1].date}
                  readTime={allPosts[1].readTime}
                  author={allPosts[1].author}
                  category={allPosts[1].category}
                  audioAvailable={allPosts[1].audioAvailable}
                  postId={allPosts[1].id}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="animate-fade-in">
            {allPosts.length > 2 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                <BlogPost 
                  featured={true}
                  title={allPosts[2].title}
                  excerpt={allPosts[2].excerpt}
                  video={allPosts[2].video}
                  date={allPosts[2].date}
                  readTime={allPosts[2].readTime}
                  author={allPosts[2].author}
                  category={allPosts[2].category}
                  audioAvailable={allPosts[2].audioAvailable}
                  postId={allPosts[2].id}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommended" className="animate-fade-in">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-8">
              <div className="flex gap-3 items-center mb-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Personalized for You</h3>
              </div>
              <p className="text-blue-700">These stories are curated based on your reading preferences and interests.</p>
            </div>

            {allPosts.length > 3 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                <BlogPost 
                  featured={true}
                  title={allPosts[3].title}
                  excerpt={allPosts[3].excerpt}
                  video={allPosts[3].video}
                  date={allPosts[3].date}
                  readTime={allPosts[3].readTime}
                  author={allPosts[3].author}
                  category={allPosts[3].category}
                  audioAvailable={allPosts[3].audioAvailable}
                  postId={allPosts[3].id}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Blog posts grid with professional styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {allPosts.map((post, index) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <BlogPost 
                title={post.title}
                excerpt={post.excerpt}
                video={post.video}
                date={post.date}
                readTime={post.readTime}
                author={post.author}
                category={post.category}
                audioAvailable={post.audioAvailable}
                postId={post.id}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white px-8 py-3 rounded-xl transition-all duration-300 group shadow-lg"
            onClick={() => addPoints(5, "Exploring more articles")}
          >
            View All Articles
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
        
        {/* Professional content sections */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6 text-slate-600" />
              <h3 className="font-display text-2xl font-bold text-slate-800">Upcoming Events</h3>
            </div>
            <ul className="space-y-4">
              <li className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-slate-800">Yakshagana Workshop</span>
                  <span className="text-sm text-blue-600 font-medium">May 25, 2025</span>
                </div>
                <p className="text-sm text-slate-600">Learn the basics of Yakshagana makeup and movements from master artists</p>
              </li>
              <li className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-slate-800">Tulu Cultural Festival</span>
                  <span className="text-sm text-blue-600 font-medium">June 10-12, 2025</span>
                </div>
                <p className="text-sm text-slate-600">Three-day celebration of Tulu Nadu's diverse traditions and heritage</p>
              </li>
              <li>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-slate-800">Coastal Cuisine Masterclass</span>
                  <span className="text-sm text-blue-600 font-medium">June 18, 2025</span>
                </div>
                <p className="text-sm text-slate-600">Master traditional Mangalorean seafood dishes with expert chefs</p>
              </li>
            </ul>
            <Button variant="ghost" className="mt-6 text-slate-600 hover:text-slate-800 p-0 h-auto font-medium">
              View all events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-slate-600" />
              <h3 className="font-display text-2xl font-bold text-slate-800">Reading Collections</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start border-b border-slate-100 pb-4">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold w-10 h-10 rounded-xl flex items-center justify-center text-sm">7</span>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Beginner's Guide to Tulu Nadu</h4>
                  <p className="text-sm text-slate-600">Essential reading for first-time visitors and culture enthusiasts</p>
                </div>
              </li>
              <li className="flex gap-4 items-start border-b border-slate-100 pb-4">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold w-10 h-10 rounded-xl flex items-center justify-center text-sm">5</span>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Sacred Spaces & Temples</h4>
                  <p className="text-sm text-slate-600">Exploring the spiritual heritage and architectural marvels</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold w-10 h-10 rounded-xl flex items-center justify-center text-sm">4</span>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Culinary Journey</h4>
                  <p className="text-sm text-slate-600">Deep dive into Tulu Nadu's rich food traditions and recipes</p>
                </div>
              </li>
            </ul>
            <Button variant="ghost" className="mt-6 text-slate-600 hover:text-slate-800 p-0 h-auto font-medium">
              Browse collections
              <ArrowRight className="ml-2 h-4 w-4" />
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
