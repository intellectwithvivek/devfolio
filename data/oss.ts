/**
 * Headline figures and the twelve-week download trend under them.
 *
 * The sparkline array is the last twelve weeks of npm downloads for the Pulse
 * client SDK, oldest first — a real series has a dip in it, so this one does too.
 */

export const OSS_WEEKLY_DOWNLOADS: readonly number[] = [
  71_400, 74_900, 78_200, 76_100, 82_600, 88_300, 91_700, 97_400, 103_900, 109_600, 118_200, 128_400,
]

export interface HeadlineStat {
  id: string
  label: string
  value: number
  /** Rendered after the counted number, e.g. the "+" in "47+". */
  suffix?: string
  /** Rendered before it. */
  prefix?: string
  description: string
  /** Formatted with a thousands separator when the raw number is large. */
  compact?: boolean
}

export const HEADLINE_STATS: readonly HeadlineStat[] = [
  {
    id: 'years',
    label: 'Years shipping',
    value: 8,
    description: 'Since 2018, across fintech and commerce.',
  },
  {
    id: 'projects',
    label: 'Projects shipped',
    value: 47,
    description: 'Counted at launch, not at kickoff.',
  },
  {
    id: 'downloads',
    label: 'OSS weekly downloads',
    value: 128_400,
    compact: true,
    description: 'Pulse client SDK, last full week.',
  },
  {
    id: 'stars',
    label: 'GitHub stars',
    value: 6_200,
    compact: true,
    description: 'Across Pulse, Warp Migrate and eleven smaller repos.',
  },
]

/** Projects shipped per calendar year, for the /about bar chart. */
export const PROJECTS_PER_YEAR: readonly { x: string; y: number }[] = [
  { x: '2019', y: 4 },
  { x: '2020', y: 6 },
  { x: '2021', y: 5 },
  { x: '2022', y: 7 },
  { x: '2023', y: 6 },
  { x: '2024', y: 8 },
  { x: '2025', y: 7 },
  { x: '2026', y: 4 },
]

/** The one-line takeaway printed under the chart. */
export const PROJECTS_PER_YEAR_TAKEAWAY =
  'The count peaked in 2024 and has fallen since on purpose: fewer projects, each one bigger and owned for longer. 2026 covers January to August.'
