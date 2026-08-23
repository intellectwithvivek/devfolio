/**
 * Site-wide constants: identity, canonical URL, and every promotion link.
 *
 * The UTM helper lives here so a link can never ship untagged — every outbound
 * VivekUI link on this site is built through `vivekui()`.
 */

export const SITE = {
  name: 'DevFolio',
  tagline: 'A free, open-source Next.js portfolio template',
  /** Change this to your own domain after you deploy. */
  url: 'https://portfolio-vivekui.vercel.app',
  /**
   * This site's own source. Linked from the navbar and the footer, because the
   * whole point of the build is that a visitor can read it and reuse it.
   */
  repo: 'https://github.com/intellectwithvivek/devfolio',
  locale: 'en_US',
} as const

/** Short form for display, e.g. next to the GitHub mark in the footer. */
export const REPO_LABEL = 'intellectwithvivek/devfolio'

export const PACKAGE = '@the_viveksingh/vivek-ui'
export const INSTALL_COMMAND = `npm i ${PACKAGE}`

const CAMPAIGN = 'portfolio'

/** Where a promotion link was clicked. Keeps attribution honest per surface. */
export type UtmMedium = 'navbar' | 'footer' | 'builtwith' | 'readme' | 'hero' | 'about'

/** Appends the campaign's UTM triplet to a VivekUI-owned URL. */
export function vivekui(url: string, medium: UtmMedium): string {
  const u = new URL(url)
  u.searchParams.set('utm_source', 'vivekui-template')
  u.searchParams.set('utm_campaign', CAMPAIGN)
  u.searchParams.set('utm_medium', medium)
  return u.toString()
}

export const LINKS = {
  docs: 'https://ui.vivekkumarsingh.in/docs',
  components: 'https://ui.vivekkumarsingh.in/docs/components',
  charts: 'https://ui.vivekkumarsingh.in/docs/charts',
  npm: `https://www.npmjs.com/package/${PACKAGE}`,
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
} as const

/** Deep link to one component's docs page, UTM-tagged for the /built-with table. */
export function componentDocs(slug: string, group: 'components' | 'charts' = 'components') {
  return vivekui(`https://ui.vivekkumarsingh.in/docs/${group}/${slug}`, 'builtwith')
}
