import { LeetCodeStats } from '../types';

export const fetchLeetCodeStats = async (): Promise<LeetCodeStats> => {
  try {
    const response = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/manukesharwani');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    if (data.errors || data.totalSolved === undefined) {
      return { status: 'error' };
    }

    const acAll = data.matchedUserStats?.acSubmissionNum?.find((d: any) => d.difficulty === 'All')?.submissions || 0;
    const totalAll = data.matchedUserStats?.totalSubmissionNum?.find((d: any) => d.difficulty === 'All')?.submissions || 1;
    const acceptanceRate = ((acAll / totalAll) * 100).toFixed(2);

    return {
      status: 'success',
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      ranking: data.ranking,
      contributionPoints: data.contributionPoint,
      reputation: data.reputation,
      acceptanceRate: acceptanceRate,
      totalQuestions: data.totalQuestions,
    };
  } catch (error) {
    console.error("LeetCode fetch error:", error);
    return { status: 'error' };
  }
};