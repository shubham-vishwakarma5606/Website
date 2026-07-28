"use client";

/**
 * Contact — the close. One question, two channels, full signal.
 * Returns to the hero's language with a centered gradient headline
 * and an accent beacon CTA (email) plus a quiet phone option.
 */
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { Mail, Phone, FileDown, ArrowUpRight } from "lucide-react";
import { withBase } from "@/lib/public-asset";

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
            <span>07</span>
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
            Presales solutions, architecture reviews, BFSI security operations,
            or a second pair of eyes on the thing that keeps you up at night.
            First conversation is free — and confidential by default.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${site.email}`}
              className="group relative inline-flex max-w-full items-center gap-2.5 overflow-hidden rounded-lg bg-accent px-6 py-4 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_16px_rgba(94,106,210,0.35),0_0_48px_rgba(94,106,210,0.2),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-accent-bright hover:shadow-[0_0_0_1px_rgba(94,106,210,0.6),0_8px_32px_rgba(94,106,210,0.5),0_0_72px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.25)] active:scale-[0.98] sm:px-8"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <Mail className="relative h-4 w-4 shrink-0" />
              <span className="relative truncate">{site.email}</span>
              <ArrowUpRight className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-lg bg-white/[0.05] px-6 py-4 text-sm font-medium text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-200 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.12)] active:scale-[0.98]"
            >
              <Phone <a
  href={withBase(site.resume)}
  download="Shubham-Vishwakarma-Resume.pdf"
  className="inline-flex items-center gap-2.5 rounded-lg border border-accent/30 bg-accent/[0.08] px-6 py-4 text-sm font-medium text-accent-bright shadow-[0_0_24px_rgba(94,106,210,0.12)] transition-all duration-200 hover:border-accent/50 hover:bg-accent/[0.14] hover:shadow-[0_0_36px_rgba(94,106,210,0.22)] active:scale-[0.98]"
>
  <FileDown className="h-4 w-4" />
  Résumé · PDF
</a> className="h-4 w-4 text-foreground-muted" />
              {site.phone}
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
