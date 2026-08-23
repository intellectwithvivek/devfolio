import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider, ToastProvider } from '@the_viveksingh/vivek-ui'

import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { ThemeScript } from '@/components/theme-script'
import { PROFILE } from '@/data/profile'
import { SITE } from '@/data/site'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${PROFILE.name} — ${PROFILE.role}`,
    template: `%s — ${PROFILE.name}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  authors: [{ name: PROFILE.name, url: SITE.url }],
  creator: PROFILE.name,
  generator: 'Next.js',
  keywords: [
    'free nextjs portfolio template',
    'nextjs portfolio template',
    'react portfolio template',
    'open source portfolio',
    'developer portfolio',
    'VivekUI',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
  colorScheme: 'dark light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // `data-theme` is written by the script below before React ever runs.
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Blocking, in <head>, on purpose: React cannot prevent a flash of the
            wrong theme, because the server does not know what this visitor chose. */}
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark">
          <ToastProvider position="bottom-end">
            <a className="df-skip" href="#main">
              Skip to content
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
