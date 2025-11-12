import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface PersonalityQuizProps {
  onBack: () => void;
}

interface Question {
  question: string;
  options: Array<{ text: string; character: string }>;
}

const questions: Question[] = [
  {
    question: "What's your favorite Christmas activity?",
    options: [
      { text: "Decorating the tree", character: "santa" },
      { text: "Baking cookies", character: "elf" },
      { text: "Building snowmen", character: "snowman" },
      { text: "Singing carols", character: "angel" },
    ],
  },
  {
    question: "What's your ideal Christmas Eve?",
    options: [
      { text: "Cozy by the fireplace", character: "santa" },
      { text: "Wrapping presents", character: "elf" },
      { text: "Playing in the snow", character: "snowman" },
      { text: "Attending a concert", character: "angel" },
    ],
  },
  {
    question: "What's your favorite Christmas treat?",
    options: [
      { text: "Milk and cookies", character: "santa" },
      { text: "Gingerbread", character: "elf" },
      { text: "Hot cocoa", character: "snowman" },
      { text: "Candy canes", character: "angel" },
    ],
  },
  {
    question: "How do you spread Christmas cheer?",
    options: [
      { text: "Giving generous gifts", character: "santa" },
      { text: "Helping others", character: "elf" },
      { text: "Making people laugh", character: "snowman" },
      { text: "Sharing kind words", character: "angel" },
    ],
  },
  {
    question: "What's your Christmas wish?",
    options: [
      { text: "Peace on Earth", character: "santa" },
      { text: "Happiness for all", character: "elf" },
      { text: "Fun and laughter", character: "snowman" },
      { text: "Love and harmony", character: "angel" },
    ],
  },
];

const characters = {
  santa: {
    name: "Santa Claus",
    emoji: "🎅",
    description: "You're generous, jolly, and love bringing joy to others! You have a big heart and enjoy the magic of giving.",
  },
  elf: {
    name: "Christmas Elf",
    emoji: "🧝",
    description: "You're helpful, creative, and love working behind the scenes! You find joy in making things perfect for everyone.",
  },
  snowman: {
    name: "Frosty the Snowman",
    emoji: "⛄",
    description: "You're playful, fun-loving, and bring smiles wherever you go! You know how to make the most of every moment.",
  },
  angel: {
    name: "Christmas Angel",
    emoji: "👼",
    description: "You're kind, peaceful, and radiate positive energy! You spread love and light to everyone around you.",
  },
};

export function PersonalityQuiz({ onBack }: PersonalityQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (character: string) => {
    const newAnswers = [...answers, character];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const counts: Record<string, number> = {};
      newAnswers.forEach((ans) => {
        counts[ans] = (counts[ans] || 0) + 1;
      });
      
      const winner = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
      setResult(winner);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = ((currentQuestion + (result ? 1 : 0)) / questions.length) * 100;

  if (result) {
    const character = characters[result as keyof typeof characters];
    
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#FFB81C]" />
            <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-4">Your Christmas Character</h2>
            
            <div className="text-8xl mb-6">{character.emoji}</div>
            <h3 className="text-2xl sm:text-3xl mb-4">{character.name}</h3>
            <p className="text-lg text-white/80 mb-8">{character.description}</p>

            <button
              onClick={restart}
              className="px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-[#A00D25] transition-all"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-4">🎭 Christmas Personality Quiz</h2>

        <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#C8102E] to-[#FFB81C] h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-8">
          <h3 className="text-xl sm:text-2xl mb-6 text-center">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.character)}
                className="w-full p-4 rounded-xl bg-white/8 hover:bg-white/12 border border-white/12 hover:border-white/20 transition-all text-left"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
