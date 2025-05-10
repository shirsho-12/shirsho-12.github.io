export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  youtubeUrl?: string;
  paperUrl?: string;
  content?: string;
  featured?: boolean;
}
