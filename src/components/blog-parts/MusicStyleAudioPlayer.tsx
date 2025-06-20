
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface MusicStyleAudioPlayerProps {
  text: string;
  title: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const MusicStyleAudioPlayer = ({
  text,
  title,
  isPlaying,
  onTogglePlay
}: MusicStyleAudioPlayerProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate estimated reading time in seconds
  const wordsPerMinute = 150;
  const wordCount = text.split(' ').length;
  const estimatedDurationSeconds = Math.max((wordCount / wordsPerMinute) * 60, 30);

  useEffect(() => {
    setTotalTime(estimatedDurationSeconds);
  }, [estimatedDurationSeconds]);

  useEffect(() => {
    if (isPlaying) {
      // Start progress tracking
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          setProgress((newTime / totalTime) * 100);
          
          if (newTime >= totalTime) {
            onTogglePlay();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, totalTime, onTogglePlay]);

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * totalTime;
    
    setProgress(newProgress);
    setCurrentTime(newTime);
    
    // If playing, restart from new position
    if (isPlaying) {
      window.speechSynthesis.cancel();
      onTogglePlay();
      setTimeout(() => onTogglePlay(), 100);
    }
  };

  const handleSkipBack = () => {
    const newTime = Math.max(currentTime - 10, 0);
    setCurrentTime(newTime);
    setProgress((newTime / totalTime) * 100);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 10, totalTime);
    setCurrentTime(newTime);
    setProgress((newTime / totalTime) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-[#00555A]/5 to-[#CC4E5C]/5 rounded-xl border border-[#00555A]/10 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-[#00555A] rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-[#00555A]">Audio Article</span>
      </div>
      
      <h4 className="font-semibold text-lg text-[#00555A] mb-4 line-clamp-1">{title}</h4>
      
      {/* Progress Bar */}
      <div 
        className="h-3 bg-gray-200 rounded-full mb-4 cursor-pointer overflow-hidden"
        onClick={handleSeek}
      >
        <div 
          className="h-full bg-gradient-to-r from-[#00555A] to-[#CC4E5C] rounded-full transition-all duration-300 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
        </div>
      </div>
      
      {/* Time Display */}
      <div className="flex justify-between text-xs text-muted-foreground mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(totalTime)}</span>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-[#00555A] hover:text-[#CC4E5C] hover:bg-[#00555A]/10"
            onClick={handleSkipBack}
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="default" 
            size="icon" 
            className="bg-[#00555A] hover:bg-[#CC4E5C] text-white w-12 h-12 rounded-full shadow-lg"
            onClick={onTogglePlay}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-[#00555A] hover:text-[#CC4E5C] hover:bg-[#00555A]/10"
            onClick={handleSkipForward}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <div className="w-20 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-[#00555A] rounded-full"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {isPlaying && (
        <div className="mt-3 text-center">
          <span className="text-sm text-[#00555A] animate-pulse">♪ Now Playing ♪</span>
        </div>
      )}
    </div>
  );
};

export default MusicStyleAudioPlayer;
