import { AmbientBackground } from "@/components/ambient-background";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/**
 * Blog chrome — same ambient system and navigation as home,
 * minus the boot sequence (that's a first-contact experience only).
 * Navbar renders without the boot gate here, so wrap it in a plain
 * provider-free context (useBooted defaults to true).
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main id="main" className="relative pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
