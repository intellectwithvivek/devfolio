import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { SITE } from '@/data/site'

/**
 * The social share card, drawn once and reused by every `opengraph-image` route.
 *
 * Satori (what `ImageResponse` runs on) is not a browser: it supports flexbox
 * only, needs `display: flex` declared on anything with more than one child,
 * and resolves no CSS custom properties. So the palette is repeated here as
 * literals rather than read from `globals.css` — the two have to be kept in
 * step by hand, which is the trade for rendering an image on the server.
 */

/** Facebook, LinkedIn, X and Slack all crop to roughly this. */
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const INK = '#0a0a0b'
const PAPER = '#f5f5f7'
const MUTED = '#8e8e93'
const ACCENT = '#a78bfa'
const ACCENT_2 = '#f0abfc'

async function fonts() {
  const dir = join(process.cwd(), 'assets', 'fonts')
  const [display, body] = await Promise.all([
    readFile(join(dir, 'bricolage-extrabold.ttf')),
    readFile(join(dir, 'inter-regular.ttf')),
  ])
  return [
    { name: 'Bricolage', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'Inter', data: body, weight: 400 as const, style: 'normal' as const },
  ]
}

export interface OgCard {
  /** Small mono line above the headline. */
  eyebrow: string
  /** The one big line. Keep it short — it is rendered at 68px. */
  title: string
  /** One supporting sentence under it. */
  subtitle?: string
  /** Optional pill bottom-left, e.g. a project's measured outcome. */
  badge?: string
}

export async function renderOgImage({ eyebrow, title, subtitle, badge }: OgCard) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: INK,
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* The violet bloom from the site's hero, flattened into a radial gradient. */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            left: 320,
            width: 900,
            height: 900,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${ACCENT}44 0%, ${INK}00 62%)`,
          }}
        />

        {/* The accent rule that opens the card — the site's signature stroke. */}
        <div style={{ display: 'flex', width: 132, height: 8, borderRadius: 9999, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_2})` }} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </div>

          <div
            style={{
              fontFamily: 'Bricolage',
              fontSize: title.length > 42 ? 60 : 72,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              color: PAPER,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          {subtitle ? (
            <div
              style={{
                fontFamily: 'Inter',
                fontSize: 27,
                lineHeight: 1.4,
                color: MUTED,
                marginTop: 24,
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {badge ? (
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Inter',
                  fontSize: 24,
                  color: INK,
                  background: ACCENT,
                  padding: '10px 24px',
                  borderRadius: 9999,
                }}
              >
                {badge}
              </div>
            ) : (
              <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: 24, color: MUTED }}>
                {SITE.url.replace('https://', '')}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: 22, color: MUTED }}>
            Built with VivekUI · MIT
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  )
}
