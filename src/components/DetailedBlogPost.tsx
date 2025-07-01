import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { addPoints, updateStreak } from '@/lib/gamification';
import { FactCard } from '@/components/ui/fact-card';
import { CommentSection } from '@/components/comments/CommentSection';
import { Separator } from '@/components/ui/separator';
import BlogHeader from './blog-parts/BlogHeader';
import ReadingProgress from './blog-parts/ReadingProgress';
import BlogStats from './blog-parts/BlogStats';
import KnowledgeQuiz from './blog-parts/KnowledgeQuiz';
import RelatedArticles from './blog-parts/RelatedArticles';
import AuthorInfo from './blog-parts/AuthorInfo';
import ReactionBar from './blog-parts/ReactionBar';
import AdSpace from './blog-parts/AdSpace';
import MusicStyleAudioPlayer from './blog-parts/MusicStyleAudioPlayer';
import { Button } from '@/components/ui/button';

interface DetailedBlogPostProps {
  title: string;
  contentParts: string[];
  image?: string | string[];
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
  contentParts = [],
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
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const images = Array.isArray(image) ? image : (image ? [image] : []);

  useEffect(() => {
    // Always scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'auto' });
  
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight - windowHeight;
      const scrolled = window.scrollY / fullHeight;
      const progressPercent = Math.min(scrolled * 100, 100);
      setScrollProgress(progressPercent);
  
      if (scrolled > 0.9 && !hasReachedEnd) {
        setHasReachedEnd(true);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReachedEnd]);

  useEffect(() => {
    const currentStreak = updateStreak();
    setStreakDays(currentStreak);
  }, []);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setSlideshowIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images]);

  {/*const addReadingPoints = (points: number, message: string, showLevelUp: boolean = false) => {
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
  }; */}

  const handleTextToSpeech = () => {
    const text = contentParts[currentPartIndex].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!isPlaying && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;
      utterance.onstart = () => {
        setIsPlaying(true);
    
      };
      utterance.onend = () => {
        setIsPlaying(false);
        speechRef.current = null;
  
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        toast({ title: "❌ Audio Error", description: "Could not read the article.", duration: 3000 });
      };
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentPartIndex < contentParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);

    }
  };
  const handleShare = () => {
    const shareData = {
      title,
      text: `Check out this article: ${title}`,
      url: window.location.href,
    };
  
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          toast({ title: "Shared successfully!" });
        })
        .catch((error) => {
          toast({ title: "Share canceled", description: error.message });
        });
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast({
        title: "🔗 Link copied!",
        description: "You can now paste it anywhere to share the blog.",
      });
    }
  };
  const handlePrev = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(currentPartIndex - 1);

    }
  }

  return (
    <div className="max-w-4xl  space-y-4 w-full">
      <AdSpace position="top" size="large" />
      <BlogHeader category={category} title={title} date={date} readTime={readTime} author={author} authorImage={authorImage} audioAvailable={audioAvailable} isAudioPlaying={isPlaying} onToggleAudio={handleTextToSpeech} />
      {images.length >= 0 && (
        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-md">
          <AnimatePresence mode="wait">
            <motion.img key={images[slideshowIndex]} src={images[slideshowIndex].trim()} alt={title} className="object-cover w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
          </AnimatePresence>
        </div>
      )}
      {audioAvailable && contentParts?.length > 0 && contentParts[currentPartIndex] && (
        <MusicStyleAudioPlayer text={contentParts[currentPartIndex]} title={title} isPlaying={isPlaying} onTogglePlay={handleTextToSpeech} />
      )}
      <FactCard />
      <div className="bg-white rounded-lg p-2 w-full h-auto shadow-sm border relative">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentPartIndex}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="prose prose-base sm:prose-lg max-w-none leading-relaxed text-gray-700 space-y-6 pb-24"
    >
      <div dangerouslySetInnerHTML={{ __html: contentParts[currentPartIndex] }} />
    </motion.div>
  </AnimatePresence>

  {/* Sticky Slide Navigation (inside card only) */}
  <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between z-10">
    <Button
      onClick={handlePrev}
      disabled={currentPartIndex === 0}
      variant="outline"
      className="w-1/3 sm:w-auto"
    >
      Previous
    </Button>

    <span className="text-sm text-muted-foreground mx-2 whitespace-nowrap">
      Slide {currentPartIndex + 1} of {contentParts.length}
    </span>

    <Button
      onClick={handleNext}
      disabled={currentPartIndex === contentParts.length - 1}
      className="w-1/3 sm:w-auto"
    >
      Next
    </Button>
  </div>
</div>
  { /*   <AdSpace position="middle" size="medium" />*/}
      <KnowledgeQuiz blogTitle={title} onQuizComplete={() =>{} } />
      <ReactionBar onInteraction={() => {}} />
      
      { /*  <AdSpace position="bottom" size="medium" /> */}
      <div className="py-8">
       {/* <CommentSection postTitle={title} /> */}
      </div>

     
      
    </div>
  );
};

export default DetailedBlogPost;