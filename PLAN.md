# OmarSec.com — Project Plan

## What Is This?

omarsec.com is a personal cybersecurity brand website built by **Omar (Shuvon)**. It starts as a personal knowledge base and blog, and will evolve into a cybersecurity consultancy firm website.

## Owner Background

- CSE/IT graduate, Software Documentation Engineer at a B2B travel solutions company (Bangladesh)
- Web dev: HTML, JavaScript, React, Express.js, basic Node.js
- Server: AWS EC2, Nginx, PM2, basic Linux
- Currently learning cybersecurity: TryHackMe → eJPT → PNPT → OSCP
- Goal: Web pentester → remote international work → cybersecurity consultancy in Bangladesh

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16.x | Framework |
| Nextra | 4.6.1 | Content framework (MDX-based) |
| nextra-theme-docs | 4.6.1 | SWR-style docs theme |
| Geist Font | latest | Typography (Vercel's font) |
| JavaScript | ES2022 | Language (NO TypeScript) |
| Vercel | — | Hosting (free tier) |

## Design Rules

- Dark theme always (no light mode)
- Minimal, no clutter
- SWR-style UI (swr.vercel.app)
- Left sidebar for docs navigation
- Stripe-style typography and spacing
- Mobile responsive
- Geist font for body, Geist Mono for code
- Color accent: Teal/Cyan (#00d4aa)

## Phase 1 — Personal Brand (Current)

**MVP Scope: Home + Docs**

### Navigation
- Home (landing page)
- Docs (all .mdx notes)

### Docs Sections
- Linux
- Git & GitHub
- Server Setup

### Homepage (dummy data for now)
- Hero: Name + "Cybersecurity Enthusiast & Pentester in Training"
- Docs section preview cards
- Social links: GitHub, LinkedIn, TryHackMe

### Future additions (not in MVP)
- Blog (CTF writeups, security articles)
- About page
- Contact page
- Giscus comments/reactions
- Newsletter signup

## Phase 2 — Consultancy (1 year later)

Same domain, same dark theme. Layout converts to firm website.

### Additions
- Services page (Pentest, Security Audit, Web App Testing)
- Case Studies
- Hire Me
- Testimonials
- CTA: "Book a Free Consultation"

## Key Principle

> Ship fast, improve later. No over-engineering.

## File Structure Convention

```
content/          → All MDX content files
content/_meta.js  → Top navigation order
content/docs/     → Docs section with sidebar
app/              → Next.js app router (layouts, pages)
public/           → Static assets (favicon, images)
```

### How _meta.js works
Each `_meta.js` file controls sidebar order and display titles:
```js
export default {
  linux: 'Linux',
  'git-github': 'Git & GitHub',
  'server-setup': 'Server Setup'
}
```

### How to add a new doc page
1. Create a `.mdx` file in the appropriate `content/docs/` subfolder
2. Add frontmatter with `title`
3. Add the key to the parent `_meta.js` if needed
4. The page automatically appears in the sidebar
