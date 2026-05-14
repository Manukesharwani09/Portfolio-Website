import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import TerminalCard from './TerminalCard';
import { fetchLeetCodeStats } from '../services/leetcodeService';
import { LeetCodeStats } from '../types';
import { RefreshCw, Trophy, Target, TrendingUp, TrendingDown } from 'lucide-react';

const LeetCode: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats>({ status: 'loading' });

  const loadStats = async () => {
    setStats({ status: 'loading' });
    const data = await fetchLeetCodeStats();
    setStats(data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <section className="py-20" id="leetcode">
      <div className="flex justify-between items-center mb-8">
        <SectionHeader title="leetcode_stats --live" />
        <button
          onClick={loadStats}
          disabled={stats.status === 'loading'}
          className="flex items-center gap-2 px-3 py-1 text-sm border border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10 disabled:opacity-50 transition-colors"
        >
          <RefreshCw size={14} className={stats.status === 'loading' ? 'animate-spin' : ''} />
          {stats.status === 'loading' ? 'Fetching...' : 'Refresh'}
        </button>
      </div>

      {stats.status === 'error' ? (
        <TerminalCard className="border-red-500/50">
          <p className="text-red-400">Error: Could not connect to LeetCode API.</p>
          <p className="text-gray-500 text-sm mt-2">Try refreshing later.</p>
        </TerminalCard>
      ) : stats.status === 'loading' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-28 border border-terminal-green/20 bg-terminal-green/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Problem Solving */}
          <TerminalCard className="space-y-3">
            <h3 className="text-lg font-bold mb-3 border-b border-terminal-green/30 pb-2 flex items-center gap-2">
              <Target size={16} /> Problem Solving
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total Solved</span>
              <span className="font-mono font-bold text-2xl text-terminal-green">{stats.totalSolved}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-400">Easy: <strong>{stats.easySolved}</strong></span>
              <span className="text-yellow-400">Medium: <strong>{stats.mediumSolved}</strong></span>
              <span className="text-red-400">Hard: <strong>{stats.hardSolved}</strong></span>
            </div>
            <div className="mt-2 flex justify-between items-center text-sm border-t border-terminal-green/20 pt-3">
              <span className="text-gray-400">Global Rank</span>
              <span className="font-mono text-terminal-green">#{stats.ranking?.toLocaleString()}</span>
            </div>
          </TerminalCard>

          {/* Contest Stats */}
          <TerminalCard className="space-y-3">
            <h3 className="text-lg font-bold mb-3 border-b border-terminal-green/30 pb-2 flex items-center gap-2">
              <Trophy size={16} /> Contest Stats
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Contest Rating</span>
              <span className="font-mono font-bold text-2xl text-yellow-400">{stats.contestRating?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Contests Attended</span>
              <span className="font-mono text-terminal-green font-bold">{stats.contestAttend}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Global Rank</span>
              <span className="font-mono text-terminal-green">#{stats.contestGlobalRanking?.toLocaleString()} / {stats.totalParticipants?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-terminal-green/20 pt-3">
              <span className="text-gray-400">Top</span>
              <span className="font-mono text-terminal-green">{stats.contestTopPercentage}%</span>
            </div>
          </TerminalCard>

          {/* Recent Contests */}
          <TerminalCard>
            <h3 className="text-lg font-bold mb-3 border-b border-terminal-green/30 pb-2">Recent Contests</h3>
            <div className="space-y-2">
              {stats.contestHistory && stats.contestHistory.length > 0 ? (
                stats.contestHistory.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs border-b border-gray-800 pb-2">
                    <span className="text-gray-300 truncate max-w-[55%]">{c.contest.title}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gray-500">#{c.ranking.toLocaleString()}</span>
                      {c.trendDirection === 'UP' ? (
                        <TrendingUp size={12} className="text-green-400" />
                      ) : (
                        <TrendingDown size={12} className="text-red-400" />
                      )}
                      <span className={c.trendDirection === 'UP' ? 'text-green-400' : 'text-red-400'}>
                        {Math.round(c.rating)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recent contests found.</p>
              )}
            </div>
          </TerminalCard>

        </div>
      )}
    </section>
  );
};

export default LeetCode;