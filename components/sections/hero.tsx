"use client";

/**
 * Hero — cinematic opening, with the realistic samurai standing in it.
 *
 * Layout: the samurai occupies the left of the hero (behind the copy on
 * mobile, beside it on desktop) — no framed "dojo" pane, no 3D canvas.
 * He now lives here on the landing page instead of in the boot/intro
 * sequence, so he is the first thing a visitor sees on the page itself.
 *
 * Entrance is gated on the boot reveal; the scroll-linked parallax exit
 * is unchanged.
 */
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import { hero } from "@/lib/content";
import { useReady } from "@/components/site-shell";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SamuraiHeroFigure } from "@/components/samurai/samurai-hero-figure";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Hero() {
  const ready = useReady();
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const parallax = reducedMotion ? {} : { opacity, scale, y };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-5 pb-24 pt-28 sm:px-8"
    >
      <motion.div style={parallax} className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-14">
            {/* The samurai — standing on the landing page itself */}
            <div className="relative -mb-6 lg:mb-0">
              <SamuraiHeroFigure show={ready} />
            </div>

            {/* Copy */}
            <div className="text-center lg:text-left">
              <motion.div variants={item} className="mb-7 flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-1.5 text-xs font-medium text-foreground/90 shadow-[0_0_24px_rgba(94,106,210,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono tracking-wide">{hero.status}</span>
                </span>
              </motion.div>

              <motion.h1
                variants={item}
                className="text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl xl:text-[4.3rem]"
              >
                <span className="text-gradient block">{hero.headlineA}</span>
                <span className="text-gradient-accent block pb-1">
                  {hero.headlineB}
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg lg:mx-0"
              >
                {hero.lead}
              </motion.p>

              <motion.div
                variants={item}
                className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <a
                  href={hero.primaryCta.href}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-accent-bright hover:shadow-[0_0_0_1px_rgba(94,106,210,0.6),0_8px_28px_rgba(94,106,210,0.45),inset_0_1px_0_0_rgba(255,255,255,0.25)] active:scale-[0.98] sm:w-auto"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <span className="relative">{hero.primaryCta.label}</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/[0.05] px-7 py-3.5 text-sm font-medium text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-200 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.12)] active:scale-[0.98] sm:w-auto"
                >
                  {hero.secondaryCta.label}
                  <ChevronRight className="h-4 w-4 text-foreground-muted" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Terminal card */}
          <motion.div variants={item} className="mt-14 text-left sm:mt-16">
            <SpotlightCard className="mx-auto max-w-2xl bg-background-elevated/60 backdrop-blur-sm lg:mx-0">
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
                <span className="dot-red h-2.5 w-2.5 rounded-full" />
                <span className="dot-amber h-2.5 w-2.5 rounded-full" />
                <span className="dot-green h-2.5 w-2.5 rounded-full" />
                <span className="ml-3 font-mono text-[11px] tracking-widest text-foreground-subtle">
                  shubham@security — zsh
                </span>
              </div>
              <div className="space-y-3 px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
                {hero.terminalLines.map((line, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2">
                      <span className="text-accent-bright">$</span>
                      <span className="text-foreground/90">{line.prompt}</span>
                    </div>
                    <div className="pl-4 text-foreground-muted">
                      {line.output}
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#journey"
        aria-label="Scroll to journey"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground-muted transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}