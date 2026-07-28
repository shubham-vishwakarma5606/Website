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

## Deploy to GitHub Pages (CI included)

`.github/workflows/deploy.yml` builds and publishes on every push to `main`:

1. Repo **Settings → Pages → Source → "GitHub Actions"** (one-time).
2. Push to `main` — the workflow sets `PAGES_BASE_PATH=/<repo>` automatically
   and publishes to `https://<username>.github.io/<repo>/`.
3. On any other host (or a custom domain), `PAGES_BASE_PATH` is empty and the
   site builds for the root path.

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
