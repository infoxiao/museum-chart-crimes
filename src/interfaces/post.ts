import { type Author } from "./author";
import { type Curator } from "./curator";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  curator: Curator[];
  excerpt: string;
  content: string;
  preview?: boolean;
};
