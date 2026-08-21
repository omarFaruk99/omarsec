'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Search } from 'nextra/components'

export function SearchModal() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleOpenEvent = () => setOpen(true)
    window.addEventListener('open-search', handleOpenEvent)
    return () => window.removeEventListener('open-search', handleOpenEvent)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <>
      <style>{`
        .search-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          justify-content: center;
          padding-top: 12vh;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
        }

        .search-modal-card {
          position: relative;
          width: 100%;
          max-width: 22rem;
          height: fit-content;
          margin: 0 1rem;
        }

        .search-modal-card .nextra-search {
          width: 100%;
        }

        .search-modal-card .nextra-search input {
          width: 100% !important;
          height: 3.25rem !important;
          padding: 0 3.25rem !important;
          border-radius: 14px !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          background: rgb(var(--nextra-bg)) !important;
          font-size: 1rem !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        html:not(.dark) .search-modal-card .nextra-search input,
        html[data-theme='light'] .search-modal-card .nextra-search input {
          border-color: rgba(0, 0, 0, 0.12) !important;
        }

        /* Nextra's own "CTRL K" kbd hint is irrelevant once the modal is already open */
        .search-modal-card .nextra-search kbd {
          display: none !important;
        }

        .search-modal-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          opacity: 0.5;
          pointer-events: none;
          z-index: 1;
        }

        .search-modal-icon svg {
          width: 1.1rem;
          height: 1.1rem;
        }

        .search-modal-esc {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.7rem;
          padding: 0.15rem 0.4rem;
          border-radius: 0.35rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          opacity: 0.6;
          pointer-events: none;
          z-index: 1;
        }

        html:not(.dark) .search-modal-esc,
        html[data-theme='light'] .search-modal-esc {
          border-color: rgba(0, 0, 0, 0.15);
        }

        .nextra-search-results {
          position: fixed !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(28rem, calc(100vw - 2rem)) !important;
          margin-top: 0.5rem !important;
          z-index: 61 !important;
        }
      `}</style>
      <div className="search-modal-backdrop" onClick={() => setOpen(false)}>
        <div className="search-modal-card" onClick={e => e.stopPropagation()}>
          <span className="search-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>
          <Search autoFocus placeholder="Search" />
          <kbd className="search-modal-esc">ESC</kbd>
        </div>
      </div>
    </>
  )
}
