import { Home, Mail, Calendar, Sparkles, Gift, Gamepad2 } from 'lucide-react';

type Section = 'home' | 'cards' | 'calendar' | 'quiz' | 'socks' | 'gifts' | 'games';

interface NavigationProps {
  show: boolean;
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

export function Navigation({ show, currentSection, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as Section, label: 'Home', icon: Home },
    { id: 'cards' as Section, label: 'Cards', icon: Mail },
    { id: 'calendar' as Section, label: 'Calendar', icon: Calendar },
    { id: 'quiz' as Section, label: 'Quiz', icon: Sparkles },
    { id: 'gifts' as Section, label: 'Gifts', icon: Gift },
    { id: 'games' as Section, label: 'Games', icon: Gamepad2 },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="backdrop-blur-xl bg-white/8 border-b border-white/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 flex-wrap">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all ${
                    currentSection === item.id
                      ? 'bg-[#C8102E] text-white'
                      : 'bg-white/8 hover:bg-white/12 text-white/90'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
