function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  )
}

function GitBranchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M18 8.5a8 8 0 01-8 8" />
    </svg>
  )
}

function ContainersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <circle cx="7" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CycleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 0114-5.3M20 4v4h-4" />
      <path d="M20 12a8 8 0 01-14 5.3M4 20v-4h4" />
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function CodeBracketsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l-5 6 5 6" />
      <path d="M15 6l5 6-5 6" />
    </svg>
  )
}

const TOPICS = [
  {
    area: 'linux',
    size: 'xl',
    Icon: TerminalIcon,
    title: 'Linux Fundamentals',
    description: 'Terminal, file systems, permissions, processes, and networking — the ground truth every tech role stands on.',
    meta: '35 lessons · 10 modules',
    href: '/docs/linux-fundamentals',
  },
  {
    area: 'claude',
    size: 'md',
    Icon: CodeBracketsIcon,
    title: 'Claude Code',
    description: 'From first session to hooks, subagents, and multi-agent workflows.',
    meta: '22 lessons · 4 tracks',
    href: '/docs/claude-code',
  },
  {
    area: 'docker',
    size: 'md',
    Icon: ContainersIcon,
    title: 'Docker',
    description: 'Images, containers, networking, volumes, and multi-container apps with Compose.',
    meta: '18 lessons · 4 modules',
    href: '/docs/docker',
  },
  {
    area: 'server',
    size: 'md',
    Icon: ServerIcon,
    title: 'Server Deployment',
    description: 'VPS setup, Nginx, SSL, and shipping apps to production.',
    meta: '8 lessons',
    href: '/docs/server-deployment',
  },
  {
    area: 'git',
    size: 'md',
    Icon: GitBranchIcon,
    title: 'Git & GitHub',
    description: 'Version control and collaboration workflows done right.',
    meta: '6 lessons',
    href: '/docs/git-github',
  },
  {
    area: 'cicd',
    size: 'md',
    Icon: CycleIcon,
    title: 'CI/CD',
    description: 'Automated pipelines and safe, repeatable releases.',
    meta: '4 lessons',
    href: '/docs/ci-cd',
  },
  {
    area: 'awsses',
    size: 'md',
    Icon: EnvelopeIcon,
    title: 'AWS SES',
    description: 'Transactional and bulk email delivery, set up end to end.',
    meta: '2 lessons',
    href: '/docs/aws-ses',
  },
]

export function TopicsGrid() {
  return (
    <>
      <style>{`
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-areas:
            "linux linux claude docker"
            "server git cicd awsses";
          gap: 1rem;
          width: 100%;
        }

        .topic-card {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          text-decoration: none;
          color: inherit;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 9.5rem;
        }

        .topic-card--linux { grid-area: linux; }
        .topic-card--claude { grid-area: claude; }
        .topic-card--docker { grid-area: docker; }
        .topic-card--server { grid-area: server; }
        .topic-card--git { grid-area: git; }
        .topic-card--cicd { grid-area: cicd; }
        .topic-card--awsses { grid-area: awsses; }

        .topic-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 10px;
          background: rgba(var(--accent-rgb), 0.08);
          color: var(--teal-accent);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          margin-bottom: 1rem;
        }

        .topic-card:hover .topic-icon {
          background: var(--hover-accent-bg);
          color: var(--hover-accent);
          border-color: var(--hover-accent-border);
        }

        .topic-icon svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        .topic-card--xl .topic-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 12px;
        }

        .topic-card--xl .topic-icon svg {
          width: 1.5rem;
          height: 1.5rem;
        }

        .topic-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .topic-card--xl .topic-title {
          font-size: 1.3rem;
        }

        .topic-description {
          font-size: 0.9rem;
          line-height: 1.55;
          color: #888;
        }

        .topic-card:hover .topic-meta {
          color: var(--hover-accent);
          opacity: 1;
        }

        .topic-meta {
          margin-top: auto;
          padding-top: 1rem;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.75rem;
          letter-spacing: 0.01em;
          color: var(--teal-accent);
          opacity: 0.85;
        }

        html:not(.dark) .topic-card,
        html[data-theme='light'] .topic-card {
          border-color: rgba(0, 0, 0, 0.1);
          background: rgba(0, 0, 0, 0.02);
        }

        html:not(.dark) .topic-title,
        html[data-theme='light'] .topic-title {
          color: #111;
        }

        html:not(.dark) .topic-description,
        html[data-theme='light'] .topic-description {
          color: #555;
        }

        @media (max-width: 960px) {
          .topics-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
              "linux linux"
              "claude docker"
              "server git"
              "cicd awsses";
          }
        }

        @media (max-width: 560px) {
          .topics-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "linux"
              "claude"
              "docker"
              "server"
              "git"
              "cicd"
              "awsses";
          }

          .topic-card {
            min-height: auto;
          }
        }
      `}</style>
      <div className="topics-grid">
        {TOPICS.map(({ area, size, Icon, title, description, meta, href }) => (
          <a key={href} href={href} className={`topic-card topic-card--${area} topic-card--${size}`}>
            <span className="topic-icon">
              <Icon />
            </span>
            <span className="topic-title">{title}</span>
            <span className="topic-description">{description}</span>
            <span className="topic-meta">{meta}</span>
          </a>
        ))}
      </div>
    </>
  )
}
