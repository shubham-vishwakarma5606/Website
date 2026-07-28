"use client";

/**
 * Journey — career timeline.
 *
 * A gradient rail runs down the left; an accent overlay line draws
 * itself with scroll progress through the section. Each entry is a
 * spotlight surface with mono period chip and capability tags.
 */
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";
import { journey } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          label="Journey"
          title={
            <>
              The road from SOC trenches
              <br />
              to the <span className="text-gradient-accent">architecture board</span>.
            </>
          }
          description="Nine years, five chapters. Each role taught one lesson the next one couldn't start without."
        />

        <div ref={railRef} className="relative">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute bottom-4 left-[7px] top-2 w-px bg-white/[0.07] sm:left-[9px]"
          />
          {/* Scroll-drawn accent line */}
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-4 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-bright to-accent/20 shadow-[0_0_12px_rgba(94,106,210,0.5)] sm:left-[9px]"
          />

          <div className="space-y-6 sm:space-y-8">
            {journey.map((entry, i) => (
              <Reveal key={entry.period} delay={i * 0.06}>
                <div className="relative pl-10 sm:pl-14">
                  {/* Node */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-8 flex h-[15px] w-[15px] items-center justify-center rounded-full border sm:h-[19px] sm:w-[19px] ${
                      entry.current
                        ? "border-accent bg-accent/30 shadow-[0_0_16px_rgba(94,106,210,0.6)]"
                        : "border-white/15 bg-background-base"
                    }`}
                  >
                    <span
                      className={`h-[5px] w-[5px] rounded-full ${
                        entry.current ? "animate-pulse bg-accent-bright" : "bg-white/25"
                      }`}
                    />
                  </span>

                  <SpotlightCard className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 font-mono text-[11px] tracking-widest text-accent-bright">
                        {entry.period}
                      </span>
                      {entry.current && (
                        <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400/90">
                          ● current
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 flex items-start gap-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      <Briefcase className="mt-1 h-5 w-5 shrink-0 text-accent-bright/70" />
                      {entry.role}
                    </h3>
                    <p className="mt-1 font-mono text-xs tracking-wider text-foreground-muted sm:pl-8">
                      {entry.org}
                    </p>
                    {entry.clients && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 sm:pl-8">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-subtle">
                          clients
                        </span>
                        {entry.clients.map((client) => (
                          <span
                            key={client}
                            className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 text-[11px] text-foreground-muted"
                          >
                            {client}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground-muted sm:pl-8 sm:text-base">
                      {entry.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 sm:pl-8">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground-muted transition-colors duration-200 hover:border-accent/30 hover:text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
