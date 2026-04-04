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

### Phase 3: Content Structure + Docs (next)
- Convert placeholder `.mdx` files into proper docs sections
- Each section gets subfolder structure with `_meta.js`
- Add proper "Getting Started" content for each section

### Phase 4: Homepage + Custom Styling (final)
- Custom homepage with hero, cards, social links (dummy data)
- Enhanced `globals.css` with teal/cyan accent color
- Remove "Question? Give us feedback" and "Edit this page" links from homepage
\n## Fix: Removed Duplicate Route\n- Removed `app/docs/[[...slug]]/page.jsx` as it conflicted with `app/[[...slug]]/page.jsx`. Nextra v4 relies on a single catch-all for resolving MDX files properly.
