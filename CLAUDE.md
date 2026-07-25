# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

OmarSec is a documentation site for [omarsec.com](https://www.omarsec.com) — a Bengali-language
cybersecurity knowledge base (Pentesting, Linux, Git, Server, Docker, Claude Code). It is a
**content project**: almost all work is writing/editing MDX pages under `content/`, not app code.

## Commands

```bash
npm run dev        # local dev server at http://localhost:3000
npm run build      # production build (also the test for content errors — see below)
npm run start      # serve the production build
```

There is **no test suite and no linter**. `npm run build` is the de-facto validation step:
Nextra fails the build on `_meta.js` keys pointing to missing files, broken MDX, and unused
imports (warnings). Always run `npm run build` after adding pages or editing `_meta.js`.

## Architecture

- **Stack:** Next.js 15 (App Router) + Nextra 4.6 + `nextra-theme-docs`. Plain JavaScript, no
  TypeScript. Vanilla CSS (no Tailwind). Content search is Pagefind (built into Nextra).
- **Single catch-all route:** `app/[[...slug]]/page.jsx` resolves every page from `content/`.
  Do **not** add a second catch-all (e.g. `app/docs/[[...slug]]/`) — it causes routing conflicts.
- **Content lives in `content/`, not `app/`.** URL structure mirrors the folder tree under
  `content/`. Sidebar/nav order is controlled by `_meta.js` files, **not** filenames.
- **`_meta.js` rule:** only add a key after the file/folder actually exists, or the build fails.
- **Layout shell:** `app/layout.jsx` (navbar, footer, fonts, metadata). Global styles and Nextra
  overrides in `app/globals.css`. `mdx-components.js` is required by Nextra v4 — leave it wired up.
- **Fonts:** Geist (body) + Geist Mono (code), loaded via `next/font/google` in `app/layout.jsx`,
  referenced as CSS variables in `app/globals.css`.
- Deeper rationale and replacement notes for every tech choice are in `TECH_STACK.md`.

## Content authoring rules (important)

All `.mdx` pages must follow `DOCS_RULES.md`. Read it before writing or editing any page.
Key points that are easy to get wrong:

- **Language split:** main content in English; explanations, context, and callouts in Bengali;
  code/commands always English. Audience is Bengali-speaking cybersecurity learners.
- **No emojis anywhere** (headings, lists, callouts, frontmatter).
- **Headings are short identifiers only** — put the description in the paragraph below. Use `##`
  and `###` only. No "Part 1"/"Step 2" numbering in headings. No `---` inside body content.
- **Teach why before how:** explain the concept before showing a command. A bare command with no
  explanation (cheatsheet style) is a rule violation.
- **Required sections per page:** opening `<Callout>`, a `## CyberSec Note`, a "পরবর্তী →" next-page
  link at the bottom, and a hidden SEO keyword `<span>`. `## Quick Check` is optional (see rule 9).
- **File naming:** semantic slugs, lowercase, hyphens only (`file-permissions.mdx`), no numeric
  prefixes, no underscores.
- **Platform assumption:** commands target Ubuntu 24.04 LTS (`apt`) unless stated otherwise.
- Only import Nextra components you actually use on the page (unused imports warn on build).

## Deployment

The public site (omarsec.com) auto-deploys from `main` via Vercel — a `git push` is enough.

A second manual deploy also exists on an AWS EC2 server (Nginx + PM2), documented in `README.md`:
project lives at `/var/www/omarsec`, PM2 app name `omarsec`, port 3000. See `README.md` for the
deploy steps and the `pm2` PATH gotcha over SSH.
