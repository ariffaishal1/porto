import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export interface GithubRepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  isFeatured?: boolean;
}

export interface GithubStatsResponse {
  user: {
    login: string;
    name: string;
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
    html_url: string;
    bio: string;
  };
  repos: GithubRepoData[];
  source: "live" | "fallback";
  fetchedAt: string;
}

const FALLBACK_REPOS: GithubRepoData[] = [
  {
    name: "prd-gene",
    description: "AI-powered Product Requirement Document (PRD) generator and engineering workflow toolkit.",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/ariffaishal1/prd-gene",
    isFeatured: true,
  },
  {
    name: "prd-generator-hacktiv",
    description: "Interactive AI PRD generator chatbot with Google Gemini, Express.js backend, and live split-screen preview.",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/ariffaishal1/prd-generator-hacktiv",
    isFeatured: true,
  },
  {
    name: "porto",
    description: "Personal retro terminal CLI portfolio built with Next.js 16, App Router, and Tailwind CSS v4.",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/ariffaishal1/porto",
    isFeatured: true,
  },
];

export async function GET() {
  const username = "ariffaishal1";

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Arif-Faishal-Portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub user API responded with ${userRes.status}`);
    }

    const userData = await userRes.json();
    let reposData: GithubRepoData[] = FALLBACK_REPOS;

    if (reposRes.ok) {
      const rawRepos = await reposRes.json();
      if (Array.isArray(rawRepos)) {
        reposData = rawRepos
          .filter((r: { fork?: boolean }) => !r.fork)
          .slice(0, 6)
          .map((r: { name: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number; html_url: string }) => ({
            name: r.name,
            description: r.description || "Repositori publik oleh " + username,
            language: r.language || "TypeScript",
            stars: r.stargazers_count ?? 0,
            forks: r.forks_count ?? 0,
            url: r.html_url,
            isFeatured: ["prd-gene", "porto", "prd-generator-hacktiv"].includes(r.name),
          }));

        if (reposData.length === 0) {
          reposData = FALLBACK_REPOS;
        }
      }
    }

    const payload: GithubStatsResponse = {
      user: {
        login: userData.login,
        name: userData.name || "Arif Faishal Nugraha",
        public_repos: userData.public_repos ?? 6,
        followers: userData.followers ?? 0,
        following: userData.following ?? 0,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        bio: userData.bio || "Software Engineer",
      },
      repos: reposData,
      source: "live",
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(payload);
  } catch {
    // Graceful fallback response
    const fallbackPayload: GithubStatsResponse = {
      user: {
        login: username,
        name: "Arif Faishal Nugraha",
        public_repos: 6,
        followers: 0,
        following: 0,
        avatar_url: "/profile.jpg",
        html_url: `https://github.com/${username}`,
        bio: "Software Engineer",
      },
      repos: FALLBACK_REPOS,
      source: "fallback",
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(fallbackPayload, { status: 200 });
  }
}
