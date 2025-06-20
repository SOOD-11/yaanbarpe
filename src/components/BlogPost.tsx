import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MessageSquare, Share2, Headphones, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  audioAvailable = false
}: BlogPostProps) => {
  const linkId = postId || id;
  
  // Using a reliable video source
  const videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  const handleVideoInteraction = (e: React.MouseEvent<HTMLVideoElement>, shouldPlay: boolean) => {
    const video = e.currentTarget;
    try {
      if (shouldPlay) {
        video.currentTime = 0;
        video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.log('Video interaction failed:', error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-lg",
        featured ? "md:col-span-2" : "",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <video
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          muted
          loop
          playsInline
          controls={false}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='16'%3EVideo Loading...%3C/text%3E%3C/svg%3E"
          onMouseEnter={(e) => handleVideoInteraction(e, true)}
          onMouseLeave={(e) => handleVideoInteraction(e, false)}
          onLoadStart={() => console.log('Blog post video loading')}
          onCanPlay={() => console.log('Blog post video ready to play')}
          onError={(e) => console.log('Blog post video error:', e)}
        >
          <source src={videoSrc} type="video/mp4" />
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white">
            Video not supported
          </div>
        </video>
        
        {/* Video overlay with play button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <Badge variant="secondary">{category}</Badge>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {readTime}
          </div>
          {audioAvailable && (
            <div className="flex items-center">
              <Headphones className="mr-1 h-4 w-4" />
              <span>Audio</span>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
          <Link to={`/blog/${linkId}`}>{title}</Link>
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              {commentCount}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button asChild>
            <Link to={`/blog/${linkId}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
