
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedExperiences from '@/components/FeaturedExperiences';
import CulturalShowcase from '@/components/CulturalShowcase';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import RecentPosts from '@/components/RecentPosts';
import { Button } from '@/components/ui/button';
import { ArrowUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    // Enhanced loading experience
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "🎉 Welcome to YaanBarpe!",
        description: "Explore the cultural treasures of Tulu Nadu",
        duration: 3000,
      });
    }, 1500);

    // Initialize scroll reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    // Enhanced scroll tracking
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowScrollTop(scrollTop > 500);
      
      // Parallax effect for hero
      const hero = document.querySelector('.parallax-container');
      if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    // Load user points
    const storedPoints = localStorage.getItem('tuluPoints');
    if (storedPoints) {
      setUserPoints(parseInt(storedPoints));
    }

    // Listen for points updates
    const handlePointsUpdate = () => {
      const points = localStorage.getItem('tuluPoints');
      if (points) {
        setUserPoints(parseInt(points));
      }
    };

    window.addEventListener('pointsUpdated', handlePointsUpdate);
    
    return () => {
      clearTimeout(loadingTimeout);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointsUpdated', handlePointsUpdate);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Add points for engagement
    const newPoints = userPoints + 1;
    setUserPoints(newPoints);
    localStorage.setItem('tuluPoints', newPoints.toString());
    
    toast({
      title: "+1 point earned!",
      description: "Thanks for staying engaged!",
      duration: 2000,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tulu-sand/20 to-tulu-blue/10">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-tulu-blue/30 border-t-tulu-blue rounded-full animate-spin mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-tulu-gold animate-pulse" size={24} />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-tulu-blue">Welcome to YaanBarpe</h2>
            <p className="text-muted-foreground">Loading cultural treasures...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Navigation with points display */}
      <Navigation />
      
      {/* Points display for logged-in experience */}
      {userPoints > 0 && (
        <div className="fixed top-20 right-4 z-40 bg-tulu-gold/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles size={16} />
            <span className="font-bold">{userPoints}</span>
            <span className="text-sm">points</span>
          </div>
        </div>
      )}

      {/* Enhanced sections with better spacing and animations */}
      <div id="hero" className="scroll-reveal">
        <Hero />
      </div>
      
      <div id="explore" className="scroll-reveal">
        <FeaturedExperiences />
      </div>
      
      <div className="scroll-reveal">
        <CulturalShowcase />
      </div>
      
      <div className="scroll-reveal">
        <Stats />
      </div>
      
      <div className="scroll-reveal">
        <Testimonials />
      </div>
      
      <div className="scroll-reveal">
        <RecentPosts />
      </div>
      
      <div className="scroll-reveal">
        <CallToAction />
      </div>
      
      <Footer />

      {/* Enhanced scroll to top button */}
      <Button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full shadow-lg transition-all duration-300 bg-tulu-blue hover:bg-tulu-red hover:scale-110",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
        )}
        size="icon"
      >
        <ArrowUp size={20} />
      </Button>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-tulu-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-tulu-blue/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Index;
