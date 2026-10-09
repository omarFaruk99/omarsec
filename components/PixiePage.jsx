'use client'

import { useEffect, useId, useRef, useState } from 'react'
// Single source for the version shown on the page. Pixie reads the same file to find updates.
import latest from '../public/pixie/latest.json'

const DOWNLOAD_URL = '/pixie/download'
const GOOGLE_KEY_URL = 'https://aistudio.google.com/apikey'

// Hero ribbon: what people say (with fillers) flows into the pill, and clean text comes out.
const RAW_SPEECH =
  'উম... আজকে মানে মানে মিটিং টা, uh, তিনটায় হবে, so please সবাই, আ, সময়মতো আসবেন   ·   ' +
  'so, um, can you send the, uh, the final design today   ·   '
const CLEAN_TEXT =
  'আজকে মিটিং তিনটায় হবে, so please সবাই সময়মতো আসবেন।     Can you send the final design today?     '
const RIBBON_REPEAT = 6
const PILL_BARS = [10, 18, 26, 16, 30, 20, 12, 24, 14]

const FEATURES = [
  {
    title: 'Works in every app',
    text: 'Chrome, WhatsApp, Gmail, Word, VS Code. If you can type there, Pixie can type there.',
  },
  {
    title: 'Bangla, English, or both',
    text: 'Speak the way you talk. Mix both in one sentence, and each word is written in the right script.',
  },
  {
    title: 'Free to use',
    text: 'No account and no payment. Add your own free key from Google and start talking. Want more speed? Use a paid key.',
  },
]

const STEPS = [
  {
    title: 'Download and install',
    text: (
      <>
        Open <b>Pixie-Setup.exe</b> and click <b>Install</b>. You do not need an admin password.
      </>
    ),
    note: (
      <>
        If Windows shows “Windows protected your PC”, click <b>More info</b>, then <b>Run anyway</b>.
      </>
    ),
  },
  {
    title: 'Add your free key',
    text: (
      <>
        Pixie opens a short setup. Get a free key from{' '}
        <a href={GOOGLE_KEY_URL} target="_blank" rel="noreferrer">Google AI Studio</a>, paste it and click{' '}
        <b>Test</b>.
      </>
    ),
  },
  {
    title: 'Hold and talk',
    text: (
      <>
        Click in any text box. Hold <kbd>Ctrl</kbd> + <kbd>Win</kbd>, speak, and let go. Your words appear in a
        few seconds. The setup lets you try it once.
      </>
    ),
  },
]

const SHORTCUTS = [
  ['Talk', <><kbd>Ctrl</kbd> + <kbd>Win</kbd> hold</>],
  ['Hands-free (for long talks)', <><kbd>Ctrl</kbd> + <kbd>Win</kbd> twice, quickly</>],
  ['Stop hands-free and type', <><kbd>Ctrl</kbd> + <kbd>Win</kbd> once</>],
  ['Cancel', <kbd>Esc</kbd>],
  ['Paste the last text again', <><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Z</kbd></>],
  ['Copy the last text', <><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>X</kbd></>],
  ['Settings and history', 'Right-click the pill'],
  ['Move the pill', 'Drag it'],
]

const FAQ = [
  {
    q: 'Is Pixie really free?',
    a: 'Yes. Pixie is free. It uses your own key from Google. The free key is enough for normal daily use.',
  },
  {
    q: 'Free key or paid key?',
    a: 'The free Google key works well for daily use. It has a daily limit, and it can be a little slower at busy times. If you use Pixie a lot, turn on billing for your Google key. It is faster and has higher limits. You pay Google only for what you use. Pixie itself stays free.',
  },
  {
    q: 'What do I need?',
    a: 'A computer with Windows 10 or 11, a microphone, and an internet connection.',
  },
  {
    // Pixie's "How to fix" button opens this answer (omarsec.com/pixie#fix-key).
    id: 'fix-key',
    q: 'Pixie says "Google blocked this account". What do I do?',
    a: 'Google sometimes restricts new Google accounts, so their keys stop working. Open your Google Account settings, verify your phone number and turn on 2-Step Verification. Then make a new key in Google AI Studio and paste it into Pixie. If it still fails, make the key with another Google account that you have used for a while.',
  },
  {
    q: 'Why does Windows show a warning?',
    a: 'Pixie is new, so Windows does not know it yet. Click More info, then Run anyway. You only see this once.',
  },
  {
    q: 'Can I change the shortcut?',
    a: 'Yes. Open Pixie settings, click Change next to Shortcut, and press the keys you want.',
  },
  {
    q: 'How do I get new versions?',
    a: 'You do not need to do anything. Pixie downloads new versions quietly and installs them the next time it starts. You see "Updating Pixie…" for a few seconds. Your settings and key stay as they are.',
  },
  {
    q: 'Does it work on Mac?',
    a: 'Not yet. Pixie works on Windows only.',
  },
  {
    q: 'How do I uninstall Pixie?',
    a: 'Open Windows Settings, go to Apps, find Pixie, and click Uninstall.',
  },
]

function PixieLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="15" fill="#F8F6F2" />
      <circle cx="32" cy="32" r="21" fill="#1F1D1A" />
      <rect x="21.9" y="27" width="4.2" height="10" rx="2.1" fill="#F8F6F2" />
      <rect x="29.9" y="22" width="4.2" height="20" rx="2.1" fill="#F8F6F2" />
      <rect x="37.9" y="25.5" width="4.2" height="13" rx="2.1" fill="#F8F6F2" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  )
}

// Drawn at a fixed 1280 x 640 and centered, so wide screens see the whole curve and phones see the middle.
// Both texts move to the right: the raw speech into the pill, the clean text out of it.
function SpeechRibbon() {
  const rawRef = useRef(null)
  const cleanRef = useRef(null)

  useEffect(() => {
    const raw = rawRef.current
    const clean = cleanRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      raw.setAttribute('startOffset', '-300')
      return
    }
    const speed = 55 // pixels per second
    const start = performance.now()
    let rawLen = 0
    let cleanLen = 0
    let frame
    const tick = (now) => {
      // One copy's length; measured once the font has loaded (it is 0 before that).
      if (!rawLen) rawLen = raw.parentNode.getComputedTextLength() / RIBBON_REPEAT
      if (!cleanLen) cleanLen = clean.parentNode.getComputedTextLength() / RIBBON_REPEAT
      const moved = ((now - start) / 1000) * speed
      if (rawLen) raw.setAttribute('startOffset', (-rawLen * 3 + (moved % rawLen)).toFixed(1))
      if (cleanLen) clean.setAttribute('startOffset', (-cleanLen + (moved % cleanLen)).toFixed(1))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <svg className="px-ribbon" viewBox="0 0 1280 640" aria-hidden="true">
      <defs>
        <path
          id="px-raw-path"
          d="M -520 90 C -340 150, -200 120, -80 150 C 120 110, 260 200, 250 330 C 240 460, 420 560, 588 560"
        />
        <path
          id="px-clean-path"
          d="M 692 560 C 860 560, 980 520, 1060 420 C 1130 330, 1200 250, 1380 230 C 1520 215, 1660 170, 1820 150"
        />
      </defs>
      <text className="px-raw-text">
        <textPath href="#px-raw-path" ref={rawRef}>{RAW_SPEECH.repeat(RIBBON_REPEAT)}</textPath>
      </text>
      <use href="#px-clean-path" className="px-clean-band" />
      <text className="px-clean-text" dominantBaseline="middle">
        <textPath href="#px-clean-path" ref={cleanRef}>{CLEAN_TEXT.repeat(RIBBON_REPEAT)}</textPath>
      </text>
      <g transform="translate(588 532)">
        <rect className="px-pill-bg" width="104" height="56" rx="28" />
        {PILL_BARS.map((h, i) => (
          <rect
            key={i}
            className="px-bar"
            x={22 + i * 7}
            y={28 - h / 2}
            width="3"
            height={h}
            rx="1.5"
            style={{ animationDelay: `${i * 0.11}s` }}
          />
        ))}
      </g>
    </svg>
  )
}

// One question. The answer slides open and closed instead of jumping.
function FaqItem({ q, a, anchor }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  // A link to #anchor (from inside Pixie) opens this answer and scrolls to it.
  useEffect(() => {
    if (anchor && window.location.hash === `#${anchor}`) {
      setOpen(true)
      document.getElementById(anchor)?.scrollIntoView({ block: 'center' })
    }
  }, [anchor])
  return (
    <div className={`px-faq-item ${open ? 'is-open' : ''}`} id={anchor}>
      <button
        type="button"
        className="px-faq-q"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {q}
        <span className="px-faq-icon" aria-hidden="true" />
      </button>
      <div className="px-faq-a" id={id} role="region">
        <div>
          <p>{a}</p>
        </div>
      </div>
    </div>
  )
}

export function PixiePage() {
  return (
    <>
      <style>{`
        .px {
          --px-fg: #ededed;
          --px-muted: rgba(255, 255, 255, 0.62);
          --px-line: rgba(255, 255, 255, 0.1);
          --px-card: rgba(255, 255, 255, 0.025);
          --px-panel: rgba(255, 255, 255, 0.04);
          --px-btn-bg: #ffffff;
          --px-btn-fg: #111111;
          --px-kbd-bg: rgba(255, 255, 255, 0.06);
          --px-raw: rgba(255, 255, 255, 0.32);
          --px-ribbon: #ededed;
          --px-ribbon-ink: #111111;
          --px-pill-line: rgba(255, 255, 255, 0.22);
          padding-bottom: 5rem;
          color: var(--px-fg);
        }
        html:not(.dark) .px,
        html[data-theme='light'] .px {
          --px-fg: #111111;
          --px-muted: rgba(17, 17, 17, 0.64);
          --px-line: rgba(0, 0, 0, 0.1);
          --px-card: rgba(0, 0, 0, 0.015);
          --px-panel: rgba(0, 0, 0, 0.035);
          --px-btn-bg: #111111;
          --px-btn-fg: #ffffff;
          --px-kbd-bg: #ffffff;
          --px-raw: rgba(0, 0, 0, 0.36);
          --px-ribbon: #111111;
          --px-ribbon-ink: #ffffff;
          --px-pill-line: #1f1d1a;
        }

        .px kbd {
          font-family: var(--font-geist), sans-serif;
          font-size: 0.82em;
          font-weight: 600;
          padding: 0.05em 0.45em;
          border: 1px solid var(--px-line);
          border-bottom-width: 2px;
          border-radius: 6px;
          background: var(--px-kbd-bg);
          white-space: nowrap;
        }
        .px a { text-decoration: underline; text-underline-offset: 3px; }

        /* Hero: full width, the ribbon fills both sides */
        .px-hero {
          position: relative;
          height: 640px;
          overflow: hidden;
          text-align: center;
        }
        .px-copy {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 0;
        }
        .px-body { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; }
        .px-brand {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        .px-brand small {
          font-weight: 400;
          font-size: 0.9rem;
          color: var(--px-muted);
          border-left: 1px solid var(--px-line);
          padding-left: 0.6rem;
        }
        .px h1.px-title {
          font-size: 3.4rem !important;
          font-weight: 600 !important;
          line-height: 1.08;
          letter-spacing: -0.04em !important;
          max-width: 16ch;
          margin: 0 auto 1rem;
          text-wrap: balance;
        }
        .px-lead {
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--px-muted);
          max-width: 34rem;
          margin: 0 auto 2rem;
        }
        .px-cta { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem 1.5rem; }
        .px a.px-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.4rem;
          border-radius: 12px;
          background: var(--px-btn-bg);
          color: var(--px-btn-fg);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .px a.px-btn:hover { opacity: 0.85; }
        .px a.px-btn:focus-visible { outline: 2px solid var(--hover-accent); outline-offset: 3px; }
        .px a.px-link { color: var(--px-fg); font-weight: 500; }
        .px-meta {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: var(--px-muted);
          font-variant-numeric: tabular-nums;
        }

        /* Speech ribbon */
        .px-ribbon {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 1280px;
          height: 640px;
          margin-left: -640px;
          pointer-events: none;
          /* Fade both ends instead of a hard cut at the page edge. */
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%);
        }
        .px-raw-text { fill: var(--px-raw); font: 500 19px var(--font-geist), 'Noto Sans Bengali', 'Nirmala UI', sans-serif; }
        .px-clean-band { fill: none; stroke: var(--px-ribbon); stroke-width: 46; }
        .px-clean-text { fill: var(--px-ribbon-ink); font: 500 19px var(--font-geist), 'Noto Sans Bengali', 'Nirmala UI', sans-serif; }
        .px-pill-bg { fill: #1f1d1a; stroke: var(--px-pill-line); stroke-width: 2; }
        .px-bar {
          fill: #f8f6f2;
          transform-box: fill-box;
          transform-origin: center;
          animation: px-bar 1s ease-in-out infinite;
        }
        @keyframes px-bar { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }

        /* Sections */
        .px-section { margin-top: 5rem; }
        .px-body > .px-section:first-child { margin-top: 3rem; }
        .px-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--px-muted);
          margin-bottom: 0.5rem;
        }
        .px h2.px-h2 {
          font-size: 2rem !important;
          font-weight: 600 !important;
          letter-spacing: -0.02em !important;
          margin: 0 0 2rem;
          border: 0;
          padding: 0;
        }
        .px-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .px-card {
          border: 1px solid var(--px-line);
          background: var(--px-card);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .px-card h3 { font-size: 1.05rem !important; font-weight: 600 !important; margin: 0 0 0.5rem; }
        .px-card p { margin: 0; color: var(--px-muted); line-height: 1.6; font-size: 0.95rem; }
        .px-num {
          display: inline-grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--px-line);
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .px-note {
          margin-top: 1rem;
          padding: 0.75rem 0.9rem;
          border-radius: 10px;
          background: var(--px-panel);
          font-size: 0.875rem;
          line-height: 1.55;
          color: var(--px-fg);
        }

        /* Shortcuts */
        .px-keys { border: 1px solid var(--px-line); border-radius: 16px; overflow: hidden; }
        .px-key-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.25rem;
          border-top: 1px solid var(--px-line);
        }
        .px-key-row:first-child { border-top: 0; }
        .px-key-row span:first-child { color: var(--px-muted); }
        .px-key-row span:last-child { text-align: right; }

        /* FAQ */
        .px-faq { border-top: 1px solid var(--px-line); }
        .px-faq-item { border-bottom: 1px solid var(--px-line); }
        .px-faq-q {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 0;
          background: none;
          border: 0;
          color: inherit;
          font: inherit;
          font-weight: 600;
          font-size: 1.05rem;
          text-align: left;
          cursor: pointer;
        }
        .px-faq-q:focus-visible { outline: 2px solid var(--hover-accent); outline-offset: 2px; border-radius: 4px; }
        /* Plus sign whose vertical bar folds away, so it turns into a minus. */
        .px-faq-icon { position: relative; flex: none; width: 14px; height: 14px; }
        .px-faq-icon::before,
        .px-faq-icon::after {
          content: '';
          position: absolute;
          left: 0;
          top: 6px;
          width: 14px;
          height: 2px;
          border-radius: 1px;
          background: var(--px-muted);
          transition: transform 0.3s ease;
        }
        .px-faq-icon::after { transform: rotate(90deg); }
        .px-faq-item.is-open .px-faq-icon::after { transform: rotate(0deg); }
        /* The answer grows from 0 to its own height. */
        .px-faq-a {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 0.3s ease, opacity 0.3s ease;
        }
        .px-faq-item.is-open .px-faq-a { grid-template-rows: 1fr; opacity: 1; }
        .px-faq-a > div { overflow: hidden; }
        .px-faq p { margin: 0; padding-bottom: 1.1rem; color: var(--px-muted); line-height: 1.6; max-width: 46rem; }

        /* Closing call to action */
        .px-end {
          margin-top: 5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--px-line);
          background: var(--px-panel);
        }
        .px-end h2 { font-size: 1.4rem !important; font-weight: 600 !important; margin: 0 0 0.3rem; border: 0; padding: 0; }
        .px-end p { margin: 0; color: var(--px-muted); }

        /* Same as the home page: hide Nextra's extra theme row above the footer (the footer has its own toggle). */
        body:has(.px) *:has(> hr.nextra-border) > div:first-child,
        body:has(.px) hr.nextra-border { display: none; }

        @media (max-width: 860px) {
          .px-hero { height: 680px; }
          .px-copy { padding-top: 2rem; }
          .px h1.px-title { font-size: 2.3rem !important; }
          .px-grid3 { grid-template-columns: 1fr; }
          .px-section, .px-end { margin-top: 3.5rem; }
          .px-key-row { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
          .px-key-row span:last-child { text-align: left; }
        }
        @media (prefers-reduced-motion: reduce) {
          .px-bar { animation: none; }
          .px-faq-a, .px-faq-icon::after { transition: none; }
        }
      `}</style>

      <div className="px">
        <section className="px-hero">
          <div className="px-copy">
            <div className="px-brand">
              <PixieLogo size={28} />
              Pixie
              <small>Voice typing for Windows</small>
            </div>
            <h1 className="px-title">Just talk. Pixie types it for you.</h1>
            <p className="px-lead">
              Hold <kbd>Ctrl</kbd> + <kbd>Win</kbd>, speak, and let go. Your words appear in any app, right where your
              cursor is.
            </p>
            <div className="px-cta">
              <a className="px-btn" href={DOWNLOAD_URL}>
                <DownloadIcon />
                Download for Windows
              </a>
              <a className="px-link" href="#install">How to install</a>
            </div>
            <div className="px-meta">
              Version {latest.version} · Windows 10 and 11 · {latest.size} · Free
            </div>
          </div>
          <SpeechRibbon />
        </section>

        <div className="px-body">
          <section className="px-section">
            <div className="px-eyebrow">Why Pixie</div>
            <h2 className="px-h2">Faster than typing</h2>
            <div className="px-grid3">
              {FEATURES.map((f) => (
                <div className="px-card" key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-section" id="install">
            <div className="px-eyebrow">Get started</div>
            <h2 className="px-h2">Install in 3 steps</h2>
            <div className="px-grid3">
              {STEPS.map((s, i) => (
                <div className="px-card" key={s.title}>
                  <div className="px-num">{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {s.note && <div className="px-note">{s.note}</div>}
                </div>
              ))}
            </div>
          </section>

          <section className="px-section">
            <div className="px-eyebrow">Shortcuts</div>
            <h2 className="px-h2">Keys to remember</h2>
            <div className="px-keys">
              {SHORTCUTS.map(([label, keys]) => (
                <div className="px-key-row" key={label}>
                  <span>{label}</span>
                  <span>{keys}</span>
                </div>
              ))}
            </div>
            <div className="px-note">
              Installed Pixie before version 1.4? Your shortcut stays <kbd>Right Ctrl</kbd>. You can change it in
              Settings.
            </div>
          </section>

          <section className="px-section">
            <div className="px-eyebrow">Questions</div>
            <h2 className="px-h2">Frequently asked questions</h2>
            <div className="px-faq">
              {FAQ.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} anchor={f.id} />
              ))}
            </div>
          </section>

          <section className="px-end">
            <div>
              <h2>Ready to try Pixie?</h2>
              <p>Free for Windows 10 and 11. Setup takes about two minutes.</p>
            </div>
            <a className="px-btn" href={DOWNLOAD_URL}>
              <DownloadIcon />
              Download for Windows
            </a>
          </section>
        </div>
      </div>
    </>
  )
}
