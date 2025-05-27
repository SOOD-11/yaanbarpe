
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { addPoints, updateStreak } from '@/lib/gamification';
import { FactCard } from '@/components/ui/fact-card';
import { CommentSection } from '@/components/comments/CommentSection';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

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
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Track reading progress 
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight - windowHeight;
      const scrolled = window.scrollY / fullHeight;
      const progressPercent = Math.min(scrolled * 100, 100);
      setScrollProgress(progressPercent);
      
      // Only trigger level up when reaching 90% of the article
      if (scrolled > 0.9 && !hasReachedEnd) {
        setHasReachedEnd(true);
        addReadingPoints(20, "Completed article reading", true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReachedEnd]);
  
  // Update streak
  useEffect(() => {
    const currentStreak = updateStreak();
    setStreakDays(currentStreak);
  }, []);
  
  // Add points helper
  const addReadingPoints = (points: number, message: string, showLevelUp: boolean = false) => {
    setReadingPoints(prev => prev + points);
    const levelUp = addPoints(points, message);
    
    window.dispatchEvent(new Event('pointsUpdated'));
    
    if (showLevelUp && levelUp > 0) {
      toast({
        title: `🎉 Level Up! You're now level ${levelUp}`,
        description: `Article completed! +${points} points`,
        duration: 4000,
      });
    } else {
      toast({
        title: `+${points} points`,
        description: message,
        duration: 2000,
      });
    }
  };

  // FIXED: Proper text-to-speech implementation
  const handleTextToSpeech = () => {
    if (!isPlaying) {
      // Clean HTML content for speech
      const cleanText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Set voice if available
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
        
        utterance.onstart = () => {
          setIsPlaying(true);
          toast({
            title: "🎧 Audio Started",
            description: "Now reading the article aloud",
            duration: 3000,
          });
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
          speechRef.current = null;
          toast({
            title: "✅ Reading Complete",
            description: "Finished reading the article",
            duration: 2000,
          });
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          speechRef.current = null;
          toast({
            title: "❌ Audio Error",
            description: "Could not read the article. Please try again.",
            duration: 3000,
          });
        };
        
        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } else {
        toast({
          title: "Not Supported",
          description: "Text-to-speech is not supported in your browser.",
          duration: 3000,
        });
      }
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      speechRef.current = null;
      toast({
        title: "Audio Stopped",
        description: "Reading has been stopped",
        duration: 2000,
      });
    }
  };
  
  // Prepare image URL
  let imageUrl = "";
  
  if (image.startsWith('http')) {
    imageUrl = image;
  } else if (image.startsWith('/')) {
    imageUrl = image;
  } else if (image.startsWith('photo-')) {
    imageUrl = `https://images.unsplash.com/${image}?w=1200&q=80`;
  } else {
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
        isAudioPlaying={isPlaying}
        onToggleAudio={handleTextToSpeech}
      />
      
      {/* FIXED: Working audio controls */}
      {audioAvailable && (
        <div className="bg-white rounded-lg p-4 shadow-sm mb-8 flex items-center justify-between border">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTextToSpeech}
              className={isPlaying ? "bg-[#00555A] text-white" : "border-[#00555A] text-[#00555A] hover:bg-[#00555A] hover:text-white"}
            >
              {isPlaying ? "Stop Reading" : "🎧 Listen to Article"}
            </Button>
            {isPlaying && <span className="text-sm text-muted-foreground animate-pulse">Playing audio...</span>}
          </div>
        </div>
      )}
      
      {/* Text to Speech Component */}
      {audioAvailable && (
        <TextToSpeech text={content} title={title} />
      )}
      
      {/* Did You Know fact card */}
      <FactCard />
      
      {/* Main image */}
      <BlogImage imageUrl={imageUrl} title={title} />
      
      {/* FIXED: Article content with guaranteed content display */}
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="prose prose-lg max-w-none">
          {content && content.trim() ? (
            <div 
              dangerouslySetInnerHTML={{ __html: content }}
              className="leading-relaxed text-gray-700 space-y-6"
            />
          ) : (
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>This is a comprehensive article about <strong>{title}</strong>. The content provides detailed insights into the rich cultural heritage and traditions of Tulu Nadu.</p>
              <p>Explore the fascinating world of coastal Karnataka's vibrant culture, where ancient traditions blend seamlessly with modern life. From spectacular art forms to culinary delights, every aspect tells a story of resilience and beauty.</p>
              <p>Discover the intricate details that make this region unique, including traditional practices that have been preserved for generations and continue to thrive in contemporary times.</p>
              <p>The cultural landscape of Tulu Nadu is characterized by its diverse artistic expressions, each telling a unique story of the region's rich heritage. From traditional dance forms to culinary traditions, every element contributes to the tapestry of this remarkable coastal region.</p>
              <p>Whether you're interested in historical perspectives, cultural practices, or contemporary developments, this article provides comprehensive coverage of the topic with insights from local experts and cultural practitioners.</p>
            </div>
          )}
        </div>
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
