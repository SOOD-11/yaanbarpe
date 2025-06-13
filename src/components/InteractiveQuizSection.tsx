
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Trophy, Star, Zap, CheckCircle, XCircle, RefreshCw, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const quizQuestions = [
  {
    id: 1,
    question: "Which traditional art form combines dance, music, and storytelling in Tulu culture?",
    options: ["Bharatanatyam", "Yakshagana", "Kathakali", "Odissi"],
    correct: 1,
    explanation: "Yakshagana is a traditional theatre form that uniquely combines dance, music, dialogue, costume, and stage techniques, originating from coastal Karnataka.",
    difficulty: "Easy",
    category: "Cultural Arts"
  },
  {
    id: 2,
    question: "What is the famous temple in Udupi dedicated to?",
    options: ["Lord Shiva", "Lord Vishnu", "Lord Krishna", "Goddess Durga"],
    correct: 2,
    explanation: "The famous Sri Krishna Matha in Udupi is dedicated to Lord Krishna and is one of the most important pilgrimage sites in South India.",
    difficulty: "Medium",
    category: "Spirituality"
  },
  {
    id: 3,
    question: "Which traditional Tulu dish is a thin, delicate crepe made from rice batter?",
    options: ["Dosa", "Neer Dosa", "Uttapam", "Idli"],
    correct: 1,
    explanation: "Neer Dosa, literally meaning 'water dosa', is a paper-thin, delicate rice crepe that's a specialty of Tulu Nadu cuisine.",
    difficulty: "Easy",
    category: "Cuisine"
  },
  {
    id: 4,
    question: "What geological feature makes St. Mary's Islands unique?",
    options: ["Coral reefs", "Hexagonal basalt rock formations", "Salt deposits", "Limestone caves"],
    correct: 1,
    explanation: "St. Mary's Islands are famous for their unique hexagonal basalt rock formations, created by volcanic activity millions of years ago.",
    difficulty: "Hard",
    category: "Geography"
  },
  {
    id: 5,
    question: "Which festival involves traditional buffalo racing in coastal Karnataka?",
    options: ["Diwali", "Kambala", "Holi", "Onam"],
    correct: 1,
    explanation: "Kambala is a traditional buffalo racing festival that takes place in the coastal districts of Karnataka, deeply rooted in local agricultural traditions.",
    difficulty: "Medium",
    category: "Festivals"
  }
];

const InteractiveQuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleNext();
    }
  }, [timeLeft, isTimerActive]);

  const startQuiz = () => {
    setIsTimerActive(true);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (selectedAnswer === currentQ.correct) {
      setScore(score + 1);
    }

    setShowResult(true);
    setIsTimerActive(false);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
        setIsTimerActive(true);
      } else {
        setQuizCompleted(true);
        setIsTimerActive(false);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setTimeLeft(30);
    setIsTimerActive(false);
  };

  const shareScore = () => {
    const scorePercentage = Math.round((score / quizQuestions.length) * 100);
    const text = `I scored ${score}/${quizQuestions.length} (${scorePercentage}%) on the Tulu Culture Quiz! 🎉 Test your knowledge too!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Tulu Culture Quiz Results',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Score copied!",
        description: "Share your results with friends",
        duration: 2000,
      });
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return "🎉 Perfect! You're a Tulu culture expert!";
    if (percentage >= 80) return "🌟 Excellent! You know your Tulu culture well!";
    if (percentage >= 60) return "👍 Good job! You have solid cultural knowledge!";
    if (percentage >= 40) return "📚 Not bad! Keep exploring to learn more!";
    return "🚀 Great start! There's so much more to discover!";
  };

  if (!isTimerActive && currentQuestion === 0 && !quizCompleted) {
    return (
      <section className="py-20 bg-gradient-to-br from-tulu-blue/5 to-tulu-teal/5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-tulu-gold to-tulu-red text-white px-6 py-2">
              <Brain className="w-4 h-4 mr-2" />
              Cultural Knowledge Quiz
            </Badge>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-tulu-blue to-tulu-teal bg-clip-text text-transparent">
                Test Your
              </span>{' '}
              <span className="text-tulu-red">Cultural IQ</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8">
              Challenge yourself with 5 questions about Tulu culture, traditions, and heritage. Each question has 30 seconds!
            </p>

            <Card className="p-8 bg-gradient-to-br from-white to-tulu-sand/10 border-2 border-tulu-gold/20">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-tulu-blue">5</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-tulu-green">30s</div>
                    <div className="text-sm text-muted-foreground">Per Question</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-tulu-red">4</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-tulu-gold">100</div>
                    <div className="text-sm text-muted-foreground">Points Max</div>
                  </div>
                </div>

                <Button 
                  size="lg"
                  onClick={startQuiz}
                  className="bg-gradient-to-r from-tulu-blue to-tulu-teal hover:from-tulu-teal hover:to-tulu-green text-white px-12 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <Zap className="w-5 h-5 mr-2 animate-pulse" />
                  Start Quiz Challenge
                  <Trophy className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (quizCompleted) {
    return (
      <section className="py-20 bg-gradient-to-br from-tulu-blue/5 to-tulu-teal/5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8 bg-gradient-to-br from-white to-tulu-sand/10 border-2 border-tulu-gold/20">
              <CardContent className="p-0">
                <Trophy className="w-20 h-20 text-tulu-gold mx-auto mb-6 animate-bounce" />
                
                <h3 className="font-display text-3xl font-bold mb-4">
                  Quiz Complete! 🎉
                </h3>
                
                <div className="text-6xl font-bold bg-gradient-to-r from-tulu-blue to-tulu-teal bg-clip-text text-transparent mb-4">
                  {score}/{quizQuestions.length}
                </div>
                
                <p className="text-xl mb-6 text-tulu-green font-medium">
                  {getScoreMessage()}
                </p>

                {/* Score Breakdown */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                  <div className="bg-green-50 rounded-lg p-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <div className="font-bold text-green-700">{score} Correct</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                    <div className="font-bold text-red-700">{quizQuestions.length - score} Incorrect</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={resetQuiz}
                    variant="outline"
                    className="border-tulu-blue text-tulu-blue hover:bg-tulu-blue hover:text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  
                  <Button 
                    onClick={shareScore}
                    className="bg-gradient-to-r from-tulu-green to-tulu-teal text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Score
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-tulu-blue/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Want to learn more about Tulu culture? Explore our experiences and blog posts!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-tulu-blue/5 to-tulu-teal/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-tulu-gold to-tulu-red text-white px-6 py-2">
              <Brain className="w-4 h-4 mr-2" />
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            
            <Progress value={progress} className="mb-4" />
          </div>

          <Card className="p-8 bg-gradient-to-br from-white to-tulu-sand/10 border-2 border-tulu-gold/20">
            <CardContent className="p-0">
              {/* Timer */}
              <div className="flex justify-between items-center mb-6">
                <Badge variant="secondary">{currentQ.category}</Badge>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  timeLeft <= 10 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-blue-100 text-blue-700'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span className="font-mono font-bold">{timeLeft}s</span>
                </div>
              </div>

              {/* Question */}
              <h3 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                      showResult
                        ? index === currentQ.correct
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : index === selectedAnswer && selectedAnswer !== currentQ.correct
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 bg-gray-50'
                        : selectedAnswer === index
                        ? 'border-tulu-blue bg-tulu-blue/10 text-tulu-blue'
                        : 'border-gray-200 hover:border-tulu-sand hover:bg-tulu-sand/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        showResult
                          ? index === currentQ.correct
                            ? 'border-green-500 bg-green-500 text-white'
                            : index === selectedAnswer && selectedAnswer !== currentQ.correct
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-300'
                          : selectedAnswer === index
                          ? 'border-tulu-blue bg-tulu-blue text-white'
                          : 'border-gray-300'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showResult && index === currentQ.correct && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {showResult && index === selectedAnswer && selectedAnswer !== currentQ.correct && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation (shown after answer) */}
              {showResult && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                  <p className="text-blue-800">{currentQ.explanation}</p>
                </div>
              )}

              {/* Action Button */}
              {!showResult && (
                <Button 
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="w-full bg-gradient-to-r from-tulu-blue to-tulu-teal hover:from-tulu-teal hover:to-tulu-green text-white py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveQuizSection;
