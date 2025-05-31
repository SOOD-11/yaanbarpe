
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ZoomIn, Download, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
    
    toast({
      title: isZoomed ? "Zoom reset" : "Image zoomed",
      description: isZoomed ? "Back to normal view" : "Click again to reset",
      duration: 1500,
    });
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
    
    toast({
      title: "Download started!",
      description: "Image is being downloaded",
      duration: 2000,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this image: ${title}`,
        url: imageUrl
      });
    } else {
      navigator.clipboard.writeText(imageUrl);
      toast({
        title: "Image URL copied!",
        description: "Share this beautiful image with others",
        duration: 2000,
      });
    }
  };

  return (
    <div 
      className="rounded-2xl overflow-hidden mb-10 relative group shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!imageLoaded && (
        <div className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-tulu-blue/30 border-t-tulu-blue rounded-full animate-spin mx-auto mb-4"></div>
            <span className="text-gray-500 font-medium">Loading beautiful image...</span>
          </div>
        </div>
      )}
      
      {/* Main image container */}
      <div className={cn(
        "overflow-hidden transition-all duration-500",
        imageLoaded ? "opacity-100" : "opacity-0"
      )}>
        <img 
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-auto object-cover transition-all duration-500 cursor-pointer",
            isZoomed ? "scale-110" : "scale-100",
            "hover:scale-105"
          )}
          onLoad={handleImageLoad}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80";
            handleImageLoad();
          }}
          onClick={toggleZoom}
        />
      </div>
      
      {/* Enhanced image caption */}
      <div className="bg-gradient-to-r from-tulu-blue to-tulu-green text-white py-4 px-6">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-white/80 mt-1">Click image to zoom • Hover for more options</p>
      </div>
      
      {/* Enhanced hover controls */}
      {imageLoaded && (
        <div className={cn(
          "absolute top-4 right-4 flex gap-2 transition-all duration-300",
          isHovering ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}>
          <button 
            className="bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 group"
            onClick={toggleZoom}
            title={isZoomed ? "Reset zoom" : "Zoom image"}
          >
            <ZoomIn className="h-5 w-5 text-tulu-blue group-hover:text-tulu-red transition-colors" />
          </button>
          <button 
            className="bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 group"
            onClick={handleDownload}
            title="Download image"
          >
            <Download className="h-5 w-5 text-tulu-blue group-hover:text-tulu-green transition-colors" />
          </button>
          <button 
            className="bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 group"
            onClick={handleShare}
            title="Share image"
          >
            <Share2 className="h-5 w-5 text-tulu-blue group-hover:text-tulu-gold transition-colors" />
          </button>
        </div>
      )}
      
      {/* Zoom indicator */}
      {isZoomed && (
        <div className="absolute bottom-20 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
          🔍 Zoomed • Click to reset
        </div>
      )}
    </div>
  );
};

export default BlogImage;
