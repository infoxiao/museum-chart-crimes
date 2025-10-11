import { type Author } from "@/interfaces/author";
import { type Curator } from "@/interfaces/curator";
import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { CuratorList } from "./curator-list";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  authors: Author[];
  slug: string;
  curators: Curator[];
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  authors,
  slug,
  curators,
}: Props) {
  const hasAuthors = authors.length > 0;

  const authorByline = authors.map((person, index) => {
    const content = person.url ? (
      <a
        href={person.url}
        className="underline hover:text-blue-600 transition-colors duration-200"
        rel="noopener noreferrer"
        target="_blank"
      >
        {person.name}
      </a>
    ) : (
      person.name
    );

    return (
      <span key={`author-${person.name}-${index}`}>
        {index > 0 && ", "}
        {content}
      </span>
    );
  });

  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
        <DateFormatter dateString={date} />
        <CuratorList
          curators={curators}
          className="flex flex-wrap items-center gap-1 text-slate-500 dark:text-slate-300"
        />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {hasAuthors && (
        <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
          Graph by {authorByline}
        </p>
      )}
    </div>
  );
}
