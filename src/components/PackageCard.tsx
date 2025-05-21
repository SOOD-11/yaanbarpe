
import { Button } from '@/components/ui/button';
import { Headphones, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
  featured?: boolean;
  audioPreview?: boolean;
}

const PackageCard = ({
  title,
  description,
  price,
  duration,
  image,
  features,
  featured = false,
  audioPreview = false
}: PackageCardProps) => {
  return (
    <div className={cn(
      "overflow-hidden rounded-xl shadow-lg border transition-all hover:-translate-y-1 hover:shadow-xl scroll-reveal",
      featured ? "border-tulu-blue/30 relative" : "border-border/30"
    )}>
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-tulu-blue text-white text-xs font-medium px-3 py-1 rounded-full">
          Popular Choice
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden image-shine">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-3">
          <span className="text-tulu-green font-semibold text-xl">{price}</span>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        
        <h3 className="font-display text-xl font-bold mb-3 text-tulu-blue">{title}</h3>
        <p className="text-muted-foreground text-sm mb-5">{description}</p>
        
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-sm">Package Includes:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-tulu-green mr-2 font-bold">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex gap-3">
          <Button 
            className={cn(
              "flex-1",
              featured ? "bg-tulu-blue hover:bg-tulu-green" : "bg-tulu-green hover:bg-tulu-blue" 
            )}
          >
            Enquire Now
          </Button>
          
          {audioPreview && (
            <Button 
              variant="outline" 
              size="icon"
              className="text-tulu-gold border-tulu-gold hover:bg-tulu-gold/10"
              title="Listen to audio preview"
            >
              <Headphones className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
