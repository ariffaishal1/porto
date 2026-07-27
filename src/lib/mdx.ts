import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/projects");

export type MDXProjectMeta = {
  title: string;
  summary: string;
  category: string;
  year: number;
  role: string;
  technologies: string[];
};

export type MDXProjectData = {
  meta: MDXProjectMeta;
  content: string;
  slug: string;
};

export async function getProjectBySlug(slug: string): Promise<MDXProjectData | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      meta: data as MDXProjectMeta,
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error reading MDX file for slug ${slug}:`, error);
    return null;
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return [];
    }
    const files = fs.readdirSync(contentDirectory);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Error reading project slugs:", error);
    return [];
  }
}
