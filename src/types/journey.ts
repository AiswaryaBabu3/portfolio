export type SceneNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface SceneMeta {
  number: SceneNumber;
  id: string;
  name: string;
  subtitle: string;
}

export const SCENES: SceneMeta[] = [
  { number: 1, id: 'stage', name: 'The Stage', subtitle: 'Welcome to My World' },
  { number: 2, id: 'discover', name: 'Discover', subtitle: 'The Rhythm of Code' },
  { number: 3, id: 'about', name: 'About Me', subtitle: 'The Persona & Ethos' },
  { number: 4, id: 'skills', name: 'My Skills', subtitle: 'Choreographed Technologies' },
  { number: 5, id: 'projects', name: 'Projects', subtitle: 'The Architecture Gallery' },
  { number: 6, id: 'experience', name: 'Experience', subtitle: 'The Illuminated Path' },
  { number: 7, id: 'beyond', name: 'Beyond Code', subtitle: 'Artistry & Passions' },
  { number: 8, id: 'ai', name: 'Aishu AI', subtitle: 'The Intelligent Orb' },
  { number: 9, id: 'finale', name: 'Curtain Call', subtitle: 'Let\'s Create Something' },
];

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  features: string[];
  contribution: string;
  result: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceData {
  year: string;
  role: string;
  company: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillNode {
  name: string;
  movement: string;
  category: 'backend' | 'ai' | 'frontend' | 'data' | 'system';
  level: string;
  description: string;
  iconName: string;
}
