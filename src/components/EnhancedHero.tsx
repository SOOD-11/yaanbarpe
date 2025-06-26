import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, VolumeX, Volume2, Sparkles } from 'lucide-react';

const driveVideo = "https://res.cloudinary.com/dxjszh5rz/video/upload/v1749888061/user_images/jerehlxflhj3cofrswfo.mp4";

const heroSlides = [
  {
    title: "Discover the Soul of Tulu Nadu",
    subtitle: "with Yaanbarpe",
    description: "where every athiti finds a home, and  every journey calls you back",
    video: driveVideo,
    image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video or fallback image */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            ref={videoRef}
            src={currentHero.video}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
          />
        ) : (
          <img
            src={currentHero.image}
            alt="fallback cultural"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/30  z-10" />
      </div>

      {/* Mute toggle */}
      <div
        className="absolute bottom-6 left-6 z-30 bg-black/60 text-white px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer hover:bg-black/80 transition"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        <span className="text-xs">{isMuted ? 'Muted' : 'Unmuted'}</span>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto animate-fade-in-up">
        <div className="mb-6">
          <span className="bg-white/20 text-sm uppercase px-4 py-1 rounded-full inline-flex items-center gap-2 shadow-md tracking-wider">
            <Sparkles className="w-4 h-4" />
            Cultural Showcase
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-tight tracking-tight mb-6 drop-shadow-xl">
          <span className="text-tulu-red drop-shadow-sm">
            {currentHero.title.split(' ').slice(0, -2).join(' ')}
          </span>{' '}
          <span className="text-tulu-blue">{currentHero.title.split(' ').slice(-2).join(' ')}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium mb-4 tracking-wide">
          <span className="inline-block border-l-4 border-[#00555A] pl-4">
            {currentHero.subtitle}
          </span>
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-white font-bold italic max-w-2xl mx-auto leading-relaxed tracking-wide">
          <span className="text-[#00555A] font-semibold">YaanBarpe:</span> {currentHero.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button
            asChild
            className="bg-[#B31312] text-white hover:bg-[#B31312]/90 text-base px-10 py-4 rounded-full font-semibold shadow-lg transition-transform hover:scale-105"
          >
            <Link to="/packages">
              Explore Experiences <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-2 border-[#00555A] text-[#00555A] hover:bg-[#00555A] hover:text-white text-base px-10 py-4 rounded-full font-semibold transition-transform hover:scale-105"
          >
            <Link to="/blog">
              Learn More About Tulunadu
            </Link>
          </Button>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-30">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentSlide ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedHero;