import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

interface TriviaGameProps {
  onBack: () => void;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "What is the name of the Grinch's dog?",
    options: ["Max", "Buddy", "Rex", "Spot"],
    correct: 0,
  },
  {
    question: "In which country did the tradition of putting up a Christmas tree originate?",
    options: ["United States", "England", "Germany", "France"],
    correct: 2,
  },
  {
    question: "What are the two most popular names for Santa Claus?",
    options: ["Santa and Nicholas", "Kris Kringle and Saint Nick", "Father Christmas and Santa", "Saint Nicholas and Papa Noel"],
    correct: 1,
  },
  {
    question: "How many reindeer pull Santa's sleigh (including Rudolph)?",
    options: ["8", "9", "10", "12"],
    correct: 1,
  },
  {
    question: "What is Frosty the Snowman's nose made of?",
    options: ["A carrot", "A button", "Coal", "A stick"],
    correct: 1,
  },
  {
    question: "In the song '12 Days of Christmas', what gift is given on the 5th day?",
    options: ["Five gold rings", "Five golden eggs", "Five geese", "Five swans"],
    correct: 0,
  },
  {
    question: "What Christmas decoration was originally made from strands of silver?",
    options: ["Ornaments", "Tinsel", "Garland", "Lights"],
    correct: 1,
  },
  {
    question: "What is the best-selling Christmas song of all time?",
    options: ["Jingle Bells", "Silent Night", "White Christmas", "All I Want for Christmas"],
    correct: 2,
  },
  {
    question: "In Home Alone, where are the McCallisters going on vacation?",
    options: ["London", "Paris", "Rome", "Madrid"],
    correct: 1,
  },
  {
    question: "What do naughty children get in their stockings?",
    options: ["Nothing", "Coal", "Sticks", "Rocks"],
    correct: 1,
  },
];

export function TriviaGame({ onBack }: TriviaGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
  };

  if (gameOver) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </button>

          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-6">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '🎄' : '⛄'}
            </div>
            <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-4">Quiz Complete!</h2>
            <div className="text-5xl mb-4">{score}/{questions.length}</div>
            <p className="text-xl mb-8">
              {percentage >= 80
                ? "Amazing! You're a Christmas expert! 🌟"
                : percentage >= 60
                ? "Great job! You know your Christmas facts! 🎄"
                : "Good try! Learn more about Christmas! ⛄"}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={restart}
                className="px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-[#A00D25] transition-all"
              >
                Play Again
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl bg-white/8 hover:bg-white/12 border border-white/12 transition-all"
              >
                Back to Games
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </button>

        <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-4">🎄 Christmas Trivia</h2>

        {/* Progress */}
        <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm">Score: {score}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#C8102E] to-[#FFB81C] h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-8">
          <h3 className="text-xl sm:text-2xl mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isCorrect = index === question.correct;
              const isSelected = index === selectedAnswer;
              
              let bgClass = 'bg-white/8 hover:bg-white/12 border-white/12';
              
              if (showResult) {
                if (isCorrect) {
                  bgClass = 'bg-[#0F5132]/30 border-[#0F5132]';
                } else if (isSelected) {
                  bgClass = 'bg-[#C8102E]/30 border-[#C8102E]';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${bgClass}`}
                >
                  <span>{option}</span>
                  {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
