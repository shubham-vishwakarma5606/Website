import { SiteShell } from "@/components/site-shell";
import { AmbientBackground } from "@/components/ambient-background";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Expertise } from "@/components/sections/expertise";
import { Projects } from "@/components/sections/projects";
import { Interests } from "@/components/sections/interests";
import { Insights } from "@/components/sections/insights";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <SiteShell>
      <AmbientBackground />
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <Journey />
        <Expertise />
        <Projects />
        <Interests />
        <Insights />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </SiteShell>
  );
}
