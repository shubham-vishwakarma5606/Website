"use client";

/**
 * SiteShell — owns the site's entry lifecycle:
 *
 *   BOOT (secure-terminal) → CINEMATIC (samurai perimeter check)
 *   → CONTENT (hero + sections animate in)
 *
 * - Scroll stays locked until the reveal chain completes.
 * - `useBooted()` gates the navbar; `useReady()` gates hero content
 *   (boot AND intro both done).
 * - prefers-reduced-motion skips the cinematic entirely.
 * - The 3D cinematic is loaded on demand (code-split, ssr:false) so
 *   three.js never lands in the critical bundle.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { BootSequence } from "@/components/boot-sequence";

const SamuraiIntro = dynamic(() => import("@/components/samurai/samurai-intro"), {
  ssr: false,
});

// Default `true`: pages without the shell (e.g. /blog) act as revealed.
const BootContext = createContext(true);
const ReadyContext = createContext(true);

/** True once the boot animation has finished and the site is revealed. */
export function useBooted() {
  return useContext(BootContext);
}

/** True once boot AND the samurai cinematic have both completed. */
export function useReady() {
  return useContext(ReadyContext);
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const reducedMotion = useReducedMotion();

  const completeBoot = useCallback(() => setBooted(true), []);
  const completeIntro = useCallback(() => setIntroDone(true), []);

  // Reduced motion: no cinematic at all
  useEffect(() => {
    if (booted && reducedMotion) setIntroDone(true);
  }, [booted, reducedMotion]);

  const ready = booted && introDone;

  // Lock scroll through the whole reveal chain
  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <BootContext.Provider value={booted}>
      <ReadyContext.Provider value={ready}>
        <AnimatePresence>
          {!booted && <BootSequence key="boot" onComplete={completeBoot} />}
        </AnimatePresence>
        <AnimatePresence>
          {booted && !introDone && !reducedMotion && (
            <SamuraiIntro key="intro" onComplete={completeIntro} />
          )}
        </AnimatePresence>
        {children}
      </ReadyContext.Provider>
    </BootContext.Provider>
  );
}