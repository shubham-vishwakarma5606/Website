"use client";

/**
 * Interests — the person behind the architecture.
 * Six spotlight tiles in a clean 3×2; smaller, lighter than the
 * expertise bento so the hierarchy reads work → life.
 */
import {
  Flag,
  Server,
  GitBranch,
  Mic,
  BrainCircuit,
  Mountain,
  type LucideIcon,
} from "lucide-react";
import { interests, interestsIntro } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const icons: Record<string, LucideIcon> = {
  Flag,
  Server,
  GitBranch,
  Mic,
  BrainCircuit,
  Mountain,
};

export function Interests() {
  return (
    <section
      id="interests"
      className="relative scroll-mt-24 border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          label="Interests"
          title={
            <>
              Off the clock,
              <br />
              still <span className="text-gradient-accent">on the surface</span>.
            </>
          }
          description={interestsIntro}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest, i) => {
            const Icon = icons[interest.icon] ?? Flag;
            return (
              <Reveal key={interest.title} delay={i * 0.06}>
                <SpotlightCard
                  className="h-full p-6"
                  glow="rgba(94,106,210,0.12)"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-bright shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-transform duration-300 ease-expo group-hover:scale-105">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {interest.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                    {interest.description}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
