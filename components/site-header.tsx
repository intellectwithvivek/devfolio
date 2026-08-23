'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge, Navbar, ThemeToggle } from '@the_viveksingh/vivek-ui'

import { LINKS, SITE, vivekui } from '@/data/site'

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/built-with', label: 'Built with' },
  { href: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <Navbar sticky container="xl">
      <Navbar.Brand asChild>
        <Link href="/" aria-label={`${SITE.name} — home`}>
          <span className="df-wordmark">
            Dev<span>Folio</span>
          </span>
        </Link>
      </Navbar.Brand>

      <Navbar.Links>
        {NAV.map((item) => (
          <Navbar.Link
            key={item.href}
            asChild
            active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
          >
            <Link href={item.href}>{item.label}</Link>
          </Navbar.Link>
        ))}
      </Navbar.Links>

      <Navbar.Actions>
        {/* Promotion kit, surface 2 of 4: the navbar badge. */}
        <a href={vivekui(LINKS.docs, 'navbar')} target="_blank" rel="noopener noreferrer" className="df-nav-badge">
          <Badge tone="primary" variant="soft" pill>
            <span className="df-badge-long">⚡ Built with VivekUI</span>
            <span className="df-badge-short">⚡ VivekUI</span>
          </Badge>
        </a>
        <ThemeToggle mode="cycle" />
        <Navbar.Toggle />
      </Navbar.Actions>
    </Navbar>
  )
}
