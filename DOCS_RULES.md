# OmarSec — Documentation Writing Rules

Rules that apply to every content page across all sections (Linux, Git, SSH, Server Setup, etc.).
Follow these whenever a new page or section is created or edited — by a human or AI.

---

## 1. Page Structure (Mandatory Order)

Every `.mdx` page must follow this exact order:

```
1. Frontmatter         → title, description
2. Imports             → only what is used on this page
3. # Page Title        → single H1, matches frontmatter title
4. Opening <Callout>   → what this page covers (1–2 sentences)
5. Content sections    → concept → example → code (see Rule 5)
6. ## CyberSec Note    → why this matters in security context
7. ## Quick Check      → self-assessment checklist (optional — see Rule 9)
8. Next page link      → "পরবর্তী →" with path
9. Hidden SEO keywords → <span style={{ display: 'none' }}>
```

---

## 2. Heading Rules

The right-side TOC has limited width. A long heading wraps and looks bad.

**Rule:** Heading = short identifier only. Full description = first paragraph below it.

| Wrong | Correct |
|-------|---------|
| `## \`pwd\` — Where Am I?` | `## \`pwd\`` then description below |
| `## Tab Completion — Superpower` | `## Tab Completion` then description below |
| `## \`touch\` — File তৈরি করো` | `## \`touch\`` then description below |
| `## Mind Shift — সবচেয়ে বড় পার্থক্য` | `## The Key Difference` then description below |

- Use `##` and `###` only — never `####` or deeper
- No sequential numbering: no "Part 1", "Section 2", "Step 3" in headings
- No horizontal rules (`---`) inside body content — Nextra handles spacing

---

## 3. Language Style

- **Main content:** English
- **Explanations, context, callouts:** Bengali
- **Code and commands:** Always English, never Bengali
- **Target audience:** Bengali-speaking learners studying cybersecurity

---

## 4. Tone & Vocabulary

Never label the reader negatively. Use empowering language.

| Avoid | Use Instead |
|-------|-------------|
| beginner, newbie, newcomer | Learner, Student |
| Module, Lesson | Section |
| easy, simple | Foundational, Essential |
| just run this command | — (explain it first, then show it) |

---

## 5. Teach Why Before How

Always explain the concept before showing the command. This is the most important rule.

**Wrong approach (cheatsheet style):**
```md
Run `chmod 755 file.sh` to make it executable.
```

**Correct approach (tutorial style):**
Explain what file permissions are → why the executable bit matters → what 755 means → then show `chmod 755 file.sh`.

Signs a page has become a cheatsheet (bad):
- A command appears with no explanation of what it does
- A section contains only a code block
- The reader learns *what to type* but not *why it works*

---

## 6. No Emojis

No emojis anywhere — not in headings, not in lists, not in callouts, not in frontmatter.

---

## 7. Nextra Components

Use built-in Nextra components only when they improve clarity over plain markdown. If plain markdown works, use plain markdown.
Only import what you use on the page. An unused import causes a warning.

| Component | When to Use |
|-----------|-------------|
| `<Callout type="info">` | General tip, explanation, estimation |
| `<Callout type="warning">` | Security danger, common mistake, destructive action |
| `<Callout type="default">` | Analogy, summary, reminder |
| `<Steps>` | Sequential steps (how-to, practice flow) |
| `<Tabs>` | Two approaches to the same thing (e.g. numeric vs symbolic chmod) |
| `<FileTree>` | Folder or file structure visualization |

Do not use `<Callout type="error">` unless the action is truly destructive or irreversible.

---

## 8. CyberSec Note (Required)

Every page must have a `## CyberSec Note` section before Quick Check.

- Wrap content in `<Callout type="warning">`
- Explain why this topic matters in a security context
- Reference TryHackMe rooms, CTF scenarios, or pentesting workflows where relevant
- Include practical commands when possible

---

## 9. Quick Check (Optional)

Add a `## Quick Check` section only when the page covers multiple distinct concepts where a learner could genuinely lose track. Do not add it to simple, single-concept pages — it feels forced and artificial.

**Add Quick Check when:**
- The page covers 3+ distinct concepts (e.g. file permissions: read, write, execute, numeric vs symbolic)
- The topic involves a local/remote or attacker/target distinction that is easy to confuse
- The page is long and a summary checkpoint adds real value

**Skip Quick Check when:**
- The page covers a single command or a straightforward concept
- The content is already concise and self-contained

```md
## Quick Check

- [ ] Question one?
- [ ] Question two?
- [ ] Question three?

**পরবর্তী →** [Next Page Title](/docs/section/page)
```

The "পরবর্তী →" next-page link should always be present at the bottom of the page, regardless of whether Quick Check is included.

---

## 10. Code Blocks

Use the `filename` attribute for all terminal/shell code blocks:

```md
\`\`\`bash filename="Terminal"
ls -la
\`\`\`
```

When a topic involves a local machine AND a remote server, every block must state where it runs:

```md
\`\`\`bash filename="LOCAL — Terminal"
ssh-keygen -t ed25519
\`\`\`

\`\`\`bash filename="SERVER — Terminal"
chmod 600 ~/.ssh/authorized_keys
\`\`\`
```

Also add a short sentence below the heading stating the location — never rely on the filename label alone.

Use plain code blocks (no filename) for output examples or diagrams.

---

## 11. Section Folder Structure

Every section follows this layout:

```
section-name/
├── _meta.js        ← lists pages in sidebar order
├── index.mdx       ← section overview page
├── page-one.mdx
├── page-two.mdx
└── page-three.mdx
```

The `index.mdx` of every section must:
- Have an opening `<Callout type="info">` describing what the section covers
- List what the learner will understand after completing it
- Link to all topic pages with a short description

---

## 12. _meta.js Rules

Only add a key to `_meta.js` after the actual file or folder exists.
Adding a key for a non-existent file causes a Nextra validation error.

---

## 13. File & URL Naming

- Use semantic slugs, not numeric prefixes: `file-permissions.mdx` not `module-03-permissions.mdx`
- All lowercase, hyphens only, no underscores
- Sidebar order is controlled by `_meta.js`, not filenames

---

## 14. Platform Assumption

All commands assume **Ubuntu 24.04 LTS** unless explicitly stated otherwise.
Use `apt` for package management. Note any distro-specific variation when it appears.

---

## 15. Hidden SEO Keywords

At the bottom of each page, add a hidden span for search indexing:

```mdx
<span style={{ display: 'none' }}>
  linux terminal bangla, linux basics bengali, cybersecurity bangla tutorial,
  [add topic-specific keywords here]
</span>
```

---

## 16. Processing Raw Markdown Files

If a user provides a raw `.md` file:
1. Convert it to `.mdx`
2. Rename to a clean semantic slug (e.g., `file-permissions.mdx`)
3. Remove hardcoded emojis, "Module XX" prefixes, and heavy horizontal lines
4. Restructure content to use Nextra components where appropriate
5. Apply all rules from this document
