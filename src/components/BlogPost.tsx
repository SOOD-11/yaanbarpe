
import { ArrowRight, Headphones, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  featured?: boolean;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  audioAvailable?: boolean;
}

const BlogPost = ({
  featured = false,
  title,
  excerpt,
  image,
  date,
  readTime,
  author,
  category,
  audioAvailable = false
}: BlogPostProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Animation effect when interaction happens
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setTimeout(() => setHasInteracted(false), 1000);
      
      // Award points for interaction
      const points = featured ? 5 : 3;
      addPoints(points, `Interacted with ${title}`);
    }
  };
  
  // Add points animation
  const addPoints = (amount: number, message: string) => {
    setEarnedPoints(prev => prev + amount);
    
    // Show points notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-8 bg-tulu-gold text-white px-3 py-1 rounded-full animate-bounce z-50 flex items-center gap-2';
    notification.innerHTML = `<span>+${amount}</span><span>${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };
  
  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const imageUrl = image.startsWith('http') ? image : `https://images.unsplash.com/${image}`;

  return (
    <div
      className={cn(
        "scroll-reveal bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 border border-border/30",
        featured ? "grid md:grid-cols-2 gap-0" : "flex flex-col",
        isHovered ? "transform -translate-y-2" : "",
        hasInteracted ? "animate-pulse" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteraction}
    >
      <div className={cn("relative overflow-hidden", featured ? "h-full min-h-[300px]" : "h-60")}>
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400">Loading image...</span>
          </div>
        )}
        
        <img 
          src={imageUrl} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-700", 
            isHovered ? "scale-110" : "scale-100",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoad}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-tulu-gold text-white text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        {/* Points indicator for gamification */}
        <div className="absolute top-4 right-4">
          <span className="bg-tulu-blue text-white text-xs px-3 py-1 rounded-full">
            +{featured ? 5 : 3} points
          </span>
        </div>
        
        {/* Image overlay gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />
      </div>
      
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <Calendar className="mr-1 w-4 h-4" />
              <span>{date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Clock className="mr-1 w-4 h-4" />
              <span>{readTime}</span>
            </div>
            <span>•</span>
            <span>{author}</span>
          </div>
          
          <h3 className={cn(
            "font-display font-bold mb-3 transition-colors",
            featured ? "text-2xl md:text-3xl" : "text-xl",
            isHovered ? "text-tulu-red" : "text-tulu-blue"
          )}>
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-6">{excerpt}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            className={cn(
              "transition-all duration-300 group",
              isHovered ? "bg-tulu-blue text-white border-tulu-blue" : "text-tulu-blue border-tulu-blue hover:bg-tulu-blue hover:text-white"
            )}
            asChild
            onClick={() => addPoints(featured ? 10 : 5, `Reading ${title}`)}
          >
            <Link to="/blog/yakshagana">
              Read More
              <ArrowRight className={cn(
                "ml-2 w-4 h-4 transition-transform", 
                isHovered ? "translate-x-1" : ""
              )} />
            </Link>
          </Button>
          
          {audioAvailable && (
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "text-tulu-gold hover:text-tulu-gold/80 hover:bg-tulu-gold/10",
                isHovered ? "animate-bounce" : "animate-pulse"
              )}
              title="Listen to audio version"
              onClick={(e) => {
                e.stopPropagation();
                addPoints(2, "Started audio preview");
              }}
            >
              <Headphones className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
