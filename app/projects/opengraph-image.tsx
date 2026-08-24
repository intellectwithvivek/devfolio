import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

/**
 * `opengraph-image` applies to the segment it sits in and is not inherited by
 * or from neighbouring routes, so each page carries its own card.
 */
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'DevFolio — six engineering case studies with measured outcomes'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Case studies',
    title: 'Six projects, each with a number attached.',
    subtitle:
      'Payments reconciliation, self-hosted search, product analytics, checkout and zero-downtime migrations.',
  })
}
