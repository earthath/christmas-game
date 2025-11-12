import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface MemoryGameProps {
  onBack: () => void;
}

interface Card {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ['🎄', '🎅', '⛄', '🎁', '❄️', '🔔', '⭐', '🦌'];

export function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matches === emojis.length && matches > 0) {
      setGameWon(true);
    }
  }, [matches]);

  const initializeGame = () => {
    const pairs = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: `card-${index}`,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(pairs);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  const handleCardClick = (id: string) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(id)) return;
    
    const card = cards.find((c) => c.id === id);
    if (card?.isMatched) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === id ? { ...c, isFlipped: true } : c
      )
    );

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      
      const [first, second] = newFlipped;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setMatches(matches + 1);
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          )
        );
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === first || c.id === second ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </button>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl text-[#FFB81C]">🎮 Memory Match</h2>
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 hover:bg-white/12 border border-white/12 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-xl p-4 text-center">
            <div className="text-3xl text-[#FFB81C]">{moves}</div>
            <div className="text-sm text-white/70">Moves</div>
          </div>
          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-xl p-4 text-center">
            <div className="text-3xl text-[#FFB81C]">{matches}/{emojis.length}</div>
            <div className="text-sm text-white/70">Matches</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched}
              className={`aspect-square rounded-2xl backdrop-blur-xl border-2 text-4xl sm:text-5xl transition-all transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-white/12 border-white/20 rotate-0'
                  : 'bg-white/8 border-white/12 hover:bg-white/12 hover:scale-105'
              } ${card.isMatched ? 'opacity-60' : ''}`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '❓'}
            </button>
          ))}
        </div>

        {/* Win Modal */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl text-[#FFB81C] mb-4">You Won!</h3>
              <p className="text-xl mb-2">Completed in {moves} moves</p>
              <p className="text-white/60 mb-6">Great memory!</p>
              <div className="flex gap-4">
                <button
                  onClick={initializeGame}
                  className="flex-1 px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-[#A00D25] transition-all"
                >
                  Play Again
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/12 border border-white/12 transition-all"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
