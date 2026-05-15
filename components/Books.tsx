import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { BOOKS } from '../constants';
import { BookOpen, ChevronDown } from 'lucide-react';

const INITIAL_SHOW = 4;
const LOAD_MORE = 2;

const CATEGORY_COLORS: Record<string, string> = {
  ROMANCE: 'text-pink-400 border-pink-400/30',
  HORROR: 'text-red-400 border-red-400/30',
  THRILLER: 'text-orange-400 border-orange-400/30',
  MYSTERY: 'text-purple-400 border-purple-400/30',
  FINANCE: 'text-yellow-400 border-yellow-400/30',
  FAMOUS: 'text-blue-400 border-blue-400/30',
  'SELF-HELP': 'text-green-400 border-green-400/30',
  'TO BE READ': 'text-gray-400 border-gray-400/30',
};

const Books: React.FC = () => {
  const [visible, setVisible] = useState(INITIAL_SHOW);

  const shown = BOOKS.slice(0, visible);
  const hasMore = visible < BOOKS.length;

  return (
    <section className="py-20" id="books">
      <SectionHeader title="library --list" />

      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-gray-500 font-mono">
          <span className="text-terminal-green">{BOOKS.length}</span> books catalogued
        </p>
        <span className="text-xs text-gray-600 font-mono">showing {shown.length}</span>
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {shown.map((book, idx) => {
          const color = CATEGORY_COLORS[book.category] ?? 'text-gray-400 border-gray-400/30';
          return (
            <div
              key={idx}
              className="group relative border border-terminal-green/15 bg-black p-3 hover:border-terminal-green/40 transition-all duration-200 hover:bg-terminal-green/5"
            >
              {/* Book icon */}
              <BookOpen
                size={14}
                className="text-terminal-green/30 group-hover:text-terminal-green/60 transition-colors mb-2"
              />

              {/* Title */}
              <h4 className="text-white text-xs font-semibold leading-snug line-clamp-2 group-hover:text-terminal-green transition-colors mb-1">
                {book.title}
              </h4>

              {/* Author */}
              <p className="text-gray-500 text-[10px] truncate">{book.author}</p>

              {/* Genre badge */}
              <span
                className={`inline-block mt-2 text-[9px] font-mono px-1.5 py-0.5 border rounded-sm ${color}`}
              >
                {book.category}
              </span>

              {/* ID watermark */}
              <span className="absolute top-2 right-2 text-[9px] text-terminal-green/15 font-mono">
                #{String(idx + 1).padStart(3, '0')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisible(v => Math.min(v + LOAD_MORE, BOOKS.length))}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-mono border border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10 hover:border-terminal-green transition-all"
          >
            <ChevronDown size={14} />
            load_more() &nbsp;·&nbsp; {BOOKS.length - visible} remaining
          </button>
        </div>
      )}

      {/* All loaded state */}
      {!hasMore && visible > INITIAL_SHOW && (
        <p className="mt-5 text-center text-[10px] text-gray-600 font-mono">
          [ all {BOOKS.length} books loaded ]
        </p>
      )}
    </section>
  );
};

export default Books;