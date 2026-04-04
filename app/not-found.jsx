import { NotFoundPage } from 'nextra-theme-docs'

export default function NotFound() {
  return (
    <NotFoundPage content="">
      <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'var(--font-geist)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00d4aa', marginBottom: '10px' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Access Denied!</h2>
        <p style={{ color: '#a1a1aa', maxWidth: '400px', margin: '15px auto', lineHeight: 1.6 }}>
          Terminal error: The directory you are trying to access does not exist, or you lack sufficient privileges to view it.
        </p>
      </div>
    </NotFoundPage>
  )
}
