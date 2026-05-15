import React from 'react';
import { Github, Code2, Twitter, Linkedin, MapPin, Briefcase, Download, ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import Typewriter from './Typewriter';

const Hero: React.FC = () => {
  return (
    <section className="min-h-[92vh] flex flex-col justify-center pt-20 pb-10 relative overflow-hidden">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow blob behind name */}
      <div
        className="absolute top-1/3 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,0,0.06) 0%, transparent 70%)',
          transform: 'translate(-30%, -30%)',
        }}
      />

      {/* Boot messages — subtle, small */}
      <div className="mb-10 font-mono text-[11px] text-terminal-green/35 space-y-0.5">
        <div><Typewriter text="> portfolio_v1.0.0 initialized" speed={30} /></div>
        <div><Typewriter text="> connection established. [OK]" delay={900} speed={25} /></div>
      </div>

      <div className="space-y-6 relative z-10 max-w-4xl">

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-terminal-green/25 bg-terminal-green/5 text-[11px] font-mono text-terminal-green/60 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse shrink-0" />
          <Briefcase size={10} />
          <span>SWE Intern @ Melento</span>
          <span className="text-terminal-green/25">|</span>
          <MapPin size={10} />
          <span>Bengaluru</span>
        </div>

        {/* Name — both parts visible, strong hierarchy */}
        <div>
          <h1 className="font-bold tracking-tight leading-none">
            <span className="block text-6xl md:text-8xl text-white/90">
              Manu
            </span>
            <span
              className="block text-6xl md:text-8xl text-terminal-green"
              style={{ textShadow: '0 0 60px rgba(0,255,0,0.2)' }}
            >
              Kesharwani
            </span>
          </h1>
        </div>

        {/* Role */}
        <div className="font-mono text-gray-400 text-base md:text-lg">
          <span className="text-terminal-green/60 mr-2">$</span>
          <Typewriter
            text="Full-Stack Engineer · Backend Systems · DSA"
            delay={1600}
            speed={30}
          />
        </div>

        {/* Tagline */}
        <p className="text-gray-500 text-sm md:text-base font-mono max-w-lg border-l-2 border-terminal-green/30 pl-4 leading-relaxed">
          <Typewriter
            text="Building scalable systems — from REST APIs and Redis to Next.js and AWS."
            delay={3200}
            speed={25}
          />
          <span className="animate-blink inline-block w-2 h-4 bg-terminal-green align-middle ml-0.5" />
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 text-xs font-mono pt-1">
          {[
            { value: '813+', label: 'DSA Problems' },
            { value: '1686', label: 'Contest Rating' },
            { value: '8.68', label: 'CGPA' },
            { value: '1+', label: 'Year Exp' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-terminal-green text-xl font-bold leading-none">{value}</span>
              <span className="text-gray-600 text-[10px] mt-0.5">{label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Primary: Resume */}
          <a
            href="https://drive.google.com/file/d/1xWgwZtmHhLriROcZ6T_fJ3u_85xblOPb/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-terminal-green text-black text-sm font-bold hover:bg-[#33ff33] hover:shadow-[0_0_24px_rgba(0,255,0,0.45)] transition-all duration-200 group"
          >
            <Download size={14} />
            Resume
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Secondary socials */}
          <div className="flex items-center gap-2">
            <SocialButton href={SOCIAL_LINKS.github} icon={<Github size={16} />} label="GitHub" />
            <SocialButton href={SOCIAL_LINKS.leetcode} icon={<Code2 size={16} />} label="LeetCode" />
            <SocialButton href={SOCIAL_LINKS.twitter} icon={<Twitter size={16} />} label="X" />
            <SocialButton href={SOCIAL_LINKS.linkedin} icon={<Linkedin size={16} />} label="LinkedIn" />
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialButton: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({
  href, icon, label,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    className="flex items-center gap-1.5 px-3 py-2.5 border border-terminal-green/30 text-terminal-green/70 text-xs hover:border-terminal-green hover:text-terminal-green hover:bg-terminal-green/8 transition-all duration-200"
  >
    {icon}
    <span className="font-mono hidden sm:block">{label}</span>
  </a>
);

export default Hero;