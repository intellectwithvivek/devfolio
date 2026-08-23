import type { MetadataRoute } from 'next'

import { PROJECTS } from '@/data/projects'
import { SITE } from '@/data/site'

/** Static routes, then one entry per case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const url = (path: string) => new URL(path, SITE.url).toString()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: url('/projects'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/about'), lastModified, changeFrequency: 'yearly', priority: 0.8 },
    { url: url('/built-with'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/contact'), lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: url(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
