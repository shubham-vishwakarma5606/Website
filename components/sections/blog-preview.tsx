"use client";

/**
 * BlogPreview — the writing section on the home page.
 * Cards live in components/blog/post-cards.tsx and are shared
 * with the /blog index so both surfaces stay identical.
 */
import { posts } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FeaturedCard, PostCard } from "@/components/blog/post-cards";

export function BlogPreview() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <section
      id="blog"
      className="relative scroll-mt-24 border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          label="Writing"
          title={
            <>
              Notes from the
              <br />
              <span className="text-gradient-accent">threat surface</span>.
            </>
          }
          description="Long-form thinking on security architecture, AI risk, and engineering culture — written to be useful on Monday morning."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="md:col-span-2">
            <FeaturedCard post={featured} />
          </Reveal>
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={0.06 * (i + 1)}>
              <PostCard post={post} number={i + 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
