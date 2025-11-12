import { useState, useEffect } from 'react';
import { ArrowLeft, Delete, RotateCcw } from 'lucide-react';

interface WordleGameProps {
  onBack: () => void;
}

const christmasWords = [
  'SANTA', 'GIFTS', 'SNOWY', 'BELLS', 'CANDY', 'MERRY', 'CAROL', 'NORTH',
  'JOLLY', 'SLEIGH', 'HOLLY', 'FROST', 'ANGEL', 'PEACE', 'CHEER',
];

const maxGuesses = 6;

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export function WordleGame({ onBack }: WordleGameProps) {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [currentGuess, guesses, gameOver, targetWord]);

  const initializeGame = () => {
    const word = christmasWords[Math.floor(Math.random() * christmasWords.length)].toUpperCase();
    setTargetWord(word);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
  };

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) return;
      
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      if (currentGuess === targetWord) {
        setWon(true);
        setGameOver(true);
      } else if (newGuesses.length >= maxGuesses) {
        setGameOver(true);
      }

      setCurrentGuess('');
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const getLetterState = (letter: string, index: number, guess: string): LetterState => {
    if (!guess) return 'empty';
    
    if (letter === targetWord[index]) {
      return 'correct';
    }
    
    if (targetWord.includes(letter)) {
      return 'present';
    }
    
    return 'absent';
  };

  const getKeyboardLetterState = (letter: string): LetterState => {
    let state: LetterState = 'empty';
    
    guesses.forEach((guess) => {
      guess.split('').forEach((char, index) => {
        if (char === letter) {
          const letterState = getLetterState(char, index, guess);
          if (letterState === 'correct') {
            state = 'correct';
          } else if (letterState === 'present' && state !== 'correct') {
            state = 'present';
          } else if (letterState === 'absent' && state === 'empty') {
            state = 'absent';
          }
        }
      });
    });
    
    return state;
  };

  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const getStateColor = (state: LetterState) => {
    switch (state) {
      case 'correct':
        return 'bg-[#0F5132] border-[#0F5132]';
      case 'present':
        return 'bg-[#FFB81C] border-[#FFB81C] text-black';
      case 'absent':
        return 'bg-white/10 border-white/10';
      default:
        return 'bg-white/8 border-white/12';
    }
  };

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

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl text-[#FFB81C]">🎄 Christmas Wordle</h2>
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 hover:bg-white/12 border border-white/12 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            New Word
          </button>
        </div>

        {/* Grid */}
        <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6 mb-8">
          <div className="space-y-2 mb-8">
            {Array.from({ length: maxGuesses }).map((_, rowIndex) => {
              const guess = rowIndex < guesses.length ? guesses[rowIndex] : rowIndex === guesses.length ? currentGuess : '';
              const isCurrentRow = rowIndex === guesses.length;
              
              return (
                <div key={rowIndex} className="flex gap-2 justify-center">
                  {Array.from({ length: 5 }).map((_, colIndex) => {
                    const letter = guess[colIndex] || '';
                    const state = rowIndex < guesses.length ? getLetterState(letter, colIndex, guess) : 'empty';
                    
                    return (
                      <div
                        key={colIndex}
                        className={`w-12 h-12 sm:w-14 sm:h-14 border-2 rounded-lg flex items-center justify-center text-xl sm:text-2xl transition-all ${getStateColor(
                          state
                        )} ${
                          isCurrentRow && letter ? 'animate-pulse' : ''
                        }`}
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Keyboard */}
          <div className="space-y-2">
            {keyboard.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 justify-center">
                {row.map((key) => {
                  const state = key.length === 1 ? getKeyboardLetterState(key) : 'empty';
                  const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className={`${
                        isSpecial ? 'px-3 sm:px-4' : 'w-8 sm:w-10'
                      } h-12 rounded-lg border transition-all ${getStateColor(
                        state
                      )} hover:opacity-80 text-xs sm:text-sm`}
                    >
                      {key === 'BACKSPACE' ? <Delete className="w-4 h-4" /> : key}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Win/Loss Modal */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">{won ? '🎉' : '😢'}</div>
              <h3 className="text-3xl text-[#FFB81C] mb-4">
                {won ? 'You Won!' : 'Game Over'}
              </h3>
              <p className="text-xl mb-2">
                The word was: <span className="text-[#FFB81C]">{targetWord}</span>
              </p>
              {won && <p className="text-white/60 mb-6">Solved in {guesses.length} guesses!</p>}
              <div className="flex gap-4">
                <button
                  onClick={initializeGame}
                  className="flex-1 px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-[#A00D25] transition-all"
                >
                  New Word
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