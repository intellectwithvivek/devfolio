/**
 * When each static route's content last actually changed.
 *
 * This exists because `<lastmod>` is the only sitemap field Google still pays
 * attention to, and it only pays attention while the value stays honest. The
 * common failure is stamping every URL with `new Date()` at build time: every
 * deploy then claims every page changed, Google learns the signal is noise, and
 * stops using it — losing you the one lever the sitemap actually gives you.
 *
 * So: edit the date when you edit the page. Case-study dates live on the
 * projects themselves in `data/projects.ts`.
 */

export const ROUTE_UPDATED = {
  '/': '2026-08-24',
  '/projects': '2026-07-29',
  '/about': '2026-06-20',
  '/contact': '2026-05-02',
  '/built-with': '2026-08-24',
} as const

export type StaticRoute = keyof typeof ROUTE_UPDATED

/** When the site first went live. Used for `datePublished` on the site itself. */
export const SITE_PUBLISHED = '2026-08-23'
