export function ContributeButton() {
  return (
    <>
      <style>{`
        .contribute-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(var(--accent-rgb), 0.4);
          background: rgba(var(--accent-rgb), 0.1);
          color: var(--teal-accent);
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .contribute-button:hover {
          color: var(--hover-accent);
        }
      `}</style>
      <a
        href="https://github.com/omarFaruk99/omarsec"
        target="_blank"
        rel="noreferrer"
        className="contribute-button"
      >
        Contribute on GitHub →
      </a>
    </>
  )
}
