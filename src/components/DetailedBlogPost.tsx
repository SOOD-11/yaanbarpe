
import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { addPoints, updateStreak } from '@/lib/gamification';
import { FactCard } from '@/components/ui/fact-card';
import { CommentSection } from '@/components/comments/CommentSection';
import { Separator } from '@/components/ui/separator';

// Import smaller components
import BlogHeader from './blog-parts/BlogHeader';
import BlogImage from './blog-parts/BlogImage';
import ReadingProgress from './blog-parts/ReadingProgress';
import BlogStats from './blog-parts/BlogStats';
import KnowledgeQuiz from './blog-parts/KnowledgeQuiz';
import RelatedArticles from './blog-parts/RelatedArticles';
import AuthorInfo from './blog-parts/AuthorInfo';
import ReactionBar from './blog-parts/ReactionBar';
import TextToSpeech from './blog-parts/TextToSpeech';
import AdSpace from './blog-parts/AdSpace';

interface DetailedBlogPostProps {
  title: string;
  content: string;
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Reading progress bar */}
      <ReadingProgress progress={scrollProgress} />
      
      {/* Points display */}
      <BlogStats readingPoints={readingPoints} streakDays={streakDays} />
      
      {/* Top Ad Space */}
      <AdSpace position="top" size="large" />
      
      <BlogHeader 
        category={category}
        title={title}
        date={date}
        readTime={readTime}
        author={author}
        authorImage={authorImage}
        audioAvailable={audioAvailable}
        isAudioPlaying={false}
        onToggleAudio={() => {}}
      />
      
      {/* Text to Speech Component */}
      {audioAvailable && (
        <TextToSpeech text={content} title={title} />
      )}
      
      {/* Did You Know fact card */}
      <FactCard />
      
      {/* Main image */}
      <BlogImage imageUrl={imageUrl} title={title} />
      
      {/* Article content with proper spacing */}
      <div className="prose prose-lg max-w-none space-y-6">
        <div 
          dangerouslySetInnerHTML={{ __html: content }}
          className="leading-relaxed text-gray-700"
        />
      </div>
      
      {/* Middle Ad Space */}
      <div className="my-12">
        <AdSpace position="middle" size="medium" />
      </div>
      
      {/* Knowledge Quiz */}
      <KnowledgeQuiz onQuizComplete={(score) => addReadingPoints(score * 2, `Quiz completed! +${score * 2} points`)} />
      
      {/* Interactive engagement section */}
      <ReactionBar onInteraction={(points, message) => addReadingPoints(points, message)} />
      
      {/* Tags section with better spacing */}
      <div className="bg-[#EDE8D0]/20 p-6 rounded-lg">
        <h5 className="text-sm font-medium mb-4 text-[#00555A]">Related Topics:</h5>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-[#EDE8D0] hover:bg-[#00555A] hover:text-white px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => addReadingPoints(1, `Clicked ${tag} tag`)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom Ad Space */}
      <AdSpace position="bottom" size="medium" />
      
      {/* Comments Section with enhanced spacing */}
      <div className="py-8">
        <CommentSection postTitle={title} />
      </div>
      
      <Separator className="my-12" />
      
      {/* Author info */}
      <div className="bg-white p-8 rounded-xl shadow-sm border">
        <AuthorInfo 
          author={author}
          authorImage={authorImage}
          onViewProfile={() => addReadingPoints(2, "Viewed author profile")}
        />
      </div>
      
      {/* Related articles */}
      <div className="py-8">
        <RelatedArticles onArticleClick={() => addReadingPoints(3, "Clicked related article")} />
      </div>
    </div>
  );
};

export default DetailedBlogPost;
