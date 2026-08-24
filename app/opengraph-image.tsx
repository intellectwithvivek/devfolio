import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

/**
 * The default share card. A metadata file cascades like a layout, so this one
 * covers every route that does not ship its own — home, projects index, about,
 * contact and built-with.
 */
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'DevFolio — a free, open-source Next.js portfolio template'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Free · Open source · MIT',
    title: 'A Next.js portfolio template that ships finished.',
    subtitle:
      'Dark mode, charts, structured data and a full case-study flow — built with VivekUI, zero runtime dependencies.',
  })
}
