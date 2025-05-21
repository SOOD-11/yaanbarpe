
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const recentPosts = [
  {
    id: 1,
    title: "The Lost Coins of Vijayanagara: Archaeological Discoveries in Tulu Nadu",
    image: "photo-1492321936769-b49830bc1d1e",
    date: "May 5, 2025",
    category: "History",
    pointValue: 5
  },
  {
    id: 2,
    title: "Preserving Tulu Language: Digital Initiatives for Cultural Conservation",
    image: "photo-1466721591366-2d5fba72006d",
    date: "May 2, 2025",
    category: "Language & Culture",
    pointValue: 7
  },
  {
    id: 3,
    title: "Environmental Conservation Efforts Along the Netravati River Basin",
    image: "photo-1472396961693-142e6e269027",
    date: "April 28, 2025",
    category: "Environment",
    pointValue: 6
  }
];

const RecentPosts = () => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  const handlePostHover = (id: number | null) => {
    setHoveredPost(id);
  };
  
  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };
  
  // Add points animation
  const addPoints = (amount: number, message: string) => {
    // Show points notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-8 bg-tulu-gold text-white px-3 py-1 rounded-full animate-bounce z-50 flex items-center gap-2';
    notification.innerHTML = `<span>+${amount}</span><span>${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  return (
    <div className="bg-tulu-blue/5 py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Latest from our <span className="text-tulu-red">Blog</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Stay updated with our newest stories, insights, and discoveries from Tulu Nadu
            </p>
          </div>
          
          <Button 
            variant="outline"
            className="mt-6 md:mt-0 border-tulu-blue text-tulu-blue hover:bg-tulu-blue hover:text-white transition-colors group scroll-reveal"
            onClick={() => addPoints(10, "Subscribed to newsletter")}
          >
            Subscribe to Newsletter
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer scroll-reveal"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => handlePostHover(post.id)}
              onMouseLeave={() => handlePostHover(null)}
              onClick={() => addPoints(post.pointValue, `Selected ${post.title}`)}
            >
              <div className="relative h-48 overflow-hidden">
                {/* Loading placeholder */}
                {!imagesLoaded[post.id] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <span className="text-gray-400">Loading image...</span>
                  </div>
                )}
                
                <img 
                  src={`https://images.unsplash.com/${post.image}`} 
                  alt={post.title}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500",
                    hoveredPost === post.id ? "scale-110" : "scale-100",
                    imagesLoaded[post.id] ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => handleImageLoad(post.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <span className="bg-tulu-gold/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-tulu-blue/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    +{post.pointValue} pts
                  </span>
                </div>
              </div>
              
              <div className="p-5 bg-white">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <h3 className={cn(
                  "font-display text-lg font-medium mt-2 line-clamp-2 transition-colors duration-300",
                  hoveredPost === post.id ? "text-tulu-red" : "text-tulu-blue"
                )}>
                  {post.title}
                </h3>
                <div className={cn(
                  "h-0.5 bg-tulu-gold mt-3 transition-all duration-300",
                  hoveredPost === post.id ? "w-1/3" : "w-0"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
