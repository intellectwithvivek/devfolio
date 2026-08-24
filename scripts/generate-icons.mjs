/**
 * Rasterises the brand mark into every icon format the platforms want.
 *
 *   node scripts/generate-icons.mjs
 *
 * Run it by hand when `app/icon.svg` changes, and commit what it writes. These
 * are build artefacts the way a compiled font is: derived, but checked in, so
 * nothing has to re-derive them at request time and a clone is immediately
 * complete.
 *
 * Outputs
 *   app/favicon.ico        six PNG-in-ICO sizes, for tabs and Windows
 *   app/apple-icon.png     180x180, iOS home screen (iOS ignores .ico)
 *   public/icon-512.png    512x512, manifest `purpose: any`
 *   public/icon-maskable.png  512x512 full-bleed, manifest `purpose: maskable`
 *   public/logo.svg        a copy of the mark, for READMEs and elsewhere
 */
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ImageResponse } from 'next/og.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Sizes browsers, Windows and macOS actually pick between. */
const ICO_SIZES = [16, 32, 48, 64, 128, 256]

const toDataUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

async function png(svg, size) {
  const res = new ImageResponse(
    {
      type: 'div',
      props: {
        style: { display: 'flex', width: '100%', height: '100%' },
        children: { type: 'img', props: { src: toDataUri(svg), width: size, height: size } },
      },
    },
    { width: size, height: size },
  )
  return Buffer.from(await res.arrayBuffer())
}

/**
 * Builds the ICO container.
 *
 * Each entry is a PNG rather than the older BMP form — supported since Windows
 * Vista and far smaller, which is what keeps six sizes under 16 kB instead of
 * well over a hundred.
 */
function ico(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // 1 = icon
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + 16 * images.length
  const dir = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // 0 encodes 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2) // palette size
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // colour planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })

  return Buffer.concat([header, ...dir, ...images.map((i) => i.data)])
}

/**
 * The maskable variant: gradient edge to edge and the mark held inside the
 * central 80%. A launcher crops a maskable icon to its own shape, so the normal
 * tile's rounded transparent corners would come back as notches, and anything
 * outside the safe zone can be clipped away entirely.
 */
function maskableSvg(mark) {
  const body = mark
    .replace(/<rect width="512" height="512" rx="112"/, '<rect width="512" height="512"')
    .replace(/<path fill="#ffffff"/, '<g transform="translate(256 256) scale(0.62) translate(-236 -256)"><path fill="#ffffff"')
    .replace(/<\/svg>/, '</g></svg>')
  return body
}

const mark = readFileSync(join(ROOT, 'app', 'icon.svg'), 'utf8')

const images = []
for (const size of ICO_SIZES) {
  images.push({ size, data: await png(mark, size) })
}
const icoFile = ico(images)
writeFileSync(join(ROOT, 'app', 'favicon.ico'), icoFile)
console.log(`app/favicon.ico          ${icoFile.length} bytes, ${images.length} sizes`)

for (const [file, svg, size] of [
  [join(ROOT, 'app', 'apple-icon.png'), mark, 180],
  [join(ROOT, 'public', 'icon-512.png'), mark, 512],
  [join(ROOT, 'public', 'icon-maskable.png'), maskableSvg(mark), 512],
]) {
  const data = await png(svg, size)
  writeFileSync(file, data)
  console.log(`${file.replace(ROOT, '').replace(/\\/g, '/').slice(1).padEnd(25)}${data.length} bytes`)
}

copyFileSync(join(ROOT, 'app', 'icon.svg'), join(ROOT, 'public', 'logo.svg'))
console.log('public/logo.svg          copied from app/icon.svg')
