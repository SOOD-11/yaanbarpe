
interface ReadingProgressProps {
  progress: number;
}

const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-[#00555A] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
