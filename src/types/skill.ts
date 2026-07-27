export type SkillCategory = 
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Database"
  | "Tools"
  | "Concepts";

export type Skill = {
  name: string;
  category: SkillCategory;
  icon?: string;
  featured?: boolean;
};
