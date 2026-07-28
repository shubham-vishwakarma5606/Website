import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Terminal } from "lucide-react";
import { posts, getPost, getAdjacentPosts, type PostBlock } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

/** Renders the structured body blocks with article typography. */
function Block({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h2 className="mb-4 mt-14 flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
          <span className="h-5 w-1 rounded-full bg-gradient-to-b from-accent to-accent/30" aria-hidden />
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mb-6 text-base leading-[1.85] text-[#b9bcc4] sm:text-[1.05rem]">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mb-8 space-y-3.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 text-base leading-[1.8] text-[#b9bcc4]">
              <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="relative my-10 rounded-r-2xl border-l-2 border-accent bg-accent/[0.06] px-6 py-5 sm:px-8 sm:py-6">
          <p className="text-lg font-medium leading-relaxed tracking-tight text-foreground/90 sm:text-xl">
            &ldquo;{block.text}&rdquo;
          </p>
        </blockquote>
      );
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-foreground-muted transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            BACK TO WRITING
          </Link>
        </Reveal>

        {/* Article header */}
        <header className="mt-10">
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 font-mono text-[11px] tracking-widest text-accent-bright">
                <Terminal className="h-3 w-3" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-foreground-subtle">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
              <span className="font-mono text-[11px] tracking-widest text-foreground-subtle">
                {post.date}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-gradient sm:text-5xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
              {post.excerpt}
            </p>
          </Reveal>
          <div className="hairline-fade mt-10" aria-hidden />
        </header>

        {/* Body */}
        <Reveal delay={0.2}>
          <div className="mt-4">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </Reveal>

        {/* Footer sign-off */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-8">
            <p className="font-mono text-xs tracking-widest text-accent-bright">
              $ EOF
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Disagree with something here? Good — that means it&apos;s a real
              argument. Write to me and let&apos;s have it out.
            </p>
          </div>
        </Reveal>

        {/* Prev / next */}
        <nav
          aria-label="More writing"
          className="mt-10 grid gap-4 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05]"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-foreground-subtle">
                <ArrowLeft className="h-3 w-3" /> PREVIOUS
              </span>
              <span className="mt-2 block text-sm font-medium leading-snug text-foreground/90 transition-colors group-hover:text-white">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05] sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-2 font-mono text-[10px] tracking-[0.25em] text-foreground-subtle">
                NEXT <ArrowRight className="h-3 w-3" />
              </span>
              <span className="mt-2 block text-sm font-medium leading-snug text-foreground/90 transition-colors group-hover:text-white">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
