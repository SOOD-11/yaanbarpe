
import { ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { addPoints, getUserPoints, getUserLevel } from '@/lib/gamification';
import { motion } from 'framer-motion';

// Enhanced posts with high-quality, relevant images
const recentPosts = [
  {
    id: 1,
    title: "The Lost Coins of Vijayanagara: Archaeological Discoveries in Tulu Nadu",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    date: "May 5, 2025",
    category: "Archaeology",
    pointValue: 8,
    level: "Beginner",
    excerpt: "Recent excavations reveal fascinating insights into the economic history of the Vijayanagara Empire",
    trending: true,
    featured: false
  },
  {
    id: 2,
    title: "Preserving Tulu Language: Digital Initiatives for Cultural Conservation",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    date: "May 2, 2025",
    category: "Language & Culture",
    pointValue: 10,
    level: "Intermediate",
    excerpt: "Innovative digital platforms are breathing new life into the ancient Tulu language",
    trending: false,
    featured: true
  },
  {
    id: 3,
    title: "Environmental Conservation Efforts Along the Netravati River Basin",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    date: "April 28, 2025",
    category: "Environment",
    pointValue: 7,
    level: "Advanced",
    excerpt: "Community-led conservation initiatives are protecting the lifeline of coastal Karnataka",
    trending: true,
    featured: false
  }
];

const RecentPosts = () => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showBadge, setShowBadge] = useState<number | null>(null);
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
  
  const handlePostHover = (id: number | null) => {
    setHoveredPost(id);
  };
  
  const handleImageLoad = (id: number) => {
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

  const handleShowBadge = (id: number) => {
    setShowBadge(id);
    setTimeout(() => setShowBadge(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-tulu-sand/30 via-white to-tulu-blue/10 py-24 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-tulu-gold" />
              <span className="text-tulu-gold font-semibold">Latest Stories</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Discover <span className="text-tulu-red">Tulu Nadu</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Dive deep into the cultural treasures, hidden stories, and living traditions that make Tulu Nadu extraordinary
            </p>
          </motion.div>
          
          {/* Enhanced points display */}
          <motion.div 
            className="mt-6 lg:mt-0 bg-white rounded-2xl px-6 py-4 shadow-lg border border-tulu-gold/20 min-w-[200px]"
            animate={showPointsAnimation ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Star className="text-tulu-gold w-8 h-8 fill-tulu-gold" />
                {showPointsAnimation && (
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-tulu-gold animate-ping" />
                )}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-tulu-blue">{userPoints}</span>
                  <span className="text-sm text-muted-foreground">points</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-tulu-red font-bold">Level {userLevel}</span>
                  <div className="flex gap-1">
                    {[...Array(Math.min(userLevel, 5))].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-tulu-gold rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={cn(
                "group cursor-pointer transition-all duration-300",
                index === 0 && "lg:col-span-2 lg:row-span-2"
              )}
              onMouseEnter={() => handlePostHover(post.id)}
              onMouseLeave={() => handlePostHover(null)}
              onClick={() => handlePostClick(post)}
            >
              <div className={cn(
                "bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100",
                post.featured && "ring-2 ring-tulu-gold/30"
              )}>
                <div className={cn(
                  "relative overflow-hidden",
                  index === 0 ? "h-80 lg:h-96" : "h-64"
                )}>
                  {/* Loading placeholder */}
                  {!imagesLoaded[post.id] && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-tulu-blue/30 border-t-tulu-blue rounded-full animate-spin mx-auto mb-4"></div>
                        <span className="text-gray-500 font-medium">Loading story...</span>
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
                  
                  {/* Enhanced overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-tulu-blue/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-tulu-gold/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">
                        ⭐ Featured
                      </span>
                    )}
                    {post.trending && (
                      <span className="bg-tulu-red/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="bg-tulu-green/90 text-white text-sm font-bold px-4 py-2 rounded-full backdrop-blur-sm">
                      +{post.pointValue} pts
                    </span>
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
                        <h3 className="font-bold text-xl text-tulu-blue mb-2">Story Unlocked!</h3>
                        <p className="text-tulu-green font-bold text-lg">+{post.pointValue} points earned</p>
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
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs px-3 py-1 rounded-full font-medium",
                        post.level === 'Beginner' && "bg-green-100 text-green-700",
                        post.level === 'Intermediate' && "bg-yellow-100 text-yellow-700",
                        post.level === 'Advanced' && "bg-red-100 text-red-700"
                      )}>
                        {post.level}
                      </span>
                      <span className="text-xs bg-tulu-sand/50 px-3 py-1 rounded-full">
                        {Math.floor(Math.random() * 8) + 4} min read
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={cn(
                    "font-display font-bold leading-tight line-clamp-2 transition-colors duration-300 mb-3",
                    index === 0 ? "text-2xl lg:text-3xl" : "text-xl",
                    hoveredPost === post.id ? "text-tulu-red" : "text-tulu-blue"
                  )}>
                    {post.title}
                  </h3>
                  
                  {index === 0 && (
                    <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className={cn(
                    "h-1 bg-tulu-red mt-4 transition-all duration-300 rounded-full",
                    hoveredPost === post.id ? "w-16" : "w-8"
                  )} />
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm text-muted-foreground font-medium">Active Discussion</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-tulu-blue hover:text-tulu-red hover:bg-tulu-blue/10 group"
                    >
                      Explore Story
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
          <div className="bg-gradient-to-r from-tulu-blue to-tulu-green text-white px-12 py-8 rounded-2xl backdrop-blur-sm shadow-2xl text-center">
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
