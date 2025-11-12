import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CardMaker } from './components/CardMaker';
import { AdventCalendar } from './components/AdventCalendar';
import { PersonalityQuiz } from './components/PersonalityQuiz';
import { SockHanging } from './components/SockHanging';
import { GiftExchange } from './components/GiftExchange';
import { Games } from './components/Games';
import { SnowEffect } from './components/SnowEffect';
import { FloatingTrees } from './components/FloatingTrees';
import { CurvedText } from './components/CurvedText';

type Section = 'home' | 'cards' | 'calendar' | 'quiz' | 'socks' | 'gifts' | 'games';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (section: Section) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden relative">
      <SnowEffect />
      <FloatingTrees />
      
      <Navigation 
        show={showNav && currentSection !== 'home'} 
        currentSection={currentSection}
        onNavigate={navigateToSection}
      />

      {currentSection === 'home' && (
        <>
          <CurvedText />
          <Hero onNavigate={navigateToSection} />
        </>
      )}

      {currentSection === 'cards' && <CardMaker onBack={() => navigateToSection('home')} />}
      {currentSection === 'calendar' && <AdventCalendar onBack={() => navigateToSection('home')} />}
      {currentSection === 'quiz' && <PersonalityQuiz onBack={() => navigateToSection('home')} />}
      {currentSection === 'socks' && <SockHanging onBack={() => navigateToSection('home')} />}
      {currentSection === 'gifts' && <GiftExchange onBack={() => navigateToSection('home')} />}
      {currentSection === 'games' && <Games onBack={() => navigateToSection('home')} />}
    </div>
  );
}
