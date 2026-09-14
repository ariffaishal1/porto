import { profileData } from "@/data/profile";
import { Project } from "@/types/project";

const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://arif-faishal-nugraha.vercel.app";

/**
 * Sanitizes JSON string representation to prevent XSS in HTML script injection.
 * Recommended by Next.js documentation (replaces '<' with unicode '\\u003c').
 */
export function sanitizeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Generates combined Person and WebSite JSON-LD schemas using @graph syntax.
 */
export function getPersonAndWebsiteJsonLd(baseUrl = DEFAULT_BASE_URL) {
  const personId = `${baseUrl}/#person`;
  const websiteId = `${baseUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profileData.name,
        givenName: "Arif Faishal",
        familyName: "Nugraha",
        jobTitle: profileData.role,
        headline: profileData.headline,
        description: profileData.shortBio,
        url: baseUrl,
        sameAs: [
          profileData.socialLinks.github,
          profileData.socialLinks.linkedin,
        ].filter(Boolean),
        knowsAbout: [
          "Software Engineering",
          "Web Development",
          "Mobile Development",
          "Android",
          "Flutter",
          "React",
          "Next.js",
          "TypeScript",
          "Internet of Things (IoT)",
          "Artificial Intelligence",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Universitas Majalengka",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: baseUrl,
        name: `${profileData.name} — Portfolio & Developer Archive`,
        description: profileData.shortBio,
        inLanguage: "id-ID",
        publisher: {
          "@id": personId,
        },
      },
    ],
  };
}

/**
 * Generates a BreadcrumbList JSON-LD schema.
 */
export function getBreadcrumbJsonLd(
  items: { name: string; path: string }[],
  baseUrl = DEFAULT_BASE_URL
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${baseUrl}${item.path}`,
    })),
  };
}

/**
 * Generates BreadcrumbList and ProfilePage JSON-LD schema for /cv page.
 */
export function getCvPageJsonLd(baseUrl = DEFAULT_BASE_URL) {
  const personId = `${baseUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbJsonLd(
        [
          { name: "Beranda", path: "/" },
          { name: "Curriculum Vitae", path: "/cv" },
        ],
        baseUrl
      ),
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/cv#webpage`,
        url: `${baseUrl}/cv`,
        name: `Curriculum Vitae — ${profileData.name}`,
        description: `Curriculum Vitae resmi ${profileData.name} — ${profileData.role}`,
        mainEntity: {
          "@id": personId,
        },
      },
    ],
  };
}

/**
 * Generates BreadcrumbList and SoftwareApplication JSON-LD schema for project detail pages.
 */
export function getProjectDetailJsonLd(project: Project, baseUrl = DEFAULT_BASE_URL) {
  const projectUrl = `${baseUrl}/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbJsonLd(
        [
          { name: "Beranda", path: "/" },
          { name: "Proyek", path: "/#projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ],
        baseUrl
      ),
      {
        "@type": "SoftwareApplication",
        "@id": `${projectUrl}#software`,
        name: project.title,
        description: project.description || project.summary,
        applicationCategory: project.category,
        operatingSystem:
          project.category.toLowerCase().includes("mobile") ||
          project.category.toLowerCase().includes("android") ||
          project.technologies.some((t) => t.toLowerCase() === "android" || t.toLowerCase() === "flutter")
            ? "Android, Web, Cross-Platform"
            : "Web, Cloud",
        author: {
          "@type": "Person",
          name: profileData.name,
          url: baseUrl,
        },
        url: project.demoUrl || projectUrl,
        ...(project.repositoryUrl ? { downloadUrl: project.repositoryUrl } : {}),
        keywords: project.technologies.join(", "),
        datePublished: `${project.year}-01-01`,
      },
    ],
  };
}
