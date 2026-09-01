import React from "react";
import { experienceData } from "@/data/experience";

export function ExperienceSection() {
  const commitHashes = ["a3f7c9e", "8b2d1f4", "5c9e4a1", "1d8b7e2"];

  return (
    <section id="experience" className="flex flex-col gap-2 pt-4 border-t border-[var(--terminal-border)]">
      {/* Command prompt */}
      <div className="flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="text-[var(--terminal-text-bright)]">git</span>
        <span className="ml-1 text-[var(--terminal-text-bright)]">log</span>
        <span className="ml-1 text-[var(--terminal-amber)]">--pretty=full</span>
        <span className="ml-1 text-[var(--terminal-green)]">career</span>
      </div>

      {/* Git Log Entries */}
      <div className="flex flex-col gap-6 pt-3">
        {experienceData.map((exp, index) => {
          const hash = commitHashes[index % commitHashes.length];
          const isLatest = index === 0;

          return (
            <div
              key={index}
              className="flex flex-col gap-1.5 pb-5 border-b border-[var(--terminal-border)]/50 last:border-b-0"
            >
              {/* Commit Hash Line */}
              <div className="flex items-baseline gap-2 text-xs">
                <span className="text-[var(--terminal-amber)] font-bold">commit {hash}</span>
                {isLatest && (
                  <span className="text-[var(--terminal-text-dim)] text-[11px]">
                    (<span className="text-[var(--terminal-accent)] font-semibold">HEAD</span>,{" "}
                    <span className="text-[var(--terminal-green)]">origin/main</span>)
                  </span>
                )}
              </div>

              {/* Author Line */}
              <div className="text-xs">
                <span className="text-[var(--terminal-text-dim)]">Author:</span>{" "}
                <span className="text-[var(--terminal-accent)] font-medium">
                  Arif Faishal Nugraha
                </span>{" "}
                <span className="text-[var(--terminal-text-dim)]">&lt;ariffaishal1@gmail.com&gt;</span>
              </div>

              {/* Date Line */}
              <div className="text-xs">
                <span className="text-[var(--terminal-text-dim)]">Date:</span>{" "}
                <span className="text-[var(--terminal-text-dim)]">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>

              {/* Message Line */}
              <div className="text-[13px] font-bold text-[var(--terminal-text-bright)] mt-1">
                {exp.role} @ {exp.company}
              </div>

              {exp.location && (
                <div className="text-[11px] text-[var(--terminal-text-dim)]">
                  {exp.location}
                </div>
              )}

              {/* Body */}
              <div className="text-xs sm:text-[12.5px] text-[var(--terminal-text)] pl-3 border-l-2 border-[var(--terminal-border)] mt-2 flex flex-col gap-2">
                <div>{exp.description}</div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="flex flex-col gap-1 mt-1 list-none">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[var(--terminal-green)] font-bold select-none">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tags / Technologies */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[var(--terminal-bg-selection)] text-[var(--terminal-purple)] px-2 py-0.5 rounded text-[11px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
