import React from 'react';
import { Github, Code2, Twitter, Linkedin, Mail, Terminal } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import Typewriter from './Typewriter';

const Hero: React.FC = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-20 pb-10">
      <div className="mb-4 text-terminal-green/60 font-mono text-sm md:text-base">
         <Typewriter text="> Initializing portfolio_v1.0.0..." speed={30} />
      </div>

      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          <span className="text-terminal-green">Manu</span>
          <span className="text-terminal-green/70"> Kesharwani</span>
        </h1>
        
        <div className="flex items-center gap-2 text-xl md:text-2xl text-gray-300">
          <span className="text-terminal-green">root@manu:~$</span>
          <span>Full-Stack Developer | AI & LLM Enthusiast</span>
        </div>

        <div className="h-16 md:h-12 flex items-center">
          <p className="text-lg md:text-xl text-terminal-green/80 font-mono border-l-2 border-terminal-green pl-4">
            <Typewriter 
              text="I build web apps, AI tools, and solve complex algorithms." 
              delay={1500}
              speed={40}
            />
            <span className="animate-blink inline-block w-2.5 h-5 bg-terminal-green align-middle ml-1"></span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-6">
          <SocialButton href={SOCIAL_LINKS.github} icon={<Github />} label="GitHub" />
          <SocialButton href={SOCIAL_LINKS.leetcode} icon={<Code2 />} label="LeetCode" />
          <SocialButton href={SOCIAL_LINKS.twitter} icon={<Twitter />} label="X (Twitter)" />
          <SocialButton href={SOCIAL_LINKS.linkedin} icon={<Linkedin />} label="LinkedIn" />
        </div>
      </div>
    </section>
  );
};

const SocialButton: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-5 py-3 border border-terminal-green/50 text-terminal-green hover:bg-terminal-green hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] group"
  >
    {icon}
    <span className="font-bold">{label}</span>
  </a>
);

export default Hero;