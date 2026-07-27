import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ExternalLink, Calendar, Briefcase } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import { projectsData } from "@/data/projects";
import { generateBaseMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

  // Cross-reference with structured project data for URLs
  const projectData = projectsData.find((p) => p.slug === slug);

  return (
    <div className="pt-28 pb-20">
      <Container>
        {/* Back Link Navigation */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Proyek
          </Link>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="emerald">{projectMdx.meta.category}</Badge>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {projectMdx.meta.year}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
              {projectMdx.meta.title}
            </h1>

            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {projectMdx.meta.summary}
            </p>
          </div>

          {/* Quick Info Sidebar Grid */}
          <Card hoverEffect={false} className="bg-neutral-50/80 dark:bg-neutral-900/60 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                  Peran Pemilik
                </span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 mt-1">
                  <Briefcase className="w-4 h-4 text-emerald-500" />
                  {projectMdx.meta.role}
                </span>
              </div>

              <div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                  Tahun Proyek
                </span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  {projectMdx.meta.year}
                </span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium mb-1.5">
                  Teknologi Utama
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {projectMdx.meta.technologies.map((tech) => (
                    <Badge key={tech} variant="subtle">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Link Action Buttons */}
            {(projectData?.demoUrl || projectData?.repositoryUrl) && (
              <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-3">
                {projectData.demoUrl && (
                  <Button href={projectData.demoUrl} external variant="primary" size="sm">
                    <ExternalLink className="w-4 h-4" />
                    Kunjungi Live Demo
                  </Button>
                )}
                {projectData.repositoryUrl && (
                  <Button href={projectData.repositoryUrl} external variant="outline" size="sm">
                    <GithubIcon className="w-4 h-4" />
                    Source Code GitHub
                  </Button>
                )}
              </div>
            )}
          </Card>

          {/* MDX Rendered Body Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-img:rounded-2xl">
            <MDXRemote source={projectMdx.content} />
          </div>
        </article>
      </Container>
    </div>
  );
}
