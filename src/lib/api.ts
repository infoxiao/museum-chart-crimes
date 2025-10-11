import { type Curator } from "@/interfaces/curator";
import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const curator = normalizeCurator(data.curator);

  return { ...data, curator, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

function normalizeCurator(curatorData: unknown): Curator[] {
  if (!curatorData) {
    return [];
  }

  if (Array.isArray(curatorData)) {
    return curatorData
      .map((entry) => normalizeCuratorEntry(entry))
      .filter((entry): entry is Curator => Boolean(entry));
  }

  const normalized = normalizeCuratorEntry(curatorData);

  return normalized ? [normalized] : [];
}

function normalizeCuratorEntry(entry: unknown): Curator | null {
  if (!entry) {
    return null;
  }

  if (typeof entry === "string") {
    return { name: entry };
  }

  if (typeof entry === "object" && "name" in entry) {
    const candidate = entry as {
      name?: unknown;
      url?: unknown;
      picture?: unknown;
    };
    if (typeof candidate.name === "string" && candidate.name.trim().length > 0) {
      return {
        name: candidate.name,
        url: typeof candidate.url === "string" ? candidate.url : undefined,
        picture:
          typeof candidate.picture === "string" ? candidate.picture : undefined,
      };
    }
  }

  return null;
}
