
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DetailedBlogPost from '@/components/DetailedBlogPost';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Bookmark, Heart, Eye, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { addPoints } from '@/lib/gamification';
import { toast } from '@/hooks/use-toast';
import { getBlogPostById } from '@/lib/blogData';
import { motion } from 'framer-motion';

const BlogPostPage = () => {
  const { postId } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);
  
  // Initialize scroll reveal animation and reading progress
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });
    
    // Simulate view count and read time
    setViewCount(Math.floor(Math.random() * 2000) + 500);
    setEstimatedReadTime(Math.floor(Math.random() * 8) + 5);
    
    // Track page view for analytics
    const pageLoadTime = new Date();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      
      // Calculate reading time when leaving the page
      const timeSpent = Math.floor((new Date().getTime() - pageLoadTime.getTime()) / 1000);
      if (timeSpent > 120) {
        const pointsToAward = Math.min(25, Math.floor(timeSpent / 60) * 5);
        addPoints(pointsToAward, `Completed reading article: ${timeSpent} seconds`);
        
        if (pointsToAward >= 10) {
          toast({
            title: `🎉 Article Completed! +${pointsToAward} points!`,
            description: "You've finished reading this article. Great job!",
            duration: 4000
          });
        }
      }
    };
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    addPoints(2, "Liked an article");
    toast({
      title: isLiked ? "Removed like" : "Article liked! +2 points",
      description: isLiked ? "Like removed" : "Thanks for the appreciation!",
      duration: 2000,
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    addPoints(3, "Bookmarked an article");
    toast({
      title: isBookmarked ? "Bookmark removed" : "Article bookmarked! +3 points",
      description: isBookmarked ? "Removed from bookmarks" : "Saved for later reading",
      duration: 2000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPost.title,
        text: currentPost.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied! +1 point",
        description: "Article link copied to clipboard",
        duration: 2000,
      });
    }
    addPoints(1, "Shared an article");
  };

  // Get the blog post by ID or default to first post
  const currentPost = getBlogPostById(postId || 'yakshagana-legacy') || {
    id: 'default',
    title: 'Welcome to Tulu Nadu Heritage',
    content: '<p>Explore the rich cultural heritage of Tulu Nadu...</p>',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&q=80',
    date: 'May 25, 2025',
    readTime: '5 min read',
    author: 'YaanBarpe Team',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    category: 'Cultural Heritage',
    tags: ['Culture', 'Heritage', 'Tulu Nadu'],
    excerpt: 'Discover the vibrant culture of Tulu Nadu',
    audioAvailable: true
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-tulu-blue to-tulu-green transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      
      <Navigation />
      
      {/* Hero section with enhanced image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={currentPost.image}
          alt={currentPost.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Floating action buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`p-3 rounded-full shadow-lg transition-all ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookmark}
            className={`p-3 rounded-full shadow-lg transition-all ${
              isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/90 text-gray-700'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="p-3 bg-white/90 text-gray-700 rounded-full shadow-lg transition-all"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Article stats overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-6 text-white/90 text-sm mb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{viewCount.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{estimatedReadTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>{Math.floor(viewCount * 0.1)} likes</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-12 px-4 md:px-8 flex-grow bg-gray-50/30">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 text-tulu-blue hover:text-tulu-blue hover:bg-tulu-blue/10 group"
            asChild
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to all articles
            </Link>
          </Button>
          
          <DetailedBlogPost 
            title={currentPost.title}
            content={currentPost.content}
            image={currentPost.image}
            date={currentPost.date}
            readTime={currentPost.readTime}
            author={currentPost.author}
            authorImage={currentPost.authorImage}
            category={currentPost.category}
            tags={currentPost.tags}
            audioAvailable={currentPost.audioAvailable}
          />
          
          {/* Enhanced feedback section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Last updated: {currentPost.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Was this article helpful?</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                    onClick={() => {
                      addPoints(2, "Provided positive feedback on article");
                      toast({
                        title: "Thank you! +2 points",
                        description: "We appreciate your feedback",
                        duration: 2000
                      });
                    }}
                  >
                    👍 Yes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    onClick={() => {
                      toast({
                        title: "Thank you for your feedback",
                        description: "We'll work to improve our content",
                        duration: 2000
                      });
                    }}
                  >
                    👎 No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
