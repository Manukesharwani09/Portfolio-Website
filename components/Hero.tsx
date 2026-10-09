import React, { useEffect, useState, useRef, KeyboardEvent } from 'react';
import { Github, Code2, Twitter, Linkedin, Download, ArrowRight, Circle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import Typewriter from './Typewriter';

// ── Command definitions ──────────────────────────────────────────────────────
type OutputLine = { text: string; color?: string };

const COMMANDS: Record<string, () => OutputLine[]> = {
  help: () => [
    { text: 'Available commands:', color: 'text-terminal-green' },
    { text: '' },
    { text: '  whoami       → who is Manu?', color: 'text-gray-300' },
    { text: '  skills       → tech stack & tools', color: 'text-gray-300' },
    { text: '  experience   → work history', color: 'text-gray-300' },
    { text: '  education    → academic background', color: 'text-gray-300' },
    { text: '  dsa          → LeetCode stats', color: 'text-gray-300' },
    { text: '  projects     → notable work', color: 'text-gray-300' },
    { text: '  contact      → reach out', color: 'text-gray-300' },
    { text: '  social       → links', color: 'text-gray-300' },
    { text: '  clear        → clear terminal', color: 'text-gray-300' },
    { text: '' },
    { text: 'Type a command and press Enter ↵', color: 'text-terminal-green/50' },
  ],
  whoami: () => [
    { text: 'Manu Kesharwani', color: 'text-terminal-green' },
    { text: 'SDE-1 (Backend) @ Tap Invest', color: 'text-gray-300' },
    { text: 'B.Tech CSE · BMS Institute of Technology, Bengaluru', color: 'text-gray-300' },
    { text: 'CGPA: 8.73 | Graduated: 2026', color: 'text-purple-400/80' },
    { text: '' },
    { text: 'Backend developer — Go, Java, PostgreSQL and Redis.', color: 'text-gray-400' },
    { text: 'Building multi-service fintech backends. ✓', color: 'text-terminal-green' },
  ],
  skills: () => [
    { text: 'Languages:', color: 'text-terminal-green' },
    { text: '  Go, Java, TypeScript, SQL, Python, C++', color: 'text-yellow-400/80' },
    { text: 'Backend:', color: 'text-terminal-green' },
    { text: '  Gin, GORM, Spring Boot, REST APIs, Protocol Buffers', color: 'text-yellow-400/80' },
    { text: 'Data:', color: 'text-terminal-green' },
    { text: '  PostgreSQL, Redis', color: 'text-yellow-400/80' },
    { text: 'Frontend:', color: 'text-terminal-green' },
    { text: '  React.js, Next.js, Tailwind CSS', color: 'text-yellow-400/80' },
    { text: 'Cloud & Tools:', color: 'text-terminal-green' },
    { text: '  AWS (S3), Git, GitHub, Postman', color: 'text-yellow-400/80' },
  ],
  experience: () => [
    { text: '[ Tap Invest ]', color: 'text-terminal-green' },
    { text: '  Role     : SDE-1 (Backend)  · since Oct 2026', color: 'text-gray-300' },
    { text: '  Earlier  : Backend Developer Intern (Jun – Sep 2026)', color: 'text-gray-400' },
    { text: '  Period   : Jun 2026 – Present', color: 'text-gray-400' },
    { text: '  Location : Bengaluru, India', color: 'text-gray-400' },
    { text: '' },
    { text: '  • Deridata bond data pipeline → public Bonds Directory', color: 'text-gray-300' },
    { text: '  • Refund maker-checker across 4 services', color: 'text-gray-300' },
    { text: '  • Cross-service reconciliation & drift detection', color: 'text-gray-300' },
    { text: '' },
    { text: '[ Melento (formerly Signdesk) ]', color: 'text-terminal-green' },
    { text: '  Role     : Software Engineer Intern', color: 'text-gray-300' },
    { text: '  Period   : Jan 2026 – Jun 2026', color: 'text-gray-400' },
    { text: '' },
    { text: '  • Built async payment workflows with Redis & MongoDB', color: 'text-gray-300' },
    { text: '  • Integrated AWS & ClearTax APIs for e-invoicing', color: 'text-gray-300' },
    { text: '  • Implemented distributed locks for race conditions', color: 'text-gray-300' },
  ],
  education: () => [
    { text: 'BMS Institute of Technology & Management', color: 'text-terminal-green' },
    { text: '  Degree : B.Tech Computer Science & Engineering', color: 'text-gray-300' },
    { text: '  CGPA   : 8.73 / 10', color: 'text-purple-400/80' },
    { text: '  Year   : 2022 – 2026', color: 'text-gray-400' },
    { text: '  City   : Bengaluru, India', color: 'text-gray-400' },
  ],
  dsa: () => [
    { text: 'LeetCode Stats:', color: 'text-terminal-green' },
    { text: '  Problems Solved  : 813+', color: 'text-blue-400/80' },
    { text: '  Contest Rating   : 1686+', color: 'text-blue-400/80' },
    { text: '  Global Ranking   : Top 15%', color: 'text-blue-400/80' },
    { text: '  Profile          : leetcode.com/u/manukesharwani09', color: 'text-gray-400' },
  ],
  projects: () => [
    { text: '[ NewsAI ]', color: 'text-terminal-green' },
    { text: '  AI news aggregator with LangChain + RAG pipeline', color: 'text-gray-300' },
    { text: '  Stack: Next.js, ChromaDB, HuggingFace, Python', color: 'text-gray-400' },
    { text: '' },
    { text: '[ AI Interview Prep ]', color: 'text-terminal-green' },
    { text: '  Mock interview tool with AI feedback & voice input', color: 'text-gray-300' },
    { text: '  Stack: Next.js, OpenAI, MongoDB, Auth.js', color: 'text-gray-400' },
    { text: '' },
    { text: '[ Blog Platform ]', color: 'text-terminal-green' },
    { text: '  Full-stack blogging CMS with rich text editor', color: 'text-gray-300' },
    { text: '  Stack: MERN, JWT, Cloudinary', color: 'text-gray-400' },
  ],
  contact: () => [
    { text: 'Get in touch:', color: 'text-terminal-green' },
    { text: '  Email    : manukesharwani09@gmail.com', color: 'text-gray-300' },
    { text: '  LinkedIn : linkedin.com/in/manu-kesharwani-a993022b4', color: 'text-gray-300' },
    { text: '  GitHub   : github.com/Manukesharwani09', color: 'text-gray-300' },
    { text: '  Twitter  : @smilelikemanu', color: 'text-gray-300' },
  ],
  social: () => [
    { text: 'Links:', color: 'text-terminal-green' },
    { text: `  GitHub   : ${SOCIAL_LINKS.github}`, color: 'text-blue-400/80' },
    { text: `  LinkedIn : ${SOCIAL_LINKS.linkedin}`, color: 'text-blue-400/80' },
    { text: `  LeetCode : ${SOCIAL_LINKS.leetcode}`, color: 'text-blue-400/80' },
    { text: `  Twitter  : ${SOCIAL_LINKS.twitter}`, color: 'text-blue-400/80' },
  ],
};

// Months of experience since the first job (Jan 2026), so the stat never goes stale
const FIRST_JOB = new Date(2026, 0, 1);
const MONTHS_EXP = Math.max(
  1,
  (new Date().getFullYear() - FIRST_JOB.getFullYear()) * 12 + new Date().getMonth() - FIRST_JOB.getMonth(),
);

// ── Intro lines (auto-typed) ─────────────────────────────────────────────────
const INTRO_LINES = [
  { text: '$ curl api.manukesharwani.dev/profile', color: 'text-terminal-green' },
  { text: '{', color: 'text-gray-400' },
  { text: '  "name": "Manu Kesharwani",', color: 'text-gray-300' },
  { text: '  "role": "SDE-1 (Backend)",', color: 'text-gray-300' },
  { text: '  "company": "Tap Invest",', color: 'text-terminal-green/80' },
  { text: '  "stack": ["Go","Java","Spring Boot","PostgreSQL","Redis"],', color: 'text-yellow-400/80' },
  { text: '  "dsa": { "solved": 813, "rating": 1686 },', color: 'text-blue-400/80' },
  { text: '  "openToWork": true', color: 'text-terminal-green' },
  { text: '}', color: 'text-gray-400' },
  { text: '✓ 200 OK  •  48ms   (type "help" for commands)', color: 'text-terminal-green/50' },
];

type HistoryEntry = { cmd: string; output: OutputLine[] };

const TerminalWindow: React.FC = () => {
  const [introCount, setIntroCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-type intro
  useEffect(() => {
    if (introCount >= INTRO_LINES.length) { setReady(true); return; }
    const delay = introCount === 0 ? 1800 : 200;
    const t = setTimeout(() => setIntroCount(v => v + 1), delay);
    return () => clearTimeout(t);
  }, [introCount]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, introCount]);

  const focusInput = () => inputRef.current?.focus();

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const fn = COMMANDS[cmd];
    const output: OutputLine[] = fn
      ? fn()
      : [{ text: `bash: ${cmd}: command not found. Type "help" for commands.`, color: 'text-red-400/80' }];

    setHistory(h => [...h, { cmd: raw.trim(), output }]);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    }
  };

  return (
    <div className="relative w-full max-w-lg hidden lg:block">
      <div className="border border-terminal-green/20 bg-black/80 backdrop-blur-sm overflow-hidden shadow-[0_0_30px_rgba(0,204,68,0.05)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal-green/15 bg-terminal-green/5">
          <Circle size={8} className="fill-red-500/70 text-red-500/70" />
          <Circle size={8} className="fill-yellow-500/70 text-yellow-500/70" />
          <Circle size={8} className="fill-green-500/70 text-green-500/70" />
          <span className="ml-2 text-[11px] text-terminal-green/40 font-mono">bash — manu@portfolio: ~</span>
        </div>

        {/* Terminal body */}
        <div
          className="p-4 font-mono text-[12px] h-[360px] overflow-y-auto cursor-text space-y-0.5 scrollbar-thin"
          onClick={focusInput}
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#00cc44 transparent' }}
        >
          {/* Intro lines */}
          {INTRO_LINES.slice(0, introCount).map((line, i) => (
            <div key={`intro-${i}`} className={`${line.color ?? 'text-gray-300'} leading-relaxed`}>
              {line.text}
            </div>
          ))}

          {/* Blinking cursor while typing intro */}
          {!ready && (
            <span className="inline-block w-2 h-3.5 bg-terminal-green animate-blink align-middle" />
          )}

          {/* Command history */}
          {ready && history.map((entry, i) => (
            <div key={`h-${i}`}>
              <div className="text-terminal-green mt-2">$ {entry.cmd}</div>
              {entry.output.map((line, j) => (
                <div key={j} className={`${line.color ?? 'text-gray-300'} leading-relaxed`}>
                  {line.text}
                </div>
              ))}
            </div>
          ))}

          {/* Interactive prompt */}
          {ready && (
            <div className="flex items-center gap-1 mt-2 text-terminal-green">
              <span>$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent outline-none text-terminal-green caret-terminal-green font-mono text-[12px]"
                placeholder="type a command..."
              />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
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
            <span>Open to opportunities · SDE-1 Backend @ Tap Invest</span>
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
              text="Backend Developer · Go · Java · Distributed Systems"
              delay={1600}
              speed={30}
            />
          </div>

          {/* Tagline */}
          <p className="text-gray-400 text-sm font-mono max-w-md border-l-2 border-terminal-green/25 pl-4 leading-relaxed">
            Building scalable backend services, clean APIs and reliable money-moving workflows for fintech.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: '813+', label: 'Problems Solved' },
              { value: '1686', label: 'Contest Rating' },
              { value: '8.73', label: 'CGPA' },
              { value: `${MONTHS_EXP}+`, label: 'months Exp' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-terminal-green text-2xl font-bold font-mono leading-none">{value}</div>
                <div className="text-gray-400 text-[11px] font-mono mt-0.5 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SOCIAL_LINKS.resume}
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