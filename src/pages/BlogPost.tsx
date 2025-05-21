
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DetailedBlogPost from '@/components/DetailedBlogPost';
import { useEffect } from 'react';

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
    
    return () => {
      observer.disconnect();
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
          className="rounded-lg w-full h-64 object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1469041797191-50ace28483c3" 
          alt="Traditional performance" 
          className="rounded-lg w-full h-64 object-cover"
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
      <ul>
        <li>Academic institutions like Karnataka Yakshagana Academy now offer formal training programs</li>
        <li>Digital archiving projects are preserving historic performances</li>
        <li>Innovative collaborations with contemporary theater and dance forms are attracting younger audiences</li>
        <li>Growing international recognition has led to successful overseas tours</li>
      </ul>
      
      <p>
        Perhaps most significantly, Yakshagana has proven remarkably adaptable throughout its history. Its ability to incorporate new themes, performance contexts, and even technologies while maintaining its core aesthetic principles suggests it will continue to evolve rather than ossify as a museum piece.
      </p>
      
      <h2>Experience Yakshagana with YaanBarpe</h2>
      <p>
        For visitors to Tulu Nadu, experiencing a Yakshagana performance offers an unparalleled window into the region's cultural soul. YaanBarpe offers several ways to engage with this extraordinary art form:
      </p>
      <ul>
        <li>Guided attendance at full-night performances with expert commentary</li>
        <li>Workshops with master artists exploring costume, makeup, and basic movements</li>
        <li>Behind-the-scenes visits to see the preparation process</li>
        <li>Multi-day immersive experiences for those seeking deeper engagement</li>
      </ul>
      
      <p>
        As you witness the swirling colors, thunderous percussion, and transcendent performances of Yakshagana, you'll understand why this art form has remained at the heart of Tulu Nadu's cultural identity for seven centuries—and why it continues to captivate audiences today.
      </p>
    </>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="py-12 px-4 md:px-8">
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
      <Footer />
    </div>
  );
};

export default BlogPostPage;
