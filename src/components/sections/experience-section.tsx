import React from "react";
import { experienceData } from "@/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <Container>
        <SectionHeading
          badge="Pengalaman Kerja"
          title="Jejak Karir & Proyek"
          subtitle="Riwayat aktivitas profesional, kontribusi tim, dan pencapaian teknis."
        />

        <div className="max-w-3xl mx-auto relative pl-6 sm:pl-8 border-l-2 border-neutral-200 dark:border-neutral-800 space-y-10">
          {experienceData.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-emerald-500 bg-white dark:bg-neutral-950 group-hover:scale-125 transition-transform duration-200" />

              <Card className="space-y-4">
                {/* Header: Role & Company */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.startDate} - {exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Achievements Bullet List */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Pencapaian Utama:
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Used */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="subtle">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
