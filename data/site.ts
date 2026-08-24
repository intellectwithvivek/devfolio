/**
 * Site-wide constants: identity, canonical URL, and every promotion link.
 *
 * The UTM helper lives here so a link can never ship untagged — every outbound
 * VivekUI link on this site is built through `vivekui()`.
 */

export const SITE = {
  name: 'DevFolio',
  tagline: 'A free, open-source Next.js portfolio template',
  /**
   * The canonical origin. Everything SEO-facing derives from this: `metadataBase`,
   * every canonical tag, every OpenGraph URL, the sitemap and the JSON-LD `@id`s.
   *
   * It must be the exact host you verify in Google Search Console, with no
   * trailing slash and no `www`. If this disagrees with the host serving the
   * page, Search Console rejects the sitemap ("URLs not on this property") and
   * Google may index the wrong origin.
   */
  url: 'https://devfolio.vivekkumarsingh.in',
  /**
   * This site's own source. Linked from the navbar and the footer, because the
   * whole point of the build is that a visitor can read it and reuse it.
   */
  repo: 'https://github.com/intellectwithvivek/devfolio',
  locale: 'en_US',
  language: 'en',
} as const

/**
 * Search Console / Bing ownership tokens.
 *
 * Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel to have the meta tag
 * rendered. Verifying the apex domain by DNS TXT record instead is better —
 * one record covers every present and future subdomain, and it survives a
 * redeploy that drops the tag.
 */
export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
} as const

/**
 * Twitter/X attribution handles, e.g. `@yourhandle`.
 *
 * Deliberately empty. A guessed handle does not just fail — it credits a real
 * stranger who happens to own it. Fill these in only with handles you control.
 */
export const SOCIAL_HANDLES = {
  site: process.env.NEXT_PUBLIC_TWITTER_SITE,
  creator: process.env.NEXT_PUBLIC_TWITTER_CREATOR,
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
