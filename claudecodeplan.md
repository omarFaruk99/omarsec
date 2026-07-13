# Claude Code Section — Plan & Decisions

> This is a planning file. The actual content will be a new docs section on the OmarSec site.
> Read this first in any new session before working on Claude Code content.

## What this is
A new documentation section teaching **Claude Code** (Anthropic's CLI coding agent) for **general web developers** — daily-use, practical, foundation to advanced.
Location: `content/docs/claude-code/` (Nextra .mdx pages).
Audience: developers who want to use Claude Code effectively in their day-to-day workflow (not cybersecurity-specific).

## Key Decisions (IMPORTANT — do not forget)

1. **Language: global simple English only.**
   - Full English. NO Bengali mix for this section (same override as Docker section — different from other site sections like Linux/Git).
   - Short sentences, simple words, so beginners understand.
   - Explain each technical term the first time it appears.
   - **Keep it tight, but not bare (refined 2026-07-14, supersedes the 2026-07-13 note below):** the working baseline is the length/style of `01-foundations/first-session.mdx` as it exists now — short sentences, tables over repeated prose, one clear example per concept (like the "Core Loop" `<Steps>` block and the "A Good Example" vs. vague-prompt comparison). This is the target: not paragraph-heavy, but also not so stripped down that the *why* behind a concept disappears.
   - User tried both directions and rejected them: too long/paragraph-heavy (original draft) was rejected as unclear-through-verbosity; a stripped-to-the-bone version (cut all "why" explanations and examples) was rejected as unclear-through-omission. The `first-session.mdx` baseline is the accepted middle point — use it as the reference when writing new pages or judging if a page needs more or less.
   - **Do not proactively expand pages further** as a default habit — but this was refined again after Part 3 (2026-07-14, same day): when a whole Part introduces genuinely new, unfamiliar concepts (subagents, hooks, MCP, skills — things with no Part 1/2 equivalent), write that Part with more depth than the `first-session.mdx` baseline from the start. Give each concept a fuller "why this exists" explanation (1-2 sentences, not just a label) and walk through examples step by step rather than a one-line mention. Part 3's pages (`03-intermediate/*.mdx`) after this rewrite are the reference for "more depth" — use that level for future Parts covering similarly new ground (Part 4's Agent SDK, Workflows, Agent Teams especially, since those are even less familiar).
   - Still true: don't add depth the user didn't ask for once a Part is already at the right level for its topics. The lesson from Part 3 is to calibrate depth to *how unfamiliar the topic is*, not to always default to minimum length.
   - (Original 2026-07-13 note, now superseded above): prefer tables over repeated prose sections, no "why this exists" preambles, cut Quick Check unless 3+ concepts.

2. **Audience: general web developers, NOT cybersecurity.**
   - So this section does NOT use the `## CyberSec Note` block (unlike Linux/Git/Server sections).
   - Examples should be everyday dev tasks: fixing bugs, writing features, reviewing PRs, refactoring — not pentesting/security scenarios.

3. **Depth: cover everything, at a practical level.**
   - Include Advanced topics (Agent SDK, Workflows, Agent Teams, headless mode, CI/CD) — but teach them as "when/why you'd reach for this" plus a working example, not exhaustive API reference.
   - Skip deep internals (e.g., don't need to explain SDK internals line-by-line) — focus on what a working developer actually does day to day.

4. **Research basis:** Content is grounded in a comprehensive research pass (via claude-code-guide agent, web search, official docs at code.claude.com/docs) done 2026-07-13. Key facts to keep consistent:
   - Default model: Sonnet 5 (native 1M context, adaptive thinking)
   - Permission modes: default, plan, acceptEdits, auto, dontAsk, bypassPermissions
   - Agent Teams is experimental (needs `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`)
   - Workflows = JS orchestration scripts (agent/parallel/pipeline), distinct from Agent Teams
   - CLAUDE.md scopes: user (`~/.claude/CLAUDE.md`), project (`./CLAUDE.md`), local (`CLAUDE.local.md`), path-scoped (`.claude/rules/`)
   - Auto Memory: `~/.claude/projects/<repo>/memory/MEMORY.md`
   - Re-verify facts against current docs if a session happens much later than 2026-07-13 — CLI moves fast.

5. **Avoid the word "course".** Use "guide" instead (same as Docker section rule).

6. **Follow DOCS_RULES.md for the .mdx pages**, with these overrides for this section:
   - No `## CyberSec Note` section (audience is general devs).
   - No Bengali in body content (English only, per Rule 1 above — this overrides DOCS_RULES.md Rule 3).
   - Everything else applies: semantic slugs, short headings, `<Steps>`/`<Callout>` components, `filename="Terminal"` code blocks, hidden SEO keywords, Quick Check where genuinely useful, "Next →" link at bottom (use plain "Next →" in English, not "পরবর্তী →", since this section is English-only).

7. **Folder structure: one numbered subfolder per Part (confirmed with user 2026-07-14).**
   - Pattern copied from `content/docs/linux-fundamentals/` (e.g. `01-introduction/`, `02-terminal-basics/`).
   - Each Part gets its own folder: `01-foundations/`, `02-daily-workflow/`, `03-intermediate/`, `04-advanced/`, `05-practical-patterns/`, `06-real-scenarios/` (exact slugs may adjust as each Part is built — keep numeric prefix + short semantic name).
   - Each subfolder has its own `_meta.js` (lists its pages, `index: 'Overview'` first) and `index.mdx` (short: title, one Callout, bullet list linking to its topic pages — no more, per the tight-writing rule).
   - Root `content/docs/claude-code/_meta.js` only lists `index` + the Part subfolders, NOT individual pages.
   - Root `content/docs/claude-code/index.mdx`'s "What's Inside" table links to Part overview pages (e.g. `/docs/claude-code/01-foundations`), not individual topic pages.
   - When writing internal "Next →" links inside a page, always include the full subfolder path (e.g. `/docs/claude-code/02-daily-workflow/slash-commands`), not just `/docs/claude-code/slash-commands` — a common mistake since pages are drafted before being moved into their subfolder.

---

## Guide Outline (Index)

### Part 1 — Foundations
- What Claude Code is, install (macOS/Linux/Windows), login/auth
- First session: `claude`, REPL/interactive mode basics
- Basic prompting for code tasks
- File-edit approval workflow (diff review, approve/reject)
- Permission modes: default, plan, acceptEdits, auto
- Context window basics: `/context`, `/compact`

### Part 2 — Daily Core Workflow
- Essential slash commands (the 10-15 used daily)
- CLAUDE.md — project memory / instructions
- Auto Memory (passive learning system)
- settings.json / settings.local.json and the permissions system
- Keyboard shortcuts
- IDE integration (VS Code, JetBrains)
- Git & PR workflow (commits, branches, PRs via conversation)

### Part 3 — Intermediate Power Features
- Subagents (the Agent tool) — delegating research/review work
- Custom slash commands & Skills (SKILL.md)
- Hooks system — deterministic automation on lifecycle events
- MCP servers — connecting to GitHub, Slack, databases, etc.
- Plan mode deep dive
- Background tasks & monitoring
- Checkpoints & rewind

### Part 4 — Advanced & Automation
- Claude Agent SDK — building custom agents on your own infra
- Workflows — multi-agent orchestration scripts
- Headless / scripting mode (`claude -p`, piping, CI use)
- GitHub Actions / CI-CD integration
- Worktrees — parallel sessions on different branches
- Sandboxing basics
- Agent Teams (experimental) — multiple coordinating sessions

### Part 5 — Daily Practical Patterns
- Debugging workflow
- Code review workflow (`/code-review`, `/security-review`, `/review`)
- Refactoring pattern
- Testing integration
- Effective prompting rules (specific to Claude Code)
- Cost & token management
- Model selection strategy (Sonnet / Opus / Haiku)
- Team collaboration patterns (shared CLAUDE.md, shared skills)

### Part 6 — Real Scenarios (problem solving)
- Too many permission prompts — how to reduce friction
- Context filling up too fast on long sessions
- Subagent vs Workflow vs Agent Team — when to use which
- Organizing CLAUDE.md in a monorepo
- Claude did something unexpected — how to steer/rewind

---

## Working rules
- One Part at a time. After each Part, a small hands-on task for the reader.
- Reader does the task, then we move to the next Part.

---

## Progress
- [x] Part 1 — Foundations (`content/docs/claude-code/01-foundations/`: what-is-claude-code, installation, first-session, permission-modes, context-basics)
- [x] Part 2 — Daily Core Workflow (`content/docs/claude-code/02-daily-workflow/`: slash-commands, claude-md-and-memory, settings-and-permissions, ide-and-shortcuts, git-and-pr-workflow)
- [x] Restructured into numbered Part subfolders (2026-07-14), matching linux-fundamentals pattern
- [x] Part 3 — Intermediate Power Features (`content/docs/claude-code/03-intermediate/`: subagents, custom-commands-and-skills, hooks, mcp-servers, plan-mode-deep-dive, background-tasks-and-checkpoints)
- [x] Part 4 — Advanced & Automation (`content/docs/claude-code/04-advanced/`: agent-sdk, workflows, headless-mode-and-scripting, cicd-and-github-actions, worktrees-and-sandboxing, agent-teams)
- [ ] Part 5 — Daily Practical Patterns
- [ ] Part 6 — Real Scenarios
