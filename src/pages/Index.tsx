
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
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <title>YaanBarpe – Tulunadu Culture, Heritage </title>
        <meta
          name="description"
          content="Explore Kambala, Yakshagana, Bhootha Kola, and Tulunadu’s rich traditions through YaanBarpe’s digital storytelling, blogs, and culture-first experiences."
        />
        <meta
          name="keywords"
          content="YaanBarpe, Tulunadu, Kambala, Bhootha Kola, Yakshagana, Tulu Nadu traditions, coastal Karnataka culture,udupi,Tiger Dance"
        />
        <meta name="author" content="YaanBarpe Team" />

        {/* Open Graph */}
        <meta property="og:title" content="YaanBarpe – Explore Tulunadu Culture and Stories" />
        <meta
          property="og:description"
          content="Discover the roots of Tulunadu – Kambala, Yakshagana, Bhootha Kola, and more – through immersive blogs and digital archives."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yaanbarpe.in/" />
        <meta property="og:image" content="https://www.yaanbarpe.in/blog-images/KambalaBlog/74AEE4DD-DB08-4C91-A15A-7951EF144B6F.jpeg" />


      
        


        <link rel="canonical" href="https://www.yaanbarpe.in/" />
      </Helmet>
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
