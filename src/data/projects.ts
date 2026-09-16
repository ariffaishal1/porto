import { Project } from "@/types/project";
import type { Language } from "@/lib/i18n/dictionaries";

export const projectsDataId: Project[] = [
  {
    slug: "prd-gene",
    title: "Ruang PRD — AI Product Workshop",
    summary: "Platform AI Product Workshop interaktif untuk menyusun Product Requirement Document (PRD) yang terstruktur dan komprehensif melalui percakapan discovery cerdas.",
    description: "Ruang PRD adalah platform berbasis AI yang membantu product manager, developer, dan founder merumuskan ide produk menjadi dokumen kebutuhan produk (PRD) yang tajam, terstruktur, dan siap diimplementasikan secara komprehensif melalui dialog discovery interaktif.",
    category: "AI & Fullstack",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide React", "AI SDK / LLM", "Markdown"],
    thumbnail: "/images/projects/prd-gene-thumb.png",
    images: ["/images/projects/prd-gene-thumb.png"],
    role: "Fullstack & AI Developer",
    year: 2026,
    featured: true,
    status: "completed",
    demoUrl: "https://prd-gene.vercel.app/",
    repositoryUrl: "https://github.com/ariffaishal1/prd-gene",
  },
  {
    slug: "lora-landslide-monitor",
    title: "Sistem Deteksi Dini Longsor — Android & IoT LoRa",
    summary: "Sistem pemantauan kestabilan tanah dan peringatan dini bencana tanah longsor berbasis aplikasi Android dengan transmisi nirkabel jarak jauh LoRa (Long Range).",
    description: "Proyek Tugas Akhir berupa sistem pemantauan kestabilan tanah dan deteksi dini risiko tanah longsor. Memanfaatkan jaringan telemetri nirkabel berbasis modul LoRa yang mampu mentransmisikan data sensor dari lereng rawan longsor di area minim sinyal seluler langsung ke aplikasi Android pemantau secara real-time.",
    category: "IoT & Mobile",
    technologies: ["Android", "Kotlin", "LoRa Module", "IoT Sensors", "Microcontroller"],
    thumbnail: "/images/projects/lora-landslide-thumb.jpg",
    images: ["/images/projects/lora-landslide-thumb.jpg"],
    role: "Mobile & IoT Developer",
    year: 2025,
    featured: true,
    status: "completed",
    repositoryUrl: "https://github.com/ariffaishal1",
  },
];

export const projectsDataEn: Project[] = [
  {
    slug: "prd-gene",
    title: "Ruang PRD — AI Product Workshop",
    summary: "Interactive AI Product Workshop platform to craft structured and comprehensive Product Requirement Documents (PRD) through intelligent discovery conversations.",
    description: "Ruang PRD is an AI-powered workspace empowering product managers, engineers, and founders to transform product ideas into sharp, well-structured, and implementation-ready PRDs through guided discovery dialogues.",
    category: "AI & Fullstack",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide React", "AI SDK / LLM", "Markdown"],
    thumbnail: "/images/projects/prd-gene-thumb.png",
    images: ["/images/projects/prd-gene-thumb.png"],
    role: "Fullstack & AI Developer",
    year: 2026,
    featured: true,
    status: "completed",
    demoUrl: "https://prd-gene.vercel.app/",
    repositoryUrl: "https://github.com/ariffaishal1/prd-gene",
  },
  {
    slug: "lora-landslide-monitor",
    title: "Landslide Early Warning System — Android & IoT LoRa",
    summary: "Ground stability monitoring and landslide early warning system based on an Android application with long-range (LoRa) wireless telemetry transmission.",
    description: "Undergraduate capstone project delivering a ground stability monitoring and landslide disaster early warning system. Harnessing low-power LoRa telemetry to stream sensor readings from hazardous slopes in cellular dead zones directly to an Android monitoring app in real-time.",
    category: "IoT & Mobile",
    technologies: ["Android", "Kotlin", "LoRa Module", "IoT Sensors", "Microcontroller"],
    thumbnail: "/images/projects/lora-landslide-thumb.jpg",
    images: ["/images/projects/lora-landslide-thumb.jpg"],
    role: "Mobile & IoT Developer",
    year: 2025,
    featured: true,
    status: "completed",
    repositoryUrl: "https://github.com/ariffaishal1",
  },
];

// Default export
export const projectsData = projectsDataId;

export function getProjectsData(lang: Language): Project[] {
  return lang === "en" ? projectsDataEn : projectsDataId;
}
