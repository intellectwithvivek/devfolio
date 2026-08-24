import type { MetadataRoute } from 'next'

import { ROUTE_UPDATED } from '@/data/content-dates'
import { PROJECTS, shotUrl } from '@/data/projects'
import { SITE } from '@/data/site'

/**
 * The XML sitemap, served at /sitemap.xml.
 *
 * Three decisions worth knowing about:
 *
 * 1. **`lastModified` comes from the content, never from the build.** Google
 *    uses `lastmod` only while it stays accurate; a build timestamp on every URL
 *    tells it every page changed on every deploy, which trains it to ignore the
 *    field. Dates live in `data/content-dates.ts` and on each project.
 * 2. **No `changeFrequency`.** Google has said for years that it ignores the
 *    field outright, and ours were guesses. Omitting it keeps the file honest
 *    rather than padding it with signals nobody reads.
 * 3. **`priority` is relative, not absolute.** It only ranks URLs against each
 *    other within this file — it does not raise you against anyone else's site.
 *    It survives here purely as a crawl hint for the engines that still read it.
 *
 * `images` turns this into an image sitemap too, which is how a portfolio's
 * case-study artwork gets discovered for Google Images.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, SITE.url).toString()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: ROUTE_UPDATED['/'], priority: 1.0 },
    { url: url('/projects'), lastModified: ROUTE_UPDATED['/projects'], priority: 0.9 },
    { url: url('/about'), lastModified: ROUTE_UPDATED['/about'], priority: 0.8 },
    { url: url('/built-with'), lastModified: ROUTE_UPDATED['/built-with'], priority: 0.8 },
    { url: url('/contact'), lastModified: ROUTE_UPDATED['/contact'], priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: url(`/projects/${project.slug}`),
    lastModified: project.updatedAt,
    priority: 0.7,
    // Cover first, then every screenshot on the page.
    images: [shotUrl(project.cover.seed), ...project.shots.map((shot) => shotUrl(shot.seed))],
  }))

  return [...staticRoutes, ...projectRoutes]
}
