import { useState, useEffect } from 'react';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const christmas = new Date(currentYear, 11, 25); // December 25
      
      if (now > christmas) {
        christmas.setFullYear(currentYear + 1);
      }

      const diff = christmas.getTime() - now.getTime();
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
      {timeBlocks.map((block) => (
        <div
          key={block.label}
          className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-4 sm:p-6"
        >
          <div className="text-3xl sm:text-5xl text-[#FFB81C] mb-2">
            {String(block.value).padStart(2, '0')}
          </div>
          <div className="text-sm sm:text-base text-white/70">{block.label}</div>
        </div>
      ))}
    </div>
  );
}
