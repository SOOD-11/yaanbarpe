
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DetailedBlogPost from '@/components/DetailedBlogPost';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addPoints } from '@/lib/gamification';
import { toast } from '@/hooks/use-toast';
import { blogPosts } from '@/lib/blogData';

const BlogPostPage = () => {
  // Initialize scroll reveal animation
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
    
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });
    
    // Track page view for analytics
    const pageLoadTime = new Date();
    
    return () => {
      observer.disconnect();
      
      // Calculate reading time when leaving the page
      const timeSpent = Math.floor((new Date().getTime() - pageLoadTime.getTime()) / 1000);
      if (timeSpent > 30) {
        // Only award points if they spent at least 30 seconds
        const pointsToAward = Math.min(15, Math.floor(timeSpent / 30));
        addPoints(pointsToAward, `Read article for ${Math.floor(timeSpent / 60)} minutes`);
        
        // Show toast if enough points earned
        if (pointsToAward >= 5) {
          toast({
            title: `+${pointsToAward} reading points!`,
            description: "Thanks for taking the time to read this article",
            duration: 3000
          });
        }
      }
    };
  }, []);

  // Get the first blog post (Yakshagana article) from our data
  const currentPost = blogPosts[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="py-12 px-4 md:px-8 flex-grow bg-gray-50/30">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 text-[#00555A] hover:text-[#00555A] hover:bg-[#00555A]/10 group"
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
                <Calendar className="w-4 h-4 text-muted-foreground" />
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
                      addPoints(2, "Provided feedback on article");
                      toast({
                        title: "Thank you!",
                        description: "We appreciate your feedback. +2 points!",
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
