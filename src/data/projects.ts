import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    slug: "prd-gene",
    title: "Ruang PRD — AI Product Workshop",
    summary: "Platform AI Product Workshop interaktif untuk menyusun Product Requirement Document (PRD) yang terstruktur dan komprehensif melalui percakapan discovery cerdas.",
    description: "Ruang PRD adalah platform berbasis AI yang membantu product manager, developer, dan founder merumuskan ide produk menjadi dokumen kebutuhan produk (PRD) yang tajam, terstruktur, dan siap diimplementasikan secara komprehensif melalui dialog discovery interaktif.",
    category: "AI & Fullstack",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide React", "AI SDK / LLM", "Markdown"],
    thumbnail: "/images/projects/prd-gene-thumb.jpg",
    images: ["/images/projects/prd-gene-thumb.jpg"],
    role: "Fullstack & AI Developer",
    year: 2026,
    featured: true,
    status: "completed",
    demoUrl: "https://prd-gene.vercel.app/",
    repositoryUrl: "https://github.com/ariffaishal1/prd-gene",
  },
];
