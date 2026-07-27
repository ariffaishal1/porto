export type Profile = {
  name: string;
  shortName?: string;
  role: string;
  headline: string;
  shortBio: string;
  fullBio: string[];
  location?: string;
  availability?: string;
  email: string;
  avatar: string;
  resumeUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
};
