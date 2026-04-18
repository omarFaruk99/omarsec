# OmarSec — Project Plan

## What Is This?

omarsec.com is a personal cybersecurity brand website built by **Omar (Shuvon)**.
It starts as a personal knowledge base and evolves into a cybersecurity consultancy firm website.

For tech stack details → see `TECH_STACK.md`
For documentation writing rules → see `DOCS_RULES.md`

---

## Owner Background

- CSE/IT graduate, Offensive Security / Software Engineer at a B2B travel solutions company (Bangladesh)
- Web dev: HTML, JavaScript, React, Express.js, basic Node.js
- Server: AWS EC2, Nginx, PM2, basic Linux
- Currently learning cybersecurity: TryHackMe → eJPT → PNPT → OSCP
- Goal: Web pentester → remote international work → cybersecurity consultancy in Bangladesh

---

## Key Principle

> Ship fast, improve later. No over-engineering.

---

## Phase 1 — Personal Brand (Current)

**Scope: Home + Docs**

### Navigation
- Home (landing page)
- Docs (all .mdx notes)

### Active Docs Sections
- Git & GitHub ✅
- Linux Fundamentals 🔄 (in progress)
- Server Setup (planned)

### Completed
- [x] Site live at omarsec.com
- [x] Git & GitHub docs (7 pages)
- [x] Custom 404 page
- [x] SWR-style dark theme
- [x] Vercel deployment with GitHub CD

### Planned (not in MVP)
- [ ] Linux Fundamentals section (full)
- [ ] Server Setup section
- [ ] Blog (CTF writeups, security articles)
- [ ] About page
- [ ] Contact page
- [ ] Giscus comments/reactions
- [ ] Newsletter signup

---

## Phase 2 — Consultancy (1+ year later)

Same domain, same dark theme. Layout converts to a cybersecurity firm website.

### Additions
- Services page (Pentest, Security Audit, Web App Testing)
- Case Studies
- Hire Me / Book a Consultation
- Testimonials

---

## Multi-Language Strategy (Future)

- Website (Home, About, Services, Blog) → **English only** (global audience)
- `/docs` section → **Bilingual** (English default + Bengali)
- English = default locale. Bengali docs use `.bn.mdx`.
- Until i18n is activated: Bengali docs use hidden English keywords for Pagefind search.

---

## Design Principles

- Dark and light mode both supported via Nextra's built-in toggle (dark is the default)
- Minimal, no clutter — docs-first aesthetic
- SWR-style UI (swr.vercel.app as reference)
- Geist font body, Geist Mono for code
- No emoji in content
- Mobile responsive
