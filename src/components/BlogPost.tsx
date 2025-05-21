
import { ArrowRight, Headphones, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
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

  return (
    <div
      className={cn(
        "scroll-reveal bg-white rounded-xl overflow-hidden shadow-lg transition-all hover-scale border border-border/30",
        featured ? "grid md:grid-cols-2 gap-0" : "flex flex-col"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("relative overflow-hidden", featured ? "h-full min-h-[300px]" : "h-60")}>
        <img 
          src={image} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-700", 
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-tulu-gold text-white text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
            "font-display font-bold mb-3 text-tulu-blue transition-colors",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}>
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-6">{excerpt}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            className="text-tulu-blue border-tulu-blue hover:bg-tulu-blue hover:text-white group"
            asChild
          >
            <Link to="/blog/yakshagana">
              Read More
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          {audioAvailable && (
            <Button 
              variant="ghost" 
              size="icon"
              className="text-tulu-gold hover:text-tulu-gold/80 hover:bg-tulu-gold/10 animate-pulse"
              title="Listen to audio version"
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
