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
- Git & GitHub

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

### Future Nextra Features to Explore
- **`<Cards>` Component:** Use for the Homepage design or module index pages instead of standard bullet points for a premium UI grid.
- **`<Bleed>` Component:** Use for full-screen architecture diagrams or large terminal screenshots in Linux/Server modules to break standard text margins.
- **Math & LaTeX:** Native support available for cryptographic or algorithm-heavy cybersecurity articles.
- [x] **Custom 404 Page:** Create a branded "hacker/cybersecurity themed" 404 error page.

## Phase 2 — Consultancy (1 year later)

Same domain, same dark theme. Layout converts to firm website.

### Additions
- Services page (Pentest, Security Audit, Web App Testing)
- Case Studies
- Hire Me
- Testimonials
- CTA: "Book a Free Consultation"

## Multi-Language (i18n) Strategy (Future)

- The overall website (Homepage, About, Services, Blog) will strictly remain **English-only** to appeal to a global audience and remote clients.
- Only the `/docs` section will support bilingual content.
- **English** will be configured as the default locale (`en`). Existing Bengali content will be transitioned to `.bn.mdx`, while their English translations will use `.en.mdx` and load by default.
- Until i18n is fully activated, Bengali docs utilize "Hidden English Keywords" to ensure Nextra's FlexSearch correctly surfaces Bengali articles for common English search queries.

## Key Principle

> Ship fast, improve later. No over-engineering.

## AI Guidelines for Consistency 🤖

Whenever an AI (or human) works on content in `.mdx` files or styles, strictly follow these rules to maintain the site's professional aesthetic:
1. **Typography & Spacing**: Let Nextra handle margins. Do NOT use horizontal breaks (`---`) inside the body to separate sections. It creates visual clutter.
2. **Table of Contents (TOC)**: Maintain a clean, professional, and **single-line** TOC on the right side.
   - **Short Headings**: Use only 1-3 words for `##` and `###` headings (e.g., `## Remote Repositories`).
   - **No Sequential Numbering**: Strictly avoid "Part 1," "Section 2," or "Scenario 3" markers in headings to mirror the semantic style of Next.js and Stripe docs.
   - **Bilingual Context**: Always place a descriptive sentence in Bengali immediately *below* the heading in the body text to provide full context without cluttering the TOC.
3. **Callouts**: Use `<Callout type="info">` (soft blue) for important tips/estimations. Avoid `type="error"` (red) unless explicitly highlighting a destructive or dangerous action.
4. **Clean URLs**: Do NOT use "module-01" or numeric prefixes in filenames. Use semantic names (e.g., `setup.mdx`). Control their sidebar order strictly via `_meta.js`.
5. **Theme Colors**: Stick to Nextra's default crisp default white/gray/blue theme. Avoid forcing `#00d4aa` (Teal) globally via CSS variables unless implementing Tailwind config natively.
6. **Nextra Components**: Always use Nextra's built-in MDX components (`<Callout>`, `<Steps>`, `<Tabs>`, `<FileTree>`) instead of raw Markdown where appropriate to make the documentation interactive and visually engaging.
7. **Processing User Content (`.md` files)**: If the user provides a raw `.md` file, immediately convert it to `.mdx`. Rename the file to a clean, URL-friendly semantic slug (e.g., `linux-basics.mdx` instead of `module-01-linux.md`). Remove hardcoded emojis or "Module" text, and restructure the content to utilize Nextra components.
8. **Professional Tone & Vocabulary**: Strictly avoid labeling the reader with terms like **"beginner," "newcomer," "newbie,"** or **"amateur."** Instead, use empowering, focus-oriented terms like **"Foundations," "Fundamentals," "Zero to Hero," "Roadmap,"** and **"Professional Workflow."** Always use **"Section"** instead of "Module" or "Lesson" to maintain a standard, high-quality documentation feel similar to Next.js, Stripe, and React Docs.

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
