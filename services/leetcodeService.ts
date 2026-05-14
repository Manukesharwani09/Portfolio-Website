import { LeetCodeStats } from '../types';

export const fetchLeetCodeStats = async (): Promise<LeetCodeStats> => {
  try {
    const [profileRes, contestRes] = await Promise.all([
      fetch('https://alfa-leetcode-api.onrender.com/userProfile/manukesharwani'),
      fetch('https://alfa-leetcode-api.onrender.com/manukesharwani/contest')
    ]);

    if (!profileRes.ok || !contestRes.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await profileRes.json();
    const contestData = await contestRes.json();

    if (data.errors || data.totalSolved === undefined) {
      return { status: 'error' };
    }

    // Get last 5 contests (most recent first)
    let recentContests = [];
    if (contestData.contestParticipation && Array.isArray(contestData.contestParticipation)) {
      recentContests = contestData.contestParticipation.slice(-5).reverse();
    }

    return {
      status: 'success',
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      ranking: data.ranking,
      // Contest data from the contest endpoint
      contestRating: Math.round(contestData.contestRating || 0),
      contestAttend: contestData.contestAttend || 0,
      contestGlobalRanking: contestData.contestGlobalRanking,
      totalParticipants: contestData.totalParticipants,
      contestTopPercentage: contestData.contestTopPercentage,
      contestHistory: recentContests,
    };
  } catch (error) {
    console.error("LeetCode fetch error:", error);
    return { status: 'error' };
  }
};