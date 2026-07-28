# Shubham Vishwakarma — Portfolio

Personal site of **Shubham Vishwakarma** — Solution Architect · Presales Engineer ·
Cybersecurity & Infrastructure Specialist (Mumbai).

A Linear-style, deep-space dark portfolio: layered ambient lighting, mouse-tracking
spotlight cards, a security-terminal **boot animation**, scroll-linked parallax,
a GitHub-linked **projects** section, and a statically generated blog.

## Stack

| Layer      | Choice                                          |
| :--------- | :---------------------------------------------- |
| Framework  | Next.js 15 (App Router, static export → `out/`) |
| Language   | TypeScript (strict)                             |
| Styling    | Tailwind CSS v4 — tokens in `@theme`            |
| Motion     | Framer Motion 12 (expo-out everywhere)          |
| Icons      | Lucide                                          |
| Fonts      | Inter + JetBrains Mono, self-hosted (fontsource) |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site exported to ./out
```

Deploy `out/` to any static host (Netlify, Vercel, GitHub Pages, S3…).
No server, no external font requests, no runtime dependencies.

## Deploy to GitHub Pages

> **⚠️ The live site currently shows this README, not the portfolio.**
> Two things below are still switched off. Both need *your* account — an
> automation bot cannot do either one.

**Why it breaks:** Pages is set to its legacy *"Deploy from a branch"* mode, so
GitHub runs its built-in **Jekyll** builder. Jekyll knows nothing about
`out/`, so it just renders `README.md` as the home page. The fix is to hand
deployment to Actions instead.

### Step 1 — activate the workflow (one command)

The workflow is written and verified, but parked at the repo root as
`deploy-github-pages.yml`. GitHub refuses to let a bot create or edit anything
under `.github/workflows/` without the `workflows` OAuth scope, so it has to be
moved from your own machine:

```bash
./activate-pages.sh          # moves the file, commits, pushes
```

<details>
<summary>…or do it by hand</summary>

```bash
mkdir -p .github/workflows
git mv deploy-github-pages.yml .github/workflows/deploy.yml
git commit -m "Enable Pages deploy workflow"
git push
```

</details>

### Step 2 — point Pages at Actions

**Settings → Pages → Source → "GitHub Actions"**. One time only. Skipping this
leaves Jekyll in charge and the README keeps winning.

### After that

Every push to `main` builds and publishes to
`https://shubham-vishwakarma5606.github.io/Website/`. The workflow sets
`PAGES_BASE_PATH=/Website` so assets resolve under the repo subpath, and drops
a `.nojekyll` file so Jekyll never strips the `_next/*` bundles. On
Netlify/Vercel/custom domains the base path stays empty and the site builds for
root.

## Where things live

- **`lib/content.ts`** — every word on the site: identity, journey timeline,
  expertise bento, **projects** (GitHub repos), interests, stats, principles,
  certifications, and all blog posts. **Edit this file to update the site.**
- **`app/globals.css`** — design tokens (`@theme`): deep-space palette
  (`#050506` base, `#5E6AD2` accent), fonts, easings, keyframes, plus the
  signature utilities (`.text-gradient`, `.noise-overlay`, `.grid-overlay`…).
- **`components/boot-sequence.tsx`** — the boot animation (skippable,
  reduced-motion aware).
- **`components/ui/spotlight-card.tsx`** — reusable cursor-tracking card.
- **`components/sections/*`** — hero, journey, expertise, projects, interests,
  insights (incl. certifications), blog preview, contact.
- **`app/blog/`** — blog index + `[slug]` article pages (statically generated).

## Content

Content reflects the real résumé: BD Software Distribution (Solutions
Architect / Presales, 2024–), Hitachi Systems India BFSI deputations
(2021–2024: IndusInd Bank, SBM Bank, M&M, Axis MF, JM Financial), education,
certifications, and the public GitHub repositories.

To add a blog post: append a `Post` object to `posts` in `lib/content.ts` —
the route, card, metadata and prev/next nav are generated automatically.
