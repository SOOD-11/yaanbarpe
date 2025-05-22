
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ZoomIn, Download } from 'lucide-react';

interface BlogImageProps {
  imageUrl: string;
  title: string;
}

const BlogImage = ({ imageUrl, title }: BlogImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const toggleZoom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '-')}.jpg`;
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
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400">Loading image...</span>
        </div>
      )}
      
      {/* Main image */}
      <div className="overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-auto object-cover transition-all duration-700",
            isZoomed ? "scale-125" : isHovering ? "scale-110" : "scale-100",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={(e) => {
            // Fallback image if the main one fails
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80";
            handleImageLoad();
          }}
        />
      </div>
      
      {/* Image caption */}
      <div className="bg-[#00555A]/80 text-white text-sm py-2 px-4 absolute bottom-0 left-0 right-0 transform transition-transform duration-300">
        {title}
      </div>
      
      {/* Hover controls */}
      {imageLoaded && (
        <div className={cn(
          "absolute top-4 right-4 flex gap-2 transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}>
          <button 
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
            onClick={toggleZoom}
            title={isZoomed ? "Reset zoom" : "Zoom image"}
          >
            <ZoomIn className="h-5 w-5 text-[#00555A]" />
          </button>
          <button 
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
            onClick={handleDownload}
            title="Download image"
          >
            <Download className="h-5 w-5 text-[#00555A]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogImage;
