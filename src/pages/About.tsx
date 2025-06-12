
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Target, Award } from 'lucide-react';

const About = () => {
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

  const team = [
    {
      name: "Priya Shetty",
      role: "Founder & Cultural Guide",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Born and raised in Udupi, Priya has dedicated her life to preserving Tulu culture."
    },
    {
      name: "Rajesh Bhat",
      role: "Heritage Expert",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "A scholar of Tulu history with 20+ years of research experience."
    },
    {
      name: "Meera Rao",
      role: "Experience Designer",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Crafts immersive cultural experiences that connect visitors with authentic traditions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <div className="py-24 px-4 md:px-8 bg-gradient-to-b from-tulu-sand/20 to-background">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tulu-blue">About</span> <span className="text-tulu-red">YaanBarpe</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are passionate storytellers and cultural preservationists dedicated to sharing the rich heritage 
              of Tulu Nadu with the world through authentic, immersive experiences.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 border-tulu-sand/20">
                <CardContent className="pt-6">
                  <Heart className="w-12 h-12 text-tulu-red mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">Preserve and celebrate Tulu culture for future generations</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 border-tulu-sand/20">
                <CardContent className="pt-6">
                  <Target className="w-12 h-12 text-tulu-blue mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Our Vision</h3>
                  <p className="text-sm text-muted-foreground">To be the bridge between ancient traditions and modern travelers</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 border-tulu-sand/20">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-tulu-green mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Our Community</h3>
                  <p className="text-sm text-muted-foreground">Local artisans, performers, and cultural experts</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 border-tulu-sand/20">
                <CardContent className="pt-6">
                  <Award className="w-12 h-12 text-tulu-gold mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Our Impact</h3>
                  <p className="text-sm text-muted-foreground">Empowering local communities through cultural tourism</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 px-4 md:px-8 bg-tulu-beige/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-tulu-blue">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our passionate team of cultural enthusiasts, local experts, and experience designers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow scroll-reveal">
                  <div className="h-64">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{member.name}</h3>
                    <p className="text-tulu-teal font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
