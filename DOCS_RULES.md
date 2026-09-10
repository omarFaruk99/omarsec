# OmarSec — Documentation Writing Rules

Rules that apply to every content page across all sections (Linux, Git, Server Setup, Docker, etc.).
Follow these whenever a new page or section is created or edited — by a human or AI.

The single most important rule: **keep it practical and simple.** A reader should never feel lost
or lose motivation halfway through a page. If a rule below ever pushes a page toward being long,
theoretical, or hard to follow, favor being practical and simple over following the rule to the letter.

---

## 1. Page Structure (Mandatory Order)

Every `.mdx` page must follow this exact order:

```
1. Frontmatter          → title, description
2. Imports              → only what is used on this page
3. # Page Title         → single H1, matches frontmatter title
4. Opening <Callout>    → what this page covers (1–2 sentences)
5. ## What Is This      → 1–2 sentences, plain definition
6. ## Why Need This     → the real reason a learner needs this, in simple language
7. ## Step by Step + Use Case → concept + command + example together, in small steps (see Rule 2)
8. Next page link       → "পরবর্তী →" with path
9. Hidden SEO keywords  → <span style={{ display: 'none' }}>
```

There is no separate "Real-World Note" or "Quick Check" section anymore. A practical warning
(security risk, production gotcha) belongs inline, as a `<Callout type="warning">` right next to
the step it applies to — not as its own section at the bottom. Don't add a section just to have one.

---

## 2. Step by Step + Use Case (the core of every page)

This is the most important rule. Never write a bare command with no context.

Each step should follow this shape:
1. A short use case — a real situation ("তুমি X করেছ, এখন Y চাও")
2. The concept in one or two lines — what the command actually does
3. The command itself
4. What happens after (one line, only if not obvious)

**Wrong (cheatsheet style):**
```md
Run `chmod 755 file.sh` to make it executable.
```

**Correct (practical, use-case first):**
Use case: script run করলে "permission denied" আসছে। ব্যাখ্যা করো কেন — execute bit নেই।
তারপর দেখাও `chmod 755 file.sh`, আর কী বদলাল সেটা এক লাইনে বলো।

Signs a page has drifted back to cheatsheet style (fix these):
- A command appears with no use case or explanation
- A step is only a code block, nothing else
- The reader learns *what to type* but not *why*, or *when they'd actually need this*

Use `<Steps>` from Nextra when the flow has 3+ ordered actions. For a single command, plain
markdown with the use case above it is enough — don't force `<Steps>` on everything.

---

## 3. Heading Rules

The right-side TOC has limited width. A long heading wraps and looks bad.

**Rule:** Heading = short identifier only. Full description = first paragraph below it.

| Wrong | Correct |
|-------|---------|
| `## \`pwd\` — Where Am I?` | `## \`pwd\`` then description below |
| `## Tab Completion — Superpower` | `## Tab Completion` then description below |

- Use `##` and `###` only — never `####` or deeper
- No sequential numbering: no "Part 1", "Section 2", "Step 3" in headings (inside `<Steps>`,
  Nextra's own step titles are fine)
- No horizontal rules (`---`) inside body content — Nextra handles spacing

---

## 4. Language Style

- **Main content:** English
- **Explanations, context, use cases:** Bengali
- **Code and commands:** Always English, never Bengali
- **Target audience:** Bengali-speaking tech learners — software engineers, DevOps/cloud
  engineers, AI engineers, security folks, and tech-savvy readers in general. Content is
  Bengali-only for now; an English version is planned later.

---

## 5. Tone & Vocabulary

Never label the reader negatively. Use empowering language.

| Avoid | Use Instead |
|-------|-------------|
| beginner, newbie, newcomer | Learner, Student |
| Module, Lesson | Section |
| easy, simple | Foundational, Essential |
| just run this command | — (give the use case first, then show it) |

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
| `<Steps>` | 3+ ordered actions (how-to, practice flow) |
| `<Tabs>` | Two approaches to the same thing (e.g. numeric vs symbolic chmod) |
| `<FileTree>` | Folder or file structure visualization |

Do not use `<Callout type="error">` unless the action is truly destructive or irreversible.

---

## 8. Code Blocks

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

## 9. Section Folder Structure

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

## 10. _meta.js Rules

Only add a key to `_meta.js` after the actual file or folder exists.
Adding a key for a non-existent file causes a Nextra validation error.

---

## 11. File & URL Naming

- Use semantic slugs, not numeric prefixes: `file-permissions.mdx` not `module-03-permissions.mdx`
- All lowercase, hyphens only, no underscores
- Sidebar order is controlled by `_meta.js`, not filenames

---

## 12. Platform Assumption

All commands assume **Ubuntu 24.04 LTS** unless explicitly stated otherwise.
Use `apt` for package management. Note any distro-specific variation when it appears.

---

## 13. Hidden SEO Keywords

At the bottom of each page, add a hidden span for search indexing:

```mdx
<span style={{ display: 'none' }}>
  linux terminal bangla, linux basics bengali, cybersecurity bangla tutorial,
  [add topic-specific keywords here]
</span>
```

---

## 14. Processing Raw Markdown Files

If a user provides a raw `.md` file:
1. Convert it to `.mdx`
2. Rename to a clean semantic slug (e.g., `file-permissions.mdx`)
3. Remove hardcoded emojis, "Module XX" prefixes, and heavy horizontal lines
4. Restructure into What Is This / Why Need This / Step by Step + Use Case
5. Apply all rules from this document
