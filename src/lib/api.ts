import { type Author } from "@/interfaces/author";
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

  const normalizedPeople = {
    author: normalizePeople(data.author),
    curator: normalizePeople(data.curator),
  };

  const author: Author[] = normalizedPeople.author.map(({ name, url }) => ({
    name,
    ...(url ? { url } : {}),
  }));

  const curator: Curator[] = normalizedPeople.curator.map(
    ({ name, url, picture }) => ({
      name,
      ...(url ? { url } : {}),
      ...(picture ? { picture } : {}),
    }),
  );

  return { ...data, author, curator, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

type NormalizedPerson = {
  name: string;
  url?: string;
  picture?: string;
};

function normalizePeople(input: unknown): NormalizedPerson[] {
  if (!input) {
    return [];
  }

  const entries = Array.isArray(input) ? input : [input];

  return entries
    .map((entry) => normalizePerson(entry))
    .filter((entry): entry is NormalizedPerson => Boolean(entry));
}

function normalizePerson(entry: unknown): NormalizedPerson | null {
  if (!entry) {
    return null;
  }

  if (typeof entry === "string") {
    const trimmed = entry.trim();
    return trimmed.length > 0 ? { name: trimmed } : null;
  }

  if (typeof entry === "object" && entry !== null && "name" in entry) {
    const candidate = entry as {
      name?: unknown;
      url?: unknown;
      picture?: unknown;
    };

    if (typeof candidate.name !== "string") {
      return null;
    }

    const name = candidate.name.trim();
    if (!name) {
      return null;
    }

    const normalized: NormalizedPerson = { name };

    if (typeof candidate.url === "string" && candidate.url.trim().length > 0) {
      normalized.url = candidate.url;
    }

    if (
      typeof candidate.picture === "string" &&
      candidate.picture.trim().length > 0
    ) {
      normalized.picture = candidate.picture;
    }

    return normalized;
  }

  return null;
}
