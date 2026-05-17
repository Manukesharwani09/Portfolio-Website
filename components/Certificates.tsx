import React from 'react';
import SectionHeader from './SectionHeader';
import { ExternalLink, Award } from 'lucide-react';

const certs = [
  {
    name: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS Training & Certification',
    date: 'Feb 2026',
    link: 'https://drive.google.com/drive/u/0/folders/1MedK4hv5Rc6sDrjNBa6Wz7V-oqc4ylrd',
  },
];

const Certificates: React.FC = () => (
  <section className="py-16" id="certificates">
    <SectionHeader title="certificates" />
    <div className="space-y-2 mt-4">
      {certs.map((c) => (
        <div
          key={c.name}
          className="flex items-center justify-between border border-terminal-green/15 px-4 py-3 hover:border-terminal-green/35 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Award size={14} className="text-terminal-green/50 shrink-0" />
            <div>
              <span className="text-white text-sm font-mono">{c.name}</span>
              <span className="text-gray-600 text-xs font-mono ml-3">{c.issuer} · {c.date}</span>
            </div>
          </div>
          <a
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-terminal-green/50 hover:text-terminal-green transition-colors shrink-0 ml-4"
          >
            view <ExternalLink size={11} />
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Certificates;
