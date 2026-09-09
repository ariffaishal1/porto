export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Database"
  | "Tools"
  | "Concepts"
  | "AI";

export type Skill = {
  name: string;
  category: SkillCategory;
  icon?: string;
  featured?: boolean;
};
