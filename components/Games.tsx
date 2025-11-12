import { useState } from 'react';
import { ArrowLeft, Brain, Grid3x3, Search, Type } from 'lucide-react';
import { TriviaGame } from './games/TriviaGame';
import { MemoryGame } from './games/MemoryGame';
import { WordSearchGame } from './games/WordSearchGame';
import { WordleGame } from './games/WordleGame';

interface GamesProps {
  onBack: () => void;
}

type GameType = 'trivia' | 'memory' | 'wordsearch' | 'wordle' | null;

export function Games({ onBack }: GamesProps) {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  const games = [
    {
      id: 'trivia' as GameType,
      name: 'Christmas Trivia',
      icon: Brain,
      description: 'Test your Christmas knowledge',
      color: 'from-[#C8102E] to-[#A00D25]',
    },
    {
      id: 'memory' as GameType,
      name: 'Memory Match',
      icon: Grid3x3,
      description: 'Find matching pairs',
      color: 'from-[#0F5132] to-[#0A3D24]',
    },
    {
      id: 'wordsearch' as GameType,
      name: 'Word Search',
      icon: Search,
      description: 'Find hidden Christmas words',
      color: 'from-[#FFB81C] to-[#E09A00]',
    },
    {
      id: 'wordle' as GameType,
      name: 'Christmas Wordle',
      icon: Type,
      description: 'Guess the Christmas word',
      color: 'from-[#9333EA] to-[#7C3AED]',
    },
  ];

  if (selectedGame === 'trivia') {
    return <TriviaGame onBack={() => setSelectedGame(null)} />;
  }

  if (selectedGame === 'memory') {
    return <MemoryGame onBack={() => setSelectedGame(null)} />;
  }

  if (selectedGame === 'wordsearch') {
    return <WordSearchGame onBack={() => setSelectedGame(null)} />;
  }

  if (selectedGame === 'wordle') {
    return <WordleGame onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-8">🎮 Christmas Games</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className="group p-6 rounded-2xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 hover:border-white/20 transition-all"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2">{game.name}</h3>
                <p className="text-sm text-white/60">{game.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
