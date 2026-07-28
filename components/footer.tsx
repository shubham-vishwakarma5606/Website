"use client";

/**
 * Footer — deepest layer (#020203). Live IST clock as a nod to the
 * "desktop software" feel: the site always tells the truth about
 * where and when its author is.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail } from "lucide-react";
import { site, navLinks } from "@/lib/content";

const socialIcons: Record<string, React.ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

function IstClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      Mumbai, India · {time} IST
    </span>
  );
}

export function Footer() {
  const pathname = usePathname();
  const hrefFor = (href: string) => (pathname === "/" ? href : `/${href}`);

  return (
    <footer className="relative border-t border-white/[0.06] bg-background-deep/80">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-xs font-semibold text-white">
                {site.monogram}
              </span>
              <span className="text-sm font-medium text-foreground/90">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              {site.role}. {site.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={hrefFor(link.href)}
                className="text-sm text-foreground-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className="text-sm text-foreground-muted transition-colors duration-200 hover:text-foreground"
            >
              All writing
            </Link>
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.label] ?? Github;
              const external = !social.href.startsWith("mailto:");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  {...(external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-foreground hover:shadow-[0_0_24px_rgba(94,106,210,0.25)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 font-mono text-[11px] tracking-wider text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {site.name}. All signals reserved.</span>
          <IstClock />
        </div>
      </div>
    </footer>
  );
}
