import { Skill } from "@/types/skill";

export const skillsData: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", featured: true },
  { name: "Next.js", category: "Frontend", featured: true },
  { name: "TypeScript", category: "Frontend", featured: true },
  { name: "JavaScript (ES6+)", category: "Frontend", featured: true },
  { name: "Tailwind CSS", category: "Frontend", featured: true },
  { name: "HTML5 & CSS3", category: "Frontend" },
  { name: "Redux / Zustand", category: "Frontend" },

  // Backend
  { name: "Node.js", category: "Backend", featured: true },
  { name: "Express.js", category: "Backend", featured: true },
  { name: "RESTful API", category: "Backend", featured: true },
  { name: "PHP / Laravel", category: "Backend" },

  // Mobile
  { name: "Flutter", category: "Mobile", featured: true },
  { name: "Dart", category: "Mobile", featured: true },
  { name: "React Native", category: "Mobile" },

  // Database
  { name: "PostgreSQL", category: "Database", featured: true },
  { name: "MySQL", category: "Database", featured: true },
  { name: "MongoDB", category: "Database" },

  // Tools
  { name: "Git & GitHub", category: "Tools", featured: true },
  { name: "VS Code", category: "Tools", featured: true },
  { name: "Postman", category: "Tools" },
  { name: "Docker (Basic)", category: "Tools" },
  { name: "Vercel", category: "Tools" },

  // Concepts
  { name: "Responsive Web Design", category: "Concepts", featured: true },
  { name: "Clean Architecture", category: "Concepts", featured: true },
  { name: "UI/UX Principles", category: "Concepts" },
  { name: "Agile / Scrum", category: "Concepts" },
];
