import { useState, useEffect } from 'react';
import { Mail, Calendar, Sparkles, Gift, Gamepad2 } from 'lucide-react';
import { Countdown } from './Countdown';

type Section = 'cards' | 'calendar' | 'quiz' | 'socks' | 'gifts' | 'games';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const features = [
    { id: 'cards' as Section, label: '✉️ Card Maker', icon: Mail, desc: 'Create beautiful cards' },
    { id: 'calendar' as Section, label: '🎁 Advent Calendar', icon: Calendar, desc: 'Daily surprises' },
    { id: 'quiz' as Section, label: '🎭 Personality Quiz', icon: Sparkles, desc: 'Find your character' },
    { id: 'socks' as Section, label: '🧦 Hang Your Sock', icon: Gift, desc: 'Global sock map' },
    { id: 'gifts' as Section, label: '🎁 Gift Exchange', icon: Gift, desc: 'Secret Santa generator' },
    { id: 'games' as Section, label: '🎮 Christmas Games', icon: Gamepad2, desc: 'Fun activities' },
  ];

  const floatingEmojis = ['🎁', '❄️', '🔔', '🦌'];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Floating Emojis */}
      {floatingEmojis.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-4xl sm:text-6xl opacity-20 animate-float"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 2) * 30}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i}s`,
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="max-w-4xl w-full text-center relative z-10">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl mb-8 bg-gradient-to-r from-[#FFB81C] via-[#C8102E] to-[#FFB81C] bg-clip-text text-transparent">
          Christmas Magic
        </h1>
        
        <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Celebrate the season with interactive cards, games, and festive activities
        </p>

        <Countdown />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className="group p-6 rounded-2xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 hover:border-white/20 transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-3">{feature.label.split(' ')[0]}</div>
                <div className="text-lg mb-2">{feature.label.split(' ').slice(1).join(' ')}</div>
                <div className="text-sm text-white/60">{feature.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
