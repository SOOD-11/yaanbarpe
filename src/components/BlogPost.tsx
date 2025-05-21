
import { ArrowRight, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  return (
    <div
      className={cn(
        "scroll-reveal bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl border border-border/30",
        featured ? "grid md:grid-cols-2 gap-0" : "flex flex-col"
      )}
    >
      <div className={cn("relative overflow-hidden image-shine", featured ? "h-full min-h-[300px]" : "h-60")}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-4 left-4">
          <span className="bg-tulu-gold text-white text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
            <span>•</span>
            <span>{author}</span>
          </div>
          
          <h3 className={cn(
            "font-display font-bold mb-3 text-tulu-blue",
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
          >
            Read More
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          {audioAvailable && (
            <Button 
              variant="ghost" 
              size="icon"
              className="text-tulu-gold hover:text-tulu-gold/80 hover:bg-tulu-gold/10"
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
