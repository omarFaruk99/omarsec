# Linux Docs — Writing Rules

Rules established during the creation of `content/docs/linux-fundamentals/`.
Follow these every time a new section or page is created.

---

## 1. Heading Rules (Most Important)

**Keep all headings short.** The right-side TOC (table of contents) has limited width — a long heading wraps to two lines and looks bad.

**Rule:** Heading = short identifier only. Description = first paragraph below the heading.

| Wrong | Correct |
|-------|---------|
| `## \`pwd\` — Where Am I?` | `## \`pwd\`` then description below |
| `## Tab Completion — Superpower` | `## Tab Completion` then description below |
| `## \`touch\` — File তৈরি করো` | `## \`touch\`` then description below |
| `## Mind Shift — সবচেয়ে বড় পার্থক্য` | `## The Key Difference` then description below |

**Pattern:**
```md
## Short Heading

Description sentence goes here as the first paragraph.
```

---

## 2. Language Style

- **Main content:** English
- **Explanations, notes, callouts:** Bangla
- **Code and commands:** Always English
- **Target audience:** Bangla-speaking learners doing cybersecurity (TryHackMe etc.)

---

## 3. No Emojis

Do not use emojis anywhere — not in headings, not in lists, not in callouts.

---

## 4. Nextra Components

Use these components where appropriate. Do not overuse.

| Component | When to Use |
|-----------|------------|
| `<Callout type="info">` | General explanation or tip |
| `<Callout type="warning">` | CyberSec notes, dangers, common mistakes |
| `<Callout type="default">` | Analogy, summary, reminder |
| `<Steps>` | Sequential steps (How to Use, Practice) |
| `<Tabs>` | Two approaches to the same thing (e.g. numeric vs symbolic chmod) |
| `<FileTree>` | Folder/file structure visualization |

**Never import a component and not use it** — causes unused import warnings.

---

## 5. CyberSec Note

Every page must have a `## CyberSec Note` section at the bottom (before Quick Check).

- Use `<Callout type="warning">`
- Explain why this topic matters in cybersecurity context
- Reference TryHackMe, CTF, pentesting where relevant
- Include practical commands where possible

---

## 6. Quick Check

Every page ends with a `## Quick Check` section — a checklist the learner uses to self-assess.

```md
## Quick Check

- [ ] Question one?
- [ ] Question two?
- [ ] Question three?

**পরবর্তী →** [Next Page Title](/docs/linux-fundamentals/section/page)
```

---

## 7. Meta File Rules

**Critical:** Only add a key to `_meta.js` **after** the actual file/folder exists.
Adding a key for a non-existent page causes a Nextra validation error.

Add to parent `_meta.js` when the section folder and its `index.mdx` are ready.

---

## 8. Section Structure

Every section follows this pattern:

```
section-name/
├── _meta.js           ← lists pages in order
├── index.mdx          ← section overview (what you'll learn, topic links)
├── page-one.mdx
├── page-two.mdx
└── page-three.mdx
```

`index.mdx` should:
- Have a `<Callout type="info">` at the top
- List what the learner will know after finishing
- List all topic links with a short description

---

## 9. Page Structure (Order)

Each page follows this order:

1. Frontmatter (`title`, `description`)
2. Imports
3. `# Page Title`
4. Opening `<Callout>` — what this page covers
5. Content sections (concept → example → code)
6. `## CyberSec Note`
7. `## Quick Check`
8. Link to next page
9. Hidden SEO keywords `<span style={{ display: 'none' }}>`

---

## 10. Code Blocks

Always use `filename` attribute for terminal examples:

```md
\`\`\`bash filename="Terminal"
ls -la
\`\`\`
```

Use plain code blocks (no filename) for output/diagram examples.

---

## 11. Ubuntu 24.04 LTS Focus

All commands and examples assume **Ubuntu 24.04 LTS**.
Use `apt` for package management. Avoid distro-specific commands without note.

---

## 12. Teach "Why" Before "How"

Always explain the purpose/concept before showing the command.

- Wrong: "Run `chmod 755 file.sh` to make it executable."
- Correct: Explain what permissions are → why executable bit matters → then show `chmod 755 file.sh`
