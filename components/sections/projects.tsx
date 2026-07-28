"use client";

/**
 * Projects — every public repository, rendered as a first-class card.
 * Featured builds (Sentinel Suite, Nightgrid) get the wide span;
 * each card links directly to its GitHub repository.
 */
import { Github, FolderGit2, ArrowUpRight } from "lucide-react";
import { projects, projectsIntro, githubProfile, type Project } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group block h-full"
      aria-label={`${project.name} — view repository on GitHub`}
    >
      <SpotlightCard lift className="flex h-full flex-col p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground-muted shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent-bright">
            <FolderGit2 className="h-5 w-5" />
          </div>
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-subtle transition-colors duration-300 group-hover:text-accent-bright">
            repo
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Title + repo slug */}
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-white sm:text-xl">
          {project.name}
        </h3>
        <p className="mt-1 font-mono text-[11px] tracking-wider text-foreground-subtle">
          github.com/…/{project.repo}
        </p>

        {/* Description */}
        <p
          className={`mt-3.5 flex-1 text-sm leading-relaxed text-foreground-muted ${
            project.featured ? "" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>

        {/* Footer: language + tags */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.05] pt-4">
          <span className="flex items-center gap-2 text-xs text-foreground-muted">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: project.langColor }}
              aria-hidden
            />
            {project.language}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-foreground-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </a>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-24 border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          label="Projects"
          title={
            <>
              Built in the open,
              <br />
              shipped from a <span className="text-gradient-accent">terminal</span>.
            </>
          }
          description={projectsIntro}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.repo}
              delay={(i % 3) * 0.06}
              className={project.featured ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}

          {/* GitHub profile CTA tile */}
          <Reveal delay={0.12}>
            <a
              href={githubProfile}
              target="_blank"
              rel="noreferrer"
              className="group block h-full"
            >
              <SpotlightCard
                lift
                className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 border-dashed p-6 text-center"
                glow="rgba(255,255,255,0.07)"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground-muted transition-all duration-300 group-hover:border-accent/40 group-hover:text-white group-hover:shadow-[0_0_28px_rgba(94,106,210,0.3)]">
                  <Github className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-foreground-muted transition-colors duration-300 group-hover:text-foreground">
                  Everything else lives on GitHub
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-foreground-subtle">
                  @shubham-vishwakarma5606
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </SpotlightCard>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
