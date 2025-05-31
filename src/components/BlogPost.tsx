
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MessageSquare, Share2, Headphones, Eye, Heart, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

interface BlogPostProps {
  id?: string;
  postId?: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  commentCount?: number;
  featured?: boolean;
  className?: string;
  audioAvailable?: boolean;
  viewCount?: number;
  likeCount?: number;
}

export const BlogPost = ({
  id,
  postId,
  title,
  excerpt,
  image,
  date,
  readTime,
  author,
  category,
  commentCount = 0,
  featured = false,
  className,
  audioAvailable = false,
  viewCount = Math.floor(Math.random() * 1000) + 50,
  likeCount = Math.floor(Math.random() * 50) + 5
}: BlogPostProps) => {
  const linkId = postId || id;
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likeCount);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLiked(!isLiked);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
    
    toast({
      title: isLiked ? "Removed from likes" : "Added to likes!",
      description: isLiked ? "Post unliked" : "Thanks for the appreciation!",
      duration: 2000,
    });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Bookmarked!",
      description: isBookmarked ? "Bookmark removed" : "Saved for later reading",
      duration: 2000,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.origin + `/blog/${linkId}`
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/blog/${linkId}`);
      toast({
        title: "Link copied!",
        description: "Article link copied to clipboard",
        duration: 2000,
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg transition-all hover:shadow-2xl",
        featured ? "md:col-span-2 border-tulu-gold/50" : "border-border/30",
        className
      )}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-tulu-gold to-tulu-red text-white text-xs font-medium px-3 py-1 rounded-full animate-pulse">
          ⭐ Featured
        </div>
      )}

      {/* Audio indicator */}
      {audioAvailable && (
        <div className="absolute top-4 right-4 z-10 bg-tulu-blue/90 backdrop-blur-sm text-white p-2 rounded-full">
          <Headphones className="w-4 h-4" />
        </div>
      )}

      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.pexels.com/photos/2773927/pexels-photo-2773927.jpeg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-black"
              onClick={handleLike}
            >
              <Heart className={cn("w-4 h-4 mr-1", isLiked && "fill-red-500 text-red-500")} />
              {currentLikes}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-black"
              onClick={handleBookmark}
            >
              <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-blue-500 text-blue-500")} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-black"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
          <Badge variant="secondary" className="bg-tulu-blue/10 text-tulu-blue hover:bg-tulu-blue/20">
            {category}
          </Badge>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {readTime}
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-4 w-4" />
            {viewCount.toLocaleString()}
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:text-tulu-blue transition-colors line-clamp-2">
          <Link to={`/blog/${linkId}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1 hover:text-tulu-blue"
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Comments",
                  description: `View ${commentCount} comments`,
                  duration: 2000,
                });
              }}
            >
              <MessageSquare className="h-4 w-4" />
              {commentCount}
            </Button>
            
            <div className="text-sm text-muted-foreground">
              by <span className="font-medium text-tulu-blue">{author}</span>
            </div>
          </div>
          
          <Button asChild className="bg-tulu-green hover:bg-tulu-blue transition-colors">
            <Link to={`/blog/${linkId}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
