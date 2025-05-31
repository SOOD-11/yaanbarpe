
import { ArrowRight, Star, TrendingUp, Sparkles, Clock, Eye, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { addPoints, getUserPoints, getUserLevel } from '@/lib/gamification';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Enhanced posts with more detailed and relevant content
const recentPosts = [
  {
    id: "yakshagana-legacy",
    title: "The Intricate Artistry of Yakshagana: A 700-Year Legacy",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    date: "May 18, 2025",
    category: "Cultural Heritage",
    pointValue: 12,
    level: "Intermediate",
    excerpt: "Delve into the vibrant world of Yakshagana, the traditional theatre form that has shaped Tulu Nadu's cultural identity for centuries, featuring elaborate costumes and mesmerizing dance movements.",
    trending: true,
    featured: true,
    readTime: "12 min read",
    views: "2.1k"
  },
  {
    id: "bhuta-kola-rituals",
    title: "Sacred Rituals of Bhuta Kola: Connecting with Guardian Spirits",
    image: "https://images.unsplash.com/photo-1578161816900-9145b3c4dbf5?w=800&q=80",
    date: "May 12, 2025",
    category: "Spiritual Traditions",
    pointValue: 10,
    level: "Advanced",
    excerpt: "Experience the mystical ancient ritual where elaborate ceremonies invoke guardian spirits through sacred performances that have sustained coastal Karnataka's spiritual ecosystem.",
    trending: false,
    featured: true,
    readTime: "8 min read",
    views: "1.8k"
  },
  {
    id: "coastal-cuisine",
    title: "Coastal Cuisine: The Flavors that Define Tulu Nadu",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80",
    date: "May 21, 2025",
    category: "Food & Culture",
    pointValue: 8,
    level: "Beginner",
    excerpt: "Explore the distinctive culinary traditions where coconut, fresh seafood, and unique spice blends create a cuisine unlike any other in India.",
    trending: true,
    featured: false,
    readTime: "10 min read",
    views: "3.2k"
  },
  {
    id: "tiger-dance-tradition",
    title: "The Ancient Tiger Dance of Mangaluru",
    image: "https://images.unsplash.com/photo-1578769522753-dfd0d99daa9d?w=800&q=80",
    date: "May 5, 2025",
    category: "Folk Traditions",
    pointValue: 6,
    level: "Beginner",
    excerpt: "Discover the vibrant Pili Vesha tradition that brings color and energy to Mangaluru's Dasara celebrations with striking tiger body paint.",
    trending: false,
    featured: false,
    readTime: "7 min read",
    views: "1.5k"
  },
  {
    id: "kambala-buffalo-races",
    title: "Kambala: The Thrilling Buffalo Races of Coastal Karnataka",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80",
    date: "April 28, 2025",
    category: "Sports & Traditions",
    pointValue: 9,
    level: "Intermediate",
    excerpt: "Experience the adrenaline rush of traditional buffalo races that showcase the unique bond between farmers and their animals.",
    trending: true,
    featured: false,
    readTime: "9 min read",
    views: "2.7k"
  },
  {
    id: "temple-architecture",
    title: "Sacred Geometry: The Temple Architecture of Tulu Nadu",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    date: "April 15, 2025",
    category: "Architecture & Heritage",
    pointValue: 11,
    level: "Advanced",
    excerpt: "Discover the intricate architectural marvels where sacred geometry meets artistic brilliance in structures over a millennium old.",
    trending: false,
    featured: true,
    readTime: "11 min read",
    views: "1.9k"
  }
];

const RecentPosts = () => {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showBadge, setShowBadge] = useState<string | null>(null);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  
  useEffect(() => {
    setUserPoints(getUserPoints());
    setUserLevel(getUserLevel());
    
    const handlePointsUpdate = () => {
      const newPoints = getUserPoints();
      const newLevel = getUserLevel();
      
      if (newPoints > userPoints) {
        setShowPointsAnimation(true);
        setTimeout(() => setShowPointsAnimation(false), 1000);
      }
      
      setUserPoints(newPoints);
      setUserLevel(newLevel);
    };
    
    window.addEventListener('pointsUpdated', handlePointsUpdate);
    window.addEventListener('storage', handlePointsUpdate);
    
    return () => {
      window.removeEventListener('pointsUpdated', handlePointsUpdate);
      window.removeEventListener('storage', handlePointsUpdate);
    };
  }, [userPoints]);
  
  const handlePostHover = (id: string | null) => {
    setHoveredPost(id);
  };
  
  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };
  
  const handlePostClick = (post: typeof recentPosts[0]) => {
    const levelUp = addPoints(post.pointValue, `Selected ${post.title}`);
    
    if (levelUp > 0) {
      setUserLevel(levelUp);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    
    handleShowBadge(post.id);
    setUserPoints(getUserPoints());
    window.dispatchEvent(new Event('pointsUpdated'));
  };

  const handleShowBadge = (id: string) => {
    setShowBadge(id);
    setTimeout(() => setShowBadge(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <span className="text-blue-600 font-semibold text-lg">Latest Cultural Stories</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Discover <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Tulu Nadu</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Dive deep into the cultural treasures, hidden stories, and living traditions that make Tulu Nadu extraordinary. Each story rewards your curiosity with cultural points.
            </p>
          </motion.div>
          
          {/* Enhanced points display */}
          <motion.div 
            className="mt-6 lg:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl px-8 py-6 shadow-xl border border-blue-200 min-w-[250px]"
            animate={showPointsAnimation ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 text-white">
              <div className="relative">
                <Star className="text-yellow-300 w-10 h-10 fill-yellow-300" />
                {showPointsAnimation && (
                  <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-ping" />
                )}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{userPoints}</span>
                  <span className="text-sm opacity-90">cultural points</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-300 font-bold text-lg">Level {userLevel}</span>
                  <div className="flex gap-1">
                    {[...Array(Math.min(userLevel, 5))].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-yellow-300 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group cursor-pointer transition-all duration-300",
                index === 0 && "md:col-span-2 lg:col-span-2"
              )}
              onMouseEnter={() => handlePostHover(post.id)}
              onMouseLeave={() => handlePostHover(null)}
            >
              <Link to={`/blog/${post.id}`} onClick={() => handlePostClick(post)}>
                <div className={cn(
                  "bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full",
                  post.featured && "ring-2 ring-blue-300/50 shadow-blue-100"
                )}>
                  <div className={cn(
                    "relative overflow-hidden",
                    index === 0 ? "h-80 lg:h-96" : "h-64"
                  )}>
                    {/* Enhanced loading placeholder */}
                    {!imagesLoaded[post.id] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 animate-pulse flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                          <span className="text-blue-600 font-medium">Loading story...</span>
                        </div>
                      </div>
                    )}
                    
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        hoveredPost === post.id ? "scale-110" : "scale-100",
                        imagesLoaded[post.id] ? "opacity-100" : "opacity-0"
                      )}
                      onLoad={() => handleImageLoad(post.id)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80";
                        handleImageLoad(post.id);
                      }}
                    />
                    
                    {/* Enhanced overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Enhanced badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm animate-pulse shadow-sm">
                          ⭐ Featured
                        </span>
                      )}
                      {post.trending && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                          🔥 Trending
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
                        +{post.pointValue} pts
                      </span>
                    </div>
                    
                    {/* Stats overlay on hover */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-4 text-white text-sm">
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Badge popup animation */}
                    {showBadge === post.id && (
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center bg-black/70 z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center transform">
                          <div className="text-6xl mb-4">🏆</div>
                          <h3 className="font-bold text-xl text-blue-600 mb-2">Story Unlocked!</h3>
                          <p className="text-green-600 font-bold text-lg">+{post.pointValue} points earned</p>
                          <p className="text-sm text-muted-foreground mt-2">Keep exploring to level up!</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className={cn(
                    "p-6 bg-white",
                    index === 0 && "p-8"
                  )}>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground font-medium">{post.date}</span>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-xs px-3 py-1 rounded-full font-medium",
                          post.level === 'Beginner' && "bg-green-100 text-green-700",
                          post.level === 'Intermediate' && "bg-yellow-100 text-yellow-700",
                          post.level === 'Advanced' && "bg-red-100 text-red-700"
                        )}>
                          {post.level}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <BookOpen size={12} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className={cn(
                      "font-display font-bold leading-tight line-clamp-2 transition-colors duration-300 mb-3",
                      index === 0 ? "text-2xl lg:text-3xl" : "text-xl",
                      hoveredPost === post.id ? "text-blue-600" : "text-gray-800"
                    )}>
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className={cn(
                      "h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 transition-all duration-300 rounded-full",
                      hoveredPost === post.id ? "w-16" : "w-8"
                    )} />
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>{post.views} views</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Active Discussion</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:text-white hover:bg-blue-600 group"
                      >
                        Read Story
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
            <Link to="/blog">
              <BookOpen className="mr-2" size={20} />
              Explore All Stories
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Enhanced level up notification */}
      {showLevelUp && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-8 rounded-2xl backdrop-blur-sm shadow-2xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold mb-2">Level Up!</h2>
              <p className="text-2xl font-semibold">You're now Level {userLevel}</p>
              <p className="text-lg mt-2 opacity-90">New stories and rewards unlocked!</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RecentPosts;
