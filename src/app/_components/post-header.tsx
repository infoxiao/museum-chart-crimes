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
  author: Author;
  curators: Curator[];
};

export function PostHeader({
  title,
  coverImage,
  date,
  author,
  curators,
}: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
        Graph by {author.name}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
          Graph by {author.name}
        </div>
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
