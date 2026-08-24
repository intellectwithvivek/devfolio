import type { Metadata } from 'next'

import { PROFILE } from '@/data/profile'
import { SITE, SOCIAL_HANDLES } from '@/data/site'

/**
 * One place that knows how a page's metadata is shaped.
 *
 * Every route goes through here, so the canonical URL, the OpenGraph card and
 * the Twitter card cannot drift apart — the usual failure mode when each page
 * hand-rolls its own `metadata` export.
 *
 * The canonical is a path, not an absolute URL: Next resolves it against
 * `metadataBase`, so changing `SITE.url` moves every canonical on the site at
 * once. That single origin is also what Search Console checks a submitted
 * sitemap against.
 */
export function pageMetadata({
  title,
  description,
  path,
  images,
  publishedTime,
  modifiedTime,
  type = 'website',
  keywords,
}: {
  title: string
  description: string
  /** Route path, leading slash, no origin. `/` for the homepage. */
  path: string
  images?: string[]
  publishedTime?: string
  modifiedTime?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
}): Metadata {
  const url = absolute(path)

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: type === 'article' ? 'article' : type === 'profile' ? 'profile' : 'website',
      url,
      title,
      description,
      siteName: `${PROFILE.name} — ${SITE.name}`,
      locale: SITE.locale,
      ...(images ? { images } : {}),
      ...(type === 'article' && (publishedTime || modifiedTime)
        ? { publishedTime, modifiedTime, authors: [absolute('/about')] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images ? { images } : {}),
      // Only emitted when you have set a handle you actually control — a guessed
      // one credits whoever really owns it.
      ...(SOCIAL_HANDLES.site ? { site: SOCIAL_HANDLES.site } : {}),
      ...(SOCIAL_HANDLES.creator ? { creator: SOCIAL_HANDLES.creator } : {}),
    },
  }
}

/** Absolute URL for a route path. JSON-LD `@id` values must be absolute. */
export function absolute(path: string) {
  return new URL(path, SITE.url).toString()
}
