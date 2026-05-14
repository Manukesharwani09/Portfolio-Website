import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, ExternalLink, Lightbulb, Wrench, Zap, AlertTriangle } from 'lucide-react';

const devlogs: Record<string, any> = {
  melento: {
    role: 'Software Engineer Intern',
    company: 'Melento (Formerly Signdesk)',
    period: 'Jan 2026 – Present',
    location: 'Bengaluru, India',
    overview: `Working as a Software Engineer Intern at Melento (formerly Signdesk), a fintech/legaltech startup building document signing and payment automation infrastructure. My work spans backend API development, distributed systems challenges, and third-party API integrations.`,
    sections: [
      {
        icon: 'zap',
        title: 'Payment Workflow Automation',
        content: `Built and optimized asynchronous payment workflows using Node.js, Express.js, MongoDB, and Redis. This included:
- **Webhook integrations** with payment gateways for real-time event processing.
- **Callback handling** for async operations with retry logic.
- **Cron-based retry mechanisms** for failed payment flows — ensuring reliability even under network instability.

The challenge was handling race conditions in distributed callback processing. I solved this by implementing Redis-based distributed locks so only one process handles a payment event at a time.`,
      },
      {
        icon: 'wrench',
        title: 'Session Handling & Concurrency with Redis',
        content: `Implemented payment session management using Redis to handle concurrency across multiple service instances. Key problems faced:

- **Stale session data**: Multiple service pods were reading stale data from MongoDB. Fixed by using Redis as the single source of truth for active sessions with TTL-based expiry.
- **Race conditions on concurrent requests**: Used Redis SET NX (atomic set-if-not-exists) to implement session locking.
- Also built SMS/email notification workflows and invoice generation/download features integrated with the session state.`,
      },
      {
        icon: 'alert',
        title: 'AWS S3 & ClearTax API Integration',
        content: `Handled secure document storage and GSTIN verification workflows:

- **AWS S3** for B2B invoice storage with signed URL generation for secure, time-limited downloads.
- **ClearTax API** for GSTIN verification during the invoicing flow.
- Implemented proper IAM role scoping and bucket policies to ensure documents are only accessible to authorized users.

The tricky part was streaming large documents through the API without buffering the entire file in memory — solved using Node.js streams piped directly to S3.`,
      },
      {
        icon: 'lightbulb',
        title: 'UDYAM Verification Migration',
        content: `Migrated the UDYAM (MSME registration) verification system from **Surepass** to **TimbleGlance** (a third-party API provider). This was a critical migration since it involved:

- **Technical evaluation** of both APIs — comparing response schemas, reliability, and pricing.
- Writing a **compatibility layer** so the rest of the codebase didn't need changes.
- Implementing **MongoDB field-level encryption** for PII (Personally Identifiable Information) across three database collections storing Aadhaar/PAN/GSTIN data.

The hardest problem here was backward compatibility — existing encrypted documents had to be re-encrypted with the new key scheme without downtime.`,
      },
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'AWS S3', 'ClearTax API', 'REST APIs', 'JWT', 'Cron Jobs'],
    learnings: [
      'Distributed systems require explicit coordination — never assume shared state.',
      'MongoDB field-level encryption is powerful but requires careful key management.',
      'Redis is not just a cache — it\'s a coordination primitive for distributed systems.',
      'Third-party API migrations need compatibility layers to avoid big-bang rewrites.',
      'Streaming > buffering for large files in memory-constrained services.',
    ],
  },
};

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap size={18} />,
  wrench: <Wrench size={18} />,
  alert: <AlertTriangle size={18} />,
  lightbulb: <Lightbulb size={18} />,
};

const renderContent = (text: string) => {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('- **')) {
      const parts = line.replace('- ', '').split(/\*\*(.*?)\*\*/g);
      return (
        <li key={i} className="flex gap-2 text-gray-300 text-sm">
          <span className="text-terminal-green shrink-0 mt-0.5">›</span>
          <span>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}
          </span>
        </li>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="flex gap-2 text-gray-300 text-sm">
          <span className="text-terminal-green shrink-0 mt-0.5">›</span>
          <span>{line.replace('- ', '')}</span>
        </li>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    // Render bold text inline
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className="text-gray-300 text-sm leading-relaxed">
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}
      </p>
    );
  });
};

const ExperienceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const log = id ? devlogs[id] : null;

  if (!log) {
    return (
      <div className="min-h-screen bg-terminal-black text-terminal-green font-mono flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">404 – devlog not found</p>
          <Link to="/" className="text-sm border border-terminal-green/40 px-4 py-2 hover:bg-terminal-green/10">
            ← back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-black text-terminal-green font-mono">
      {/* CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-terminal-green/60 hover:text-terminal-green transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          back to portfolio
        </Link>

        {/* Header */}
        <div className="border border-terminal-green/30 p-6 mb-10 bg-terminal-green/5">
          <div className="text-xs text-terminal-green/50 mb-2 font-mono">{'>'} cat devlog.md</div>
          <h1 className="text-3xl font-bold text-white mb-1">{log.role}</h1>
          <p className="text-terminal-green text-lg mb-4">{log.company}</p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar size={12} />{log.period}</span>
            <span className="flex items-center gap-1.5"><MapPin size={12} />{log.location}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-10">
          <p className="text-xs text-terminal-green/50 mb-3 font-mono">{'>'} overview</p>
          <p className="text-gray-300 leading-relaxed text-sm border-l-2 border-terminal-green/30 pl-4">{log.overview}</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {log.sections.map((section: any, i: number) => (
            <div key={i} className="border border-terminal-green/20 p-6 hover:border-terminal-green/40 transition-colors">
              <h2 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                <span className="text-terminal-green">{iconMap[section.icon]}</span>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {renderContent(section.content)}
              </ul>
            </div>
          ))}
        </div>

        {/* Learnings */}
        <div className="mt-10 border border-terminal-green/30 p-6 bg-terminal-green/5">
          <h2 className="text-lg font-bold text-white mb-4">{'>'} key_learnings</h2>
          <ul className="space-y-2">
            {log.learnings.map((l: string, i: number) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-terminal-green shrink-0">✓</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mt-8">
          <p className="text-xs text-terminal-green/50 mb-3 font-mono">{'>'} tech_used</p>
          <div className="flex flex-wrap gap-2">
            {log.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 text-xs font-mono border border-terminal-green/30 text-terminal-green/70 hover:text-terminal-green hover:border-terminal-green/60 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-terminal-green/20 text-center">
          <Link to="/" className="text-sm text-terminal-green/50 hover:text-terminal-green transition-colors">
            ← back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;
