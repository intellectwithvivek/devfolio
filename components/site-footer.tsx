import Link from 'next/link'
import { Code, CopyButton, Footer, Text } from '@the_viveksingh/vivek-ui'

import { GitHubIcon } from '@/components/icons'
import { PROFILE } from '@/data/profile'
import { INSTALL_COMMAND, LINKS, REPO_LABEL, SITE, vivekui } from '@/data/site'

/**
 * Promotion kit, surface 1 of 4: the footer credit, on every page.
 *
 * The wording and the four links are fixed — this is the credit the template
 * asks you to keep. Removing it is allowed by the licence; a star is not.
 */
export function SiteFooter() {
  return (
    <Footer
      className="df-footer"
      size="xl"
      navLabel="Footer"
      brand={
        <div className="df-footer-credit">
          <span className="df-wordmark">
            Dev<span>Folio</span>
          </span>
          <Text tone="muted">
            Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime
            dependencies. One install, one CSS import, no config.
          </Text>
          <div className="df-install">
            <Code>{INSTALL_COMMAND}</Code>
            <CopyButton value={INSTALL_COMMAND} size="sm" variant="ghost" label="Copy" copiedLabel="Copied" />
          </div>
        </div>
      }
      social={
        // This site's own source, so a visitor can read it and reuse it. The mark
        // is decorative; the visible text is what names the link.
        <a className="df-repo-link" href={SITE.repo} target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
          <span>
            Source on GitHub <span className="df-repo-slug">{REPO_LABEL}</span>
          </span>
        </a>
      }
      columns={[
        {
          title: 'Portfolio',
          links: [
            { label: 'Projects', href: '/projects' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Built with VivekUI', href: '/built-with' },
            { label: 'Source code', href: SITE.repo, target: '_blank' },
          ],
        },
        {
          title: 'VivekUI',
          links: [
            { label: 'Docs', href: vivekui(LINKS.docs, 'footer'), target: '_blank' },
            { label: 'npm', href: LINKS.npm, target: '_blank' },
            { label: 'GitHub', href: LINKS.github, target: '_blank' },
            { label: 'Author — Vivek Kumar Singh', href: vivekui(LINKS.author, 'footer'), target: '_blank' },
          ],
        },
        {
          title: 'Elsewhere',
          links: PROFILE.socials.map((s) => ({ label: s.label, href: s.href, target: '_blank' as const })),
        },
      ]}
      copyright={
        <Text as="span" size="sm" tone="muted">
          © {new Date().getFullYear()} {PROFILE.name}. {SITE.name} is a free MIT-licensed template —{' '}
          <Link href="/built-with">see every component it uses</Link>.
        </Text>
      }
    />
  )
}
