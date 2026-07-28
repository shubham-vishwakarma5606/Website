# shubhamvishwakarma.com

Personal site of **Shubham Vishwakarma** — Cybersecurity Consultant & Solution Architect.

A Linear-style, deep-space dark portfolio: layered ambient lighting, mouse-tracking
spotlight cards, a security-terminal **boot animation**, scroll-linked parallax,
and a statically generated blog.

## Stack

| Layer      | Choice                                        |
| :--------- | :-------------------------------------------- |
| Framework  | Next.js 15 (App Router, static export → `out/`) |
| Language   | TypeScript (strict)                            |
| Styling    | Tailwind CSS v4 — tokens in `@theme`           |
| Motion     | Framer Motion 12 (expo-out everywhere)         |
| Icons      | Lucide                                         |
| Fonts      | Inter + JetBrains Mono, self-hosted (fontsource) |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site exported to ./out
```

Deploy `out/` to any static host (GitHub Pages, Netlify, Vercel, S3…).
No server, no external font requests, no runtime dependencies.

## Where things live

- **`lib/content.ts`** — every word on the site: identity, journey timeline,
  expertise bento, interests, insights, and all blog posts. **Edit this file
  to make the site yours.**
- **`app/globals.css`** — design tokens (`@theme`): deep-space palette
  (`#050506` base, `#5E6AD2` accent), fonts, easings, keyframes, plus the
  signature utilities (`.text-gradient`, `.noise-overlay`, `.grid-overlay`…).
- **`components/boot-sequence.tsx`** — the boot animation (skippable,
  reduced-motion aware).
- **`components/ui/spotlight-card.tsx`** — reusable cursor-tracking card.
- **`components/sections/*`** — hero, journey, expertise, interests,
  insights, blog preview, contact.
- **`app/blog/`** — blog index + `[slug]` article pages (statically generated).

## Content status

The journey timeline, org names, stats and social links are polished
**starter content** — update `lib/content.ts` with your real details,
especially `site.email`, `site.socials`, `journey` and `stats`.
