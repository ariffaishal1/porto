"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Printer,
  ArrowLeft,
  Mail,
  MapPin,
  Globe,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
} from "lucide-react";
import type { Profile } from "../../types/profile";
import type { Experience } from "../../types/experience";
import type { Education } from "../../types/education";
import type { Skill } from "../../types/skill";
import type { Project } from "../../types/project";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

interface CvClientViewProps {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

export function CvClientView({
  profile,
  experiences,
  education,
  skills,
  projects,
}: CvClientViewProps) {
  const [viewMode, setViewMode] = useState<"paper" | "terminal">("paper");
  const isPaper = viewMode === "paper";

  const handlePrint = () => {
    window.print();
  };

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s.name);
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center print:p-0 print:m-0 print:bg-white">
      {/* Top Floating Action Toolbar - Hidden on Print */}
      <div className="w-full max-w-4xl mb-6 print:hidden flex flex-wrap items-center justify-between gap-3 bg-[var(--terminal-bg-elevated)] border border-[var(--terminal-border)] rounded-lg p-3 shadow-lg backdrop-blur-md sticky top-3 z-50">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded bg-[var(--terminal-bg-panel)] hover:bg-[var(--terminal-bg-selection)] border border-[var(--terminal-border)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <span className="text-xs font-mono text-[var(--terminal-text-dim)] hidden sm:inline">
            Curriculum Vitae resmi
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center rounded border border-[var(--terminal-border)] p-0.5 bg-[var(--terminal-bg-panel)] text-xs font-mono">
            <button
              onClick={() => setViewMode("paper")}
              className={`px-2.5 py-1 rounded transition-colors ${
                isPaper
                  ? "bg-white text-gray-900 font-semibold shadow-sm"
                  : "text-[var(--terminal-text-dim)] hover:text-[var(--terminal-text)]"
              }`}
            >
              📄 Kertas ATS
            </button>
            <button
              onClick={() => setViewMode("terminal")}
              className={`px-2.5 py-1 rounded transition-colors ${
                !isPaper
                  ? "bg-[var(--terminal-accent-dim)] text-[var(--terminal-accent)] font-semibold"
                  : "text-[var(--terminal-text-dim)] hover:text-[var(--terminal-text)]"
              }`}
            >
              ⌨️ Terminal Mode
            </button>
          </div>

          {/* Print to PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-mono font-semibold px-3.5 py-1.5 rounded bg-[var(--terminal-accent)] text-[var(--terminal-bg)] hover:opacity-90 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Paper Document Container */}
      <article
        className={`w-full max-w-4xl rounded-lg transition-colors duration-200 print:max-w-none print:w-full print:rounded-none print:shadow-none print:border-0 ${
          isPaper
            ? "bg-white text-gray-900 shadow-2xl border border-gray-200 p-8 sm:p-12"
            : "bg-[var(--terminal-bg)] text-[var(--terminal-text)] shadow-2xl border border-[var(--terminal-border)] p-6 sm:p-10 font-mono"
        }`}
        style={{
          fontFamily: isPaper
            ? "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            : undefined,
          colorScheme: isPaper ? "light" : undefined,
        }}
      >
        {/* HEADER SECTION */}
        <header
          className={`border-b pb-6 mb-6 ${
            isPaper
              ? "border-gray-300"
              : "border-[var(--terminal-border)]"
          } print:border-gray-400`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  isPaper ? "text-gray-950" : "text-[var(--terminal-accent)]"
                } print:text-black`}
              >
                {profile.name}, S.Kom.
              </h1>
              <p
                className={`text-base sm:text-lg font-semibold mt-0.5 ${
                  isPaper ? "text-emerald-800" : "text-[var(--terminal-green)]"
                } print:text-emerald-800`}
              >
                {profile.role} (Web, Mobile, Multiplatform)
              </p>
              <p
                className={`text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed ${
                  isPaper ? "text-gray-700" : "text-[var(--terminal-text-dim)]"
                } print:text-gray-700`}
              >
                {profile.headline}
              </p>
            </div>

            {/* Contact Details Column */}
            <div
              className={`flex flex-col gap-1.5 text-xs font-medium flex-shrink-0 ${
                isPaper ? "text-gray-700" : "text-[var(--terminal-text-dim)]"
              } print:text-gray-800`}
            >
              <div className="flex items-center gap-2">
                <Mail
                  className={`w-3.5 h-3.5 ${
                    isPaper ? "text-gray-600" : "text-[var(--terminal-accent)]"
                  } print:text-black`}
                />
                <a
                  href={`mailto:${profile.email}`}
                  className={`hover:underline ${
                    isPaper ? "text-gray-950" : "text-[var(--terminal-text-bright)]"
                  } print:text-black`}
                >
                  {profile.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MapPin
                  className={`w-3.5 h-3.5 ${
                    isPaper ? "text-gray-600" : "text-[var(--terminal-accent)]"
                  } print:text-black`}
                />
                <span>{profile.location || "Indonesia"}</span>
              </div>

              {profile.socialLinks.linkedin && (
                <div className="flex items-center gap-2">
                  <LinkedinIcon
                    className={`w-3.5 h-3.5 ${
                      isPaper ? "text-gray-600" : "text-[var(--terminal-accent)]"
                    } print:text-black`}
                  />
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline ${
                      isPaper ? "text-blue-700" : "text-[var(--terminal-blue)]"
                    } print:text-black`}
                  >
                    linkedin.com/in/arif-faishal-nugraha
                  </a>
                </div>
              )}

              {profile.socialLinks.github && (
                <div className="flex items-center gap-2">
                  <GithubIcon
                    className={`w-3.5 h-3.5 ${
                      isPaper ? "text-gray-600" : "text-[var(--terminal-accent)]"
                    } print:text-black`}
                  />
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline ${
                      isPaper ? "text-blue-700" : "text-[var(--terminal-blue)]"
                    } print:text-black`}
                  >
                    github.com/ariffaishal1
                  </a>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Globe
                  className={`w-3.5 h-3.5 ${
                    isPaper ? "text-gray-600" : "text-[var(--terminal-accent)]"
                  } print:text-black`}
                />
                <span
                  className={
                    isPaper ? "text-gray-900" : "text-[var(--terminal-text-bright)]"
                  }
                >
                  arif-faishal-nugraha.vercel.app
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* SUMMARY / RINGKASAN PROFESIONAL */}
        <section className="mb-6 page-break-avoid">
          <h2
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2.5 flex items-center gap-1.5 ${
              isPaper
                ? "text-gray-950 border-gray-300"
                : "text-[var(--terminal-accent)] border-[var(--terminal-border)]"
            } print:border-gray-400 print:text-black`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ringkasan Profesional</span>
          </h2>
          <div
            className={`text-xs sm:text-[13px] leading-relaxed space-y-1.5 ${
              isPaper ? "text-gray-800" : "text-[var(--terminal-text)]"
            } print:text-gray-900`}
          >
            {profile.fullBio.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE / PENGALAMAN KERJA */}
        <section className="mb-6">
          <h2
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3 flex items-center gap-1.5 ${
              isPaper
                ? "text-gray-950 border-gray-300"
                : "text-[var(--terminal-accent)] border-[var(--terminal-border)]"
            } print:border-gray-400 print:text-black`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Pengalaman Kerja &amp; Rekayasa Sistem</span>
          </h2>

          <div className="flex flex-col gap-4">
            {experiences.map((exp: Experience, index: number) => (
              <div
                key={index}
                className={`flex flex-col gap-1 page-break-avoid border-l-2 pl-3.5 ${
                  isPaper
                    ? "border-emerald-600"
                    : "border-[var(--terminal-accent)]"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <h3
                      className={`text-sm font-bold ${
                        isPaper
                          ? "text-gray-950"
                          : "text-[var(--terminal-text-bright)]"
                      } print:text-black`}
                    >
                      {exp.role}
                    </h3>
                    <span
                      className={`text-xs font-semibold ${
                        isPaper
                          ? "text-emerald-800"
                          : "text-[var(--terminal-green)]"
                      } print:text-emerald-900`}
                    >
                      {exp.company}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      isPaper
                        ? "text-gray-600 font-sans"
                        : "text-[var(--terminal-amber)] font-mono"
                    } print:text-gray-700`}
                  >
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>

                <p
                  className={`text-xs leading-relaxed mt-0.5 ${
                    isPaper ? "text-gray-700" : "text-[var(--terminal-text)]"
                  } print:text-gray-800`}
                >
                  {exp.description}
                </p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul
                    className={`list-disc list-outside ml-4 mt-1 text-xs space-y-1 leading-normal ${
                      isPaper ? "text-gray-700" : "text-[var(--terminal-text)]"
                    } print:text-gray-800`}
                  >
                    {exp.achievements.map((ach: string, aIdx: number) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                )}

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {exp.technologies.map((t: string) => (
                    <span
                      key={t}
                      className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        isPaper
                          ? "bg-gray-100 text-gray-800 border-gray-300 font-sans"
                          : "bg-[var(--terminal-bg-panel)] text-[var(--terminal-text-dim)] border-[var(--terminal-border)] font-mono"
                      } print:border-gray-400 print:text-gray-800`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION / PENDIDIKAN */}
        <section className="mb-6 page-break-avoid">
          <h2
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3 flex items-center gap-1.5 ${
              isPaper
                ? "text-gray-950 border-gray-300"
                : "text-[var(--terminal-accent)] border-[var(--terminal-border)]"
            } print:border-gray-400 print:text-black`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Riwayat Pendidikan</span>
          </h2>

          <div className="flex flex-col gap-3.5">
            {education.map((edu: Education, idx: number) => (
              <div
                key={idx}
                className={`flex flex-col gap-0.5 border-l-2 pl-3.5 ${
                  isPaper
                    ? "border-blue-600"
                    : "border-[var(--terminal-blue)]"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <h3
                      className={`text-sm font-bold ${
                        isPaper
                          ? "text-gray-950"
                          : "text-[var(--terminal-text-bright)]"
                      } print:text-black`}
                    >
                      {edu.degree} — {edu.institution}
                    </h3>
                    <span
                      className={`text-xs font-semibold ${
                        isPaper
                          ? "text-blue-800"
                          : "text-[var(--terminal-blue)]"
                      } print:text-blue-900`}
                    >
                      Gelar: {edu.titleSuffix}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      isPaper
                        ? "text-gray-600 font-sans"
                        : "text-[var(--terminal-amber)] font-mono"
                    } print:text-gray-700`}
                  >
                    Lulus {edu.year}
                  </span>
                </div>

                {edu.description && (
                  <p
                    className={`text-xs leading-relaxed mt-0.5 ${
                      isPaper
                        ? "text-gray-700"
                        : "text-[var(--terminal-text-dim)]"
                    } print:text-gray-800`}
                  >
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS / PROYEK UNGGULAN */}
        <section className="mb-6 page-break-avoid">
          <h2
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3 flex items-center gap-1.5 ${
              isPaper
                ? "text-gray-950 border-gray-300"
                : "text-[var(--terminal-accent)] border-[var(--terminal-border)]"
            } print:border-gray-400 print:text-black`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portofolio &amp; Proyek Unggulan</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {projects.map((proj: Project) => (
              <div
                key={proj.slug}
                className={`p-3 rounded border flex flex-col justify-between gap-2 ${
                  isPaper
                    ? "border-gray-200 bg-gray-50/70 text-gray-900"
                    : "border-[var(--terminal-border)] bg-[var(--terminal-bg-panel)] text-[var(--terminal-text)]"
                } print:border-gray-300 print:bg-white`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between">
                    <h3
                      className={`text-xs sm:text-sm font-bold ${
                        isPaper ? "text-gray-950" : "text-[var(--terminal-accent)]"
                      } print:text-black`}
                    >
                      {proj.title}
                    </h3>
                    <span
                      className={`text-[10px] ${
                        isPaper
                          ? "text-gray-600 font-sans"
                          : "text-[var(--terminal-amber)] font-mono"
                      }`}
                    >
                      {proj.year}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] leading-relaxed ${
                      isPaper ? "text-gray-700" : "text-[var(--terminal-text)]"
                    } print:text-gray-800`}
                  >
                    {proj.summary}
                  </p>
                </div>

                <div
                  className={`flex flex-wrap gap-1 pt-1 border-t ${
                    isPaper
                      ? "border-gray-200"
                      : "border-[var(--terminal-border)]/50"
                  }`}
                >
                  {proj.technologies.slice(0, 5).map((tech: string) => (
                    <span
                      key={tech}
                      className={`text-[9px] px-1 py-0.2 rounded border ${
                        isPaper
                          ? "bg-white text-gray-800 border-gray-300 font-sans"
                          : "bg-[var(--terminal-bg)] text-[var(--terminal-text-bright)] border-[var(--terminal-border)] font-mono"
                      } print:border-gray-300 print:text-black`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SKILLS / KEAHLIAN TEKNIS */}
        <section className="page-break-avoid">
          <h2
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3 flex items-center gap-1.5 ${
              isPaper
                ? "text-gray-950 border-gray-300"
                : "text-[var(--terminal-accent)] border-[var(--terminal-border)]"
            } print:border-gray-400 print:text-black`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Keahlian &amp; Penguasaan Teknologi</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
            {Object.entries(skillsByCategory).map(([category, list]) => (
              <div key={category} className="flex flex-col gap-0.5">
                <span
                  className={`font-bold text-[11px] uppercase tracking-wide ${
                    isPaper
                      ? "text-gray-950"
                      : "text-[var(--terminal-accent)]"
                  } print:text-black`}
                >
                  {category}:
                </span>
                <span
                  className={`text-xs leading-relaxed ${
                    isPaper ? "text-gray-700" : "text-[var(--terminal-text)]"
                  } print:text-gray-800`}
                >
                  {list.join(" • ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note on Printed Paper */}
        <footer
          className={`mt-8 pt-4 border-t text-center text-[10px] flex items-center justify-between print:mt-6 print:border-gray-400 ${
            isPaper
              ? "border-gray-300 text-gray-500"
              : "border-[var(--terminal-border)]/50 text-[var(--terminal-text-dim)]"
          }`}
        >
          <span>
            Curriculum Vitae resmi digenerate secara langsung dari portofolio:{" "}
            <strong className={isPaper ? "text-gray-900" : "text-[var(--terminal-text-bright)]"}>
              arif-faishal-nugraha.vercel.app
            </strong>
          </span>
          <span className="font-mono">
            {new Date().toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </footer>
      </article>
    </div>
  );
}
