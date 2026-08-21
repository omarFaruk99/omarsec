import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Geist, Geist_Mono } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata = {
  title: {
    default: 'OmarSec — Learn Tech, Build, and Secure the Web',
    template: '%s | OmarSec',
  },
  description:
    'An open-source knowledge base for software engineering, DevOps, cloud, AI engineering, and cybersecurity. Hands-on guides for tech-savvy learners.',
  openGraph: {
    title: 'OmarSec',
    description: 'A Bengali-language knowledge base for software engineering, DevOps, cloud, AI engineering, and cybersecurity. Open-source notes and hands-on guides for tech-savvy learners.',
    siteName: 'OmarSec',
    type: 'website',
  },
}

const navbar = (
  <Navbar
    logo={
      <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>
        OmarSec
      </span>
    }
    projectLink="https://github.com/omarFaruk99/omarsec"
  />
)

const footer = (
  <Footer>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <span>MIT {new Date().getFullYear()} © OmarSec.</span>
      <ThemeToggle />
    </div>
  </Footer>
)

import MouseTracker from './components/MouseTracker'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SearchTrigger } from '@/components/SearchTrigger'
import { SearchModal } from '@/components/SearchModal'

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <MouseTracker />
        <SearchModal />
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/omarFaruk99/omarsec/tree/main"
          footer={footer}
          search={<SearchTrigger />}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
