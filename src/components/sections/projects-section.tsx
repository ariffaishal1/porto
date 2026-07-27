"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";
import { projectsData } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Extract unique categories
  const categories = ["Semua", ...Array.from(new Set(projectsData.map((p) => p.category)))];

  // Filter projects by selected category and prioritize featured projects
  const filteredProjects = projectsData
    .filter((project) => selectedCategory === "Semua" || project.category === selectedCategory)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section id="projects" className="py-20 bg-neutral-50/50 dark:bg-neutral-950/50">
      <Container>
        <SectionHeading
          badge="Portofolio Proyek"
          title="Karya &amp; Studi Kasus Unggulan"
          subtitle="Daftar proyek pilihan yang menampilkan solusi perangkat lunak, teknologi yang digunakan, serta peran saya."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 dark:bg-emerald-500 dark:text-neutral-950"
                  : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.slug} className="flex flex-col justify-between h-full p-6 space-y-6">
              <div className="space-y-4">
                {/* Header Meta: Category & Year & Featured Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="emerald">{project.category}</Badge>
                    {project.featured && (
                      <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                        Unggulan
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {project.year}
                  </span>
                </div>

                {/* Title & Summary */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="subtle">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                <Button href={`/projects/${project.slug}`} size="sm" variant="primary">
                  Detail &amp; Studi Kasus
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <div className="flex items-center gap-1">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live Demo ${project.title}`}
                      title="Live Demo"
                      className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repository GitHub ${project.title}`}
                      title="Source Code"
                      className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
