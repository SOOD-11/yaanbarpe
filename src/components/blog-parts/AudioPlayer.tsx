
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';

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
  const [volume, setVolume] = useState(80);
  const [isHovering, setIsHovering] = useState(false);
  
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

  // Format time from minutes to MM:SS
  const formatTime = (minutes: number) => {
    const totalSeconds = Math.floor(minutes * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate current and total time
  const totalMinutes = parseInt(readTime.split(" ")[0]);
  const currentMinutes = (progress / 100) * totalMinutes;
  
  const currentTime = formatTime(currentMinutes);
  const totalTime = formatTime(totalMinutes);

  return (
    <div 
      className="mb-8 p-4 bg-[#00555A]/5 rounded-lg border border-[#00555A]/20 animate-fade-in shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`text-[#00555A] hover:text-[#CC4E5C] transition-transform duration-300 ${isHovering ? 'scale-110' : ''}`}
          onClick={onToggleAudio}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00555A] to-[#00555A]/70 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Hovering shows timestamps */}
          <div className={`flex justify-between text-xs text-muted-foreground mt-1 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <span>{currentTime}</span>
            <span>{totalTime}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <div className="w-16 h-1.5 bg-gray-200 rounded-full hidden md:block">
            <div 
              className="h-full bg-[#00555A] rounded-full"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
        
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {currentTime} / {totalTime}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
