"use client";

/**
 * SiteShell — owns the site's entry lifecycle:
 *
 *   BOOT (secure-terminal) → CONTENT (hero + sections animate in)
 *
 * The samurai cinematic that used to sit between those two steps is gone:
 * the samurai now lives on the landing page itself (see
 * `components/samurai/samurai-hero-figure`), not in the boot sequence.
 *
 * - Scroll stays locked until the boot reveal completes.
 * - `useBooted()` gates the navbar; `useReady()` gates hero content.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";
import { BootSequence } from "@/components/boot-sequence";

// Default `true`: pages without the shell (e.g. /blog) act as revealed.
const BootContext = createContext(true);
const ReadyContext = createContext(true);

/** True once the boot animation has finished and the site is revealed. */
export function useBooted() {
  return useContext(BootContext);
}

/** True once the reveal chain is complete and hero content may animate in. */
export function useReady() {
  return useContext(ReadyContext);
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);

  const completeBoot = useCallback(() => setBooted(true), []);

  // Lock scroll through the reveal
  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  return (
    <BootContext.Provider value={booted}>
      <ReadyContext.Provider value={booted}>
        <AnimatePresence>
          {!booted && <BootSequence key="boot" onComplete={completeBoot} />}
        </AnimatePresence>
        {children}
      </ReadyContext.Provider>
    </BootContext.Provider>
  );
}
