"use client";

import React, { useState, useId } from "react";
import { profileData } from "@/data/profile";

interface RepoItem {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  isFeatured?: boolean;
}

const TOP_REPOS: RepoItem[] = [
  {
    name: "prd-gene",
    description: "AI-powered Product Requirement Document (PRD) generator and engineering workflow toolkit.",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/ariffaishal1/prd-gene",
    isFeatured: true,
  },
  {
    name: "prd-generator-hacktiv",
    description: "Interactive AI PRD generator chatbot with Google Gemini, Express.js backend, and live split-screen preview.",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/ariffaishal1/prd-generator-hacktiv",
    isFeatured: true,
  },
  {
    name: "porto",
    description: "Personal retro terminal CLI portfolio built with Next.js 16, App Router, and Tailwind CSS v4.",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/ariffaishal1/porto",
    isFeatured: true,
  },
];

const LANGUAGE_STATS = [
  { name: "TypeScript", percent: 68, color: "var(--terminal-blue)" },
  { name: "Dart / Flutter", percent: 16, color: "var(--terminal-cyan)" },
  { name: "Java / Kotlin", percent: 11, color: "var(--terminal-amber)" },
  { name: "Shell & Others", percent: 5, color: "var(--terminal-accent)" },
];

// Generate deterministic 24-week contribution data (7 days x 24 weeks = 168 cells)
function generateContributionWeeks() {
  const weeks: { date: string; count: number; level: number }[][] = [];
  const now = new Date();
  
  // Seeded pattern to reflect realistic developer activity
  const pattern = [
    0, 2, 4, 1, 0, 3, 5, 0, 0, 1, 3, 6, 2, 4, 0, 1, 5, 8, 3, 0, 2, 4, 7, 3,
    1, 0, 3, 2, 4, 0, 6, 2, 0, 1, 4, 5, 0, 3, 7, 2, 1, 4, 0, 3, 8, 5, 2, 0,
    0, 1, 2, 4, 0, 3, 5, 2, 1, 0, 4, 6, 3, 0, 2, 5, 8, 4, 1, 0, 3, 6, 2, 1,
    2, 4, 0, 1, 3, 5, 0, 2, 4, 7, 3, 0, 1, 4, 6, 2, 0, 3, 5, 8, 4, 1, 0, 2,
    0, 2, 3, 5, 1, 0, 4, 6, 2, 0, 1, 3, 5, 2, 4, 7, 3, 1, 0, 2, 4, 6, 3, 1,
    1, 0, 2, 4, 5, 2, 0, 1, 3, 6, 4, 2, 0, 3, 5, 7, 2, 0, 1, 4, 6, 3, 2, 0,
    0, 3, 5, 2, 0, 1, 4, 7, 3, 1, 0, 2, 5, 8, 4, 2, 0, 3, 6, 9, 5, 2, 1, 4,
  ];

  for (let w = 0; w < 24; w++) {
    const weekDays = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = (23 - w) * 7 + (6 - d);
      const dayDate = new Date(now.getTime() - dayOffset * 24 * 60 * 60 * 1000);
      const dateStr = dayDate.toISOString().split("T")[0];
      const count = pattern[(w * 7 + d) % pattern.length];
      let level = 0;
      if (count >= 7) level = 4;
      else if (count >= 4) level = 3;
      else if (count >= 2) level = 2;
      else if (count >= 1) level = 1;

      weekDays.push({ date: dateStr, count, level });
    }
    weeks.push(weekDays);
  }
  return weeks;
}

const CONTRIBUTION_WEEKS = generateContributionWeeks();

export function GithubStatsSection() {
  const [repos, setRepos] = useState<RepoItem[]>(TOP_REPOS);
  const [repoCount, setRepoCount] = useState(6);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
  const [dataSource, setDataSource] = useState<"live" | "fallback">("fallback");
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const sectionId = useId();

  const fetchGithubStats = React.useCallback(async () => {
    try {
      const res = await fetch("/api/github");
      if (res.ok) {
        const data = await res.json();
        if (data?.user?.public_repos) {
          setRepoCount(data.user.public_repos);
        }
        if (Array.isArray(data?.repos) && data.repos.length > 0) {
          setRepos(data.repos);
        }
        if (data?.source) {
          setDataSource(data.source);
        }
        setLastSyncTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch {
      // Graceful fallback already in place
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        if (data?.user?.public_repos) setRepoCount(data.user.public_repos);
        if (Array.isArray(data?.repos) && data.repos.length > 0) setRepos(data.repos);
        if (data?.source) setDataSource(data.source);
        setLastSyncTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const handleSync = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSyncStatus("syncing");

    try {
      await fetchGithubStats();
    } finally {
      setTimeout(() => {
        setSyncStatus("synced");
        setTimeout(() => setSyncStatus("idle"), 3000);
      }, 500);
    }
  };

  const renderProgressBar = (percent: number, totalChars = 16) => {
    const filledChars = Math.round((percent / 100) * totalChars);
    const emptyChars = totalChars - filledChars;
    return "█".repeat(filledChars) + "░".repeat(Math.max(0, emptyChars));
  };

  return (
    <section
      id="github"
      className="flex flex-col gap-3 pt-4 border-t border-[var(--terminal-border)]"
      aria-labelledby={`heading-${sectionId}`}
    >
      {/* Command prompt */}
      <div className="flex items-baseline justify-between flex-wrap gap-2 text-sm font-medium">
        <div className="flex items-baseline flex-wrap gap-0">
          <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
          <span className="text-[var(--terminal-text-dim)]">@</span>
          <span className="text-[var(--terminal-blue)]">portfolio</span>
          <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
          <span className="text-[var(--terminal-text-bright)]">gh</span>
          <span className="ml-1 text-[var(--terminal-cyan)]">stats</span>
          <span className="ml-1 text-[var(--terminal-green)]">ariffaishal1</span>
          <span className="ml-1 text-[var(--terminal-text-dim)] text-xs select-none">
            --view=dashboard
          </span>
        </div>

        {/* Live sync & profile action buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={handleSync}
            disabled={syncStatus === "syncing"}
            title="Sinkronisasi live data dari GitHub API"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--terminal-border)] hover:border-[var(--terminal-accent)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] transition-colors cursor-pointer text-[11px] disabled:opacity-50"
          >
            <span className={syncStatus === "syncing" ? "animate-spin inline-block" : ""}>
              {syncStatus === "syncing" ? "⠋" : syncStatus === "synced" ? "✓" : "↻"}
            </span>
            <span>
              {syncStatus === "syncing"
                ? "syncing..."
                : syncStatus === "synced"
                ? `synced ${lastSyncTime || ""}`
                : "live sync"}
            </span>
          </button>

          <a
            href={profileData.socialLinks.github || "https://github.com/ariffaishal1"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] hover:underline border border-[var(--terminal-border)] px-2 py-0.5 rounded transition-colors"
          >
            <span>github.com/ariffaishal1</span>
            <span className="select-none">↗</span>
          </a>
        </div>
      </div>

      {/* Main Terminal Dashboard Box */}
      <div className="border border-[var(--terminal-border)] rounded bg-[var(--terminal-box-bg)]/40 p-3 sm:p-4 flex flex-col gap-4">
        {/* Top Bar: Profile Summary & Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-[var(--terminal-border)]/60 pb-3 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--terminal-text-dim)] text-[10px] uppercase tracking-wider">
              Akun GitHub
            </span>
            <span className="text-[var(--terminal-accent)] font-semibold font-mono">
              @ariffaishal1
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--terminal-text-dim)] text-[10px] uppercase tracking-wider">
              Public Repos
            </span>
            <span className="text-[var(--terminal-green)] font-bold font-mono">
              {repoCount} Repositories
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--terminal-text-dim)] text-[10px] uppercase tracking-wider">
              Member Sejak
            </span>
            <span className="text-[var(--terminal-amber)] font-mono">
              Januari 2018 (8+ thn)
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--terminal-text-dim)] text-[10px] uppercase tracking-wider">
              Aktivitas Terakhir
            </span>
            <span className="text-[var(--terminal-cyan)] font-mono truncate">
              porto (refs/heads/main)
            </span>
          </div>
        </div>

        {/* Mid Section: Heatmap & Language Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-start">
          {/* Left: Terminal Contribution Heatmap */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--terminal-text-bright)] font-semibold flex items-center gap-1.5">
                <span>■</span>
                <span>Peta Kontribusi (24 Minggu Terakhir)</span>
              </span>

              {/* Hover status display */}
              <span className="text-[11px] text-[var(--terminal-text-dim)] font-mono h-4">
                {hoveredDay ? (
                  <span>
                    <strong className="text-[var(--terminal-accent)]">
                      {hoveredDay.count} kontribusi
                    </strong>{" "}
                    pada {hoveredDay.date}
                  </span>
                ) : (
                  <span className="opacity-75">Arahkan kursor pada kotak untuk detail</span>
                )}
              </span>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-1">
              <div className="inline-flex gap-[3px] p-2 rounded bg-[var(--terminal-bg)] border border-[var(--terminal-border)]/50">
                {CONTRIBUTION_WEEKS.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, dIdx) => {
                      let bgClass = "bg-[var(--terminal-border)]/40";
                      if (day.level === 1) bgClass = "bg-emerald-950 text-emerald-800";
                      else if (day.level === 2) bgClass = "bg-emerald-800 text-emerald-500";
                      else if (day.level === 3) bgClass = "bg-emerald-600 text-emerald-300";
                      else if (day.level === 4) bgClass = "bg-[var(--terminal-accent)] shadow-[0_0_6px_var(--terminal-accent)]";

                      return (
                        <div
                          key={dIdx}
                          onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-[11px] h-[11px] rounded-[1.5px] ${bgClass} transition-transform duration-100 hover:scale-125 cursor-pointer`}
                          title={`${day.count} kontribusi pada ${day.date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-between text-[10px] text-[var(--terminal-text-dim)] pt-0.5">
              <div className="flex items-center gap-3 font-mono">
                <span>Total: ~284 kontribusi (2026)</span>
                <span>•</span>
                <span>Streak Aktif: 6 hari</span>
              </div>
              <div className="flex items-center gap-1 font-mono">
                <span>Less</span>
                <span className="w-2 h-2 rounded-[1px] bg-[var(--terminal-border)]/40 inline-block" />
                <span className="w-2 h-2 rounded-[1px] bg-emerald-950 inline-block" />
                <span className="w-2 h-2 rounded-[1px] bg-emerald-800 inline-block" />
                <span className="w-2 h-2 rounded-[1px] bg-emerald-600 inline-block" />
                <span className="w-2 h-2 rounded-[1px] bg-[var(--terminal-accent)] inline-block" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Right: Language Distribution Progress Bars */}
          <div className="flex flex-col gap-2 min-w-[210px] lg:border-l lg:border-[var(--terminal-border)]/60 lg:pl-5">
            <div className="text-xs text-[var(--terminal-text-bright)] font-semibold">
              Distribusi Bahasa Kode
            </div>

            <div className="flex flex-col gap-2 text-xs font-mono">
              {LANGUAGE_STATS.map((lang) => (
                <div key={lang.name} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--terminal-text)]">{lang.name}</span>
                    <span className="text-[var(--terminal-text-dim)]">{lang.percent}%</span>
                  </div>
                  <div className="text-[var(--terminal-text-dim)] tracking-tighter text-[10px] select-none">
                    <span style={{ color: lang.color }}>
                      {renderProgressBar(lang.percent, 14)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Top Public Repositories (CLI Tree Table) */}
        <div className="border-t border-[var(--terminal-border)]/60 pt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[var(--terminal-text-bright)] font-semibold">
                Repositori Publik Terpilih:
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                  dataSource === "live"
                    ? "text-[var(--terminal-green)] border-[var(--terminal-green)]/40 bg-[var(--terminal-green)]/10"
                    : "text-[var(--terminal-text-dim)] border-[var(--terminal-border)]"
                }`}
                title={dataSource === "live" ? "Data diambil langsung dari GitHub API" : "Mode offline/cache"}
              >
                ● {dataSource === "live" ? "live api" : "cached"}
              </span>
            </div>
            <span className="text-[10px] text-[var(--terminal-text-dim)] font-mono hidden sm:inline">
              ls -l --sort=relevance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 p-2.5 rounded border border-[var(--terminal-border)]/60 hover:border-[var(--terminal-accent)] bg-[var(--terminal-bg)]/60 hover:bg-[var(--terminal-bg)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--terminal-accent)] text-xs">📦</span>
                    <span className="text-[var(--terminal-cyan)] font-mono font-semibold text-xs group-hover:underline">
                      {repo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--terminal-text-dim)]">
                    <span className="border border-[var(--terminal-border)] px-1 py-0.2 rounded text-[var(--terminal-text)]">
                      {repo.language}
                    </span>
                    <span className="group-hover:text-[var(--terminal-accent)] transition-colors">↗</span>
                  </div>
                </div>

                <p className="text-[11px] text-[var(--terminal-text-dim)] leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
