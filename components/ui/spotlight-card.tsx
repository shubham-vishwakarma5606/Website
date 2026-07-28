"use client";

/**
 * SpotlightCard — the signature interactive surface.
 *
 * Tracks the cursor and projects a 320px radial accent glow at its
 * position (spring-smoothed), layered over the glass card. A
 * gradient hairline border fades in on hover. Movement is limited
 * to -4px — precise, not playful.
 */
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export function SpotlightCard({
  children,
  className = "",
  glow = "rgba(94,106,210,0.15)",
  lift = true,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const glowOpacity = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 260, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 28 });

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${springX}px ${springY}px, ${glow}, transparent 70%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => glowOpacity.set(1)}
      onPointerLeave={() => {
        glowOpacity.set(0);
        mouseX.set(-500);
        mouseY.set(-500);
      }}
      whileHover={lift && !reducedMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`card-top-glow group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4),0_0_40px_rgba(0,0,0,0.2)] transition-[border-color,box-shadow] duration-300 hover:border-white/[0.1] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(94,106,210,0.1)] ${className}`}
    >
      {/* Cursor spotlight */}
      {!reducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ background: spotlight, opacity: glowOpacity }}
        />
      )}
      {/* Hover gradient border accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
