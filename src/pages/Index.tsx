
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedExperiences from '@/components/FeaturedExperiences';
import CulturalShowcase from '@/components/CulturalShowcase';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
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
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedExperiences />
      <CulturalShowcase />
      <Stats />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
