import React from 'react';
import SectionHeader from './SectionHeader';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="py-20" id="skills">
      <SectionHeader title="skills --list" />
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((skill, index) => (
          <div 
            key={index}
            className="px-3 py-1 border border-terminal-green/40 text-sm hover:bg-terminal-green/10 hover:border-terminal-green cursor-default transition-colors text-gray-300 hover:text-terminal-green hover:shadow-[0_0_8px_rgba(0,255,0,0.3)]"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;