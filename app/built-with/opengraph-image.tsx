import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

/**
 * `opengraph-image` applies to the segment it sits in and is not inherited by
 * or from neighbouring routes, so each page carries its own card.
 */
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Built with VivekUI — 38 components, 2 charts, zero runtime dependencies'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Built with VivekUI',
    title: '38 components. 2 charts. Zero dependencies.',
    subtitle:
      'Every section of this site mapped to the component behind it. One install, one CSS import, no config.',
  })
}
