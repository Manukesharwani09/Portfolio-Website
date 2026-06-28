import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import TerminalCard from './TerminalCard';
import { ExternalLink, MapPin, Calendar, ChevronRight } from 'lucide-react';

const experiences = [
  {
    id: 'tapinvest',
    role: 'Backend Developer Intern',
    company: 'Tap Invest',
    companyFull: 'Tap Invest',
    period: 'Jun 2026 – Present',
    location: 'Bengaluru, India',
    type: 'Full-time Internship',
    tech: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'Java', 'Spring Boot', 'React', 'TypeScript', 'REST APIs'],
    highlights: [
      'Built a bulk RFQ order processing system with batched DB ops, duplicate prevention, and per-record partial success reporting.',
      'Designed a bulk UES user configuration workflow across frontend, API gateway, and backend — handling thousands of users in one operation.',
      'Implemented a client unlink workflow with investment validation and a confirmation flow to prevent accidental data loss.',
    ],
  },
  {
    id: 'melento',
    role: 'Software Engineer Intern',
    company: 'Melento',
    companyFull: 'Melento (Formerly Signdesk)',
    period: 'Jan 2026 – Jun 2026',
    location: 'Bengaluru, India',
    type: 'Full-time Internship',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'AWS S3', 'REST APIs', 'UDYAM API'],
    highlights: [
      'Developed and optimized payment workflows using Node.js, Express.js, MongoDB, Redis, and REST APIs.',
      'Implemented payment session handling and concurrency control using Redis.',
      'Handled secure document workflows using AWS S3 and ClearTax API.',
      'Migrated UDYAM verification from Surepass to TimbleGlance with MongoDB field-level encryption.',
    ],
  },
];

const Experience: React.FC = () => {
  return (
    <section className="py-20" id="experience">
      <SectionHeader title="experience --log" />

      <div className="space-y-6 mt-8">
        {experiences.map((exp) => (
          <TerminalCard key={exp.id} className="group hover:border-terminal-green/60 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Left: Role info */}
              <div className="flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-terminal-green">{exp.role}</h3>
                    <p className="text-white font-semibold mt-0.5">{exp.companyFull}</p>
                  </div>
                  {/* Devlog link — small icon */}
                  <Link
                    to={`/experience/${exp.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-terminal-green/40 text-terminal-green text-xs font-mono hover:bg-terminal-green hover:text-black transition-all duration-200 group-hover:border-terminal-green shrink-0 ml-4"
                    title="View full devlog"
                  >
                    <span>devlog</span>
                    <ChevronRight size={12} />
                  </Link>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-terminal-green/60" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-terminal-green/60" />
                    {exp.location}
                  </span>
                  <span className="px-2 py-0.5 border border-terminal-green/30 text-terminal-green/70 rounded-sm">
                    {exp.type}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="mt-4 space-y-1.5">
                  {exp.highlights.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-terminal-green shrink-0 mt-0.5">›</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs font-mono border border-terminal-green/25 text-terminal-green/70 hover:border-terminal-green/50 hover:text-terminal-green transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TerminalCard>
        ))}
      </div>
    </section>
  );
};

export default Experience;
