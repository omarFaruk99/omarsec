"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 0010.5 10.5z" />
    </svg>
  )
}

const OPTIONS = [
  { id: 'system', label: 'System theme', Icon: MonitorIcon },
  { id: 'light', label: 'Light theme', Icon: SunIcon },
  { id: 'dark', label: 'Dark theme', Icon: MoonIcon },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const active = mounted ? theme : 'system'

  return (
    <>
      <style>{`
        .theme-toggle {
          display: inline-flex;
          gap: 0.15rem;
          padding: 0.2rem;
          border-radius: 0.6rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
        }

        .theme-toggle-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 0.45rem;
          border: none;
          background: transparent;
          color: inherit;
          opacity: 0.55;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-toggle-btn svg {
          width: 0.9rem;
          height: 0.9rem;
        }

        .theme-toggle-btn:hover {
          opacity: 0.9;
        }

        .theme-toggle-btn[aria-pressed="true"] {
          background: rgba(0, 212, 170, 0.12);
          border: 1px solid rgba(0, 212, 170, 0.35);
          color: var(--teal-accent);
          opacity: 1;
        }

        html:not(.dark) .theme-toggle,
        html[data-theme='light'] .theme-toggle {
          border-color: rgba(0, 0, 0, 0.1);
          background: rgba(0, 0, 0, 0.02);
        }
      `}</style>
      <div className="theme-toggle" role="radiogroup" aria-label="Theme">
        {OPTIONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className="theme-toggle-btn"
            aria-pressed={active === id}
            aria-label={label}
            title={label}
            onClick={() => setTheme(id)}
          >
            <Icon />
          </button>
        ))}
      </div>
    </>
  )
}
