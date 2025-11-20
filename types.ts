import { LucideIcon } from 'lucide-react';

export interface LocalizedString {
  en: string;
  pl: string;
}

export interface Project {
  id: number;
  title: string;
  description: LocalizedString;
  challenge: LocalizedString; // New: Problem to solve
  solution: LocalizedString;  // New: How it was solved
  features: LocalizedString[]; // New: Key features list
  tags: string[];
  imageUrl: string;
  repoUrl: string;
  demoUrl?: string;
}

export interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface CommandAction {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
}