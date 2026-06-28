import React from 'react';
import SectionHeader from './SectionHeader';
import TerminalCard from './TerminalCard';

const About: React.FC = () => {
  return (
    <section className="py-20" id="about">
      <SectionHeader title="about_me" />
      <TerminalCard className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4 font-mono">
        <p>
          <span className="text-terminal-green font-bold mr-2">&gt;</span>
          Software Engineer Intern specializing in scalable backend services, fintech workflows, and high-volume multi-service architectures.
        </p>

        <p>
          <span className="text-terminal-green font-bold mr-2">&gt;</span>
          Hands-on expertise across Go, Java (Spring Boot), Node.js, Express, PostgreSQL, MongoDB, and Redis for distributed caching & concurrency control.
        </p>

        <p>
          <span className="text-terminal-green font-bold mr-2">&gt;</span>
          Graduated with a B.E. in Computer Science & Engineering from BMS Institute of Technology, Bengaluru (CGPA: 8.73).
        </p>
      </TerminalCard>
    </section>
  );
};

export default About;