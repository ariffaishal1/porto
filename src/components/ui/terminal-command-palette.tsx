"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCommandPalette } from "@/components/layout/command-palette-context";
import { useAccentColor, ACCENT_COLORS } from "@/components/theme/accent-color-context";
import { useBlackHole } from "@/components/theme/black-hole-context";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { Terminal, CornerDownLeft, Sparkles, X, Volume2, VolumeX } from "lucide-react";
import { playKeyClick, playCommandBeep, isSoundEnabled, setSoundEnabled, toggleSound } from "@/lib/sound";

interface LogEntry {
  id: string;
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

interface CommandInfo {
  command: string;
  aliases?: string[];
  description: string;
  category: "Navigasi" | "Aksi" | "Info" | "Fun";
}

const COMMAND_LIST: CommandInfo[] = [
  { command: "help", description: "Menampilkan daftar seluruh perintah CLI", category: "Info" },
  { command: "projects", aliases: ["ls", "proyek"], description: "Lihat daftar proyek & buka bagian proyek", category: "Navigasi" },
  { command: "skills", aliases: ["pacman", "keahlian"], description: "Lihat ringkasan keahlian teknis", category: "Navigasi" },
  { command: "about", aliases: ["neofetch", "profil"], description: "Buka bagian tentang & profil pribadi", category: "Navigasi" },
  { command: "experience", aliases: ["git log", "karir"], description: "Buka riwayat karir & pengalaman", category: "Navigasi" },
  { command: "contact", aliases: ["kontak"], description: "Buka formulir kontak interaktif", category: "Navigasi" },
  { command: "cat", description: "Baca studi kasus proyek (contoh: cat prd-gene)", category: "Navigasi" },
  { command: "tree", description: "Tampilkan visualisasi pohon struktur portofolio", category: "Info" },
  { command: "curl", aliases: ["fetch"], description: "Ambil data JSON mentah (contoh: curl profile, curl github)", category: "Aksi" },
  { command: "sound", aliases: ["audio"], description: "Toggle efek suara ketikan keyboard mekanik retro", category: "Aksi" },
  { command: "ping", description: "Tes ping latensi jaringan ke host", category: "Info" },
  { command: "theme", description: "Ganti tema tampilan (dark, light, atau toggle)", category: "Aksi" },
  { command: "cv", aliases: ["resume"], description: "Buka dan unduh Curriculum Vitae (PDF)", category: "Aksi" },
  { command: "stats", aliases: ["gh", "github-stats"], description: "Buka widget GitHub stats & peta kontribusi", category: "Navigasi" },
  { command: "github", description: "Buka profil GitHub Arif Faishal", category: "Aksi" },
  { command: "linkedin", description: "Buka profil LinkedIn Arif Faishal", category: "Aksi" },
  { command: "email", description: "Kirim email langsung ke ariffaishal1@gmail.com", category: "Aksi" },
  { command: "whoami", description: "Informasi identitas dan spesialisasi sistem", category: "Info" },
  { command: "date", description: "Menampilkan waktu & tanggal sistem lokal", category: "Info" },
  { command: "clear", aliases: ["cls"], description: "Bersihkan riwayat layar terminal", category: "Aksi" },
  { command: "matrix", description: "Mode hacker visual green rain", category: "Fun" },
  { command: "blackhole", aliases: ["collapse", "singularity"], description: "Picu keruntuhan singularitas gravitasi", category: "Fun" },
  { command: "sudo", description: "Mencoba akses administrator sistem", category: "Fun" },
  { command: "exit", aliases: ["quit", "q"], description: "Tutup terminal interaktif (ESC)", category: "Aksi" },
];

export function TerminalCommandPalette() {
  const { isOpen, closePalette, isMatrixMode, toggleMatrixMode } =
    useCommandPalette();
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(true);

  // Sync sound setting from localStorage on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSoundEnabledState(isSoundEnabled());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundEnabledState(next);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { setAccentColor } = useAccentColor();
  const { triggerCollapse } = useBlackHole();

  // Focus input whenever palette is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Scroll to bottom when logs change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const navigateToSection = useCallback(
    (href: string) => {
      if (pathname === "/") {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
          return;
        }
      }
      router.push(`/${href}`);
    },
    [pathname, router]
  );

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add to command history
    setHistory((prev) => [trimmed, ...prev.filter((h) => h !== trimmed)]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim().toLowerCase();

    let output: React.ReactNode = null;
    let isError = false;

    switch (mainCmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-2.5 my-1 text-xs">
            <div className="text-[var(--terminal-accent)] font-semibold border-b border-[var(--terminal-border)] pb-1">
              Daftar Perintah Terminal Portofolio Arif:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {COMMAND_LIST.map((c) => (
                <div key={c.command} className="flex items-baseline gap-2">
                  <span className="text-[var(--terminal-cyan)] font-mono font-bold w-24 flex-shrink-0">
                    {c.command}
                  </span>
                  <span className="text-[var(--terminal-text-dim)] text-[11px] leading-tight">
                    {c.description}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[var(--terminal-amber)] pt-1 border-t border-[var(--terminal-border)]">
              Tip: Tekan Tab untuk autocomplete, atau klik chip saran di bawah input.
            </div>
          </div>
        );
        break;

      case "clear":
      case "cls":
        setLogs([]);
        setInput("");
        return;

      case "exit":
      case "quit":
      case "q":
        closePalette();
        setInput("");
        return;

      case "home":
      case "beranda":
        output = <span className="text-[var(--terminal-green)]">→ Mengarahkan ke Beranda...</span>;
        navigateToSection("#hero");
        setTimeout(closePalette, 400);
        break;

      case "about":
      case "neofetch":
      case "profil":
        output = <span className="text-[var(--terminal-green)]">→ Mengarahkan ke Profil & Tentang...</span>;
        navigateToSection("#about");
        setTimeout(closePalette, 400);
        break;

      case "skills":
      case "pacman":
      case "keahlian":
        output = (
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-[var(--terminal-green)]">→ Mengarahkan ke Keahlian ({skillsData.length} packages terpasang)...</span>
            <div className="text-[var(--terminal-text-dim)] text-[11px]">
              Kategori: Frontend, Backend, Mobile, Database, AI, Tools, Concepts.
            </div>
          </div>
        );
        navigateToSection("#skills");
        setTimeout(closePalette, 400);
        break;

      case "projects":
      case "ls":
      case "proyek":
        output = (
          <div className="flex flex-col gap-1.5 text-xs">
            <span className="text-[var(--terminal-green)]">→ Daftar Proyek Terpublikasi:</span>
            <div className="flex flex-col gap-1 pl-2 border-l border-[var(--terminal-border)]">
              {projectsData.map((p) => (
                <div key={p.slug} className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[var(--terminal-cyan)] font-bold">{p.slug}</span>
                  <span className="text-[var(--terminal-text-dim)]">— {p.title}</span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[var(--terminal-amber)]">
              Ketik <span className="text-[var(--terminal-accent)]">cat &lt;nama-proyek&gt;</span> (misal: <code className="bg-[var(--terminal-bg-panel)] px-1 rounded">cat prd-gene</code>) untuk membuka studi kasus lengkap.
            </div>
          </div>
        );
        navigateToSection("#projects");
        break;

      case "cat":
        if (!arg) {
          isError = true;
          output = (
            <span className="text-[var(--terminal-rose)]">
              cat: masukkan nama proyek yang ingin dibaca (contoh: <code className="text-[var(--terminal-cyan)]">cat prd-gene</code> atau <code className="text-[var(--terminal-cyan)]">cat lora-landslide-monitor</code>)
            </span>
          );
        } else {
          const matched = projectsData.find(
            (p) => p.slug.toLowerCase() === arg || p.slug.toLowerCase().includes(arg)
          );
          if (matched) {
            output = (
              <span className="text-[var(--terminal-green)]">
                → Membuka studi kasus proyek: <strong>{matched.title}</strong>...
              </span>
            );
            router.push(`/projects/${matched.slug}`);
            setTimeout(closePalette, 400);
          } else {
            isError = true;
            output = (
              <span className="text-[var(--terminal-rose)]">
                cat: proyek &apos;{arg}&apos; tidak ditemukan. Ketik &apos;projects&apos; untuk melihat daftar yang tersedia.
              </span>
            );
          }
        }
        break;

      case "tree":
        output = (
          <div className="flex flex-col gap-1 text-xs font-mono leading-relaxed py-1">
            <div className="text-[var(--terminal-green)] font-semibold">
              ~/portfolio (arif-faishal-nugraha)
            </div>
            <pre className="text-[var(--terminal-text-dim)] font-mono text-[11px] leading-snug">
{`├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/ (contact, github)
│   │   ├── 📁 projects/[slug]/
│   │   ├── 📄 layout.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 components/
│   │   ├── 📁 layout/ (navbar, footer, command-palette)
│   │   ├── 📁 sections/
│   │   │   ├── ⚡ hero-section.tsx
│   │   │   ├── 👤 about-section.tsx (Braille Singularity)
│   │   │   ├── 📦 skills-section.tsx
│   │   │   ├── 🚀 projects-section.tsx
│   │   │   ├── 📊 github-stats-section.tsx (Live API)
│   │   │   ├── 💼 experience-section.tsx
│   │   │   └── ✉️ contact-section.tsx
│   │   └── 📁 ui/ (terminal-command-palette, code-block, matrix)
│   ├── 📁 content/ (MDX case studies: prd-gene, lora-landslide)
│   └── 📁 data/ (profile, projects, skills, experience, navigation)
└── 📁 public/
    ├── 📁 cv/ (cv.pdf)
    └── 📁 images/ (thumbnails & assets)`}
            </pre>
            <span className="text-[10px] text-[var(--terminal-text-dim)] pt-1 border-t border-[var(--terminal-border)]/40">
              6 directories, 24 core modules • Next.js 16 (App Router) + Tailwind CSS v4
            </span>
          </div>
        );
        break;

      case "curl":
      case "fetch": {
        const target = arg.replace(/^\/+/, "");
        if (target === "profile" || target === "whoami" || target === "me") {
          output = (
            <div className="flex flex-col gap-1 text-[11px] font-mono bg-[var(--terminal-bg-panel)] p-2 rounded border border-[var(--terminal-border)]">
              <span className="text-[var(--terminal-accent)]">HTTP/1.1 200 OK — application/json</span>
              <pre className="text-[var(--terminal-green)] overflow-x-auto">
                {JSON.stringify(
                  {
                    name: profileData.name,
                    role: profileData.role,
                    headline: profileData.headline,
                    email: profileData.email,
                    location: profileData.location,
                    social: profileData.socialLinks,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          );
        } else if (target === "projects" || target === "proyek") {
          output = (
            <div className="flex flex-col gap-1 text-[11px] font-mono bg-[var(--terminal-bg-panel)] p-2 rounded border border-[var(--terminal-border)]">
              <span className="text-[var(--terminal-accent)]">HTTP/1.1 200 OK — application/json ({projectsData.length} records)</span>
              <pre className="text-[var(--terminal-cyan)] overflow-x-auto">
                {JSON.stringify(
                  projectsData.map((p) => ({
                    slug: p.slug,
                    title: p.title,
                    category: p.category,
                    technologies: p.technologies,
                    demoUrl: p.demoUrl,
                    repoUrl: p.repositoryUrl,
                  })),
                  null,
                  2
                )}
              </pre>
            </div>
          );
        } else if (target === "skills" || target === "keahlian") {
          output = (
            <div className="flex flex-col gap-1 text-[11px] font-mono bg-[var(--terminal-bg-panel)] p-2 rounded border border-[var(--terminal-border)]">
              <span className="text-[var(--terminal-accent)]">HTTP/1.1 200 OK — application/json ({skillsData.length} skills)</span>
              <pre className="text-[var(--terminal-purple)] overflow-x-auto">
                {JSON.stringify(skillsData.filter((s) => s.featured), null, 2)}
              </pre>
            </div>
          );
        } else if (target === "github" || target === "api/github") {
          output = (
            <div className="flex flex-col gap-1 text-[11px] font-mono bg-[var(--terminal-bg-panel)] p-2 rounded border border-[var(--terminal-border)]">
              <span className="text-[var(--terminal-accent)]">GET /api/github HTTP/1.1 200 OK</span>
              <pre className="text-[var(--terminal-amber)] overflow-x-auto">
                {JSON.stringify(
                  {
                    user: "ariffaishal1",
                    api: "https://api.github.com/users/ariffaishal1",
                    statsUrl: "#github",
                    profileUrl: profileData.socialLinks.github,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          );
        } else {
          output = (
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-[var(--terminal-rose)]">curl: endpoint &apos;{arg || "/"}&apos; tidak ditemukan.</span>
              <span className="text-[var(--terminal-text-dim)] text-[11px]">
                Endpoint yang tersedia: <code className="text-[var(--terminal-cyan)]">curl profile</code>, <code className="text-[var(--terminal-cyan)]">curl projects</code>, <code className="text-[var(--terminal-cyan)]">curl skills</code>, <code className="text-[var(--terminal-cyan)]">curl github</code>
              </span>
            </div>
          );
        }
        break;
      }

      case "sound":
      case "audio": {
        let next: boolean;
        if (arg === "on" || arg === "enable") {
          setSoundEnabled(true);
          next = true;
        } else if (arg === "off" || arg === "disable") {
          setSoundEnabled(false);
          next = false;
        } else {
          next = toggleSound();
        }
        setSoundEnabledState(next);
        output = (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={next ? "text-[var(--terminal-green)]" : "text-[var(--terminal-rose)]"}>
              {next ? "🔊 Suara Keyboard Mekanik: AKTIF" : "🔇 Suara Keyboard Mekanik: NONAKTIF"}
            </span>
            <span className="text-[var(--terminal-text-dim)] text-[11px]">
              ({next ? "Efek klik switch mekanik kini bersuara saat mengetik" : "Mode hening diaktifkan"})
            </span>
          </div>
        );
        break;
      }

      case "ping": {
        const host = arg || "github.com";
        const rtts = [18.2, 19.4, 17.8, 18.9];
        output = (
          <div className="flex flex-col gap-1 text-[11px] font-mono leading-tight py-0.5">
            <span className="text-[var(--terminal-accent)]">PING {host} (56 data bytes):</span>
            {rtts.map((time, idx) => (
              <span key={idx} className="text-[var(--terminal-text-bright)]">
                64 bytes from {host}: icmp_seq={idx + 1} ttl=116 time={time} ms
              </span>
            ))}
            <div className="text-[var(--terminal-text-dim)] pt-1 border-t border-[var(--terminal-border)]/40">
              --- {host} ping statistics --- 4 packets transmitted, 4 received, 0% packet loss, min/avg/max = 17.8/18.5/19.4 ms
            </div>
          </div>
        );
        break;
      }

      case "experience":
      case "karir":
      case "pengalaman":
        output = <span className="text-[var(--terminal-green)]">→ Mengarahkan ke Riwayat Pengalaman Kerja...</span>;
        navigateToSection("#experience");
        setTimeout(closePalette, 400);
        break;

      case "git":
        if (arg === "log" || arg.startsWith("log")) {
          output = <span className="text-[var(--terminal-green)]">→ git log: Mengarahkan ke Riwayat Karir...</span>;
          navigateToSection("#experience");
          setTimeout(closePalette, 400);
        } else {
          output = (
            <span className="text-[var(--terminal-text-dim)]">
              git: perintah didukung adalah <code className="text-[var(--terminal-cyan)]">git log</code>
            </span>
          );
        }
        break;

      case "contact":
      case "kontak":
        output = <span className="text-[var(--terminal-green)]">→ Mengarahkan ke Formulir Kontak Interaktif...</span>;
        navigateToSection("#contact");
        setTimeout(closePalette, 400);
        break;

      case "theme": {
        const matchedAccent = ACCENT_COLORS.find(
          (c) => c.id.toLowerCase() === arg || c.name.toLowerCase() === arg
        );

        if (matchedAccent) {
          setAccentColor(matchedAccent.id);
          output = (
            <span className="text-[var(--terminal-cyan)] font-mono">
              Warna aksen tema dialihkan ke: <strong style={{ color: matchedAccent.darkHex }}>{matchedAccent.name} ({matchedAccent.id})</strong> 🎨
            </span>
          );
        } else if (arg === "dark" || arg === "light" || arg === "system") {
          setTheme(arg);
          output = (
            <span className="text-[var(--terminal-cyan)]">
              Tema tampilan dialihkan ke: <strong>{arg} mode</strong> 🌓
            </span>
          );
        } else if (arg === "toggle" || !arg) {
          const current = resolvedTheme || theme || "dark";
          const nextTheme = current === "dark" ? "light" : "dark";
          setTheme(nextTheme);
          output = (
            <span className="text-[var(--terminal-cyan)]">
              Tema tampilan dialihkan ke: <strong>{nextTheme} mode</strong> 🌓
            </span>
          );
        } else {
          output = (
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-[var(--terminal-amber)]">
                Penggunaan: <code className="text-[var(--terminal-cyan)]">theme [dark|light|toggle|&lt;warna&gt;]</code>
              </span>
              <span className="text-[var(--terminal-text-dim)] text-[11px]">
                Pilihan warna aksen: rose, amber, sage, emerald, cyan, blue, purple, silver.
              </span>
            </div>
          );
        }
        break;
      }

      case "cv":
      case "resume":
        output = (
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-[var(--terminal-green)]">→ Membuka halaman Curriculum Vitae resmi...</span>
            <span className="text-[var(--terminal-text-dim)] text-[11px]">
              Tersedia opsi cetak &amp; simpan PDF satu-klik berstandar ATS.
            </span>
          </div>
        );
        router.push("/cv");
        setTimeout(closePalette, 400);
        break;

      case "stats":
      case "gh":
      case "github-stats":
        output = (
          <div className="flex flex-col gap-1 text-xs py-1">
            <span className="text-[var(--terminal-green)]">
              → Menampilkan statistik GitHub @ariffaishal1 di layar...
            </span>
            <span className="text-[var(--terminal-text-dim)] text-[11px]">
              6 repositori publik • TypeScript (68%) • Dart/Flutter (16%) • Java (11%)
            </span>
          </div>
        );
        setTimeout(() => {
          closePalette();
          const target = document.getElementById("github");
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", "#github");
          }
        }, 400);
        break;

      case "github":
        output = (
          <span className="text-[var(--terminal-green)]">
            → Membuka GitHub: <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-[var(--terminal-blue)] hover:underline">{profileData.socialLinks.github}</a>
          </span>
        );
        window.open(profileData.socialLinks.github, "_blank");
        break;

      case "linkedin":
        output = (
          <span className="text-[var(--terminal-green)]">
            → Membuka LinkedIn: <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--terminal-blue)] hover:underline">{profileData.socialLinks.linkedin}</a>
          </span>
        );
        window.open(profileData.socialLinks.linkedin, "_blank");
        break;

      case "email":
        output = (
          <span className="text-[var(--terminal-green)]">
            → Menyiapkan email ke <a href={`mailto:${profileData.email}`} className="text-[var(--terminal-blue)] hover:underline">{profileData.email}</a>...
          </span>
        );
        window.location.href = `mailto:${profileData.email}`;
        break;

      case "whoami":
        output = (
          <div className="flex flex-col gap-1 text-xs bg-[var(--terminal-bg-panel)] p-2.5 rounded border border-[var(--terminal-border)]">
            <div>
              <span className="text-[var(--terminal-accent)] font-bold">{profileData.name}</span>
              <span className="text-[var(--terminal-text-dim)]"> — {profileData.role}</span>
            </div>
            <div className="text-[var(--terminal-text)]">{profileData.shortBio}</div>
            <div className="text-[11px] text-[var(--terminal-text-dim)]">
              Status: <span className="text-[var(--terminal-green)]">{profileData.availability}</span> · Lokasi: {profileData.location}
            </div>
          </div>
        );
        break;

      case "date":
      case "time":
        output = (
          <span className="text-[var(--terminal-amber)] font-mono">
            {new Date().toLocaleString("id-ID", { dateStyle: "full", timeStyle: "medium" })}
          </span>
        );
        break;

      case "echo":
        output = <span className="text-[var(--terminal-text-bright)]">{arg || ""}</span>;
        break;

      case "sudo":
        output = (
          <span className="text-[var(--terminal-amber)]">
            sudo: Akses root ditolak. Portofolio Arif Faishal berjalan dalam mode read-only yang aman 🛡️
          </span>
        );
        break;

      case "matrix": {
        const nextState = !isMatrixMode;
        toggleMatrixMode();
        output = nextState ? (
          <div className="flex flex-col gap-1 text-xs text-[var(--terminal-green)] font-mono leading-relaxed">
            <span className="font-bold text-[var(--terminal-accent)]">
              &gt;&gt; System breach detected... Matrix Digital Rain initialized.
            </span>
            <span>Wake up, Neo... The Matrix has you. 🐇</span>
            <span className="text-[var(--terminal-text-bright)]">
              Efek Matrix Code Digital Rain &amp; Tema Neon Green kini berjalan di seluruh layar!
            </span>
            <span className="text-[var(--terminal-text-dim)] text-[11px] pt-1">
              [Ketik &apos;matrix&apos; lagi, tekan ESC, atau klik tombol floating di pojok kanan atas untuk keluar]
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5 text-xs text-[var(--terminal-cyan)] font-mono">
            <span className="font-bold">&gt;&gt; Back to reality...</span>
            <span>Matrix mode dinonaktifkan. Tema standar dikembalikan.</span>
          </div>
        );
        break;
      }

      case "blackhole":
      case "collapse":
      case "singularity":
        output = (
          <div className="flex flex-col gap-1 text-xs text-[var(--terminal-rose)] font-mono">
            <span className="font-bold">&gt;&gt; PERINGATAN KRITIS: Horizon peristiwa terdistorsi!</span>
            <span>Singularitas gravitasi sedang menyedot semesta web...</span>
          </div>
        );
        triggerCollapse();
        setTimeout(closePalette, 300);
        break;

      default:
        isError = true;
        output = (
          <span className="text-[var(--terminal-rose)]">
            zsh: command not found: <span className="font-semibold">&apos;{mainCmd}&apos;</span>. Ketik <span className="text-[var(--terminal-cyan)] font-semibold">&apos;help&apos;</span> untuk daftar perintah.
          </span>
        );
    }

    if (isError) {
      playCommandBeep("error");
    } else {
      playCommandBeep("success");
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: trimmed,
        output,
        isError,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeyClick();
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (current) {
        const match = COMMAND_LIST.find((c) =>
          c.command.startsWith(current) ||
          c.aliases?.some((a) => a.startsWith(current))
        );
        if (match) {
          setInput(match.command);
        }
      }
    }
  };

  if (!isOpen) return null;

  // Filter recommendations based on input
  const suggestions = input.trim()
    ? COMMAND_LIST.filter(
        (c) =>
          c.command.toLowerCase().includes(input.trim().toLowerCase()) ||
          c.aliases?.some((a) => a.toLowerCase().includes(input.trim().toLowerCase())) ||
          c.description.toLowerCase().includes(input.trim().toLowerCase())
      )
    : [
        COMMAND_LIST.find((c) => c.command === "help")!,
        COMMAND_LIST.find((c) => c.command === "projects")!,
        COMMAND_LIST.find((c) => c.command === "skills")!,
        COMMAND_LIST.find((c) => c.command === "theme")!,
        COMMAND_LIST.find((c) => c.command === "cv")!,
      ].filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal Command Palette"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePalette();
      }}
    >
      <div
        className={`w-full max-w-2xl bg-[var(--terminal-bg)] border border-[var(--terminal-border)] rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ${
          isMaximized ? "h-[90vh]" : "max-h-[82vh]"
        }`}
      >
        {/* Title bar */}
        <div className="bg-[var(--terminal-bg-elevated)] border-b border-[var(--terminal-border)] px-3.5 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 items-center">
              <button
                onClick={closePalette}
                title="Tutup (ESC)"
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:opacity-80 transition-opacity"
              />
              <button
                onClick={() => setLogs([])}
                title="Bersihkan layar (clear)"
                className="w-3 h-3 rounded-full bg-[#febc2e] hover:opacity-80 transition-opacity"
              />
              <button
                onClick={() => setIsMaximized((prev) => !prev)}
                title={isMaximized ? "Restore size" : "Maximize terminal"}
                className="w-3 h-3 rounded-full bg-[#28c840] hover:opacity-80 transition-opacity"
              />
            </div>
            <span className="text-xs text-[var(--terminal-text-dim)] font-mono ml-2 hidden sm:inline">
              arif@portfolio: ~/terminal-cli (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? "Matikan efek suara keyboard mekanik (sound off)" : "Nyalakan efek suara keyboard mekanik (sound on)"}
              className="text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] p-1 rounded transition-colors flex items-center gap-1 font-mono text-[10px] cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[var(--terminal-accent)]" />
                  <span className="hidden sm:inline text-[var(--terminal-accent)]">sound on</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 opacity-60" />
                  <span className="hidden sm:inline opacity-60">muted</span>
                </>
              )}
            </button>
            <span className="text-[10px] text-[var(--terminal-text-dim)] bg-[var(--terminal-bg-panel)] px-1.5 py-0.5 rounded border border-[var(--terminal-border)] font-mono">
              ESC
            </span>
            <button
              onClick={closePalette}
              className="text-[var(--terminal-text-dim)] hover:text-[var(--terminal-text)] p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output & Logs */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 font-mono text-xs flex flex-col gap-3 min-h-[200px]">
          {/* Welcome Banner */}
          <div className="text-[var(--terminal-text-dim)] border-b border-[var(--terminal-border)]/60 pb-3 flex flex-col gap-1 select-none">
            <div className="flex items-center gap-1.5 text-[var(--terminal-accent)] font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>Arif Faishal Portfolio CLI [v1.0.0]</span>
            </div>
            <div className="text-[11px] leading-relaxed">
              Ketik <span className="text-[var(--terminal-cyan)] font-bold">&apos;help&apos;</span> untuk panduan perintah, atau klik salah satu rekomendasi di bawah.
            </div>
          </div>

          {/* Logs */}
          {logs.map((log) => (
            <div key={log.id} className="flex flex-col gap-1">
              <div className="flex items-baseline gap-1 text-[11px] sm:text-xs">
                <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
                <span className="text-[var(--terminal-text-dim)]">@</span>
                <span className="text-[var(--terminal-blue)]">portfolio</span>
                <span className="text-[var(--terminal-amber)] mr-1">$</span>
                <span className="text-[var(--terminal-text-bright)] font-semibold">{log.command}</span>
              </div>
              <div className="pl-3">{log.output}</div>
            </div>
          ))}

          <div ref={terminalEndRef} />
        </div>

        {/* Interactive Prompt Input Bar */}
        <div className="border-t border-[var(--terminal-border)] bg-[var(--terminal-bg-elevated)] p-2.5 sm:p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[var(--terminal-accent)] font-semibold text-xs sm:text-sm font-mono flex-shrink-0">
              arif<span className="text-[var(--terminal-amber)]">$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                playKeyClick();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ketik perintah... (contoh: help, projects, skills, theme)"
              className="flex-1 bg-transparent border-0 outline-none text-[var(--terminal-text-bright)] font-mono text-xs sm:text-sm placeholder-[var(--terminal-text-dim)]/60"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <button
              onClick={() => executeCommand(input)}
              className="p-1 rounded bg-[var(--terminal-bg-panel)] hover:bg-[var(--terminal-bg-selection)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] transition-colors"
              title="Eksekusi Perintah (Enter)"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[var(--terminal-border)]/40 text-[11px]">
            <span className="text-[var(--terminal-text-dim)] flex items-center gap-1 select-none pr-1">
              <Sparkles className="w-3 h-3 text-[var(--terminal-amber)]" />
              Saran:
            </span>
            {suggestions.slice(0, 5).map((s) => (
              <button
                key={s.command}
                onClick={() => {
                  setInput(s.command);
                  executeCommand(s.command);
                }}
                className="bg-[var(--terminal-bg-panel)] hover:bg-[var(--terminal-bg-selection)] text-[var(--terminal-cyan)] hover:text-[var(--terminal-accent)] px-2 py-0.5 rounded font-mono text-[10px] sm:text-[11px] border border-[var(--terminal-border)] transition-colors"
              >
                {s.command}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
