import type { MetadataRoute } from 'next'

import { PROFILE } from '@/data/profile'
import { SITE } from '@/data/site'

/**
 * The web app manifest, served at /manifest.webmanifest.
 *
 * Not a ranking factor on its own. It is here because it is what makes the site
 * installable and gives Android and Chrome a real name, colour and icon instead
 * of a guessed one — which is the part users see when they save the page.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${SITE.name}`,
    short_name: SITE.name,
    description: SITE.tagline,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    // Matches the dark default, so the splash does not flash white.
    background_color: '#0a0a0b',
    theme_color: '#0a0a0b',
    lang: SITE.language,
    dir: 'ltr',
    categories: ['portfolio', 'developer tools', 'productivity'],
    icons: [
      { src: '/favicon.ico', sizes: '16x16 32x32 48x48 64x64 128x128 256x256', type: 'image/x-icon' },
      { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // A separate file, not the same PNG relabelled. A launcher crops a
      // maskable icon to its own shape, so this variant runs the gradient edge
      // to edge — the rounded corners of the normal tile would be cropped as
      // notches — and holds the mark inside the central 80% safe zone.
      { src: '/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
