
interface BlogStatsProps {
  readingPoints: number;
  streakDays: number;
}

const BlogStats = ({ readingPoints, streakDays }: BlogStatsProps) => {
  return (
    <>
      {/* Points display */}
      <div className="fixed top-4 right-4 bg-[#00555A] text-white px-4 py-2 rounded-full z-50 flex items-center gap-2 shadow-lg">
        <span className="text-[#EDE8D0] font-bold">{readingPoints}</span>
        <span>Points</span>
      </div>
      
      {/* Reading streak */}
      <div className="fixed top-4 left-4 bg-[#CC4E5C] text-white px-4 py-2 rounded-full z-50 flex items-center gap-2 shadow-lg">
        <span className="text-white font-bold">{streakDays}</span>
        <span>Day Streak 🔥</span>
      </div>
    </>
  );
};

export default BlogStats;
