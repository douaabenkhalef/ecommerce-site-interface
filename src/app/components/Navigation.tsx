import { useState, useEffect } from 'react';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'SHOP BY CATEGORIES' },
    { id: 'top-rated', label: 'Top Rated Product\'s' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      const homeSection = document.getElementById('home');
      const shopSection = document.getElementById('shop');
      const topRatedSection = document.getElementById('top-rated');
      
      if (homeSection && scrollPosition >= homeSection.offsetTop) {
        setActiveSection('home');
      }
      if (shopSection && scrollPosition >= shopSection.offsetTop) {
        setActiveSection('shop');
      }
      if (topRatedSection && scrollPosition >= topRatedSection.offsetTop) {
        setActiveSection('top-rated');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`relative py-2 transition-colors duration-300 ${
            activeSection === section.id
              ? 'text-cyan-400'
              : 'text-gray-300 hover:text-cyan-400'
          }`}
        >
          {section.label}
          {/* Trait sous le nom de la section active */}
          {activeSection === section.id && (
            <span className="absolute -bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-slide-in-left" />
          )}
        </button>
      ))}
    </nav>
  );
}