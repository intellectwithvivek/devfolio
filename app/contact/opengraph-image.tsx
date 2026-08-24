import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

/**
 * `opengraph-image` applies to the segment it sits in and is not inherited by
 * or from neighbouring routes, so each page carries its own card.
 */
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Contact — start a project with Arjun Mehta'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Contact',
    title: 'Start a conversation.',
    subtitle:
      'Tell me what you are building and what is going wrong. I reply to everything within two working days.',
  })
}
