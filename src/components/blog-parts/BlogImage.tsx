
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, Download } from 'lucide-react';

interface BlogImageProps {
  imageUrl: string;
  title: string;
}

const BlogImage = ({ imageUrl, title }: BlogImageProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Sample video URLs for demonstration
  const videoUrls = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  ];
  
  // Select a random video
  const randomVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];
  
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    console.log('Blog video loaded successfully');
  };
  
  const togglePlay = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
    if (video) {
      try {
        if (isPlaying) {
          video.pause();
        } else {
          await video.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.log('Video play failed:', error);
      }
    }
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const link = document.createElement('a');
    link.href = randomVideo;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '-')}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="rounded-2xl overflow-hidden mb-10 relative group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!videoLoaded && (
        <div className="w-full h-96 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400">Loading video...</span>
        </div>
      )}
      
      {/* Main video */}
      <div className="overflow-hidden">
        <video 
          className="w-full h-auto object-cover transition-transform duration-300 opacity-100"
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onCanPlay={() => console.log('Blog image video ready')}
          style={{ display: videoLoaded ? 'block' : 'none' }}
        >
          <source src={randomVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Video caption */}
      <div className="bg-[#00555A]/90 text-white text-sm py-3 px-4">
        <p className="font-medium">{title}</p>
      </div>
      
      {/* Hover controls */}
      {videoLoaded && (
        <div className={cn(
          "absolute top-4 right-4 flex gap-2 transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}>
          <button 
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
            onClick={togglePlay}
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-[#00555A]" />
            ) : (
              <Play className="h-5 w-5 text-[#00555A]" />
            )}
          </button>
          <button 
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
            onClick={handleDownload}
            title="Download video"
          >
            <Download className="h-5 w-5 text-[#00555A]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogImage;
