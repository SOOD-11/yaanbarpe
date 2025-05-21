
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogPost from '@/components/BlogPost';
import RecentPosts from '@/components/RecentPosts';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Blog = () => {
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
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="bg-gradient-to-b from-tulu-sand/20 to-background">
        <div className="container mx-auto py-16 px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-tulu-blue">
              Discover Tulu Nadu's <span className="text-tulu-red">Living Heritage</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore our collection of stories, insights, and experiences that showcase the rich cultural tapestry of Tulu Nadu
            </p>
          </div>

          <BlogPost 
            featured={true}
            title="The Intricate Artistry of Yakshagana: A 700-Year Legacy"
            excerpt="Delve into the vibrant world of Yakshagana, the traditional theatre form that has shaped Tulu Nadu's cultural identity for centuries, featuring elaborate costumes, mesmerizing dance movements, and compelling storytelling techniques."
            image="https://source.unsplash.com/photo-1581092795360-fd1ca04f0952"
            date="May 18, 2025"
            readTime="12 min read"
            author="Deepak Shetty"
            category="Cultural Heritage"
            audioAvailable={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <BlogPost 
              title="Sacred Rituals of Bhuta Kola: Connecting with Guardian Spirits"
              excerpt="Experience the mystical ancient ritual of Bhuta Kola, where elaborate ceremonies invoke guardian spirits through sacred performances that have sustained coastal Karnataka's spiritual ecosystem."
              image="https://source.unsplash.com/photo-1517022812141-23620dba5c23"
              date="May 12, 2025"
              readTime="8 min read"
              author="Radha Hegde"
              category="Spiritual Traditions"
              audioAvailable={true}
            />

            <BlogPost 
              title="Tulu Nadu's Culinary Secrets: Beyond the Coast"
              excerpt="Journey through the distinctive flavors of Tulu cuisine, from the fermented toddy-based Moode to the delicate Patrode, exploring ingredients, techniques, and cultural significance."
              image="https://source.unsplash.com/photo-1618160702438-9b02ab6515c9"
              date="May 8, 2025"
              readTime="10 min read"
              author="Akshay Kamath"
              category="Food & Culture"
              audioAvailable={false}
            />
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-tulu-blue hover:bg-tulu-red transition-colors group">
              View All Articles
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        </div>
      </div>

      <RecentPosts />
      <Footer />
    </div>
  );
};

export default Blog;
