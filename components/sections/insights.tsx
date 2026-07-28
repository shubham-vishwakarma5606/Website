"use client";

/**
 * Insights — proof and philosophy.
 * Count-up stats, numbered operating principles, and an infinite
 * domain marquee (pauses on hover, edge-masked, reduced-motion safe).
 */
import { stats, principles, domains } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Insights() {
  return (
    <section
      id="insights"
      className="relative scroll-mt-24 border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="Insights"
          title={
            <>
              Numbers that earned
              <br />
              their <span className="text-gradient-accent">decimal places</span>.
            </>
          }
          description="What a decade on both sides of the table taught me — measured, then distilled into principles I actually run engagements by."
        />

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <SpotlightCard lift={false} className="p-6 text-center sm:p-8">
                <div className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
                  {stat.label}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Principles */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.06}>
              <SpotlightCard className="group h-full p-6 sm:p-7">
                <div className="flex gap-5">
                  <span className="font-mono text-sm text-accent-bright/70 transition-colors duration-300 group-hover:text-accent-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-foreground-muted">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Domain marquee */}
        <Reveal delay={0.1} className="mt-16">
          <div className="marquee-mask overflow-hidden border-y border-white/[0.06] py-5">
            <div aria-hidden className="animate-marquee flex w-max gap-10 hover:[animation-play-state:paused]">
              {[...domains, ...domains].map((domain, i) => (
                <span
                  key={`${domain}-${i}`}
                  className="flex items-center gap-10 whitespace-nowrap font-mono text-xs tracking-[0.25em] text-foreground-muted/70"
                >
                  {domain.toUpperCase()}
                  <span className="text-accent/50">✦</span>
                </span>
              ))}
            </div>
            <p className="sr-only">
              Domains of practice: {domains.join(", ")}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
