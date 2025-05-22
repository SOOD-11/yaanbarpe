
import { Headphones, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { addPoints, updateStreak } from '@/lib/gamification';
import { FactCard } from '@/components/ui/fact-card';
import { CommentSection } from '@/components/comments/CommentSection';

// Import smaller components
import BlogHeader from './blog-parts/BlogHeader';
import BlogImage from './blog-parts/BlogImage';
import AudioPlayer from './blog-parts/AudioPlayer';
import ReadingProgress from './blog-parts/ReadingProgress';
import BlogStats from './blog-parts/BlogStats';
import KnowledgeQuiz from './blog-parts/KnowledgeQuiz';
import RelatedArticles from './blog-parts/RelatedArticles';
import AuthorInfo from './blog-parts/AuthorInfo';
import ReactionBar from './blog-parts/ReactionBar';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readingPoints, setReadingPoints] = useState(0);
  const [streakDays, setStreakDays] = useState(1);
  
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
  
  // Update streak
  useEffect(() => {
    const currentStreak = updateStreak();
    setStreakDays(currentStreak);
  }, []);
  
  // Handle audio toggle
  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
    
    if (!isAudioPlaying) {
      addReadingPoints(5, "Started listening");
    }
  };
  
  // Add points helper
  const addReadingPoints = (points: number, message: string) => {
    setReadingPoints(prev => prev + points);
    const levelUp = addPoints(points, message);
    
    // Dispatch event for points display components
    window.dispatchEvent(new Event('pointsUpdated'));
    
    // Show points notification
    toast({
      title: `+${points} points`,
      description: message,
      duration: 2000,
    });
  };
  
  // Prepare image URL
  let imageUrl = "";
  
  if (image.startsWith('http')) {
    imageUrl = image;
  } else if (image.startsWith('/')) {
    imageUrl = image;
  } else if (image.startsWith('photo-')) {
    // Convert Unsplash photo ID to proper URL
    imageUrl = `https://images.unsplash.com/${image}?w=1200&q=80`;
  } else {
    // Fallback
    imageUrl = "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80";
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Reading progress bar */}
      <ReadingProgress progress={scrollProgress} />
      
      {/* Points display (moved to BlogStats component) */}
      <BlogStats readingPoints={readingPoints} streakDays={streakDays} />
      
      <BlogHeader 
        category={category}
        title={title}
        date={date}
        readTime={readTime}
        author={author}
        authorImage={authorImage}
        audioAvailable={audioAvailable}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
      />
      
      {/* Audio player */}
      {audioAvailable && isAudioPlaying && (
        <AudioPlayer 
          progress={progress}
          setProgress={setProgress}
          readTime={readTime}
          onToggleAudio={toggleAudio}
          isPlaying={isAudioPlaying}
        />
      )}
      
      {/* Did You Know fact card */}
      <FactCard />
      
      {/* Main image */}
      <BlogImage imageUrl={imageUrl} title={title} />
      
      <div className="prose prose-lg max-w-none">
        {content}
      </div>
      
      {/* Knowledge Quiz */}
      <KnowledgeQuiz onQuizComplete={(score) => addReadingPoints(score * 2, `Quiz completed! +${score * 2} points`)} />
      
      {/* Interactive engagement section */}
      <ReactionBar onInteraction={(points, message) => addReadingPoints(points, message)} />
      
      <div className="mt-8">
        <h5 className="text-sm font-medium mb-3">Related Topics:</h5>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-[#EDE8D0] px-3 py-1 rounded-full text-sm hover:bg-[#EDE8D0]/80 cursor-pointer transition-colors"
              onClick={() => addReadingPoints(1, `Clicked ${tag} tag`)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Comments Section */}
      <CommentSection postTitle={title} />
      
      <Separator className="my-10" />
      
      {/* Author info */}
      <AuthorInfo 
        author={author}
        authorImage={authorImage}
        onViewProfile={() => addReadingPoints(2, "Viewed author profile")}
      />
      
      {/* Related articles */}
      <RelatedArticles onArticleClick={() => addReadingPoints(3, "Clicked related article")} />
    </div>
  );
};

export default DetailedBlogPost;
