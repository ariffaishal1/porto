import { Experience } from "@/types/experience";

export const experienceData: Experience[] = [
  {
    company: "RSUD Majalengka",
    role: "Junior Software Developer",
    location: "Majalengka, Jawa Barat",
    startDate: "2026",
    endDate: "Sekarang",
    current: true,
    description: "Bertanggung jawab dalam pemeliharaan, pengembangan fitur, serta optimalisasi sistem informasi rumah sakit dan aplikasi pendukung layanan kesehatan operasional.",
    achievements: [
      "Terlibat dalam pengembangan dan pemeliharaan modul Sistem Informasi Manajemen Rumah Sakit (SIMRS) guna mendukung kelancaran operasional tenaga medis dan administrasi.",
      "Mengintegrasikan RESTful API dan mengoptimasi pengolahan data database untuk memastikan pertukaran informasi antar-layanan berjalan cepat dan reliabel.",
      "Melakukan debugging, refactoring modul sistem lama, dan meningkatkan kenyamanan antarmuka pengguna internal staf rumah sakit."
    ],
    technologies: ["JavaScript", "TypeScript", "Dart", "PostgreSQL", "RESTful API", "Git", "Flutter"],
  },
  {
    company: "Tugas Akhir — Sistem Deteksi Dini Longsor",
    role: "IoT & Mobile Developer (Riset Akademik)",
    location: "Indonesia",
    startDate: "2025",
    endDate: "2026",
    current: false,
    description: "Merancang dan mengimplementasikan sistem pemantauan kondisi tanah dan peringatan dini bencana longsor berbasis aplikasi Android yang terintegrasi dengan modul telemetri LoRa.",
    achievements: [
      "Membangun aplikasi mobile Android untuk visualisasi data sensor pergerakan/kemiringan dan kelembaban tanah secara real-time.",
      "Mengintegrasikan komunikasi nirkabel jarak jauh menggunakan modul LoRa (Long Range) berdaya rendah guna menjangkau area blank-spot minim sinyal seluler.",
      "Merancang logika ambang batas bahaya (thresholding) dan sistem notifikasi peringatan darurat otomatis ketika terdeteksi indikasi pergeseran tanah."
    ],
    technologies: ["Android", "Flutter", "Dart", "LoRa", "IoT Sensors", "Microcontroller"],
  },
  {
    company: "Proyek Akademik & Mandiri",
    role: "Software Developer (Fresh Graduate)",
    location: "Indonesia",
    startDate: "2024",
    endDate: "2025",
    current: false,
    description: "Mengeksplorasi dan membangun berbagai proyek aplikasi Web modern dan integrasi kecerdasan buatan (AI) selama masa studi.",
    achievements: [
      "Merancang dan membangun platform 'Ruang PRD' berbasis Next.js, TypeScript, Tailwind CSS, dan integrasi AI LLM.",
      "Menerapkan standar version control Git, pengujian fungsional terstruktur, dan prinsip clean code pada setiap proyek perangkat lunak."
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Git"],
  },
];
