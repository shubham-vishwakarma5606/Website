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

## Deploy to GitHub Pages (CI ready)

A ready-made workflow ships at the repo root as **`deploy-github-pages.yml`**.
To activate it:

1. Move it into place (workflow files must live under `.github/workflows/`):
   ```bash
   mkdir -p .github/workflows
   git mv deploy-github-pages.yml .github/workflows/deploy.yml
   git commit -m "Enable Pages deploy workflow" && git push
   ```
   (Commit this from your own machine/account — it needs the `workflows` scope.)
2. Repo **Settings → Pages → Source → "GitHub Actions"** (one-time).
3. Every push to `main` then publishes to
   `https://shubham-vishwakarma5606.github.io/Website/` — the workflow sets
   `PAGES_BASE_PATH=/Website` automatically. On Netlify/Vercel/custom domains
   the base path stays empty and the site builds for root.

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
