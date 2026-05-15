import React from 'react';
import SectionHeader from './SectionHeader';
import TerminalCard from './TerminalCard';

const About: React.FC = () => {
  return (
    <section className="py-20" id="about">
      <SectionHeader title="about_me" />
      <TerminalCard className="text-lg leading-relaxed text-gray-300">
        <p className="mb-4">
          <span className="text-terminal-green font-bold mr-2">&gt;</span>
          Software engineer focused on full-stack development,
          backend systems, and scalable web applications.
        </p>

        <p className="mb-4">
          <span className="text-terminal-green font-bold mr-2">&gt;</span>
          Experienced with REST APIs, Redis, MongoDB,
          authentication systems, and performance optimization.
        </p>

        <p className="mb-4">
          <span className="text-terminal-green font-bold mr-2">&gt;</span>
          Solved 550+ DSA problems and achieved a
          1600+ rating on LeetCode.
        </p>
        <p>
          <span className="text-terminal-green font-bold mr-2">&gt;</span>
          Building with MERN, Next.js, TypeScript, and AWS.
        </p>
      </TerminalCard>
    </section>
  );
};

export default About;