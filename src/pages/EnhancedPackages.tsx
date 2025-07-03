import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

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
            <p className="text-muted-foreground text-lg mb-8">
              We're not launching trips just yet. Instead, we're designing the future of immersive Indian travel—from semi-immersive getaways to deeply cultural experiences.
              <br />
              Your insights will help us build India's most meaningful cultural platform.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-tulu-blue/5 p-8 rounded-xl border border-tulu-blue"
            >
              <h2 className="text-2xl font-bold mb-4 text-tulu-blue">
                🧭 Share What You Want to Experience
              </h2>
              <p className="text-muted-foreground text-base mb-6">
                What kind of stories, rituals, festivals, cuisines, or hidden gems do you wish to explore? Whether you’re a heritage lover, spiritual seeker, or curious traveler—your voice matters.
              </p>
              <a
                href="https://forms.gle/your-google-form-id" // Replace this with your actual form link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-tulu-red hover:bg-tulu-blue transition-colors text-white font-semibold text-lg px-6 py-3 rounded-md"
              >
                Share Your Expectations
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnhancedPackages;