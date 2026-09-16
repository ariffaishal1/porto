import { Education } from "@/types/education";
import type { Language } from "@/lib/i18n/dictionaries";

export const educationDataId: Education[] = [
  {
    institution: "Universitas Widyatama",
    degree: "S1 Informatika",
    field: "Teknik Informatika",
    titleSuffix: "S.Kom.",
    year: "2025",
    location: "Bandung, Jawa Barat",
    description: "Fokus studi pada Rekayasa Perangkat Lunak, Jaringan Komputer, dan Sistem Cerdas. Proyek Riset Tugas Akhir: Rancang Bangun Sistem Deteksi Dini Bencana Tanah Longsor Terintegrasi IoT LoRa dan Aplikasi Android.",
  },
  {
    institution: "Telkom University",
    degree: "D3 Teknik Komputer",
    field: "Teknik Komputer",
    titleSuffix: "A.Md.T.",
    year: "2022",
    location: "Bandung, Jawa Barat",
    description: "Fokus studi pada Arsitektur Komputer, Jaringan & Komunikasi Data, Mikrokontroler, Elektronika Digital, dan Fundamental Pemrograman.",
  },
];

export const educationDataEn: Education[] = [
  {
    institution: "Widyatama University",
    degree: "Bachelor of Computer Science",
    field: "Informatics & Computer Science",
    titleSuffix: "S.Kom.",
    year: "2025",
    location: "Bandung, West Java, Indonesia",
    description: "Concentrated on Software Engineering, Computer Networks, and Intelligent Systems. Capstone Project: Design and Implementation of a Landslide Early Warning System Integrating IoT LoRa Telemetry and Android Application.",
  },
  {
    institution: "Telkom University",
    degree: "Associate in Computer Engineering",
    field: "Computer Engineering",
    titleSuffix: "A.Md.T.",
    year: "2022",
    location: "Bandung, West Java, Indonesia",
    description: "Focused on Computer Architecture, Networking & Data Communications, Microcontrollers, Digital Electronics, and Programming Fundamentals.",
  },
];

// Default export
export const educationData = educationDataId;

export function getEducationData(lang: Language): Education[] {
  return lang === "en" ? educationDataEn : educationDataId;
}
