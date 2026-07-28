"use client";

/**
 * SamuraiHeroFigure — a photoreal young samurai who turns on the landing page.
 *
 * No three.js, no WebGL, no model download — the figure is three pre-rendered
 * plates (front / left-35° / right-35°) that are normalised to a shared
 * 760×1330 canvas with a common foot baseline, so he reads as pivoting on the
 * spot rather than sliding around.
 *
 * The plates are stacked absolutely and cross-faded from a single pointer-driven
 * motion value `turn` (-1 left … 0 front … 1 right). The opacity curves are a
 * triangular (tent) basis: at any moment only two plates are ever blended, so
 * the turn feels continuous without a triple-stack smear.
 *
 * Layered on top, all driven by the same turn value:
 *   - perspective tilt (rotateX/rotateY) + a depth translate
 *   - a slow breathing drift
 *   - a specular sheen that tracks the turn
 *   - a contact shadow that narrows as he turns
 *   - an indigo key glow + drifting ground haze
 *   - a slow idle sway that takes over when the pointer leaves
 *
 * First-load JS is unchanged (no three.js): framer-motion + next/image only.
 * Under prefers-reduced-motion the front plate renders alone, statically.
 */
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { withBase } from "@/lib/public-asset";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Canvas the plates were normalised onto, and the rendered display size.
const PLATE_W = 760;
const PLATE_H = 1330;
const RENDER_H = 560; // ~3 cm shorter than the old layout
const RENDER_W = Math.round((RENDER_H * PLATE_W) / PLATE_H); // 320

export function SamuraiHeroFigure({ show = true }: { show?: boolean }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // turn: -1 (left plate) … 0 (front) … 1 (right plate)
  const turn = useMotionValue(0);
  const py = useMotionValue(0);

  const targetRef = useRef(0); // pointer-driven turn target
  const pyTargetRef = useRef(0); // pointer-driven tilt target
  const hoverRef = useRef(false);

  // One rAF loop drives the turntable. When the pointer is over the figure we
  // ease toward the pointer target; when it leaves, a slow sine sway takes over.
  useAnimationFrame((time) => {
    if (reducedMotion) return;
    const t = hoverRef.current
      ? targetRef.current
      : Math.sin((time / 1000) * 0.7) * 0.55; // slow idle sway
    const p = hoverRef.current ? pyTargetRef.current : 0;

    const ct = turn.get();
    turn.set(ct + (t - ct) * 0.09);
    const cp = py.get();
    py.set(cp + (p - cp) * 0.09);
  });

  // Triangular blend — the three tents sum to 1 and only two overlap at once.
  const oLeft = useTransform(turn, [-1, 0, 1], [1, 0, 0]);
  const oFront = useTransform(turn, [-1, 0, 1], [0, 1, 0]);
  const oRight = useTransform(turn, [-1, 0, 1], [0, 0, 1]);

  // 3D-ish layers, all tracking the turn.
  const rotateY = useTransform(turn, [-1, 1], [12, -12]);
  const rotateX = useTransform(py, [-1, 1], [6, -6]);
  const depthZ = useTransform(turn, [-1, 0, 1], [-26, 0, -26]);
  const sheenX = useTransform(turn, [-1, 0, 1], ["10%", "0%", "-12%"]);
  const sheenOpacity = useTransform(turn, [-1, 0, 1], [0.55, 0.3, 0.55]);
  const shadowScale = useTransform(turn, [-1, 0, 1], [0.62, 1, 0.62]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    hoverRef.current = true;
    const nx = (e.clientX - box.left) / box.width; // 0..1
    const ny = (e.clientY - box.top) / box.height; // 0..1
    targetRef.current = Math.max(-1, Math.min(1, (nx - 0.5) * 2));
    pyTargetRef.current = Math.max(-1, Math.min(1, (ny - 0.5) * 2));
  }

  function handlePointerLeave() {
    hoverRef.current = false;
    pyTargetRef.current = 0;
  }

  const plateSrc = (name: string) => withBase(`/samurai/${name}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
      className="pointer-events-auto relative mx-auto flex select-none justify-center"
    >
      <div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative"
        style={{ width: RENDER_W, height: RENDER_H, perspective: 1100 }}
      >
        {/* Indigo key glow behind the figure */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[-12%] bottom-6 top-6 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(94,106,210,0.32),rgba(94,106,210,0.08)_45%,transparent_70%)] blur-2xl"
        />

        {/* Contact shadow — narrows as he turns away from front */}
        <motion.div
          aria-hidden
          style={reducedMotion ? undefined : { scaleX: shadowScale }}
          className="pointer-events-none absolute inset-x-[14%] bottom-[26px] h-9 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),rgba(20,24,48,0.25)_55%,transparent_75%)] blur-md"
        />

        {/* Drifting ground haze */}
        <motion.div
          aria-hidden
          animate={
            reducedMotion
              ? {}
              : { opacity: [0.45, 0.8, 0.45], x: [-6, 6, -6] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-x-[6%] bottom-1 h-20 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(94,106,210,0.22),transparent_72%)] blur-2xl"
        />

        {/* Figure group: perspective tilt + depth */}
        <motion.div
          aria-hidden
          style={
            reducedMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  z: depthZ,
                  transformStyle: "preserve-3d",
                }
          }
          className="absolute inset-0"
        >
          {/* Breathing drift */}
          <motion.div
            aria-hidden
            animate={reducedMotion ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* The three plates, stacked + cross-faded by the triangular blend */}
            <motion.div
              style={{ opacity: reducedMotion ? 1 : oFront }}
              className="absolute inset-0"
            >
              <Image
                src={plateSrc("samurai-front.webp")}
                alt="Young samurai in weathered black lacquered armour, hand resting on his katana"
                fill
                priority
                sizes={`${RENDER_W}px`}
                className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
              />
            </motion.div>

            {!reducedMotion && (
              <>
                <motion.div
                  style={{ opacity: oLeft }}
                  className="absolute inset-0"
                >
                  <Image
                    src={plateSrc("samurai-left.webp")}
                    alt=""
                    aria-hidden
                    fill
                    sizes={`${RENDER_W}px`}
                    className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
                  />
                </motion.div>
                <motion.div
                  style={{ opacity: oRight }}
                  className="absolute inset-0"
                >
                  <Image
                    src={plateSrc("samurai-right.webp")}
                    alt=""
                    aria-hidden
                    fill
                    sizes={`${RENDER_W}px`}
                    className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
                  />
                </motion.div>
              </>
            )}

            {/* Specular sheen that tracks the turn */}
            <motion.div
              aria-hidden
              style={
                reducedMotion
                  ? undefined
                  : { x: sheenX, opacity: sheenOpacity }
              }
              className="pointer-events-none absolute inset-0 mix-blend-screen bg-[linear-gradient(102deg,transparent_30%,rgba(190,200,255,0.5)_49%,rgba(255,255,255,0.55)_50%,rgba(190,200,255,0.5)_51%,transparent_70%)]"
            />

            {/* Indigo rim pass over the armour edges */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40 bg-[linear-gradient(105deg,rgba(94,106,210,0.35)_0%,transparent_38%,transparent_72%,rgba(94,106,210,0.18)_100%)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SamuraiHeroFigure;
