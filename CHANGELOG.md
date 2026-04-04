# OmarSec.com — Changelog / Build Log

This file documents what has been built, when, and why. Useful for any AI or human picking up the project.

---

## 2026-04-04 — Initial Setup (Phase 1 + Phase 2 complete)

### What was done

**Phase 1: Project Init + Config**
- Initialized npm project (`npm init -y`)
- Installed dependencies: `next`, `react`, `react-dom`, `nextra@4.6.1`, `nextra-theme-docs@4.6.1`
- Created config files:
  - `next.config.mjs` — Nextra plugin wrapping Next.js config
  - `jsconfig.json` — Path aliases (`@/` → `./`)
  - `mdx-components.js` — Required by Nextra v4, maps MDX elements to themed components

**Phase 2: App Layout + Root Pages**
- `app/layout.jsx` — Root layout with:
  - Nextra docs theme (Layout, Navbar, Footer components)
  - Geist + Geist Mono fonts via `next/font/google`
  - SWR-style footer: `MIT {year} © OmarSec.`
  - Navbar with "OmarSec" logo + GitHub project link
  - SEO metadata (title, description, OpenGraph)
  - `darkMode={false}` to hide theme toggle (we force dark via CSS)
- `app/globals.css` — Force dark color-scheme, apply Geist fonts
- `app/[[...slug]]/page.jsx` — Catch-all route for non-docs pages (homepage)
- `app/docs/[[...slug]]/page.jsx` — Catch-all route for docs pages
- `content/_meta.js` — Top nav: Home + Docs
- `content/index.mdx` — Minimal homepage placeholder
- `content/docs/_meta.js` — Sidebar: Linux, Git & GitHub, Server Setup
- `content/docs/index.mdx` — Docs landing page
- `content/docs/linux.mdx` — Placeholder
- `content/docs/git-github.mdx` — Placeholder
- `content/docs/server-setup.mdx` — Placeholder

### Current file tree

```
omarsec/
├── app/
│   ├── layout.jsx
│   ├── globals.css
│   ├── [[...slug]]/
│   │   └── page.jsx
│   └── docs/
│       └── [[...slug]]/
│           └── page.jsx
├── content/
│   ├── _meta.js
│   ├── index.mdx
│   └── docs/
│       ├── _meta.js
│       ├── index.mdx
│       ├── linux.mdx
│       ├── git-github.mdx
│       └── server-setup.mdx
├── mdx-components.js
├── next.config.mjs
├── jsconfig.json
├── package.json
├── PLAN.md
└── CHANGELOG.md
```

### Status
✅ Dev server runs (`npm run dev`)  
✅ Homepage loads at `/`  
✅ Docs page loads at `/docs` with sidebar  
✅ Dark theme active  
✅ Navbar shows "OmarSec" + Home + Docs + Search + GitHub  
✅ SWR-style footer renders  

### Known issues / notes
- `npm audit` shows 11 high severity vulnerabilities (all from upstream Next.js/Nextra deps — safe to ignore for now)
- Git repo not initialized yet (Nextra warns about this)
- Docs pages are placeholders — real content to be added in Phase 3
- Homepage is minimal placeholder — custom design in Phase 4

---

## Remaining Work

### Phase 3: Content Structure + Docs (Completed for Git)
- [x] Convert placeholder `.mdx` files into proper docs sections
- [x] Each section gets subfolder structure with `_meta.js`
- [ ] Add proper "Getting Started" content for remaining Linux / Server Setup sections

### Phase 4: Homepage + Custom Styling (final)
- Custom homepage with hero, cards, social links (dummy data)
- Enhanced `globals.css` with teal/cyan accent color
- Remove "Question? Give us feedback" and "Edit this page" links from homepage
## Fix: Removed Duplicate Route
- Removed `app/docs/[[...slug]]/page.jsx` as it conflicted with `app/[[...slug]]/page.jsx`. Nextra v4 relies on a single catch-all for resolving MDX files properly.

---

## 2026-04-04 — Phase 3 (Git Docs Migration & Styling) Complete

### What was done
- Migrated 7 raw Markdown files into Nextra MDX and structured them correctly in `docs/git-github/`.
- Cleansed raw emojis, "Module XX" prefixes, and heavy horizontal lines (`---`) to meet professional minimalist aesthetics.
- Utilized Nextra components: `<Tabs>`, `<Steps>`, `<FileTree>`, `<Callout>`.
- Restored `Geist` font for a Vercel/SWR-style premium look and fixed default Nextra H1/H2 sizes in `globals.css` to fit Geist geometry.
- Shortened long markdown headings to ensure the right-side Table of Contents (TOC) remains single-line and uncluttered.
- Replaced harsh red `error` Callouts with soft blue `info` Callouts for UX readability.
- Enabled standard Nextra code copy buttons natively in `.mdx` blocks.
- Tracked initial codebase in Git version control with `.gitignore`.

---

## 2026-04-04 — Layout Optimization & Custom 404

### What was done
- **Custom 404 Page:** Implemented a minimalist hacker-themed 404 page using Nextra's native `<NotFoundPage>` component to resolve hydration conflicts.
- **SWR-style Footer:** Restructured `app/layout.jsx` with a Flexbox layout:
  - Left: Copyright text (`MIT 2026 © OmarSec.`).
  - Right: GitHub logo linking to the brand's profile.
- **Hydration Fix:** Removed inline `onMouseOver/Out` event handlers from Server Components to ensure zero-error rendering in Next.js Turbopack.
- **Import Cleanup:** Removed unused `ThemeSwitch` and `LocaleSwitch` imports to keep the bundle lean.

### Known issues / notes
- **Nextra 404 Hydration Bug:** (Remaining) In Next.js development mode, a small hydration warning about a script tag persists due to Nextra's internal dark-mode script. It is harmless in production and documented for future reference.


---

## 2026-04-04 — MVP Launch & Domain Branding (Complete)

### What was done
- **Custom Domain Launch:** Successfully connected **omarsec.com** via Namecheap Nameservers to Vercel. Site is now live with automated SSL and GitHub CD.
- **Content Scope Refinement:** Deleted the `linux` and `server-setup` directories and metadata to focus the initial release on a high-quality Git & GitHub knowledge base.
- **Homepage Redesign (Phase 4):** 
  - Implemented a minimalist, vertically centered landing page.
  - Added a **"Currently cooking brand new labs..."** interactive status card with a pulse animation.
  - Integrated bento-style navigation cards for **Documentation** and **GitHub**.
- **Branding Consolidation:** Removed teal/cyan gradients from the homepage to maintain a neutral, documentation-aligned "docs-first" aesthetic as requested.
- **Build Fix:** Identified and resolved a `SyntaxError` caused by a duplicate `Cards` component import in `index.mdx`.
- **Search Optimization:** Verified Pagefind search functionality across the unified docs structure.

### Status
✅ **omarsec.com** is live and stable.  
✅ All Git/GitHub documentation is accessible and mobile-responsive.  
✅ "Getting Started" page correctly links to the complete documentation modules.
