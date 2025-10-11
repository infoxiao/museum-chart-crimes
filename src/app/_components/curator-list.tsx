import { type Curator } from "@/interfaces/curator";

type Props = {
  curators: Curator[];
  className?: string;
};

export function CuratorList({ curators, className }: Props) {
  if (!curators.length) {
    return null;
  }

  const baseClasses =
    "flex flex-wrap items-center gap-1 text-sm uppercase tracking-wide text-slate-600 dark:text-slate-300";
  const classes = [baseClasses, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      Curated by{" "}
      {curators.map((curator, index) => {
        const showComma =
          curators.length > 2 && index > 0 && index < curators.length - 1;
        const showCommaAnd =
          curators.length > 2 && index === curators.length - 1;
        const showAnd = curators.length === 2 && index === 1;

        const prefix = showComma
          ? ", "
          : showCommaAnd
          ? ", and "
          : showAnd
          ? "and "
          : "";

        const content = curator.url ? (
          <a
            href={curator.url}
            className="underline hover:text-blue-600 transition-colors duration-200"
            rel="noopener noreferrer"
            target="_blank"
          >
            {curator.name}
          </a>
        ) : (
          curator.name
        );

        return (
          <span key={`${curator.name}-${index}`}>
            {prefix}
            {content}
          </span>
        );
      })}
    </div>
  );
}
