import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import { type Curator } from "@/interfaces/curator";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { CuratorList } from "./curator-list";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  curators: Curator[];
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  curators,
}: Props) {
  const authorByline = author.url ? (
    <a
      href={author.url}
      className="underline hover:text-blue-600 transition-colors duration-200"
      rel="noopener noreferrer"
      target="_blank"
    >
      {author.name}
    </a>
  ) : (
    author.name
  );

  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
            <DateFormatter dateString={date} />
            <CuratorList
              curators={curators}
              className="flex flex-wrap items-center gap-1 text-slate-500 dark:text-slate-300"
            />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Graph by {authorByline}
          </p>
        </div>
      </div>
    </section>
  );
}
