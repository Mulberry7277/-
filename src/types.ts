export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // YYYY-MM-DD
  lastModified?: string;
  categories: string[];
  tags: string[];
  description: string;
  content: string;
  coverImage?: string;
  coverAlt?: string;
  pin?: boolean;
  views?: number;
  readingTime?: number; // minutes
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

export interface BlogProfile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  github: string;
  twitter: string;
  email: string;
  siteUrl: string;
}

export type ThemeMode = 'dark' | 'light';

export type ActiveTab = 'home' | 'categories' | 'tags' | 'archives' | 'about';
