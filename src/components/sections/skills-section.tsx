import React from "react";
import { skillsData } from "@/data/skills";
import { SkillCategory } from "@/types/skill";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Mobile",
  "Database",
  "Tools",
  "Concepts",
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <Container>
        <SectionHeading
          badge="Keahlian Teknis"
          title="Teknologi & Alat Pengembang"
          subtitle="Kumpulan bahasa pemrosesan, framework, database, dan alat kerja yang saya gunakan secara rutin."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categorySkills = skillsData.filter(
              (skill) => skill.category === category
            );

            if (categorySkills.length === 0) return null;

            return (
              <Card key={category} className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base">
                    {category}
                  </h3>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {categorySkills.length} Item
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant={skill.featured ? "emerald" : "default"}
                      className="px-3 py-1.5 text-xs font-medium cursor-default"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
