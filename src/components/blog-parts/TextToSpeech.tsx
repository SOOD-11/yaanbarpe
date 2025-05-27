
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TextToSpeechProps {
  text: string;
  title: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean text by removing HTML tags
  const cleanText = (htmlText: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const startReading = () => {
    if ('speechSynthesis' in window) {
      const cleanedText = cleanText(text);
      
      // Cancel any existing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Set a pleasant voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('English') || 
        voice.lang.startsWith('en-')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        const words = cleanedText.split(' ');
        setDuration(words.length);
        
        // Update progress
        intervalRef.current = setInterval(() => {
          setCurrentPosition(prev => {
            if (prev >= words.length - 1) {
              clearInterval(intervalRef.current!);
              return words.length;
            }
            return prev + 1;
          });
        }, 200);

        toast({
          title: "🎧 Audio Started",
          description: "Now reading: " + title,
          duration: 3000,
        });
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentPosition(0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        toast({
          title: "✅ Reading Complete",
          description: "Finished reading the article",
          duration: 2000,
        });
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        toast({
          title: "❌ Audio Error",
          description: "Unable to read the article. Please try again.",
          duration: 3000,
        });
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in your browser.",
        duration: 3000,
      });
    }
  };

  const pauseReading = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resumeReading = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      
      // Resume progress tracking
      intervalRef.current = setInterval(() => {
        setCurrentPosition(prev => {
          if (prev >= duration - 1) {
            clearInterval(intervalRef.current!);
            return duration;
          }
          return prev + 1;
        });
      }, 200);
    }
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentPosition(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const restartReading = () => {
    stopReading();
    setTimeout(() => startReading(), 100);
  };

  const progress = duration > 0 ? (currentPosition / duration) * 100 : 0;

  return (
    <div className="bg-[#00555A]/10 rounded-lg p-4 mb-8 border border-[#00555A]/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Volume2 className="h-5 w-5 text-[#00555A]" />
          <div>
            <h3 className="font-medium text-[#00555A]">Listen to this article</h3>
            <p className="text-sm text-muted-foreground">AI-powered text-to-speech narration</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <Button
              onClick={startReading}
              className="bg-[#00555A] hover:bg-[#CC4E5C] text-white"
              size="sm"
            >
              <Play className="h-4 w-4 mr-1" />
              Play
            </Button>
          ) : (
            <>
              {!isPaused ? (
                <Button
                  onClick={pauseReading}
                  variant="outline"
                  size="sm"
                  className="border-[#00555A] text-[#00555A] hover:bg-[#00555A] hover:text-white"
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
              ) : (
                <Button
                  onClick={resumeReading}
                  className="bg-[#00555A] hover:bg-[#CC4E5C] text-white"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Resume
                </Button>
              )}
              
              <Button
                onClick={restartReading}
                variant="outline"
                size="sm"
                className="border-[#00555A] text-[#00555A] hover:bg-[#00555A] hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={stopReading}
                variant="destructive"
                size="sm"
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      {isPlaying && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#00555A] to-[#CC4E5C] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{Math.round(progress)}% complete</span>
            <span>{isPaused ? 'Paused' : 'Playing'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
