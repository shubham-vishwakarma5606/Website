import type { Metadata } from "next";
import { posts } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FeaturedCard, PostCard } from "@/components/blog/post-cards";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on security architecture, AI risk, and engineering culture by Shubham Vishwakarma.",
};

export default function BlogIndexPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="·"
          label="All writing"
          title={
            <>
              Thinking, in <span className="text-gradient-accent">long form</span>.
            </>
          }
          description="No hot takes. These are the arguments I'd make in your architecture review — written down so you can argue back."
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
