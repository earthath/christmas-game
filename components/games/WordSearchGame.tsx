import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface WordSearchGameProps {
  onBack: () => void;
}

const words = ['SANTA', 'REINDEER', 'SNOW', 'GIFT', 'TREE', 'STAR', 'BELL', 'CANDY'];
const gridSize = 12;

type Direction = { dx: number; dy: number };

export function WordSearchGame({ onBack }: WordSearchGameProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const newGrid: string[][] = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(''));

    const directions: Direction[] = [
      { dx: 0, dy: 1 }, // horizontal
      { dx: 1, dy: 0 }, // vertical
      { dx: 1, dy: 1 }, // diagonal down-right
      { dx: 1, dy: -1 }, // diagonal up-right
    ];

    // Place words
    words.forEach((word) => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        attempts++;
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const startX = Math.floor(Math.random() * gridSize);
        const startY = Math.floor(Math.random() * gridSize);

        // Check if word fits
        let fits = true;
        for (let i = 0; i < word.length; i++) {
          const x = startX + i * direction.dx;
          const y = startY + i * direction.dy;
          
          if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
            fits = false;
            break;
          }
          
          if (newGrid[x][y] !== '' && newGrid[x][y] !== word[i]) {
            fits = false;
            break;
          }
        }

        if (fits) {
          for (let i = 0; i < word.length; i++) {
            const x = startX + i * direction.dx;
            const y = startY + i * direction.dy;
            newGrid[x][y] = word[i];
          }
          placed = true;
        }
      }
    });

    // Fill empty cells with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    setGrid(newGrid);
    setFoundWords([]);
    setSelectedCells(new Set());
    setCurrentSelection([]);
  };

  const handleCellMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setCurrentSelection([`${row}-${col}`]);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (isSelecting) {
      const cell = `${row}-${col}`;
      if (!currentSelection.includes(cell)) {
        setCurrentSelection([...currentSelection, cell]);
      }
    }
  };

  const handleCellMouseUp = () => {
    setIsSelecting(false);
    checkWord();
    setCurrentSelection([]);
  };

  const checkWord = () => {
    if (currentSelection.length < 2) return;

    const selectedWord = currentSelection
      .map((cell) => {
        const [row, col] = cell.split('-').map(Number);
        return grid[row][col];
      })
      .join('');

    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
      setSelectedCells(new Set([...selectedCells, ...currentSelection]));
    }
  };

  const gameWon = foundWords.length === words.length;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </button>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl text-[#FFB81C]">🔍 Word Search</h2>
          <button
            onClick={generateGrid}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 hover:bg-white/12 border border-white/12 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            New Game
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Grid */}
          <div className="lg:col-span-3">
            <div
              className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-4 inline-block"
              onMouseLeave={() => {
                setIsSelecting(false);
                setCurrentSelection([]);
              }}
            >
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const cellId = `${rowIndex}-${colIndex}`;
                    const isFound = selectedCells.has(cellId);
                    const isCurrent = currentSelection.includes(cellId);

                    return (
                      <div
                        key={cellId}
                        onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                        onMouseUp={handleCellMouseUp}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded cursor-pointer select-none transition-all ${
                          isFound
                            ? 'bg-[#0F5132] text-white'
                            : isCurrent
                            ? 'bg-[#FFB81C] text-black'
                            : 'bg-white/8 hover:bg-white/12'
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{cell}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Word List */}
          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6">
            <h3 className="text-xl mb-4">
              Words ({foundWords.length}/{words.length})
            </h3>
            <div className="space-y-2">
              {words.map((word) => {
                const found = foundWords.includes(word);
                return (
                  <div
                    key={word}
                    className={`p-3 rounded-xl transition-all ${
                      found
                        ? 'bg-[#0F5132]/30 border border-[#0F5132] line-through'
                        : 'bg-white/8 border border-white/12'
                    }`}
                  >
                    {word}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Win Modal */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl text-[#FFB81C] mb-4">Congratulations!</h3>
              <p className="text-xl mb-6">You found all the words!</p>
              <div className="flex gap-4">
                <button
                  onClick={generateGrid}
                  className="flex-1 px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-[#A00D25] transition-all"
                >
                  New Game
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
