
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, Download } from 'lucide-react';

interface BlogImageProps {
  imageUrl: string;
  title: string;
}

const BlogImage = ({ imageUrl, title }: BlogImageProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Using a reliable video source
  const videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  const togglePlay = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
    if (video) {
      try {
        if (isPlaying) {
          video.pause();
        } else {
          video.currentTime = 0;
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
    link.href = videoSrc;
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
      <div className="overflow-hidden bg-gray-900 min-h-96">
        <video 
          className="w-full h-auto object-cover transition-transform duration-300"
          muted
          loop
          playsInline
          controls={false}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EVideo Loading...%3C/text%3E%3C/svg%3E"
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => console.log('Blog image video ready')}
          onError={(e) => console.log('Blog image video error:', e)}
          style={{ minHeight: '384px' }}
        >
          <source src={videoSrc} type="video/mp4" />
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white">
            Your browser does not support the video tag.
          </div>
        </video>
      </div>
      
      {/* Video caption */}
      <div className="bg-[#00555A]/90 text-white text-sm py-3 px-4">
        <p className="font-medium">{title}</p>
      </div>
      
      {/* Hover controls */}
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
    </div>
  );
};

export default BlogImage;
