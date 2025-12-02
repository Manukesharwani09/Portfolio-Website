import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const NAV_ITEMS = [
  { label: '~/home', id: 'home' },
  { label: './about', id: 'about' },
  { label: './skills', id: 'skills' },
  { label: './projects', id: 'projects' },
  { label: './stats', id: 'leetcode' },
  { label: './library', id: 'books' },
  { label: './contact', id: 'contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-terminal-green/30 py-2' : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 text-terminal-green font-bold text-xl cursor-pointer hover:text-white transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Terminal size={24} />
          <span>MK_PORTFOLIO</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm text-gray-400 hover:text-terminal-green hover:shadow-[0_0_10px_rgba(0,255,0,0.4)] transition-all font-mono"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-terminal-green"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-terminal-green/30 p-4 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left py-2 px-4 border-l-2 border-transparent hover:border-terminal-green hover:bg-terminal-green/10 text-gray-300 hover:text-terminal-green font-mono transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;