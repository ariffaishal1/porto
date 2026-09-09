import React from "react";
import { skillsData } from "@/data/skills";
import { SkillCategory } from "@/types/skill";

const categories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Mobile",
  "Database",
  "AI",
  "Tools",
  "Concepts"
];

export function SkillsSection() {
  const featuredCount = skillsData.filter((s) => s.featured).length;

  return (
    <section id="skills" className="flex flex-col gap-2 pt-4 border-t border-[var(--terminal-border)]">
      {/* Command prompt */}
      <div className="flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="text-[var(--terminal-text-bright)]">pacman</span>
        <span className="ml-1 text-[var(--terminal-amber)]">-Q</span>
        <span className="ml-1 text-[var(--terminal-green)]">--skills</span>
      </div>

      <div className="text-xs text-[var(--terminal-text-dim)] pt-1">
        :: Querying installed packages and skills database...
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 pt-2">
        {categories.map((category) => {
          const categorySkills = skillsData.filter(
            (skill) => skill.category === category
          );
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="flex flex-col gap-1">
              <div className="text-[var(--terminal-blue)] font-bold text-xs mt-2 select-none">
                ## {category}
              </div>
              <div className="flex flex-col divide-y divide-[var(--terminal-border)]/40">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex justify-between items-center py-1 text-xs"
                  >
                    <span className="text-[var(--terminal-text)] font-medium">
                      {skill.name}
                    </span>
                    {skill.featured ? (
                      <span className="text-[var(--terminal-amber)] font-bold" title="Featured skill">
                        ★
                      </span>
                    ) : (
                      <span className="text-[var(--terminal-text-dim)] text-[11px]">
                        installed
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-[var(--terminal-text-dim)] mt-3">
        Total: {skillsData.length} packages &nbsp;|&nbsp;{" "}
        <span className="text-[var(--terminal-amber)]">★</span> = featured ({featuredCount})
      </div>
    </section>
  );
}
