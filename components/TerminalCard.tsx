import React from 'react';

interface TerminalCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const TerminalCard: React.FC<TerminalCardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div 
      className={`
        relative border border-terminal-green/40 bg-black p-6 
        ${hoverEffect ? 'hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] hover:border-terminal-green' : ''} 
        transition-all duration-300 group ${className}
      `}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-terminal-green opacity-80" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-terminal-green opacity-80" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-terminal-green opacity-80" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-terminal-green opacity-80" />
      
      {children}
    </div>
  );
};

export default TerminalCard;