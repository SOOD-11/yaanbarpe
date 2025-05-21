
import { Headphones, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import React from 'react';

interface DetailedBlogPostProps {
  title: string;
  content: React.ReactNode;
  image: string;
  date: string;
  readTime: string;
  author: string;
  authorImage?: string;
  category: string;
  tags: string[];
  audioAvailable?: boolean;
}

const DetailedBlogPost = ({
  title,
  content,
  image,
  date,
  readTime,
  author,
  authorImage = "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
  category,
  tags,
  audioAvailable = false
}: DetailedBlogPostProps) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasReaction, setHasReaction] = useState(false);
  const [reactionCount, setReactionCount] = useState(42);
  const [isSaved, setIsSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readingPoints, setReadingPoints] = useState(0);
  const [gamificationLevel, setGamificationLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Handle audio toggle
  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
    
    if (!isAudioPlaying) {
      addReadingPoints(5, "Started listening");
    }
  };
  
  // Simulate audio progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAudioPlaying) {
      timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setIsAudioPlaying(false);
            clearInterval(timer);
            addReadingPoints(15, "Completed listening");
            return 100;
          }
          return newProgress;
        });
      }, 300);
    }
    
    return () => clearInterval(timer);
  }, [isAudioPlaying]);
  
  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight - windowHeight;
      const scrolled = window.scrollY / fullHeight;
      setScrollProgress(Math.min(scrolled * 100, 100));
      
      // Award points at different reading milestones
      if (scrolled > 0.25 && readingPoints < 5) {
        addReadingPoints(5, "Started reading");
      } else if (scrolled > 0.5 && readingPoints < 10) {
        addReadingPoints(5, "Halfway through");
      } else if (scrolled > 0.9 && readingPoints < 20) {
        addReadingPoints(10, "Completed article");
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [readingPoints]);
  
  // Update gamification level based on points
  useEffect(() => {
    const newLevel = Math.floor(readingPoints / 10) + 1;
    if (newLevel > gamificationLevel) {
      setGamificationLevel(newLevel);
      createConfetti();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [readingPoints, gamificationLevel]);
  
  // Create confetti effect
  const createConfetti = () => {
    const colors = ['#E5B31B', '#105082', '#982220', '#1D7850'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 5000);
    }
  };
  
  const toggleReaction = () => {
    if (hasReaction) {
      setReactionCount(prev => prev - 1);
    } else {
      setReactionCount(prev => prev + 1);
      addReadingPoints(2, "Liked article");
    }
    setHasReaction(!hasReaction);
  };
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      addReadingPoints(3, "Saved article");
    }
  };
  
  const addReadingPoints = (points: number, message: string) => {
    setReadingPoints(prev => prev + points);
    
    // Show points notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-8 bg-tulu-gold text-white px-3 py-1 rounded-full animate-bounce z-50 flex items-center gap-2';
    notification.innerHTML = `<span>+${points}</span><span>${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };
  
  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const imageUrl = image.startsWith('http') ? image : `https://images.unsplash.com/${image}`;
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-tulu-gold transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Points and level display */}
      <div className="fixed top-4 right-4 bg-tulu-blue text-white px-4 py-2 rounded-full z-50 flex items-center gap-2 shadow-lg">
        <span className="text-tulu-gold font-bold">{readingPoints}</span>
        <span>Points</span>
        <span className="bg-tulu-gold text-white w-6 h-6 rounded-full flex items-center justify-center ml-2">
          {gamificationLevel}
        </span>
      </div>
      
      <div className="mb-8">
        <span className="bg-tulu-gold text-white text-sm font-medium px-3 py-1 rounded-full">
          {category}
        </span>
        
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold my-6 text-tulu-blue">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          <span>•</span>
          <span>{readTime}</span>
          <span>•</span>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              <img src={authorImage} alt={author} className="w-full h-full object-cover" />
            </div>
            <span>{author}</span>
          </div>
          
          {audioAvailable && (
            <>
              <span>•</span>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "flex items-center gap-1 h-8 px-3",
                  isAudioPlaying 
                    ? "bg-tulu-gold text-white" 
                    : "text-tulu-gold hover:text-tulu-gold/80 hover:bg-tulu-gold/10"
                )}
                onClick={toggleAudio}
              >
                <Headphones className="w-4 h-4" />
                <span>{isAudioPlaying ? "Pause" : "Listen"}</span>
              </Button>
            </>
          )}
        </div>
        
        {/* Audio player */}
        {audioAvailable && isAudioPlaying && (
          <div className="mb-8 p-4 bg-tulu-blue/5 rounded-lg border border-tulu-blue/20 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-tulu-blue hover:text-tulu-red"
                onClick={toggleAudio}
              >
                {isAudioPlaying ? "⏸️" : "▶️"}
              </Button>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-tulu-gold rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {`${Math.floor(progress / 100 * parseInt(readTime.split(" ")[0]))}:00`} / {`${readTime.split(" ")[0]}:00`}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Main image with loading state */}
      <div className="rounded-2xl overflow-hidden mb-10 image-shine relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400">Loading image...</span>
          </div>
        )}
        <img 
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-auto object-cover transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoad}
        />
      </div>
      
      <div className="prose prose-lg max-w-none">
        {content}
      </div>
      
      {/* Interactive engagement section */}
      <div className="mt-8 p-4 bg-tulu-sand/20 rounded-lg border border-tulu-sand flex items-center justify-between">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex gap-2 items-center transition-all",
              hasReaction ? "text-tulu-red bg-tulu-red/10" : ""
            )}
            onClick={toggleReaction}
          >
            {hasReaction ? "❤️" : "🤍"} {reactionCount}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center"
            onClick={() => addReadingPoints(1, "Shared article")}
          >
            📤 Share
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex gap-2 items-center transition-all",
            isSaved ? "text-tulu-blue bg-tulu-blue/10" : ""
          )}
          onClick={toggleSave}
        >
          {isSaved ? "📑" : "🔖"} {isSaved ? "Saved" : "Save"}
        </Button>
      </div>
      
      <div className="mt-8">
        <h5 className="text-sm font-medium mb-3">Related Topics:</h5>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-tulu-sand px-3 py-1 rounded-full text-sm hover:bg-tulu-sand/80 cursor-pointer transition-colors"
              onClick={() => addReadingPoints(1, `Clicked ${tag} tag`)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <Separator className="my-10" />
      
      <div className="rounded-xl border p-6 flex flex-col sm:flex-row gap-6 items-center hover:border-tulu-blue transition-colors">
        <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
          <img src={authorImage} alt={author} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">About {author}</h3>
          <p className="text-muted-foreground mb-4">
            Cultural researcher and writer specializing in the traditions and heritage of Tulu Nadu. With over a decade of experience documenting the region's unique practices.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-tulu-blue"
            onClick={() => addReadingPoints(2, "Viewed author profile")}
          >
            View More Articles
          </Button>
        </div>
      </div>
      
      <div className="mt-16">
        <h3 className="font-display text-2xl font-bold mb-6">Related Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "The Annual Tiger Dance Festival of Mangaluru",
              date: "April 22, 2025",
              image: "photo-1517022812141-23620dba5c23"
            },
            {
              title: "Exploring the Temple Architecture of Udupi",
              date: "May 1, 2025",
              image: "photo-1466442929976-97f336a657be"
            }
          ].map((article, i) => (
            <div key={i} className="border rounded-lg overflow-hidden hover:shadow-md transition-all group cursor-pointer">
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={`https://images.unsplash.com/${article.image}`}
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <span className="text-sm text-muted-foreground">{article.date}</span>
                <h4 className="font-medium mt-1 mb-3">{article.title}</h4>
                <Button 
                  variant="link" 
                  className="text-tulu-blue p-0 h-auto flex items-center group"
                  onClick={() => addReadingPoints(3, "Clicked related article")}
                >
                  Read Article
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Achievement popup */}
      {readingPoints >= 20 && (
        <div className="fixed bottom-4 right-4 bg-tulu-gold text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in flex items-center gap-3">
          <div className="text-3xl">🏆</div>
          <div>
            <h4 className="font-bold">Achievement Unlocked!</h4>
            <p>Cultural Explorer: Read a full article</p>
          </div>
        </div>
      )}
      
      {/* Level up animation */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-black/70 text-white px-8 py-6 rounded-xl backdrop-blur-sm animate-scale-in text-center">
            <div className="text-5xl mb-2">🎉</div>
            <h2 className="text-3xl font-bold text-tulu-gold mb-1">Level Up!</h2>
            <p className="text-xl">You're now level {gamificationLevel}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedBlogPost;
