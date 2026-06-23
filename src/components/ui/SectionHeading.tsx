import { highlightText } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionHeading({ eyebrow, title, highlight = "", description, centered, dark }: SectionHeadingProps) {
  const parts = highlightText(title, highlight);

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={dark ? "mb-3 text-sm font-normal uppercase text-slate-500" : "mb-3 text-sm font-normal uppercase text-cyan-300"}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={dark ? "text-4xl font-bold leading-none text-slate-950 md:text-5xl" : "text-4xl font-bold leading-none text-white md:text-5xl"}>
        {parts.before}
        {parts.match ? <span className="accent-text">{parts.match}</span> : null}
        {parts.after}
      </h2>
      {description ? (
        <p className={dark ? "mt-4 text-lg font-normal text-slate-600" : "mt-4 text-lg font-normal text-slate-300"}>{description}</p>
      ) : null}
    </div>
  );
}
