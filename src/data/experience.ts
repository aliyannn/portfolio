import { PORTFOLIO_DATA } from './portfolioData';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship' | 'Freelance';
  description: string;
  achievements: string[];
  techStack: string[];
}

export const EXPERIENCES: ExperienceItem[] = PORTFOLIO_DATA.experiences;
