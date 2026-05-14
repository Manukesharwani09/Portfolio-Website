import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import LeetCode from './LeetCode';
import Books from './Books';
import Contact from './Contact';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-terminal-black text-terminal-green selection:bg-terminal-green selection:text-black font-mono relative">
      {/* CRT Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-50 animate-scanline bg-gradient-to-b from-transparent via-terminal-green/5 to-transparent h-32 w-full opacity-10" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 relative z-10" id="home">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <LeetCode />
        <Books />
        <Contact />
      </main>
    </div>
  );
};

export default MainPage;
