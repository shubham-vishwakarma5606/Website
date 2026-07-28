"use client";

/**
 * SamuraiHeroFigure — the realistic samurai who stands on the landing page.
 *
 * Replaces the old procedural low-poly three.js figure and its framed
 * "dojo" pane. This is a photoreal, pre-rendered character plate composited
 * straight into the hero: no canvas, no WebGL, no model download — just an
 * alpha-feathered image with cinematic lighting layers on top.
 *
 * Motion is deliberately subtle so he reads as a real person standing there:
 *   - a slow breathing drift (transform, GPU-only)
 *   - a pointer-driven parallax tilt across the whole figure
 *   - an indigo rim glow + ground haze that live behind him
 *
 * Everything collapses to a static image under prefers-reduced-motion.
 */
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { withBase } from "@/lib/public-asset";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SamuraiHeroFigure({ show = true }: { show?: boolean }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Pointer parallax — normalized -0.5..0.5 around the figure's box.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [7, -7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-5, 5]);
  const shiftX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-24, 24]);

  function handlePointer(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    px.set((e.clientX - box.left) / box.width - 0.5);
    py.set((e.clientY - box.top) / box.height - 0.5);
  }

  function resetPointer() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
      initial={{ opacity: 0, y: 40 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
      className="pointer-events-auto relative mx-auto flex w-full max-w-[420px] items-end justify-center select-none lg:max-w-none"
      style={{ perspective: 1200 }}
      aria-hidden={false}
    >
      {/* Indigo key glow behind the figure */}
      <motion.div
        aria-hidden
        style={reducedMotion ? undefined : { x: glowX }}
        className="pointer-events-none absolute inset-x-4 bottom-10 top-10 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(94,106,210,0.30),rgba(94,106,210,0.08)_45%,transparent_70%)] blur-2xl"
      />

      {/* Cold ambient bounce, low and wide */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_center,rgba(120,140,200,0.16),transparent_70%)] blur-xl"
      />

      <motion.div
        style={
          reducedMotion
            ? undefined
            : { rotateX, rotateY, x: shiftX, transformStyle: "preserve-3d" }
        }
        className="relative w-full"
      >
        {/* Breathing drift */}
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -9, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full"
        >
          <Image
            src={withBase("/samurai/samurai-hero.webp")}
            alt="Realistic samurai in weathered black lacquered armour, hand resting on his katana"
            width={760}
            height={1361}
            priority
            sizes="(max-width: 1024px) 78vw, 430px"
            className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.75)]"
          />

          {/* Indigo rim pass — screened over the armour edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40 bg-[linear-gradient(105deg,rgba(94,106,210,0.35)_0%,transparent_38%,transparent_72%,rgba(94,106,210,0.18)_100%)]"
          />

          {/* Bottom fade into the page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background-base"
          />
        </motion.div>
      </motion.div>

      {/* Ground haze */}
      <motion.div
        aria-hidden
        animate={reducedMotion ? {} : { opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-6 bottom-2 h-16 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(94,106,210,0.22),transparent_72%)] blur-2xl"
      />
    </motion.div>
  );
}

export default SamuraiHeroFigure;
