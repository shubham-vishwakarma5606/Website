/**
 * Shared blog card components — used by both the home-page preview
 * (client, with scroll reveals) and the /blog index (server).
 */
import Link from "next/link";
import { ArrowUpRight, Clock, Terminal } from "lucide-react";
import type { Post } from "@/lib/content";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-wider text-foreground-subtle">
      <span>{post.date}</span>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3 w-3" />
        {post.readTime}
      </span>
    </div>
  );
}

export function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full md:col-span-2">
      <SpotlightCard lift className="relative h-full overflow-hidden">
        <div className="grid h-full md:grid-cols-2">
          {/* Art panel — abstract, generated from CSS only */}
          <div className="relative min-h-[180px] overflow-hidden border-b border-white/[0.06] bg-[radial-gradient(ellipse_at_30%_20%,rgba(94,106,210,0.35),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgba(139,92,246,0.2),transparent_55%)] md:border-b-0 md:border-r">
            <div className="grid-overlay absolute inset-0 opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-7xl font-semibold tracking-tighter text-white/[0.08] transition-transform duration-500 ease-expo group-hover:scale-110 sm:text-8xl">
                &gt;_
              </span>
            </div>
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-background-deep/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-sm">
              <Terminal className="h-3 w-3" />
              Featured
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col p-6 sm:p-8">
            <span className="w-fit rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 font-mono text-[11px] tracking-widest text-accent-bright">
              {post.category}
            </span>
            <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-white sm:text-2xl">
              {post.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <PostMeta post={post} />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-foreground-muted transition-all duration-300 ease-expo group-hover:border-accent/50 group-hover:bg-accent/20 group-hover:text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}

export function PostCard({ post, number }: { post: Post; number: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <SpotlightCard lift className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-[11px] tracking-widest text-foreground-muted">
            {post.category}
          </span>
          <span className="font-mono text-sm text-foreground-subtle">
            {String(number).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-white sm:text-xl">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <PostMeta post={post} />
          <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground-subtle transition-all duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-bright" />
        </div>
      </SpotlightCard>
    </Link>
  );
}
