# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

OmarSec is a documentation site for [omarsec.com](https://www.omarsec.com) — a Bengali-language
tech learning knowledge base covering Cybersecurity/Pentesting, Linux, Git, Server Deployment,
Docker, CI/CD, Cloud, DevOps, AI Engineering, and Claude Code. The audience is broad: software
engineers, DevOps/cloud engineers, AI engineers, security folks, and tech-savvy learners in
general — not cybersecurity-only anymore. It is a **content project**: almost all work is
writing/editing MDX pages under `content/`, not app code.

## Commands

```bash
npm run dev        # local dev server at http://localhost:3000
npm run build      # production build (also the test for content errors — see below)
npm run start      # serve the production build
```

There is **no test suite and no linter**. `npm run build` is the de-facto validation step:
Nextra fails the build on `_meta.js` keys pointing to missing files, broken MDX, and unused
imports (warnings).

**Do not run `npm run build` after every edit.** The user keeps `npm run dev` running and checks
changes there. Running a production build also overwrites `.next`, which then breaks the running
dev server with `Cannot find module './undefined'` errors.

Run `npm run build` in exactly one situation: **right before pushing to GitHub**, as a final
check, immediately followed by the push. Do not build proactively for a new page or an edited
`_meta.js` either, even though Nextra would catch errors there that the dev server misses —
wait until the user says to push. If the build fails, fix it and rebuild before pushing.

Otherwise make the edit and stop. The user runs the build manually when they want it.

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
The top rule there: **keep it practical and simple** — a reader should never feel lost or lose
motivation reading a page. Key points that are easy to get wrong:

- **Page shape is 3 parts:** `## What Is This` (1-2 lines) → `## Why Need This` (the real reason,
  in simple language) → `## Step by Step + Use Case` (concept + command + real use case together,
  in small steps). There is no separate "Real-World Note" or "Quick Check" section anymore — an
  important warning goes inline as a `<Callout type="warning">` next to the step it applies to.
- **Every step needs a real use case first**, then the command — never a bare command with no
  context (cheatsheet style is a rule violation).
- **Language split:** main content in English; explanations, context, and use cases in Bengali;
  code/commands always English. Audience is Bengali-speaking tech learners (software engineering,
  DevOps, cloud, AI engineering, cybersecurity, and general tech-savvy readers). Content is
  Bengali-only for now; an English version is planned for later — don't build i18n routing yet.
- **No emojis anywhere** (headings, lists, callouts, frontmatter).
- **Headings are short identifiers only** — put the description in the paragraph below. Use `##`
  and `###` only. No "Part 1"/"Step 2" numbering in headings. No `---` inside body content.
- **File naming:** semantic slugs, lowercase, hyphens only (`file-permissions.mdx`), no numeric
  prefixes, no underscores.
- **Platform assumption:** commands target Ubuntu 24.04 LTS (`apt`) unless stated otherwise.
- Only import Nextra components you actually use on the page (unused imports warn on build).
