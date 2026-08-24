import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

/**
 * `opengraph-image` applies to the segment it sits in and is not inherited by
 * or from neighbouring routes, so each page carries its own card.
 */
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'About Arjun Mehta — full-stack engineer in Bengaluru'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'About',
    title: 'Eight years, four teams, one through-line.',
    subtitle:
      'Fintech and commerce infrastructure — systems where being wrong costs money.',
  })
}
