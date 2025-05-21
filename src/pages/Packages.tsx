
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';
import AudioGuideDemo from '@/components/AudioGuideDemo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Packages = () => {
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
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-tulu-green">Tailored</span> Experiences
            </h1>
            <p className="text-muted-foreground text-lg">
              Immerse yourself in the authentic essence of Tulu Nadu with our carefully crafted 6-month packages, designed to provide deep cultural immersion
            </p>
          </div>

          <div className="mb-16 scroll-reveal">
            <Tabs defaultValue="cultural" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="cultural">Cultural Immersion</TabsTrigger>
                <TabsTrigger value="spiritual">Spiritual Journey</TabsTrigger>
                <TabsTrigger value="heritage">Heritage Explorer</TabsTrigger>
                <TabsTrigger value="culinary">Culinary Adventure</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cultural" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PackageCard
                    title="Yakshagana Apprentice"
                    description="A 6-month immersive experience learning the art of Yakshagana, including costume design, makeup application, music, and performance techniques from master artists."
                    price="₹95,000"
                    duration="6 months"
                    image="https://source.unsplash.com/photo-1581092795360-fd1ca04f0952"
                    features={[
                      "Weekly lessons with master performers",
                      "Costume and makeup workshops",
                      "Musical instrument training",
                      "Final group performance",
                      "Certificate of completion",
                      "Accommodation options available"
                    ]}
                    featured={true}
                    audioPreview={true}
                  />
                  
                  <PackageCard
                    title="Tulu Cultural Documentation"
                    description="Document Tulu Nadu's vanishing traditions through a guided ethnographic research program, learning field research, documentation, and storytelling techniques."
                    price="₹78,000"
                    duration="6 months"
                    image="https://source.unsplash.com/photo-1582562124811-c09040d0a901"
                    features={[
                      "Research methodology training",
                      "Field visits to remote villages",
                      "Interview techniques workshop",
                      "Professional equipment access",
                      "Publishing opportunity",
                      "Academic mentorship"
                    ]}
                    featured={false}
                    audioPreview={false}
                  />
                  
                  <PackageCard
                    title="Folk Arts Residency"
                    description="Immerse yourself in various folk art forms including Pilivesha (tiger dance), Kambala (buffalo race), and other traditional performances through hands-on learning."
                    price="₹86,000"
                    duration="6 months"
                    image="https://source.unsplash.com/photo-1469041797191-50ace28483c3"
                    features={[
                      "Rotating art form focus each month",
                      "Direct learning from practitioners",
                      "Materials and supplies included",
                      "Public exhibition opportunity",
                      "Cultural context lectures",
                      "Translation assistance"
                    ]}
                    featured={false}
                    audioPreview={true}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="spiritual" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PackageCard
                    title="Temple Architecture & Philosophy"
                    description="Study the intricate architecture, symbolism and philosophical foundations of Tulu Nadu's ancient temples through guided visits and expert lectures."
                    price="₹82,000"
                    duration="6 months"
                    image="https://source.unsplash.com/photo-1466442929976-97f336a657be"
                    features={[
                      "Weekly temple visits with scholars",
                      "Architecture drawing workshops",
                      "Sanskrit/Tulu inscription basics",
                      "Philosophical discourse sessions",
                      "Personal research project",
                      "Transport and materials included"
                    ]}
                    featured={true}
                    audioPreview={true}
                  />

                  {/* Additional packages would be added here */}
                </div>
              </TabsContent>

              <TabsContent value="heritage" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PackageCard
                    title="Coastal Heritage Expedition"
                    description="Explore the geological and historical treasures of Tulu Nadu's coastline, from the basalt columns of St. Mary's Islands to ancient ports and lighthouses."
                    price="₹88,000"
                    duration="6 months"
                    image="https://source.unsplash.com/photo-1500673922987-e212871fec22"
                    features={[
                      "Weekly coastal expeditions",
                      "Geological history workshops",
                      "Maritime archaeology introduction",
                      "Conservation techniques training",
                      "Historical documentation project",
                      "Boat travel and equipment included"
                    ]}
                    featured={true}
                    audioPreview={false}
                  />

                  {/* Additional packages would be added here */}
                </div>
              </TabsContent>

              <TabsContent value="culinary" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PackageCard
                    title="Tulu Culinary Mastery"
                    description="Master the techniques, ingredients, and cultural significance of Tulu cuisine through hands-on cooking classes, market visits, and harvest experiences."
                    price="₹76,000"
                    duration="6 months"
                    image="https://source.unsplash.com/photo-1466721591366-2d5fba72006d"
                    features={[
                      "Weekly cooking classes with local chefs",
                      "Market and ingredient sourcing trips",
                      "Traditional cooking equipment training",
                      "Seasonal harvest participation",
                      "Recipe documentation project",
                      "Final culinary showcase event"
                    ]}
                    featured={true}
                    audioPreview={true}
                  />

                  {/* Additional packages would be added here */}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-tulu-blue/5 rounded-2xl p-6 md:p-10 scroll-reveal">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-tulu-blue">Personalize Your Cultural Journey</h2>
            <p className="mb-6">
              Can't find the perfect fit? We specialize in creating fully customized cultural immersion programs tailored to your specific interests, timeframe, and learning objectives.
            </p>
            <Button className="bg-tulu-green hover:bg-tulu-blue transition-colors">
              Request Custom Package
            </Button>
          </div>

          <AudioGuideDemo />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
