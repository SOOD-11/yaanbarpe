
import { ArrowRight, Headphones, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Simple points system - no need for complex state
  const handleInteraction = () => {
    // Get current points from localStorage
    const currentPoints = Number(localStorage.getItem('tuluPoints') || '0');
    const pointsToAdd = featured ? 5 : 3;
    
    // Update points in localStorage
    localStorage.setItem('tuluPoints', (currentPoints + pointsToAdd).toString());
    
    // Show simple toast
    toast({
      title: `+${pointsToAdd} points!`,
      description: "Keep exploring to discover more!",
      duration: 2000,
    });
  };
  
  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // Get reliable image URL
  const getImageUrl = () => {
    // Using Pexels images which are free and reliable
    const pexelsImages = [
      'https://images.pexels.com/photos/2832038/pexels-photo-2832038.jpeg',
      'https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg',
      'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg',
      'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg',
      'https://images.pexels.com/photos/2649164/pexels-photo-2649164.jpeg',
      'https://images.pexels.com/photos/2406371/pexels-photo-2406371.jpeg',
    ];
    
    // If it's already a full URL
    if (image.startsWith('http')) {
      return image;
    }
    
    // For blog images in /blog-images
    if (image.startsWith('/blog-images/')) {
      return image;
    }
    
    // Use a random Pexels image as fallback
    return pexelsImages[Math.floor(Math.random() * pexelsImages.length)];
  };

  return (
    <div
      className={cn(
        "scroll-reveal bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 border border-[#00555A]/30",
        featured ? "grid md:grid-cols-2 gap-0" : "flex flex-col",
        isHovered ? "transform -translate-y-2" : ""
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
          src={getImageUrl()} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-700", 
            isHovered ? "scale-110" : "scale-100",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={(e) => {
            // If image fails, set a reliable fallback
            const target = e.target as HTMLImageElement;
            target.src = "https://images.pexels.com/photos/2647393/pexels-photo-2647393.jpeg";
            handleImageLoad();
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#00555A] text-white text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        {/* Simple points indicator */}
        <div className="absolute top-4 right-4">
          <span className="bg-[#CC4E5C]/90 text-white text-xs px-3 py-1 rounded-full">
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
            isHovered ? "text-[#CC4E5C]" : "text-[#00555A]"
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
              isHovered ? "bg-[#00555A] text-white border-[#00555A]" : "text-[#00555A] border-[#00555A] hover:bg-[#00555A] hover:text-white"
            )}
            asChild
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
                "text-[#CC4E5C] hover:text-[#CC4E5C]/80 hover:bg-[#CC4E5C]/10",
                isHovered ? "animate-pulse" : ""
              )}
              title="Listen to audio version"
              onClick={(e) => {
                e.stopPropagation();
                toast({
                  title: "Audio preview",
                  description: "Audio feature will be available soon!",
                  duration: 2000,
                });
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
