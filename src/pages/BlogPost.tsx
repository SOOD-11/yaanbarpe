
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DetailedBlogPost from '@/components/DetailedBlogPost';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addPoints } from '@/lib/gamification';
import { toast } from '@/hooks/use-toast';

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

  const blogContent = (
    <>
      <p>
        In the verdant coastal plains of Karnataka, where the Western Ghats meet the Arabian Sea, exists a cultural treasure unlike any other. Yakshagana, a 700-year-old traditional theatre form, stands as one of Tulu Nadu's most magnificent artistic expressions, combining elaborate costumes, mesmerizing dance movements, dramatic makeup, and compelling storytelling to create an immersive spectacle that has defined the region's cultural identity for centuries.
      </p>
      
      <h2>The Origins of a Cultural Masterpiece</h2>
      <p>
        The word "Yakshagana" derives from "Yaksha" (celestial beings in Hindu mythology) and "gana" (song), literally translating to "song of the celestial beings." Historical evidence traces its origins to the 13th century, though it reached its artistic zenith during the 16th century under the patronage of the Vijayanagara Empire.
      </p>
      <p>
        Unlike many classical art forms that were confined to royal courts, Yakshagana evolved as a people's art form, performed in village squares, temple courtyards, and paddy fields after harvest. This accessible nature allowed it to absorb influences from diverse communities across the region, making it a true reflection of Tulu Nadu's composite cultural identity.
      </p>
      
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img 
          src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
          alt="Yakshagana performer in costume" 
          className="rounded-lg w-full h-64 object-cover transition-transform hover:scale-105 duration-500"
        />
        <img 
          src="https://images.unsplash.com/photo-1469041797191-50ace28483c3" 
          alt="Traditional performance" 
          className="rounded-lg w-full h-64 object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      
      <h2>The Elaborate Artistry</h2>
      <p>
        What distinguishes Yakshagana is its extraordinary attention to detail across multiple artistic dimensions:
      </p>
      
      <h3>Costume and Makeup</h3>
      <p>
        Perhaps the most visually striking element of Yakshagana is its elaborate costume design. Performers wear towering headgear (mundasu) adorned with intricate patterns and motifs that can extend nearly two feet above their heads. The costume includes a jacket (kavacha) with mirror work and embroidery, a dhoti styled distinctively, and ornate jewelry that transforms the performer into a larger-than-life character.
      </p>
      <p>
        The facial makeup, applied by specialized artists over several hours, uses natural pigments and follows strict character-specific patterns. Kings and divine figures feature predominantly red faces with black outlines, while demons display green, black, and yellow designs that emphasize their fearsome nature.
      </p>
      
      <blockquote>
        "Each Yakshagana character is not merely portrayed; it is inhabited. When I put on the costume and makeup, I cease to be myself. I become the embodiment of stories that have lived in our collective consciousness for thousands of years."
        <cite>— Kumara Shivarama Hegde, Veteran Yakshagana Artist</cite>
      </blockquote>
      
      <h3>Movement and Expression</h3>
      <p>
        Yakshagana dance movements are vigorous, athletic, and highly codified. They combine elements of martial arts, folk dance, and classical dance traditions. Performers might leap several feet in the air, spin rapidly, or execute intricate footwork sequences that require years of dedicated training to master.
      </p>
      <p>
        Equally important are the subtle facial expressions (abhinaya) that convey complex emotions. The performers' ability to shift seamlessly between emotions—from love to rage, from wonder to sorrow—creates a dynamism that keeps audiences entranced through performances that often continue from dusk until dawn.
      </p>
      
      <h2>Musical Heritage</h2>
      <p>
        The music of Yakshagana deserves special attention as a distinctive classical tradition in its own right. Led by the bhagavata (singer-narrator), the music employs ragas unique to the Tulu Nadu region, accompanied by maddale (percussion), chende (drum), and harmonium.
      </p>
      <p>
        Unlike many classical forms where music follows fixed compositions, Yakshagana music involves extensive improvisation. The bhagavata must spontaneously compose verses that move the narrative forward while maintaining the integrity of the raga structure—an extraordinary feat of musical creativity that distinguishes master performers.
      </p>
      
      <div className="my-8 p-4 bg-[#00555A]/5 rounded-lg border border-[#00555A]/10">
        <h4 className="font-semibold text-[#00555A] mb-2">Traditional Instruments in Yakshagana</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
          <li><strong>Chende</strong> - A cylindrical drum that provides the powerful percussion backbone</li>
          <li><strong>Maddale</strong> - A smaller drum that adds rhythmic complexity</li>
          <li><strong>Harmonium</strong> - Provides melodic support to the lead singer</li>
          <li><strong>Chakrataala</strong> - Small cymbals that keep time throughout performances</li>
          <li><strong>Jagata</strong> - Bells attached to the dancer's ankles that accentuate footwork</li>
        </ul>
      </div>
      
      <h2>Thematic Universe</h2>
      <p>
        Yakshagana performances draw primarily from Hindu epics like the Mahabharata, Ramayana, and Bhagavata Purana. However, what makes these performances culturally significant is how they localize these pan-Indian narratives, incorporating references to local geography, customs, and social issues.
      </p>
      <p>
        In recent decades, contemporary themes including environmental conservation, social justice, and modern political concerns have found their way into Yakshagana presentations, demonstrating the art form's remarkable adaptability across centuries.
      </p>
      
      <h2>Economic and Cultural Ecosystem</h2>
      <p>
        Today, Yakshagana supports a vibrant economic ecosystem in Tulu Nadu. The region's 78 active professional troupes (melas) contribute approximately ₹42 crore annually through performances, while creating livelihood opportunities for over 3,000 artists and supporting craftspeople.
      </p>
      <p>
        Beyond economics, Yakshagana serves as a cultural touchstone that reinforces community bonds. Performances mark important agricultural milestones, religious festivals, and life events, creating shared experiences that strengthen social cohesion across caste and religious boundaries.
      </p>
      
      <h2>Preserving a Living Tradition</h2>
      <p>
        Despite its cultural significance, Yakshagana faces challenges from changing entertainment preferences and economic pressures. However, recent initiatives offer hope for its continued vitality:
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li>Academic institutions like Karnataka Yakshagana Academy now offer formal training programs</li>
        <li>Digital archiving projects are preserving historic performances</li>
        <li>Innovative collaborations with contemporary theater and dance forms are attracting younger audiences</li>
        <li>Growing international recognition has led to successful overseas tours</li>
      </ul>
      
      <p>
        Perhaps most significantly, Yakshagana has proven remarkably adaptable throughout its history. Its ability to incorporate new themes, performance contexts, and even technologies while maintaining its core aesthetic principles suggests it will continue to evolve rather than ossify as a museum piece.
      </p>
      
      <div className="my-8 bg-[#EDE8D0]/30 p-6 rounded-lg border border-[#EDE8D0]">
        <h3 className="font-display text-xl font-bold mb-4 text-[#00555A]">Key Yakshagana Performances to Watch</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <span className="bg-[#00555A] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">1</span>
            <span><strong>Shri Krishna Parijatha</strong> - A beloved story depicting Krishna's quest for the celestial Parijatha flower</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#00555A] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>
            <span><strong>Devi Mahatme</strong> - The goddess Durga's epic battle against the demon Mahishasura</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#00555A] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">3</span>
            <span><strong>Jambavati Kalyana</strong> - The marriage of Krishna and Jambavati, featuring spectacular costumes</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#00555A] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">4</span>
            <span><strong>Abhimanyu Kalaga</strong> - The poignant tale of the warrior Abhimanyu entering the chakravyuha formation</span>
          </li>
        </ul>
      </div>
      
      <h2>Experience Yakshagana with YaanBarpe</h2>
      <p>
        For visitors to Tulu Nadu, experiencing a Yakshagana performance offers an unparalleled window into the region's cultural soul. YaanBarpe offers several ways to engage with this extraordinary art form:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Guided attendance at full-night performances with expert commentary</li>
        <li>Workshops with master artists exploring costume, makeup, and basic movements</li>
        <li>Behind-the-scenes visits to see the preparation process</li>
        <li>Multi-day immersive experiences for those seeking deeper engagement</li>
      </ul>
      
      <p>
        As you witness the swirling colors, thunderous percussion, and transcendent performances of Yakshagana, you'll understand why this art form has remained at the heart of Tulu Nadu's cultural identity for seven centuries—and why it continues to captivate audiences today.
      </p>
      
      <div className="mt-12 border-t border-gray-200 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last updated: May 20, 2025</span>
          </div>
          <div className="flex items-center gap-3">
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
                Yes
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
                No
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="py-12 px-4 md:px-8 flex-grow">
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
            title="The Intricate Artistry of Yakshagana: A 700-Year Legacy"
            content={blogContent}
            image="photo-1581092795360-fd1ca04f0952"
            date="May 18, 2025"
            readTime="12 min read"
            author="Deepak Shetty"
            category="Cultural Heritage"
            tags={["Yakshagana", "Performance Art", "Cultural Heritage", "Tulu Nadu", "Traditional Theatre"]}
            audioAvailable={true}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
