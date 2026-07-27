import { Experience } from "@/types/experience";

export const experienceData: Experience[] = [
  {
    company: "Freelance & Independent Projects",
    role: "Junior Software Developer",
    location: "Remote / Indonesia",
    startDate: "2025",
    endDate: "Sekarang",
    current: true,
    description: "Mengembangkan berbagai proyek aplikasi web & mobile untuk klien individual dan proyek portofolio pribadi.",
    achievements: [
      "Membangun aplikasi e-commerce fullstack menggunakan Next.js dan PostgreSQL dengan skor performa Lighthouse 95+.",
      "Mengembangkan aplikasi manajemen keuangan berbasis Flutter dengan manajemen state terstruktur dan penyimpanan lokal SQLite.",
      "Mengimplementasikan komponen UI modular berbasis Tailwind CSS dan TypeScript untuk mempermudah pemeliharaan kode."
    ],
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Flutter", "Node.js", "PostgreSQL"],
  },
  {
    company: "Proyek Independen & Open Source",
    role: "Frontend Developer Contributor",
    location: "Indonesia",
    startDate: "2024",
    endDate: "2025",
    current: false,
    description: "Berkontribusi dalam pengujian, eksplorasi teknologi baru, dan pembuatan aplikasi web modern.",
    achievements: [
      "Membuat antarmuka responsif yang ramah aksesibilitas dan mendukung dark mode.",
      "Mengintegrasikan RESTful API dan validasi formulir interaktif menggunakan Zod."
    ],
    technologies: ["React", "JavaScript", "HTML5", "CSS3", "Git"],
  },
];
