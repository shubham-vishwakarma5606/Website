"use client";

/**
 * Navbar — fixed glass bar. Transparent at rest, frosted on scroll.
 * Mobile: hamburger ↔ X crossfade with a slide-down panel
 * (bg #050506/95 + backdrop-blur, per the design system's menu spec).
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site, navLinks } from "@/lib/content";
import { useBooted } from "@/components/site-shell";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Link wired through framer-motion so mobile panel items animate
// AND get basePath applied for static hosting (e.g. GitHub Pages).
const MotionLink = motion.create(Link);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const booted = useBooted();
  const pathname = usePathname();

  // Anchor targets live on the home page — prefix when elsewhere
  const hrefFor = (href: string) => (pathname === "/" ? href : `/${href}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scrolling when the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={booted ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.06] bg-background-base/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Monogram */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-xs font-semibold text-white shadow-[0_0_18px_rgba(94,106,210,0.3)] transition-shadow duration-300 group-hover:shadow-[0_0_26px_rgba(94,106,210,0.5)]">
            {site.monogram}
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-foreground/90 sm:block">
            {site.name}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={hrefFor(link.href)}
              className="rounded-lg px-3.5 py-2 text-sm text-foreground-muted transition-colors duration-200 hover:bg-white/[0.05] hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href={hrefFor("#contact")}
          className="group relative hidden items-center gap-1.5 overflow-hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-accent-bright hover:shadow-[0_0_0_1px_rgba(94,106,210,0.6),0_4px_20px_rgba(94,106,210,0.45),inset_0_1px_0_0_rgba(255,255,255,0.25)] active:scale-[0.98] md:inline-flex"
        >
          Let&apos;s talk
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-foreground transition-colors duration-200 hover:bg-white/[0.08] md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-4">
              <div className="flex-1 space-y-1">
                {navLinks.map((link, i) => (
                  <MotionLink
                    key={link.href}
                    href={hrefFor(link.href)}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: EASE, delay: 0.05 + i * 0.05 }}
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-foreground/90 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                  >
                    {link.label}
                    <span className="font-mono text-xs text-foreground-muted">
                      0{i + 1}
                    </span>
                  </MotionLink>
                ))}
              </div>
              <MotionLink
                href={hrefFor("#contact")}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE, delay: 0.3 }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3.5 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3)] active:scale-[0.98]"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4" />
              </MotionLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
