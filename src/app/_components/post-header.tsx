import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { CuratorList } from "@/app/_components/curator-list";
import { type Author } from "@/interfaces/author";
import { type Curator } from "@/interfaces/curator";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  authors: Author[];
  curators: Curator[];
};

export function PostHeader({
  title,
  coverImage,
  date,
  authors,
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
    <>
      <PostTitle>{title}</PostTitle>
      {hasAuthors && (
        <div className="hidden md:block md:mb-12 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
          Graph by {authorByline}
        </div>
      )}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        {hasAuthors && (
          <div className="block md:hidden mb-6 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Graph by {authorByline}
          </div>
        )}
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
          <DateFormatter dateString={date} />
          <CuratorList
            curators={curators}
            className="flex flex-wrap items-center gap-1 text-slate-500 dark:text-slate-300"
          />
        </div>
      </div>
    </>
  );
}
