"use client";

/**
 * Expertise — asymmetric bento grid (6-col desktop baseline).
 * The featured card (4×2) carries a live-looking policy-as-code
 * snippet instead of stock iconography: the artifact is the proof.
 */
import {
  ShieldCheck,
  Cloud,
  BrainCircuit,
  Bug,
  Scale,
  Siren,
  type LucideIcon,
} from "lucide-react";
import { expertise, expertiseIntro } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const icons: Record<string, LucideIcon> = {
  ShieldCheck,
  Cloud,
  BrainCircuit,
  Bug,
  Scale,
  Siren,
};

/** Policy snippet rendered in the featured card — hand-tinted tokens. */
function PolicySnippet() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0a0a0d]/90">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-wider text-foreground-subtle">
          zero-trust / identity.rego
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-emerald-400/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          ENFORCED
        </span>
      </div>
      <div className="space-y-1 overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed sm:text-[13px]">
        <div className="text-foreground-subtle"># every request, every time</div>
        <div>
          <span className="text-indigo-300">allow</span>{" "}
          <span className="text-foreground/80">when {"{"}</span>
        </div>
        <div className="pl-5 text-foreground/80">
          device.posture == <span className="text-emerald-300/90">"compliant"</span>
        </div>
        <div className="pl-5 text-foreground/80">
          user.mfa == <span className="text-emerald-300/90">"phishing-resistant"</span>
        </div>
        <div className="pl-5 text-foreground/80">
          session.ttl &lt;= <span className="text-accent-bright">3600</span>
        </div>
        <div className="pl-5 text-foreground/80">
          context.risk_score &lt; <span className="text-accent-bright">0.30</span>
        </div>
        <div className="text-foreground/80">{"}"}</div>
      </div>
    </div>
  );
}

export function Expertise() {
  return (
    <section
      id="expertise"
      className="relative scroll-mt-24 border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          label="What I do"
          title={
            <>
              Disciplines that hold
              <br />
              under <span className="text-gradient-accent">production pressure</span>.
            </>
          }
          description={expertiseIntro}
        />

        <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-6 md:grid-flow-dense">
          {expertise.map((card, i) => {
            const Icon = icons[card.icon] ?? ShieldCheck;
            return (
              <Reveal
                key={card.title}
                delay={i * 0.06}
                className={card.span}
              >
                <SpotlightCard
                  className={`h-full p-6 sm:p-7 ${
                    card.featured ? "md:p-8" : ""
                  }`}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-bright shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3
                      className={`mt-5 font-semibold tracking-tight text-foreground ${
                        card.featured ? "text-2xl sm:text-3xl" : "text-xl"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed text-foreground-muted ${
                        card.featured ? "max-w-lg sm:text-base" : ""
                      }`}
                    >
                      {card.description}
                    </p>
                    {card.featured && <PolicySnippet />}
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-foreground-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
