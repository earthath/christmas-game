import { useState, useEffect } from 'react';
import { ArrowLeft, Gift, Lock, Calendar as CalendarIcon } from 'lucide-react';

interface AdventCalendarProps {
  onBack: () => void;
}

interface DoorContent {
  message: string;
  emoji: string;
}

const doorContents: Record<number, DoorContent> = {
  1: { message: "🎄 Welcome to December! Let the magic begin!", emoji: "🎄" },
  2: { message: "⛄ Build a snowman today!", emoji: "⛄" },
  3: { message: "🎅 Santa is watching! Have you been good?", emoji: "🎅" },
  4: { message: "🎁 Kindness is the best gift!", emoji: "🎁" },
  5: { message: "❄️ Every snowflake is unique, just like you!", emoji: "❄️" },
  6: { message: "🔔 Listen for the jingle bells!", emoji: "🔔" },
  7: { message: "⭐ Shine bright like a Christmas star!", emoji: "⭐" },
  8: { message: "🦌 Rudolph says hello!", emoji: "🦌" },
  9: { message: "🍪 Time to bake some cookies!", emoji: "🍪" },
  10: { message: "🕯️ Light up the darkness with joy!", emoji: "🕯️" },
  11: { message: "🎶 Sing your favorite carol!", emoji: "🎶" },
  12: { message: "🎀 Wrap presents with love!", emoji: "🎀" },
  13: { message: "🌟 Believe in the magic!", emoji: "🌟" },
  14: { message: "☃️ Hot cocoa weather!", emoji: "☕" },
  15: { message: "🎊 Halfway to Christmas!", emoji: "🎊" },
  16: { message: "🧦 Hang your stockings!", emoji: "🧦" },
  17: { message: "🎺 The angels are singing!", emoji: "👼" },
  18: { message: "🎨 Create holiday memories!", emoji: "🎨" },
  19: { message: "🏠 Home is where the heart is!", emoji: "🏠" },
  20: { message: "💫 Spread holiday cheer!", emoji: "💫" },
  21: { message: "🎭 The show must go on!", emoji: "🎭" },
  22: { message: "🌲 O Christmas Tree!", emoji: "🌲" },
  23: { message: "🎪 The excitement builds!", emoji: "🎪" },
  24: { message: "🌙 'Twas the night before Christmas!", emoji: "🌙" },
  25: { message: "🎉 MERRY CHRISTMAS! ✨", emoji: "🎉" },
};

export function AdventCalendar({ onBack }: AdventCalendarProps) {
  const [openedDoors, setOpenedDoors] = useState<number[]>([]);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('adventCalendarDoors');
    if (saved) {
      setOpenedDoors(JSON.parse(saved));
    }
  }, []);

  const getCurrentDay = () => {
    const now = new Date();
    const december = now.getMonth() === 11;
    return december ? now.getDate() : 0;
  };

  const currentDay = getCurrentDay();

  const openDoor = (day: number) => {
    if (day > 25 || day > currentDay) return;
    
    if (!openedDoors.includes(day)) {
      const newOpened = [...openedDoors, day];
      setOpenedDoors(newOpened);
      localStorage.setItem('adventCalendarDoors', JSON.stringify(newOpened));
    }
    
    setSelectedDoor(day);
  };

  const getDoorState = (day: number) => {
    if (day > 25) return 'inactive';
    if (openedDoors.includes(day)) return 'opened';
    if (day === currentDay) return 'today';
    if (day < currentDay) return 'available';
    return 'locked';
  };

  const progress = (openedDoors.length / 25) * 100;

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

        <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-4">🎁 Advent Calendar</h2>
        
        <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Progress: {openedDoors.length}/25</span>
            <span className="text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#C8102E] to-[#FFB81C] h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-8">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const state = getDoorState(day);
            const content = doorContents[day];
            const isOpened = openedDoors.includes(day);

            return (
              <button
                key={day}
                onClick={() => openDoor(day)}
                disabled={state === 'locked' || state === 'inactive'}
                className={`aspect-square rounded-xl backdrop-blur-xl border-2 flex flex-col items-center justify-center transition-all relative group ${
                  state === 'locked' || state === 'inactive'
                    ? 'bg-white/5 border-white/8 cursor-not-allowed opacity-50'
                    : state === 'today'
                    ? 'bg-[#FFB81C]/20 border-[#FFB81C] hover:bg-[#FFB81C]/30 animate-pulse'
                    : state === 'opened'
                    ? 'bg-[#0F5132]/20 border-[#0F5132]'
                    : 'bg-white/8 border-white/12 hover:bg-white/12 hover:border-white/20'
                }`}
              >
                {state === 'locked' ? (
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                ) : isOpened && content ? (
                  <span className="text-2xl sm:text-3xl">{content.emoji}</span>
                ) : (
                  <span className="text-lg sm:text-xl">{day}</span>
                )}
                
                {state === 'today' && !isOpened && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFB81C] rounded-full animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Modal for door content */}
        {selectedDoor && doorContents[selectedDoor] && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDoor(null)}
          >
            <div
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full transform scale-100 animate-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{doorContents[selectedDoor].emoji}</div>
                <div className="text-4xl mb-4 text-[#FFB81C]">Day {selectedDoor}</div>
                <p className="text-xl mb-6">{doorContents[selectedDoor].message}</p>
                <button
                  onClick={() => setSelectedDoor(null)}
                  className="px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-[#A00D25] transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
