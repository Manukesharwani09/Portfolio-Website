import { LeetCodeStats } from '../types';

export const fetchLeetCodeStats = async (): Promise<LeetCodeStats> => {
  try {
    const response = await fetch('https://leetcode-stats-api.herokuapp.com/manukesharwani');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    if (data.status === 'error') {
      return { status: 'error' };
    }

    return {
      status: 'success',
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      ranking: data.ranking,
      contributionPoints: data.contributionPoints,
      reputation: data.reputation,
      acceptanceRate: data.acceptanceRate,
      totalQuestions: data.totalQuestions,
    };
  } catch (error) {
    console.error("LeetCode fetch error:", error);
    return { status: 'error' };
  }
};