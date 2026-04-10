---
trigger: always_on
---

This is OmarSec (omarsec.com) — a cybersecurity documentation site built with Next.js 15 + Nextra 4.6.1.
Content is written in .mdx files. Target audience: Bengali-speaking cybersecurity learners (TryHackMe, eJPT level).

Always follow these rules when working on any .mdx content:

- Headings must be short (1-3 words). Full description goes in the paragraph below — never in the heading.
- Language: English for main content, Bengali for explanations and callouts.
- No emojis anywhere — not in headings, lists, callouts, or frontmatter.
- Always teach WHY before HOW. Never show a command without explaining the concept first.
- Use Nextra components (<Callout>, <Steps>, <Tabs>, <FileTree>) only when they improve clarity over plain markdown.
- Only import components you actually use on the page. Unused imports cause warnings.
- Every page must end with a "পরবর্তী →" next-page link.
- Do not use horizontal rules (---) inside page body content.
- Code blocks must use the filename attribute: ```bash filename="Terminal"
- Never use labels like "beginner", "newbie", "Module", or "Lesson". Use "Section", "Learner", "Fundamentals".

For full formatting reference: see DOCS_RULES.md
For tech decisions: see TECH_STACK.md
For project vision: see PLAN.md
