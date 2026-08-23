import type { Metadata } from 'next'

import { PROFILE } from '@/data/profile'
import { SITE } from '@/data/site'

/**
 * One place that knows how a page's metadata is shaped.
 *
 * Every route calls this, so the canonical URL, the OpenGraph card and the
 * Twitter card cannot drift apart — the usual failure mode when each page
 * hand-rolls its own `metadata` export.
 */
export function pageMetadata({
  title,
  description,
  path,
  images,
}: {
  title: string
  description: string
  /** Route path, leading slash, no origin. `/` for the homepage. */
  path: string
  images?: string[]
}): Metadata {
  const url = new URL(path, SITE.url).toString()

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: `${PROFILE.name} — ${SITE.name}`,
      locale: SITE.locale,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images ? { images } : {}),
    },
  }
}

/** Absolute URL for a route path. JSON-LD `@id` values must be absolute. */
export function absolute(path: string) {
  return new URL(path, SITE.url).toString()
}
