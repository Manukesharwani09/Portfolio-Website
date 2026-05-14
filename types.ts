export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  id: number;
}

export interface Book {
  title: string;
  author: string;
  category: string;
}

export interface ContestData {
  contest: { title: string; startTime: number };
  ranking: number;
  rating: number;
  problemsSolved: number;
  totalProblems: number;
  trendDirection: string;
}

export interface LeetCodeStats {
  status: 'success' | 'error' | 'loading';
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number;
  contestRating?: number;
  contestAttend?: number;
  contestGlobalRanking?: number;
  totalParticipants?: number;
  contestTopPercentage?: number;
  contestHistory?: ContestData[];
}

export interface NavItem {
  label: string;
  id: string;
}