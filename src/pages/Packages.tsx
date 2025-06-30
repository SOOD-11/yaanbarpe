import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import TuluExperiencePyramid from './TulunaduExperiencePyramid';
import PyramidLayout from './TulunaduExperiencePyramid';

const EnhancedPackages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="bg-gradient-to-b from-tulu-sand/20 to-background flex-1 pt-20">
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-tulu-sand text-black mb-4">Beta Mode · Ideation Stage</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-tulu-green">YaanBarpe</span>: Shaping a New Cultural Travel Movement
            </h1>
            <p className="text-muted-foreground text-lg mb-10">
              We're not launching trips just yet. Instead, we're designing the future of immersive Indian travel—from semi-emulsive getaways to deeply cultural experiences.
              <br />
              Your insights will help us build India's most meaningful cultural platform.
            </p>

            {/* Immersion Tier Showcase */}
         <PyramidLayout></PyramidLayout>

            {/* Feedback CTA */}
       
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnhancedPackages;