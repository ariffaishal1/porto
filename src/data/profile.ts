import { Profile } from "@/types/profile";
import type { Language } from "@/lib/i18n/dictionaries";

export const profileDataId: Profile = {
  name: "Arif Faishal Nugraha",
  shortName: "Arif",
  role: "Software Engineer",
  headline: "Merancang dan membangun aplikasi Web, Mobile, & Desktop yang tangguh, cepat, serta terintegrasi dengan teknologi modern.",
  shortBio: "Software Engineer dengan fokus pada aplikasi multiplatform (Web, Mobile, Desktop) dan integrasi AI. Menitikberatkan pada arsitektur kode yang bersih, performa tinggi, dan solusi yang bermanfaat nyata.",
  fullBio: [
    "Saya seorang Software Engineer yang berdedikasi membangun solusi perangkat lunak lintas platform — mulai dari aplikasi Web responsif, aplikasi Mobile yang intuitif, hingga integrasi model AI/LLM yang fungsional.",
    "Fokus utama saya bertumpu pada ekosistem Next.js, React, TypeScript, Flutter, dan AI. Saya memprioritaskan kode yang bersih, modular, mudah dipelihara, serta pengalaman interaksi pengguna yang mulus.",
    "Siap berkontribusi dalam tim rekayasa perangkat lunak profesional maupun berkolaborasi dalam membangun produk inovatif dari tahap perancangan hingga rilis."
  ],
  location: "Majalengka, Jawa Barat, Indonesia",
  availability: "Terbuka untuk Peluang Kerja & Freelance",
  email: "ariffaishal1@gmail.com",
  avatar: "/profile.jpg",
  resumeUrl: "/cv",
  socialLinks: {
    github: "https://github.com/ariffaishal1",
    linkedin: "https://www.linkedin.com/in/arif-faishal-nugraha/",
  },
};

export const profileDataEn: Profile = {
  name: "Arif Faishal Nugraha",
  shortName: "Arif",
  role: "Software Engineer",
  headline: "Architecting and engineering resilient, fast, and multiplatform Web, Mobile, and Desktop software integrated with modern technologies.",
  shortBio: "Software Engineer specializing in multiplatform systems (Web, Mobile, Desktop) and AI integration. Dedicated to clean architecture, high performance, and impactful real-world solutions.",
  fullBio: [
    "I am a Software Engineer dedicated to building cross-platform software solutions — from responsive Web applications and intuitive Mobile apps to functional AI/LLM integrations.",
    "My core focus centers around Next.js, React, TypeScript, Flutter, and AI ecosystems. I prioritize clean, modular, and maintainable architecture paired with seamless user experiences.",
    "Open to contributing to high-standard engineering teams and collaborating on innovative digital products from discovery to production release."
  ],
  location: "Majalengka, West Java, Indonesia",
  availability: "Open for Opportunities & Freelance",
  email: "ariffaishal1@gmail.com",
  avatar: "/profile.jpg",
  resumeUrl: "/cv",
  socialLinks: {
    github: "https://github.com/ariffaishal1",
    linkedin: "https://www.linkedin.com/in/arif-faishal-nugraha/",
  },
};

// Default export for backward compatibility
export const profileData = profileDataId;

export function getProfileData(lang: Language): Profile {
  return lang === "en" ? profileDataEn : profileDataId;
}
