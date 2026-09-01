# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Arif Faishal Nugraha — a software engineer portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, and MDX. Supports dark/light mode, SEO, contact form via Resend, and project case studies written in MDX.

## Important: Next.js Version Note

This project uses Next.js 16.2.11, which has breaking changes from earlier versions. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.** Heed deprecation notices. This is NOT the Next.js you may know from training data.

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start production build locally |
| `npm run lint` | Run ESLint (eslint-config-next/core-web-vitals + typescript) |
| `npm run typecheck` | Run TypeScript compiler (`tsc --noEmit`) |

There are no test commands configured.

## Environment Variables

Required for production; optional for local dev (contact form falls back to simulation mode):

- `NEXT_PUBLIC_SITE_URL` — Public site URL (used for metadata, OG, sitemap)
- `RESEND_API_KEY` — Resend API key for contact form email
- `RESEND_FROM_EMAIL` — Verified sender email for Resend
- `CONTACT_EMAIL` — Destination email for contact form submissions

Copy `.env.example` to `.env.local` for local configuration.

## Architecture

### App Router Structure (`src/app/`)

- `layout.tsx` — Root layout with Inter font, ThemeProvider, Navbar, Footer, and JSON-LD structured data
- `page.tsx` — Landing page composing all section components (Hero → About → Skills → Projects → Experience → Contact)
- `projects/[slug]/page.tsx` — Dynamic project detail page. Renders MDX case study content via `next-mdx-remote/rsc`
- `api/contact/route.ts` — POST endpoint for contact form. Validates with Zod, checks honeypot, sends via Resend (or simulates if no API key)
- `sitemap.ts` — Dynamic sitemap including project pages
- `robots.ts` — Robots.txt rules
- `globals.css` — Tailwind v4 imports, CSS custom properties for theming, `project-prose` MDX typography styles

### Component Organization (`src/components/`)

- `sections/` — Page section components (hero, about, skills, projects, experience, contact)
- `layout/` — Navbar, Footer
- `theme/` — ThemeProvider (wraps next-themes), ThemeToggle
- `ui/` — Reusable UI primitives: Button, Card, Container, Badge, SectionHeading, SocialIcons

### Data Layer (`src/data/`)

All content is data-driven, not hardcoded in components:

- `profile.ts` — Personal info, bio, social links, avatar, resume URL
- `projects.ts` — Structured project metadata (slug, title, summary, technologies, URLs, etc.)
- `skills.ts` — Skills grouped by category (Frontend, Backend, Mobile, Database, Tools, Concepts) with `featured` flag
- `experience.ts` — Work history with achievements and technologies
- `navigation.ts` — Nav links

### Utilities (`src/lib/`)

- `utils.ts` — `cn()` helper: `clsx` + `tailwind-merge`
- `mdx.ts` — Reads and parses MDX files from `src/content/projects/` using `gray-matter`. Exports `getProjectBySlug()`, `getAllProjectSlugs()`
- `metadata.ts` — `generateBaseMetadata()` factory for consistent SEO metadata (title, OG, Twitter, robots, canonical)
- `validations.ts` — Zod schema for contact form with Indonesian error messages

### Types (`src/types/`)

- `profile.ts`, `project.ts`, `skill.ts`, `experience.ts` — TypeScript interfaces matching data files

### Content (`src/content/projects/`)

MDX files for project case studies. Each file has YAML frontmatter parsed by `gray-matter`:

```yaml
---
title: string
summary: string
category: string
year: number
role: string
technologies: string[]
---
```

The MDX body is rendered via `MDXRemote` from `next-mdx-remote/rsc`.

## Key Patterns

### Dual Data Source for Projects

Project listings use `projectsData` (from `src/data/projects.ts`). Project detail pages cross-reference the same slug against both `projectsData` (for demo/repo URLs) and the MDX file (for case study content). When adding a new project:

1. Add entry to `src/data/projects.ts`
2. Create `src/content/projects/[slug].mdx` with matching frontmatter

### Theming

- Uses `next-themes` with `attribute="class"` and `defaultTheme="system"`
- CSS custom properties in `globals.css` define `--portfolio-*` tokens for light/dark modes
- Dark mode activated via `.dark` class on `<html>`
- `project-prose` class in `globals.css` provides MDX typography (NOT using `@tailwindcss/typography` plugin)

### Styling Conventions

- Tailwind CSS v4 with `@import "tailwindcss"` and `@theme inline` in `globals.css`
- Custom CSS variables for portfolio-specific colors (background, surface, text, muted, border, marker)
- Emerald (`emerald-500`/`emerald-600`) is the primary accent color throughout
- Components use `cn()` for conditional class merging
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs

### Contact Form

- Client-side validation via Zod schema (`contactFormSchema`)
- Server-side validation in API route
- Honeypot field (`honeypot`) for spam protection
- Resend email with styled HTML template
- Graceful fallback to simulation mode when `RESEND_API_KEY` is missing

### SEO

- `generateBaseMetadata()` generates full metadata including OpenGraph, Twitter cards, canonical URLs, and JSON-LD structured data
- Sitemap is dynamically generated from project slugs
- `robots.ts` disallows `/api/`

## Adding Content

- **Profile/Social**: Edit `src/data/profile.ts`
- **Skills**: Edit `src/data/skills.ts` — use `featured: true` for highlighted skills
- **Experience**: Edit `src/data/experience.ts`
- **Projects**: Add to `src/data/projects.ts` AND create MDX in `src/content/projects/`
- **Static assets**: Place images in `public/images/`, CV in `public/cv/`
