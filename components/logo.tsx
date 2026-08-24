/**
 * The DevFolio mark.
 *
 * The same geometry as `app/icon.svg`, inlined so it paints with the page
 * rather than costing a request, and so it stays sharp at any size.
 *
 * The `id` prop is required rather than generated: the mark appears twice per
 * page (navbar and footer) and each copy needs its own gradient ids. Generating
 * them would mean `useId`, which is a hook, which would drag this into a client
 * component for the sake of two strings. Duplicate ids in one document are
 * invalid HTML, and browsers resolve `url(#…)` to whichever came first — so a
 * later restyle of one instance would silently change both.
 *
 * The letterform is drawn, not set from a font: at 16px a real glyph's thin
 * joins disappear, and the counter fills in.
 */
export function Logo({
  id,
  size = '1.5em',
  className,
}: {
  /** Unique per instance on the page, e.g. "nav" or "footer". */
  id: string
  size?: string | number
  className?: string
}) {
  const tile = `df-logo-tile-${id}`
  const rule = `df-logo-rule-${id}`

  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="DevFolio"
      focusable="false"
    >
      <defs>
        <linearGradient id={tile} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id={rule} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f5f3ff" />
          <stop offset="1" stopColor="#f0abfc" />
        </linearGradient>
      </defs>

      <rect width="512" height="512" rx="112" fill={`url(#${tile})`} />

      <path
        fill="#ffffff"
        fillRule="evenodd"
        d="M128 112 H240 C297 112 344 162 344 224 C344 286 297 336 240 336 H128 Z M184 164 V284 H240 C268 284 290 258 290 224 C290 190 268 164 240 164 Z"
      />

      {/* The signature accent rule, the same stroke that draws under the headline. */}
      <rect x="128" y="372" width="216" height="28" rx="14" fill={`url(#${rule})`} />
    </svg>
  )
}
