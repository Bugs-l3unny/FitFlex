import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** id of the heading that names the section. */
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

/** Page section with the shared vertical rhythm and content width. */
export function Section({ id, labelledBy, className = "", children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 md:py-28 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ id, title, children }: SectionHeadingProps) {
  return (
    <header className="mb-10 md:mb-14">
      <h2 id={id} className="display text-[clamp(2rem,5.5vw,3.75rem)] max-w-[18ch]">
        {title}
      </h2>
      {children ? <p className="prose-fit mt-5 text-tiza-suave text-lg">{children}</p> : null}
    </header>
  );
}
