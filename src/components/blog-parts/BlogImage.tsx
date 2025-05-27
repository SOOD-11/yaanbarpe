
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
        <div className="w-full h-96 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400">Loading image...</span>
        </div>
      )}
      
      {/* Main image - FIXED: Always visible, no opacity changes */}
      <div className="overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-auto object-cover transition-transform duration-300",
            isZoomed ? "scale-105" : "scale-100",
            "opacity-100" // Always visible
          )}
          onLoad={handleImageLoad}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80";
            handleImageLoad();
          }}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>
      
      {/* Image caption - always visible */}
      <div className="bg-[#00555A]/90 text-white text-sm py-3 px-4">
        <p className="font-medium">{title}</p>
      </div>
      
      {/* Hover controls - only show overlay, not hide image */}
      {imageLoaded && (
        <div className={cn(
          "absolute top-4 right-4 flex gap-2 transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}>
          <button 
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
            onClick={toggleZoom}
            title={isZoomed ? "Reset zoom" : "Zoom image"}
          >
            <ZoomIn className="h-5 w-5 text-[#00555A]" />
          </button>
          <button 
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
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
