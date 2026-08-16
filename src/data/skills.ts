import { PORTFOLIO_DATA } from './portfolioData';

export interface SkillCategory {
  title: string;
  category?: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    badge: string;
    description: string;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = PORTFOLIO_DATA.skills;
