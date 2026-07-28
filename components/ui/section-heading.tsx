import { Reveal } from "@/components/ui/reveal";

/**
 * SectionHeading — mono index label + gradient hairline + display title.
 * Numbering (`01 // JOURNEY`) borrows from diff files and indices,
 * keeping the technical-minimal voice consistent across sections.
 */
export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={`mb-14 sm:mb-16 ${centered ? "text-center" : ""}`}>
      <Reveal>
        <div
          className={`flex items-center gap-4 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-accent-bright">
            {index}
          </span>
          <span className="hairline-fade w-12" aria-hidden />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground-muted">
            {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-gradient sm:text-5xl"
            style={centered ? { marginInline: "auto" } : undefined}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg ${
              centered ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
