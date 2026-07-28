import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AmbientBackground } from "@/components/ambient-background";

/**
 * 404 — stays in-world: an access-control denial rather than
 * a generic missing page.
 */
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-5">
      <AmbientBackground />
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-bright">
          404 // access denied
        </p>
        <h1 className="text-gradient mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
          This route doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-foreground-muted">
          And unlike most 404s, this one actually means it. The resource was
          never provisioned — nothing was breached in the making of this page.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-accent-bright active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to base
        </Link>
      </div>
    </div>
  );
}
