
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BlogImageProps {
  imageUrl: string;
  title: string;
}

const BlogImage = ({ imageUrl, title }: BlogImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="rounded-2xl overflow-hidden mb-10 image-shine relative">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400">Loading image...</span>
        </div>
      )}
      <img 
        src={imageUrl}
        alt={title}
        className={cn(
          "w-full h-auto object-cover transition-opacity duration-500",
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
  );
};

export default BlogImage;
