export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'live' | 'placeholder';
  concept: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPlaceholder?: boolean;
  image?: string;
  badge?: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  description: string;
  iconName: string;
  featured?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  location?: string;
  description: string;
  responsibilities: string[];
  highlights: string[];
  techUsed: string[];
}

export interface CapabilityItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
