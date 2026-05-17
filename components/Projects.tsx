import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { PROJECTS } from '../constants';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const TYPE_COLORS: Record<string, string> = {
  'FULLSTACK': 'text-blue-400/80 border-blue-400/25',
  'BACKEND':   'text-orange-400/80 border-orange-400/25',
  'AI/ML':     'text-purple-400/80 border-purple-400/25',
};

const Projects: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-20" id="projects">
      <SectionHeader title="projects --all" />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {PROJECTS.map((project) => {
          const typeColor = TYPE_COLORS[project.type ?? ''] ?? 'text-gray-500 border-gray-500/25';
          const isHovered = hovered === project.id;

          return (
            <div
              key={project.id}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative border bg-black flex flex-col transition-all duration-200 ${
                isHovered ? 'border-terminal-green/40 bg-terminal-green/[0.03]' : 'border-terminal-green/15'
              }`}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-terminal-green/10">
                <div className="flex items-center gap-3">
                  {/* Dot indicator */}
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isHovered ? 'bg-terminal-green' : 'bg-terminal-green/30'}`} />
                  <h3 className="text-white font-bold text-lg tracking-tight">{project.title}</h3>
                  {project.type && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 border rounded-sm ${typeColor}`}>
                      {project.type}
                    </span>
                  )}
                </div>
                {/* Links */}
                <div className="flex items-center gap-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      className="text-gray-600 hover:text-terminal-green transition-colors"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    className="text-gray-600 hover:text-terminal-green transition-colors"
                  >
                    <Github size={15} />
                  </a>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-4 flex flex-col flex-1">
                <p className="text-gray-500 text-sm font-mono leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Bullets */}
                {project.bullets && (
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {project.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-400 font-mono">
                        <span className="text-terminal-green/50 mt-0.5 shrink-0">›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer row */}
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-terminal-green/10">
                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 border border-terminal-green/15 text-terminal-green/50 hover:text-terminal-green/80 hover:border-terminal-green/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-mono text-terminal-green/40 hover:text-terminal-green transition-colors shrink-0 ml-3 group/link"
                  >
                    source
                    <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;