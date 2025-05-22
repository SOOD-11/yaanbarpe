
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface AudioPlayerProps {
  progress: number;
  setProgress: (progress: number) => void;
  readTime: string;
  onToggleAudio: () => void;
  isPlaying: boolean;
}

const AudioPlayer = ({
  progress,
  setProgress,
  readTime,
  onToggleAudio,
  isPlaying
}: AudioPlayerProps) => {
  // Simulate audio progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying) {
      timer = setInterval(() => {
        // Calculate the new progress directly instead of using a function
        const newProgress = progress + 1;
        if (newProgress >= 100) {
          onToggleAudio();
          clearInterval(timer);
          setProgress(100);
        } else {
          setProgress(newProgress);
        }
      }, 300);
    }
    
    return () => clearInterval(timer);
  }, [isPlaying, setProgress, onToggleAudio, progress]);

  return (
    <div className="mb-8 p-4 bg-[#00555A]/5 rounded-lg border border-[#00555A]/20 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-[#00555A] hover:text-[#CC4E5C]"
          onClick={onToggleAudio}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </Button>
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-[#00555A] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">
          {`${Math.floor(progress / 100 * parseInt(readTime.split(" ")[0]))}:00`} / {`${readTime.split(" ")[0]}:00`}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
