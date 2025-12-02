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
          I’m a B.Tech CSE student skilled in full-stack development, AI-powered applications, and Data Structures & Algorithms (550+ LeetCode problems).
        </p>
        <p>
          <span className="text-terminal-green font-bold mr-2">&gt;</span>
          I work with MERN/Next.js and build LLM-based tools using LangChain, ChromaDB, and Hugging Face.
        </p>
      </TerminalCard>
    </section>
  );
};

export default About;