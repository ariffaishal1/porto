export type ProjectStatus = "completed" | "in-progress" | "archived";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  role: string;
  year: number;
  featured: boolean;
  status: ProjectStatus;
  demoUrl?: string;
  repositoryUrl?: string;
};
