import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import { projectsData } from "@/data/projects";
import { generateBaseMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return generateBaseMetadata({
      title: "Proyek Tidak Ditemukan",
    });
  }

  return generateBaseMetadata({
    title: project.meta.title,
    description: project.meta.summary,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectMdx = await getProjectBySlug(slug);

  if (!projectMdx) {
    notFound();
  }

  const projectData = projectsData.find((p) => p.slug === slug);

  return (
    <div className="flex flex-col gap-4">
      {/* Command prompt nav */}
      <div className="flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="text-[var(--terminal-text-bright)]">cat</span>
        <span className="ml-1 text-[var(--terminal-green)]">~/projects/{slug}/README.md</span>
      </div>

      <div className="mb-2">
        <Link
          href="/#projects"
          className="text-xs text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] transition-colors"
        >
          ← cd .. (Kembali ke Daftar Proyek)
        </Link>
      </div>

      <article className="flex flex-col gap-6">
        {/* Header Metadata */}
        <div className="bg-[var(--terminal-bg-panel)] border border-[var(--terminal-border)] rounded-md p-4 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-base sm:text-lg font-bold text-[var(--terminal-accent)]">
              {projectMdx.meta.title}
            </h1>
            <span className="text-xs bg-[var(--terminal-accent-dim)] text-[var(--terminal-accent)] px-2 py-0.5 rounded font-medium">
              {projectMdx.meta.category} · {projectMdx.meta.year}
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-[var(--terminal-text)] leading-relaxed">
            {projectMdx.meta.summary}
          </p>

          <div className="flex flex-wrap gap-4 text-xs pt-2 border-t border-[var(--terminal-border)]/50">
            {projectMdx.meta.role && (
              <div>
                <span className="text-[var(--terminal-text-dim)]">Peran:</span>{" "}
                <span className="text-[var(--terminal-text-bright)] font-medium">
                  {projectMdx.meta.role}
                </span>
              </div>
            )}
            <div>
              <span className="text-[var(--terminal-text-dim)]">Tahun:</span>{" "}
              <span className="text-[var(--terminal-text-bright)] font-medium">
                {projectMdx.meta.year}
              </span>
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {projectMdx.meta.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-[var(--terminal-bg-selection)] text-[var(--terminal-purple)] px-2 py-0.5 rounded text-[11px] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          {(projectData?.demoUrl || projectData?.repositoryUrl) && (
            <div className="flex flex-wrap items-center gap-4 text-xs pt-2 border-t border-[var(--terminal-border)]/50">
              {projectData.demoUrl && (
                <a
                  href={projectData.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] font-medium transition-colors"
                >
                  → Kunjungi Live Demo
                </a>
              )}
              {projectData?.repositoryUrl && (
                <a
                  href={projectData.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] font-medium transition-colors"
                >
                  → Source Code GitHub
                </a>
              )}
            </div>
          )}
        </div>

        {/* Project Visual Preview in Terminal Frame */}
        {projectData?.thumbnail && (
          <div className="rounded-md border border-[var(--terminal-border)] overflow-hidden bg-[var(--terminal-bg-panel)] shadow-sm">
            <div className="bg-[var(--terminal-bg-elevated)] border-b border-[var(--terminal-border)] px-3 py-1.5 flex items-center justify-between text-xs text-[var(--terminal-text-dim)] select-none">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] inline-block" />
                <span className="ml-1.5 font-mono text-[11px] text-[var(--terminal-text)]">
                  preview://{slug}
                </span>
              </span>
              <span className="font-mono text-[10px] text-[var(--terminal-accent)]">
                [image-viewer]
              </span>
            </div>
            <div className="relative w-full aspect-video sm:max-h-[420px] bg-black/50 overflow-hidden">
              <Image
                src={projectData.thumbnail}
                alt={projectMdx.meta.title}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 850px"
              />
            </div>
          </div>
        )}

        {/* MDX Body in Terminal Prose */}
        <div className="project-prose border-t border-[var(--terminal-border)] pt-4">
          <MDXRemote source={projectMdx.content} />
        </div>
      </article>
    </div>
  );
}
