"use client";

import React from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="flex flex-col gap-2 pt-4 border-t border-[var(--terminal-border)]">
      {/* Command prompt */}
      <div className="flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="text-[var(--terminal-text-bright)]">ls</span>
        <span className="ml-1 text-[var(--terminal-amber)]">-la</span>
        <span className="ml-1 text-[var(--terminal-green)]">~/projects/</span>
      </div>

      <div className="text-xs text-[var(--terminal-text-dim)] border-b border-[var(--terminal-border)]/60 pb-1 pt-1 select-none">
        total {projectsData.length} &nbsp;&nbsp;drwxr-xr-x arif staff
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-6 pt-2">
        {projectsData.map((project) => (
          <div key={project.slug} className="flex flex-col gap-2">
            {/* ls entry line */}
            <div className="flex items-baseline gap-3 text-xs">
              <span className="text-[var(--terminal-text-dim)] select-none">drwxr-xr-x</span>
              <span className="text-[var(--terminal-text-dim)] select-none">2.4MB</span>
              <span className="text-[var(--terminal-text-dim)] select-none">{project.year}</span>
              <Link
                href={`/projects/${project.slug}`}
                className="text-[var(--terminal-cyan)] font-semibold hover:underline"
              >
                {project.slug}/
              </Link>
            </div>

            {/* Project Content in Pure CLI Tree Layout */}
            <div className="pl-4 sm:pl-6 border-l-2 border-[var(--terminal-border)] flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-[var(--terminal-accent)] font-bold text-sm sm:text-base hover:underline"
                >
                  {project.title}
                </Link>
                {project.featured && (
                  <span className="text-[10px] text-[var(--terminal-amber)] border border-[var(--terminal-amber)]/40 px-1.5 py-0.2 rounded">
                    ★ featured
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-[13px] text-[var(--terminal-text)] leading-relaxed">
                {project.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs pt-0.5">
                {project.role && (
                  <div>
                    <span className="text-[var(--terminal-text-dim)]">role:</span>{" "}
                    <span className="text-[var(--terminal-accent)]">{project.role}</span>
                  </div>
                )}
                <div>
                  <span className="text-[var(--terminal-text-dim)]">category:</span>{" "}
                  <span className="text-[var(--terminal-purple)]">{project.category}</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[var(--terminal-bg-selection)] text-[var(--terminal-text-bright)] px-2 py-0.5 rounded text-[11px] font-mono"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1.5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] font-medium transition-colors"
                >
                  → Catatan Lengkap (Case Study)
                </Link>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] font-medium transition-colors"
                  >
                    → Live Demo
                  </a>
                )}
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] font-medium transition-colors"
                  >
                    → Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
