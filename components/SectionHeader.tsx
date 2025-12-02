import React from 'react';

interface SectionHeaderProps {
  title: string;
  id?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, id }) => {
  return (
    <div className="mb-8 flex items-center gap-4" id={id}>
      <span className="text-terminal-green text-xl md:text-2xl font-bold tracking-tight">
        &gt; {title}
      </span>
      <div className="flex-1 h-px bg-terminal-green/30" />
    </div>
  );
};

export default SectionHeader;