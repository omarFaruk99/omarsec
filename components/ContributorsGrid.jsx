"use client"

import { useState, useEffect } from 'react'

const REPO_OWNER = 'omarFaruk99'
const REPO_NAME = 'omarsec'
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`

export function ContributorsGrid() {
  const [contributors, setContributors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setContributors(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p style={{ color: '#888' }}>Loading contributors...</p>
  }

  if (error) {
    return <p style={{ color: '#888' }}>Contributors লোড করা যায়নি। পরে আবার চেষ্টা করো।</p>
  }

  return (
    <>
      <style>{`
        .contributor-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 1.25rem;
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          width: 130px;
          position: relative;
          transition: border-color 0.2s ease;
          border: 1px solid rgba(128, 128, 128, 0.25);
          background: rgba(128, 128, 128, 0.06);
        }
        .contributor-card:hover {
          border-color: rgba(128, 128, 128, 0.6);
        }
        .rank-badge {
          position: absolute;
          top: 0.4rem;
          left: 0.5rem;
          font-size: 0.75rem;
          opacity: 0.55;
        }
      `}</style>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.85rem',
        marginTop: '1.5rem',
      }}>
        {contributors.map((contributor, index) => {
          const rank = index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`
          return (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noreferrer"
              className="contributor-card"
            >
              <span className="rank-badge">{rank}</span>
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                width={60}
                height={60}
                style={{
                  borderRadius: '50%',
                  border: '2px solid rgba(128, 128, 128, 0.3)',
                  marginBottom: '0.6rem',
                }}
              />
              <span style={{ fontWeight: 600, fontSize: '0.9rem', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {contributor.login}
              </span>
              <span style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '0.15rem' }}>
                {contributor.contributions} {contributor.contributions === 1 ? 'commit' : 'commits'}
              </span>
            </a>
          )
        })}
      </div>
    </>
  )
}
