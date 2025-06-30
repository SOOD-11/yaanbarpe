
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import EnhancedHero from '@/components/EnhancedHero';
import ModernFeaturedExperiences from '@/components/ModernFeaturedExperiences';
import CulturalShowcase from '@/components/CulturalShowcase';
import InteractiveTeamValues from '@/components/InteractiveTeamValues';
import EnhancedBlogSection from '@/components/EnhancedBlogSection';
import InteractiveQuizSection from '@/components/InteractiveQuizSection';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import InterestFormCTA from '@/components/blog-parts/InterestFormCTA';
import InstagramCTA from './InstagramCTA';

const Index = () => {
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    // Initialize scroll reveal animation
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
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full">
        <EnhancedHero />
        <div className="relative">
          <InterestFormCTA/>
        { /* <ModernFeaturedExperiences /> */}
          <CulturalShowcase />
          <InstagramCTA></InstagramCTA>
          {   /* <InteractiveTeamValues /> */}
     {   /* <EnhancedBlogSection />  */}
        { /* <InteractiveQuizSection /> */}
       
         { /*<Testimonials /> */}
       { /*  <CallToAction /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
