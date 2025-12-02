import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import TerminalCard from './TerminalCard';
import { BOOKS } from '../constants';

const Books: React.FC = () => {
  const categories = ['ALL', ...Array.from(new Set(BOOKS.map(b => b.category)))];
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredBooks = activeCategory === 'ALL' 
    ? BOOKS 
    : BOOKS.filter(book => book.category === activeCategory);

  return (
    <section className="py-20" id="books">
      <SectionHeader title="library --list" />
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-3 py-1 text-xs md:text-sm border transition-all duration-300
              ${activeCategory === cat 
                ? 'bg-terminal-green text-black border-terminal-green font-bold shadow-[0_0_10px_rgba(0,255,0,0.5)]' 
                : 'bg-black text-terminal-green border-terminal-green/30 hover:border-terminal-green'}
            `}
          >
            --genre="{cat}"
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBooks.map((book, idx) => (
          <TerminalCard key={idx} className="p-4 min-h-[140px] flex flex-col justify-between group">
            <div>
              <div className="text-xs text-terminal-green/50 mb-1 border-b border-terminal-green/10 pb-1">
                ID: {String(idx + 1).padStart(3, '0')} | {book.category}
              </div>
              <h4 className="font-bold text-white group-hover:text-terminal-green transition-colors line-clamp-2">
                {book.title}
              </h4>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              By {book.author}
            </div>
          </TerminalCard>
        ))}
      </div>
    </section>
  );
};

export default Books;