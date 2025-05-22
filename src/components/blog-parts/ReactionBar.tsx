
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ReactionBarProps {
  onInteraction: (points: number, message: string) => void;
}

const ReactionBar = ({ onInteraction }: ReactionBarProps) => {
  const [hasReaction, setHasReaction] = useState(false);
  const [reactionCount, setReactionCount] = useState(42);
  const [isSaved, setIsSaved] = useState(false);
  
  const toggleReaction = () => {
    if (hasReaction) {
      setReactionCount(prev => prev - 1);
    } else {
      setReactionCount(prev => prev + 1);
      onInteraction(2, "Liked article");
    }
    setHasReaction(!hasReaction);
  };
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      onInteraction(3, "Saved article");
      
      toast({
        title: "Article Saved!",
        description: "You can access this article in your reading list",
        duration: 3000,
      });
    }
  };

  return (
    <div className="mt-8 p-4 bg-[#EDE8D0]/20 rounded-lg border border-[#EDE8D0] flex items-center justify-between">
      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex gap-2 items-center transition-all",
            hasReaction ? "text-[#CC4E5C] bg-[#CC4E5C]/10" : ""
          )}
          onClick={toggleReaction}
        >
          {hasReaction ? "❤️" : "🤍"} {reactionCount}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-2 items-center"
          onClick={() => onInteraction(1, "Shared article")}
        >
          📤 Share
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex gap-2 items-center transition-all",
          isSaved ? "text-[#00555A] bg-[#00555A]/10" : ""
        )}
        onClick={toggleSave}
      >
        {isSaved ? "📑" : "🔖"} {isSaved ? "Saved" : "Save"}
      </Button>
    </div>
  );
};

export default ReactionBar;
