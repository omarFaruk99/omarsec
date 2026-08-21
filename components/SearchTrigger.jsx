'use client'

export function SearchTrigger() {
  return (
    <>
      <style>{`
        .search-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.6rem;
          width: 8.5rem;
          padding: 0.3rem 0.6rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.8rem;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }

        .search-trigger:hover {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .search-trigger kbd {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.7rem;
          padding: 0.1rem 0.35rem;
          border-radius: 0.3rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          opacity: 0.7;
        }

        html:not(.dark) .search-trigger,
        html[data-theme='light'] .search-trigger {
          border-color: rgba(0, 0, 0, 0.12);
          color: rgba(0, 0, 0, 0.5);
        }

        html:not(.dark) .search-trigger kbd,
        html[data-theme='light'] .search-trigger kbd {
          border-color: rgba(0, 0, 0, 0.15);
        }

        html:not(.dark) .search-trigger:hover,
        html[data-theme='light'] .search-trigger:hover {
          border-color: rgba(0, 0, 0, 0.3);
        }
      `}</style>
      <button
        type="button"
        className="search-trigger"
        onClick={() => window.dispatchEvent(new Event('open-search'))}
      >
        <span>Search</span>
        <kbd>CTRL K</kbd>
      </button>
    </>
  )
}
