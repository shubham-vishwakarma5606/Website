"use client";

/**
 * Contact — the close. One question, one CTA, full signal.
 * Returns to the hero's language with a centered gradient headline
 * and a single accent beacon button.
 */
import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Contact() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] px-5 py-28 sm:px-8 sm:py-36"
    >
      {/* Focused accent pool behind the CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.13] blur-[130px]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-bright">
            <span>06</span>
            <span className="hairline-fade w-12" aria-hidden />
            <span className="text-foreground-muted">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            <span className="text-gradient block">Have a system</span>
            <span className="text-gradient-accent block">
              worth securing?
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            Architecture reviews, zero-trust roadmaps, AI security assessments,
            or a second pair of eyes on the thing that keeps you up at night.
            First conversation is free — and confidential by default.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${site.email}`}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-accent px-8 py-4 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_16px_rgba(94,106,210,0.35),0_0_48px_rgba(94,106,210,0.2),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-accent-bright hover:shadow-[0_0_0_1px_rgba(94,106,210,0.6),0_8px_32px_rgba(94,106,210,0.5),0_0_72px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.25)] active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <Mail className="relative h-4 w-4" />
              <span className="relative">{site.email}</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <motion.p
            className="mt-10 font-mono text-[11px] tracking-widest text-foreground-subtle"
            animate={reducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            $ ping shubham — replies within 24 hours
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
