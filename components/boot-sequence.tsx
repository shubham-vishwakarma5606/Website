"use client";

/**
 * BootSequence — the site's signature opening.
 *
 * A secure-terminal boot that plays once per page load:
 * security modules come online line by line, an access-gated
 * progress bar fills, "ACCESS GRANTED" lands, then a two-curtain
 * reveal slides up with a parallax lag.
 *
 * - Skippable: click anywhere or press any key
 * - Reduced motion: collapses to a 400ms fade
 * - Never blocks content: overlay is pointer-transparent while exiting
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LINE_INTERVAL = 260;
const OPENING_DELAY = 200;

const BOOT_LINES: { text: string; status: "ok" | "granted" }[] = [
  { text: "initializing secure session v3.2.1 — sv://core", status: "ok" },
  { text: "runtime integrity :: verified", status: "ok" },
  { text: "AES-256-GCM keystore :: loaded", status: "ok" },
  { text: "zero-trust policy engine :: online", status: "ok" },
  { text: "threat surface scanned :: 0 anomalies", status: "ok" },
  { text: "mounting modules :: journey · insights · blog", status: "ok" },
  { text: "ACCESS GRANTED — welcome, guest", status: "granted" },
];

const TOTAL_DURATION =
  OPENING_DELAY + BOOT_LINES.length * LINE_INTERVAL + 700;

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timestamp, setTimestamp] = useState<string>("");
  const skipped = useRef(false);

  const finish = useCallback(() => {
    if (skipped.current) return;
    skipped.current = true;
    onComplete();
  }, [onComplete]);

  // Wall-clock timestamp (set post-mount to avoid hydration mismatch)
  useEffect(() => {
    const now = new Date();
    setTimestamp(
      `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(
        now.getDate()
      ).padStart(2, "0")} // ${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} LOCAL`
    );
  }, []);

  // Reduced motion: skip the theatrics, just a quick fade
  useEffect(() => {
    if (!reducedMotion) return;
    const t = setTimeout(finish, 400);
    return () => clearTimeout(t);
  }, [reducedMotion, finish]);

  // Line-by-line log reveal
  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setVisibleLines(i + 1),
          OPENING_DELAY + i * LINE_INTERVAL
        )
      );
    });
    timers.push(setTimeout(finish, TOTAL_DURATION));
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion, finish]);

  // Progress counter ticking toward 100
  useEffect(() => {
    if (reducedMotion) return;
    const stepMs = Math.max(18, Math.floor(TOTAL_DURATION / 110));
    const id = setInterval(() => {
      setProgress((p) => Math.min(100, p + 1.6 + Math.random() * 1.4));
    }, stepMs);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Skip on any key
  useEffect(() => {
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  const pct = Math.floor(Math.min(100, progress));

  return (
    <>
      {/* Curtain 2 — the accent-lagged layer underneath, exits last for depth */}
      <motion.div
        className="fixed inset-0 z-[89] bg-accent/[0.07] backdrop-blur-sm"
        exit={{ y: "-100%" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        aria-hidden
      />
      {/* Curtain 1 — the terminal itself */}
      <motion.div
        role="dialog"
        aria-label="Site loading"
        onClick={finish}
        className="scanlines fixed inset-0 z-[90] flex cursor-pointer flex-col bg-background-deep"
        exit={{ y: "-100%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Center accent glow so the boot screen isn't flat */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

        {/* Top chrome bar */}
        <div className="relative flex items-center justify-between px-5 py-4 font-mono text-[11px] tracking-widest text-foreground-muted sm:px-8">
          <span className="text-foreground-subtle">SV://SECURE-BOOT</span>
          <span className="hidden sm:block">{timestamp || "——.—.— // —:—:—"}</span>
          <span className="text-accent-bright/80">v3.2.1</span>
        </div>

        {/* Terminal body */}
        <div className="relative flex flex-1 items-center justify-center px-5">
          <div className="w-full max-w-xl">
            {/* Monogram chip */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-white shadow-[0_0_24px_rgba(94,106,210,0.35)]">
                {site.monogram}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground-muted">
                secure environment online
              </div>
            </div>

            {/* Log lines */}
            <div
              className="min-h-[15.5rem] space-y-2.5 font-mono text-[13px] leading-relaxed sm:text-sm"
              aria-live="polite"
            >
              {BOOT_LINES.slice(0, visibleLines).map((line, i) =>
                line.status === "granted" ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="text-gradient-accent pt-2 text-base font-semibold tracking-wide sm:text-lg"
                  >
                    {line.text}
                  </motion.div>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex items-baseline gap-3"
                  >
                    <span className="shrink-0 text-emerald-400/90">[ OK ]</span>
                    <span className="text-foreground/70">{line.text}</span>
                  </motion.div>
                )
              )}
              {visibleLines > 0 && visibleLines < BOOT_LINES.length && (
                <span className="animate-blink inline-block text-accent-bright">
                  ▍
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between font-mono text-[11px] tracking-widest text-foreground-muted">
                <span>establishing encrypted channel…</span>
                <span className="tabular-nums text-foreground/80">
                  {String(pct).padStart(3, "0")}%
                </span>
              </div>
              <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent via-accent-bright to-indigo-400 shadow-[0_0_16px_rgba(94,106,210,0.6)] transition-[width] duration-150 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom hint */}
        <div className="relative px-5 pb-5 text-center font-mono text-[11px] tracking-widest text-foreground-subtle">
          CLICK OR PRESS ANY KEY TO SKIP
        </div>
      </motion.div>
    </>
  );
}
