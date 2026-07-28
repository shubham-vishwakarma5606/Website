"use client";

/**
 * SiteShell — owns the boot sequence lifecycle.
 *
 * While booting, an overlay terminal plays over a locked viewport.
 * Once it completes (or is skipped / reduced-motion is set), `booted`
 * flips to true via context so entrance animations across the site
 * can start after the reveal rather than under it.
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

// Default `true`: pages that don't run a boot sequence (e.g. /blog)
// render as if already past the reveal gate.
const BootContext = createContext(true);

/** True once the boot animation has finished and the site is revealed. */
export function useBooted() {
  return useContext(BootContext);
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const complete = useCallback(() => setBooted(true), []);

  // Lock scroll while the boot overlay is up
  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  return (
    <BootContext.Provider value={booted}>
      <AnimatePresence>
        {!booted && <BootSequence key="boot" onComplete={complete} />}
      </AnimatePresence>
      {children}
    </BootContext.Provider>
  );
}
