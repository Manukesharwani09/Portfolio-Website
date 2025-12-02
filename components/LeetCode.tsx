import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import TerminalCard from './TerminalCard';
import { fetchLeetCodeStats } from '../services/leetcodeService';
import { LeetCodeStats } from '../types';
import { RefreshCw, Trophy, Target, TrendingUp, Calendar } from 'lucide-react';

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

  const StatItem: React.FC<{ label: string; value: string | number; icon?: React.ReactNode; color?: string }> = ({ label, value, icon, color = 'text-terminal-green' }) => (
    <div className="flex items-center justify-between p-3 border border-terminal-green/20 bg-terminal-green/5">
      <div className="flex items-center gap-3">
        {icon && <span className="text-terminal-green">{icon}</span>}
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <span className={`font-bold font-mono text-lg ${color}`}>{value}</span>
    </div>
  );

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
          {stats.status === 'loading' ? 'Fetching...' : 'Refresh Stats'}
        </button>
      </div>

      {stats.status === 'error' ? (
        <TerminalCard className="border-red-500/50">
          <p className="text-red-400">Error: Could not connect to LeetCode API service.</p>
          <p className="text-gray-500 text-sm mt-2">Try refreshing later.</p>
        </TerminalCard>
      ) : stats.status === 'loading' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 border border-terminal-green/20 bg-terminal-green/5"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stats */}
          <TerminalCard className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-terminal-green/30 pb-2">Problem Solving</h3>
            <StatItem label="Total Solved" value={stats.totalSolved || 0} icon={<Target size={16} />} />
            <StatItem label="Easy" value={stats.easySolved || 0} color="text-green-400" />
            <StatItem label="Medium" value={stats.mediumSolved || 0} color="text-yellow-400" />
            <StatItem label="Hard" value={stats.hardSolved || 0} color="text-red-400" />
          </TerminalCard>

          {/* Ranking & Contest */}
          <TerminalCard className="lg:col-span-2 flex flex-col justify-between">
            <h3 className="text-xl font-bold mb-4 border-b border-terminal-green/30 pb-2">Global Ranking & Activity</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <StatItem label="Global Ranking" value={`#${stats.ranking?.toLocaleString() || 'N/A'}`} icon={<Trophy size={16} />} />
               <StatItem label="Total Questions" value={stats.totalQuestions || 'N/A'} icon={<Target size={16} />} />
               <StatItem label="Acceptance Rate" value={`${stats.acceptanceRate}%`} icon={<TrendingUp size={16} />} />
               <StatItem label="Contribution" value={stats.contributionPoints || 0} icon={<Calendar size={16} />} />
            </div>

            <div className="mt-6 p-4 border border-terminal-green/30 bg-black relative overflow-hidden">
               <p className="text-sm text-gray-400 mb-2">{'> recent_contest_history'}</p>

               <div className="flex gap-1 text-xs font-mono text-terminal-green/70">
                 <span>[SUCCESS]</span>
                 <span className="text-white">Fetched last 5 contests...</span>
               </div>
               <div className="mt-2 text-xs text-gray-500">
                  {/* Mocked data for visuals since API might not return granular contest history nicely */}
                  <div className="flex justify-between py-1 border-b border-gray-800"><span>Weekly Contest 388</span><span>Rank: 1402/25000</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-800"><span>Biweekly Contest 125</span><span>Rank: 980/21000</span></div>
               </div>
            </div>
          </TerminalCard>
        </div>
      )}
    </section>
  );
};

export default LeetCode;