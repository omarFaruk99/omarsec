# OmarSec — Tech Stack & Architecture

This file documents every technology choice: what we use, why we chose it, what we rejected, and how to replace it in the future.

Anyone (human or AI) reading this should understand the full technical picture without needing to look elsewhere.

---

## Core Framework

### Next.js 15.x

**What it does:** React-based web framework. Handles routing, rendering, and the build pipeline.

**Why we chose it:**
- Industry standard. Most cybersecurity/tech professionals know it.
- Excellent Vercel integration (zero-config deploy).
- App Router architecture allows clean separation of layouts and pages.

**What we rejected:**
- Remix — good framework but smaller ecosystem, less Vercel-native.
- Vite (SPA) — no SSR, bad for SEO and docs-type content.
- Astro — considered, but Nextra requires Next.js specifically.

**If you want to replace it:**
Switch to Astro with `@astrojs/mdx` if the site ever moves away from Nextra and shifts to a fully static, blog-first model. Astro has better performance for pure content sites, but you lose Nextra's built-in search and sidebar.

---

### Nextra 4.6.1

**What it does:** A documentation framework built on top of Next.js. Handles MDX rendering, sidebar generation, table of contents, full-text search (Pagefind), and the docs layout.

**Why we chose it:**
- Zero-config docs infrastructure (sidebar, TOC, search) out of the box.
- MDX support means content is just markdown-with-components — easy to write.
- SWR-style aesthetic that matches the professional look we want.
- Maintained by the Vercel team — aligns with our hosting choice.

**What we rejected:**
- Docusaurus — Facebook-maintained, React-based, but heavier and more opinionated. The default design looks "generic open source docs" — not premium enough.
- GitBook — hosted service, no code ownership, paid for custom domains.
- MkDocs — Python-based, great for pure markdown but no React ecosystem.
- VitePress — Vue-based, not aligned with our React/Next.js stack.

**If you want to replace it:**
Use Fumadocs (`fumadocs-core` + `fumadocs-ui`) as a Nextra alternative — it is also Next.js-native, actively maintained, and supports MDX. The migration would involve restructuring `_meta.js` files to Fumadocs's config format and replacing Nextra components (`<Callout>`, `<Steps>`, etc.) with Fumadocs equivalents.

---

### nextra-theme-docs 4.6.1

**What it does:** The visual theme for Nextra. Provides the sidebar, navbar, TOC, footer, and the overall docs layout shell.

**Why we chose it:** Comes with Nextra. Matches the SWR/Vercel aesthetic we want.

**If you want to replace it:** The only alternative within the Nextra ecosystem is `nextra-theme-blog` — but that is for blog-style layouts, not docs. Switching themes requires re-structuring the layout files in `app/`.

---

## Language & Syntax

### JavaScript (ES2022) — No TypeScript

**Why no TypeScript:**
- The owner's background is in JavaScript. TypeScript adds cognitive overhead for a solo project with no team.
- Nextra and Next.js work perfectly with plain JavaScript.
- `jsconfig.json` provides path alias support (`@/`) without needing TypeScript.

**If you want to add TypeScript in the future:**
1. Rename `jsconfig.json` to `tsconfig.json`
2. Add `typescript` as a dev dependency
3. Rename `.jsx` files to `.tsx` gradually
4. Add `@types/react` and `@types/node`

---

### MDX

**What it does:** Markdown extended with JSX. Our documentation content is written in MDX files (`.mdx`).

**Why we chose it:** Nextra requires it. MDX lets us use React components (like `<Callout>`, `<Steps>`) directly inside content files — making docs interactive without custom JavaScript.

---

### React 19

**Version:** `^19.1.0`

**Why this matters:** React 19 is a major release with significant internal changes (new compiler, improved hydration). Nextra 4.x requires React 18+ and works with React 19. No special configuration needed — it works out of the box.

**If something breaks with React 19:** Downgrade to `react@^18` and `react-dom@^18` in `package.json`. This would only be needed if a Nextra dependency has a compatibility issue.

---

## Typography

### Geist + Geist Mono

**What they are:** Vercel's official typefaces. Geist for body text, Geist Mono for code blocks.

**Why we chose them:**
- Matches the SWR/Vercel/Next.js docs aesthetic exactly.
- Clean, modern, highly legible.
- Available via `next/font/google` — no external request needed at runtime.

**If you want to replace them:**
- Body: Inter (most popular choice for SaaS/docs), or Outfit for a slightly warmer feel.
- Mono: JetBrains Mono (popular in developer tools), or Fira Code for ligature support.
- Change the font import in `app/layout.jsx` and update the CSS variable references in `app/globals.css`.

---

## Hosting & Deployment

### Vercel (Free Tier)

**What it does:** Hosts the site. Handles SSL, CDN, and automatic deployments from GitHub.

**Why we chose it:**
- First-class Next.js support (Vercel built Next.js).
- Zero-config GitHub integration — push to `main`, site deploys.
- Free tier covers all current needs.
- Custom domain support included.

**Current domain:** omarsec.com (connected via Namecheap nameservers → Vercel)

**If you want to replace it:**
- **Netlify** — similar free tier, slightly less optimized for Next.js but works with static export.
- **AWS Amplify** — if moving to AWS for everything (EC2, S3 etc.), keeps infra unified.
- **Self-hosted on EC2** — build with `next build`, serve with Nginx + PM2. More control, more maintenance. Not recommended unless traffic justifies it.

---

## Content Search

### Pagefind (via Nextra)

**What it does:** Client-side full-text search across all MDX pages. Built into Nextra — no extra config.

**Why we chose it:** It comes for free with Nextra. Static, no API needed, works offline.

**If you want to replace it:** Algolia DocSearch is the premium alternative (used by React docs, Tailwind docs). It requires an Algolia account and integration. Only worth it if the docs grow very large (100+ pages) and Pagefind performance degrades.

---

## Design System

### Vanilla CSS in `app/globals.css`

**What it does:** Global styles — sets dark as the default color scheme, applies fonts, and overrides Nextra heading sizes and TOC styling.

**Why no Tailwind:**
- Nextra has its own styling system. Adding Tailwind on top causes conflicts.
- For a docs site with minimal custom UI, Vanilla CSS is simpler and more predictable.

**If you want to add Tailwind:**
Use `@tailwindcss/typography` plugin carefully. Nextra v4 has partial Tailwind support but it requires careful configuration to not override the docs theme.

---

## Current File Architecture

```
omarsec/
├── app/
│   ├── layout.jsx              ← Root layout: fonts, navbar, footer, metadata
│   ├── globals.css             ← Global styles: font vars, heading overrides, theme defaults
│   ├── not-found.jsx           ← Custom 404 page (hacker-themed)
│   ├── icon.png                ← Favicon
│   ├── apple-icon.png          ← Apple touch icon
│   ├── opengraph-image.png     ← OG image for social sharing
│   ├── twitter-image.png       ← Twitter card image
│   └── [[...slug]]/
│       └── page.jsx            ← Catch-all route for all pages (Nextra handles routing)
├── components/
│   └── ContributorsGrid.jsx    ← GitHub contributors display component
├── content/
│   ├── _meta.js                ← Top nav order (Home, Docs)
│   ├── index.mdx               ← Homepage content
│   └── docs/
│       ├── _meta.js            ← Sidebar sections (Git & GitHub, Linux Fundamentals, Contributors)
│       ├── index.mdx           ← Docs landing page
│       ├── contributors.mdx    ← Contributors page
│       └── [section]/
│           ├── _meta.js        ← Section page order
│           ├── index.mdx       ← Section overview
│           └── [page].mdx      ← Individual topic pages
├── mdx-components.js           ← Required by Nextra v4: maps MDX to themed components
├── next.config.mjs             ← Next.js config with Nextra plugin
├── jsconfig.json               ← Path aliases (@/ → ./)
└── package.json
```

---

## Key Architectural Decisions

### Why a single catch-all route?

`app/[[...slug]]/page.jsx` handles all pages. There is no separate `app/docs/` route.

Nextra v4 uses a single catch-all to resolve MDX files from the `content/` directory. Having a second catch-all at `app/docs/[[...slug]]/page.jsx` causes routing conflicts. **Do not add a separate docs route.**

### Light & Dark Mode

The site supports both light and dark mode via Nextra's built-in theme toggle in the navbar. Nextra handles this automatically — no extra configuration needed.

`app/globals.css` sets `color-scheme: dark` as the browser default, so new visitors see dark mode first. Users can switch via the toggle anytime.

### Why no TypeScript config file?

`jsconfig.json` provides path alias support (`@/` → `./`) for plain JavaScript. It has no other purpose. Do not convert it to `tsconfig.json` unless adding TypeScript.
