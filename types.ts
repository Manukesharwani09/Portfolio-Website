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

export interface LeetCodeStats {
  status: 'success' | 'error' | 'loading';
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number;
  contributionPoints?: number;
  reputation?: number;
  submissionCalendar?: Record<string, number>;
  totalQuestions?: number;
  acceptanceRate?: number;
}

export interface NavItem {
  label: string;
  id: string;
}