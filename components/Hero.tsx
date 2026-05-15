import React, { useEffect, useState } from 'react';
import { Github, Code2, Twitter, Linkedin, Download, ArrowRight, Circle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import Typewriter from './Typewriter';

// Fake terminal lines that type out one by one
const TERMINAL_LINES = [
  { text: '$ curl api.manukesharwani.dev/profile', color: 'text-terminal-green' },
  { text: '{', color: 'text-gray-400' },
  { text: '  "name": "Manu Kesharwani",', color: 'text-gray-300', indent: true },
  { text: '  "role": "Software Engineer Intern",', color: 'text-gray-300', indent: true },
  { text: '  "company": "Melento",', color: 'text-terminal-green/80', indent: true },
  { text: '  "location": "Bengaluru, India",', color: 'text-gray-300', indent: true },
  { text: '  "stack": [', color: 'text-gray-300', indent: true },
  { text: '    "Node.js", "Next.js", "TypeScript",', color: 'text-yellow-400/80', indent: true },
  { text: '    "MongoDB", "Redis", "AWS"', color: 'text-yellow-400/80', indent: true },
  { text: '  ],', color: 'text-gray-300', indent: true },
  { text: '  "dsa": { "solved": 813, "rating": 1686 },', color: 'text-blue-400/80', indent: true },
  { text: '  "cgpa": 8.68,', color: 'text-purple-400/80', indent: true },
  { text: '  "openToWork": true', color: 'text-terminal-green', indent: true },
  { text: '}', color: 'text-gray-400' },
  { text: '✓ 200 OK  •  48ms', color: 'text-terminal-green/60' },
];

const TerminalWindow: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= TERMINAL_LINES.length) return;
    const delay = visibleCount === 0 ? 1800 : 220;
    const t = setTimeout(() => setVisibleCount(v => v + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div className="relative w-full max-w-lg hidden lg:block">
      {/* Window chrome */}
      <div className="border border-terminal-green/20 bg-black/80 backdrop-blur-sm overflow-hidden shadow-[0_0_30px_rgba(0,204,68,0.05)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal-green/15 bg-terminal-green/5">
          <Circle size={8} className="fill-red-500/70 text-red-500/70" />
          <Circle size={8} className="fill-yellow-500/70 text-yellow-500/70" />
          <Circle size={8} className="fill-green-500/70 text-green-500/70" />
          <span className="ml-2 text-[11px] text-terminal-green/40 font-mono">bash — manu@portfolio: ~</span>
        </div>

        {/* Terminal content */}
        <div className="p-5 font-mono text-[12px] space-y-0.5 min-h-[340px]">
          {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
            <div
              key={i}
              className={`${line.color} leading-relaxed transition-opacity duration-150`}
            >
              {line.text}
            </div>
          ))}
          {visibleCount < TERMINAL_LINES.length && (
            <span className="inline-block w-2 h-3.5 bg-terminal-green animate-blink align-middle" />
          )}
          {visibleCount >= TERMINAL_LINES.length && (
            <div className="mt-3 text-terminal-green flex items-center gap-1">
              <span>$ </span>
              <span className="inline-block w-2 h-3.5 bg-terminal-green animate-blink align-middle" />
            </div>
          )}
        </div>
      </div>

      {/* Decorative corner glow */}
      <div
        className="absolute -bottom-8 -right-8 w-48 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,0,0.02) 0%, transparent 70%)' }}
      />
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-[92vh] flex flex-col justify-center pt-20 pb-10 relative overflow-hidden">

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Boot line */}
      <div className="mb-10 font-mono text-[11px] text-terminal-green/30 space-y-0.5">
        <div><Typewriter text="> portfolio_v2.0 — connection established [OK]" speed={28} /></div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16 relative z-10">

        {/* LEFT: Content */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-terminal-green/25 bg-terminal-green/5 text-[11px] font-mono text-terminal-green/60 w-fit rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse shrink-0" />
            <span>Open to opportunities · SWE Intern @ Melento</span>
          </div>

          {/* Name */}
          <h1 className="font-bold tracking-tight leading-none">
            <span className="block text-5xl md:text-7xl text-white">Manu</span>
            <span
              className="block text-5xl md:text-7xl text-terminal-green"
            >
              Kesharwani
            </span>
          </h1>

          {/* Role */}
          <div className="font-mono text-gray-400 text-sm md:text-base">
            <span className="text-terminal-green/50 mr-2">$</span>
            <Typewriter
              text="Full-Stack Engineer · Backend Systems · DSA"
              delay={1600}
              speed={30}
            />
          </div>

          {/* Tagline */}
          <p className="text-gray-600 text-sm font-mono max-w-md border-l-2 border-terminal-green/25 pl-4 leading-relaxed">
            Building at the intersection of scalable backend systems, clean APIs, and fast frontend experiences.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: '813+', label: 'Problems Solved' },
              { value: '1686', label: 'Contest Rating' },
              { value: '8.68', label: 'CGPA' },
              { value: '1+', label: 'Year Exp' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-terminal-green text-2xl font-bold font-mono leading-none">{value}</div>
                <div className="text-gray-600 text-[10px] font-mono mt-0.5 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1xWgwZtmHhLriROcZ6T_fJ3u_85xblOPb/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-terminal-green text-black text-sm font-bold hover:bg-[#00aa33] hover:shadow-[0_0_12px_rgba(0,204,68,0.2)] transition-all duration-200 group"
            >
              <Download size={14} />
              Resume
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <SocialButton href={SOCIAL_LINKS.github} icon={<Github size={15} />} label="GitHub" />
            <SocialButton href={SOCIAL_LINKS.leetcode} icon={<Code2 size={15} />} label="LeetCode" />
            <SocialButton href={SOCIAL_LINKS.twitter} icon={<Twitter size={15} />} label="X" />
            <SocialButton href={SOCIAL_LINKS.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />
          </div>
        </div>

        {/* RIGHT: Fake terminal */}
        <TerminalWindow />
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
    className="flex items-center gap-1.5 px-3 py-2.5 border border-terminal-green/30 text-terminal-green/70 text-xs hover:border-terminal-green hover:text-terminal-green transition-all duration-200"
  >
    {icon}
    <span className="font-mono">{label}</span>
  </a>
);

export default Hero;