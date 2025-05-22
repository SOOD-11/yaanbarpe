
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface KnowledgeQuizProps {
  onQuizComplete: (score: number) => void;
}

const KnowledgeQuiz = ({ onQuizComplete }: KnowledgeQuizProps) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [knowledgeScore, setKnowledgeScore] = useState(0);
  
  const takeKnowledgeQuiz = () => {
    setQuizCompleted(true);
    const quizScore = Math.floor(Math.random() * 3) + 3; // Random score between 3-5
    setKnowledgeScore(quizScore);
    onQuizComplete(quizScore);
    
    toast({
      title: "Knowledge Check Complete!",
      description: `You scored ${quizScore}/5 in the quiz`,
      duration: 5000,
    });
  };

  return (
    <>
      {!quizCompleted ? (
        <div className="my-10 p-6 bg-[#00555A]/10 rounded-xl border border-[#00555A]/20">
          <h3 className="text-xl font-bold text-[#00555A] mb-3">Test Your Knowledge</h3>
          <p className="mb-4">Complete a short quiz to reinforce what you learned and earn extra points!</p>
          <Button 
            className="bg-[#00555A] hover:bg-[#CC4E5C] transition-colors"
            onClick={takeKnowledgeQuiz}
          >
            Take Quiz
          </Button>
        </div>
      ) : (
        <div className="my-10 p-6 bg-[#00555A]/10 rounded-xl border border-[#00555A]/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#00555A] mb-1">Quiz Completed!</h3>
              <p className="mb-2">You scored {knowledgeScore}/5 on the knowledge check</p>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-5 h-5 rounded-full mr-1 ${i < knowledgeScore ? 'bg-[#00555A]' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-4xl">🧠</div>
          </div>
        </div>
      )}
    </>
  );
};

export default KnowledgeQuiz;
