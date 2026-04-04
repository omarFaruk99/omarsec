import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Geist, Geist_Mono } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist'
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

export const metadata = {
  title: {
    default: 'OmarSec — Cybersecurity Enthusiast & Pentester in Training',
    template: '%s | OmarSec'
  },
  description:
    'Personal cybersecurity knowledge base by Omar. Notes on Linux, Git, server setup, and web security.',
  openGraph: {
    title: 'OmarSec',
    description: 'Cybersecurity Enthusiast & Pentester in Training',
    siteName: 'OmarSec',
    type: 'website'
  }
}

const navbar = (
  <Navbar
    logo={
      <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
        OmarSec
      </span>
    }
    projectLink="https://github.com/omarsec"
  />
)

const footer = (
  <Footer>
    <span>MIT {new Date().getFullYear()} © OmarSec.</span>
  </Footer>
)

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
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/omarsec/omarsec.com/tree/main"
          footer={footer}
          darkMode={false}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
