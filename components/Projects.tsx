import React from 'react';
import SectionHeader from './SectionHeader';
import TerminalCard from './TerminalCard';
import { PROJECTS } from '../constants';
import { Github, ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section className="py-20" id="projects">
      <SectionHeader title="projects --all" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <TerminalCard key={project.id} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-terminal-green">{project.title}</h3>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-terminal-green transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
            
            <p className="text-gray-300 mb-6 flex-grow">{project.description}</p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-terminal-green/10 text-terminal-green border border-terminal-green/20">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="pt-4 border-t border-terminal-green/20">
                 <a 
                   href={project.github}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-sm text-terminal-green hover:underline decoration-terminal-green/50 underline-offset-4"
                 >
                   View Source <ExternalLink size={14} />
                 </a>
              </div>
            </div>
          </TerminalCard>
        ))}
      </div>
    </section>
  );
};

export default Projects;