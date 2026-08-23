/**
 * Case studies. Mock data — no backend, no CMS.
 *
 * Covers and screenshots use picsum.photos seeds so the images are stable between
 * builds: a random image per render would make every deploy a visual diff.
 */

export interface CaseStudySection {
  heading: 'Problem' | 'Approach' | 'Result'
  paragraphs: readonly string[]
}

export interface Screenshot {
  seed: string
  alt: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  /** One measurable outcome, shown on the card. Keep it to a handful of words. */
  outcome: string
  year: number
  role: string
  client: string
  tags: readonly string[]
  cover: { seed: string; alt: string }
  shots: readonly Screenshot[]
  study: readonly CaseStudySection[]
  metrics: readonly { label: string; value: string }[]
  liveUrl: string
  repoUrl: string
  /** Featured projects fill the homepage bento grid, in this order. */
  featured: boolean
}

/** A stable picsum URL for a seed. One place, so the dimensions never drift. */
export function shotUrl(seed: string, width = 1200, height = 800) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

export const PROJECTS: readonly Project[] = [
  {
    slug: 'ledgerloop',
    name: 'Ledgerloop',
    tagline: 'Real-time reconciliation for a payments ledger moving ₹40 crore a day.',
    outcome: 'Cut LCP 42%',
    year: 2026,
    role: 'Principal engineer · architecture and front end',
    client: 'Kettle',
    tags: ['Next.js', 'PostgreSQL', 'Kafka', 'ClickHouse'],
    cover: {
      seed: 'ledgerloop-cover',
      alt: 'Reconciliation dashboard showing matched and unmatched payment batches',
    },
    shots: [
      { seed: 'ledgerloop-1', alt: 'Ledgerloop batch view with a filter bar above a table of settlement rows' },
      { seed: 'ledgerloop-2', alt: 'Exception drawer showing the audit trail for a single mismatched payment' },
      { seed: 'ledgerloop-3', alt: 'Reconciliation timeline chart across a 24-hour settlement window' },
    ],
    study: [
      {
        heading: 'Problem',
        paragraphs: [
          'Kettle’s operations team reconciled settlement files by hand every morning. Three analysts, two hours, a spreadsheet each — and a 90-minute window between the bank file landing and the first customer asking where their money was.',
          'The existing dashboard rendered every one of the day’s 180,000 rows into the DOM on load. Largest Contentful Paint sat at 5.8 seconds on the office laptops, and the tab reliably crashed at month end.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'I moved the match itself into the database. A pair of ClickHouse materialised views does the join the browser used to do, and the app fetches a page of already-reconciled rows instead of the raw ledger.',
          'The front end became a React Server Component tree with a single client island: the exception drawer, which is the only part anyone interacts with. Filters live in the URL, so a shared link reproduces exactly what the analyst was looking at — which turned out to matter more than any feature we planned.',
          'Everything streams. The summary bar resolves first, the table streams in beneath it, and the audit trail loads only when a row is opened.',
        ],
      },
      {
        heading: 'Result',
        paragraphs: [
          'LCP fell from 5.8s to 3.4s — a 42% cut — and the month-end crash stopped happening, because the browser never holds more than fifty rows.',
          'Reconciliation is now one analyst for twenty minutes. The other two moved onto dispute handling, which is work that actually needs a human.',
        ],
      },
    ],
    metrics: [
      { label: 'Largest Contentful Paint', value: '5.8s → 3.4s' },
      { label: 'Daily reconciliation effort', value: '6 person-hours → 20 min' },
      { label: 'Rows held in the DOM', value: '180,000 → 50' },
    ],
    liveUrl: 'https://example.com/ledgerloop',
    repoUrl: 'https://github.com/',
    featured: true,
  },
  {
    slug: 'atlas-search',
    name: 'Atlas Search',
    tagline: 'Typo-tolerant catalogue search across 2.1 million SKUs, self-hosted.',
    outcome: 'Search p95 480ms → 71ms',
    year: 2025,
    role: 'Staff engineer · search platform',
    client: 'Northwind Commerce',
    tags: ['Rust', 'PostgreSQL', 'Redis', 'gRPC'],
    cover: {
      seed: 'atlas-cover',
      alt: 'Product search results page with faceted filters down the left side',
    },
    shots: [
      { seed: 'atlas-1', alt: 'Search-as-you-type suggestions with the matched term highlighted' },
      { seed: 'atlas-2', alt: 'Facet panel showing brand, price band and availability counts' },
      { seed: 'atlas-3', alt: 'Relevance tuning console comparing two rankings side by side' },
    ],
    study: [
      {
        heading: 'Problem',
        paragraphs: [
          'Northwind paid a hosted search vendor $9,400 a month and still lost every query with a typo in it. “cordless drll” returned nothing, and the analytics said 6.8% of all searches were spelled wrong.',
          'The vendor’s p95 was 480ms from the edge, but reindexing a price change took eleven minutes — so the site regularly advertised a price the basket disagreed with.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'I built the index in Rust over a trigram-backed Postgres table, with a bounded Levenshtein pass for the typo case and Redis holding the hot query set.',
          'Price and stock stopped going through the index entirely. Those two fields are read from the source of truth at render time and merged into the result, so a price change is visible on the next request rather than the next reindex.',
          'Relevance became a tuning console rather than a config file. Merchandisers compare two rankings side by side and promote one, which removed engineering from a loop it was never adding anything to.',
        ],
      },
      {
        heading: 'Result',
        paragraphs: [
          'p95 latency landed at 71ms — 6.8× faster — and typo queries now convert at 91% of the rate of correctly-spelled ones, up from zero.',
          'The hosted contract was not renewed. Self-hosting costs about $340 a month in compute.',
        ],
      },
    ],
    metrics: [
      { label: 'p95 search latency', value: '480ms → 71ms' },
      { label: 'Search spend', value: '$9,400/mo → $340/mo' },
      { label: 'Price staleness', value: '11 min → next request' },
    ],
    liveUrl: 'https://example.com/atlas-search',
    repoUrl: 'https://github.com/',
    featured: true,
  },
  {
    slug: 'pulse-analytics',
    name: 'Pulse',
    tagline: 'Self-hosted product analytics that swallows 40 million events a day on three nodes.',
    outcome: '40M events/day on 3 nodes',
    year: 2025,
    role: 'Creator · open source',
    client: 'Open source',
    tags: ['Go', 'ClickHouse', 'Next.js', 'OpenTelemetry'],
    cover: {
      seed: 'pulse-cover',
      alt: 'Analytics dashboard with a conversion funnel beside a retention grid',
    },
    shots: [
      { seed: 'pulse-1', alt: 'Live event stream with new rows arriving at the top' },
      { seed: 'pulse-2', alt: 'Funnel builder with four steps and a drop-off percentage on each' },
      { seed: 'pulse-3', alt: 'Retention cohort grid shaded by week-over-week return rate' },
    ],
    study: [
      {
        heading: 'Problem',
        paragraphs: [
          'Every team I worked with wanted product analytics, and none of them could send customer behaviour to a US-hosted SaaS without a data protection review that took a quarter.',
          'The self-hosted options all assumed a Kubernetes cluster and a full-time operator. That is a fair assumption at five hundred engineers and an absurd one at twelve.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'Pulse is one Go binary, one ClickHouse instance and a Next.js console. It runs under Docker Compose on a single box, and scales by adding two more of the same box.',
          'Ingestion is append-only and batched at 200ms. The client SDK is 2.4kB, sends over sendBeacon, and never blocks navigation — the thing analytics scripts are most often guilty of.',
          'Queries hit pre-aggregated materialised views for the common shapes (funnel, retention, breakdown) and fall through to raw scans only for arbitrary ones, which is what keeps three nodes enough.',
        ],
      },
      {
        heading: 'Result',
        paragraphs: [
          'A three-node deployment sustains 40 million events a day with p99 query times under 900ms across a 90-day window.',
          'It has 6,200 GitHub stars and around 128,000 npm downloads a week for the client SDK. Eleven people other than me have commit access.',
        ],
      },
    ],
    metrics: [
      { label: 'Sustained throughput', value: '40M events/day' },
      { label: 'Client SDK size', value: '2.4 kB gzipped' },
      { label: 'p99 query, 90-day window', value: 'under 900ms' },
    ],
    liveUrl: 'https://example.com/pulse',
    repoUrl: 'https://github.com/',
    featured: true,
  },
  {
    slug: 'northwind-checkout',
    name: 'Northwind Checkout',
    tagline: 'A checkout rebuild that stopped losing one basket in five at the payment step.',
    outcome: 'Conversion up 18.4%',
    year: 2024,
    role: 'Staff engineer · lead',
    client: 'Northwind Commerce',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Playwright'],
    cover: {
      seed: 'checkout-cover',
      alt: 'Three-step checkout with an order summary pinned to the right',
    },
    shots: [
      { seed: 'checkout-1', alt: 'Address step with inline validation on the postcode field' },
      { seed: 'checkout-2', alt: 'Payment step showing saved cards and a wallet option' },
      { seed: 'checkout-3', alt: 'Order confirmation with a delivery estimate and a tracking link' },
    ],
    study: [
      {
        heading: 'Problem',
        paragraphs: [
          '21% of baskets that reached the payment step never completed. Session replays showed the same thing over and over: a card declined for a reason the page never explained, and a customer who left rather than guess.',
          'Worse, a retry after a network timeout occasionally charged twice. It had happened 43 times in a year, and each one cost a refund, a support ticket and a chargeback risk.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'Every write in the flow got an idempotency key derived from the basket, so a retry is provably the same request. That closed the double-charge on its own.',
          'Decline codes stopped being swallowed. Each one maps to a sentence a human wrote — “your bank asked for verification; try again and approve it in your banking app” — and the page keeps the entered card, so a retry is one tap.',
          'The whole flow is three server-rendered steps with the summary as the only shared state. No client-side router, no optimistic anything. A checkout is the wrong place to be clever.',
        ],
      },
      {
        heading: 'Result',
        paragraphs: [
          'Completed checkouts rose 18.4% within six weeks and held through the following quarter.',
          'Zero double charges since launch, across 2.4 million orders. The support queue for payment issues shrank by roughly two thirds.',
        ],
      },
    ],
    metrics: [
      { label: 'Checkout conversion', value: '+18.4%' },
      { label: 'Double charges', value: '43/yr → 0' },
      { label: 'Payment support tickets', value: 'down 64%' },
    ],
    liveUrl: 'https://example.com/northwind-checkout',
    repoUrl: 'https://github.com/',
    featured: true,
  },
  {
    slug: 'warp-migrate',
    name: 'Warp Migrate',
    tagline: 'A CLI that moves a live Postgres table to a new schema without a maintenance window.',
    outcome: '1.2M rows, zero downtime',
    year: 2023,
    role: 'Creator · open source',
    client: 'Open source',
    tags: ['Rust', 'PostgreSQL', 'CLI'],
    cover: {
      seed: 'warp-cover',
      alt: 'Terminal running a migration with a progress bar and a live row counter',
    },
    shots: [
      { seed: 'warp-1', alt: 'Dry-run output listing every statement the migration will execute' },
      { seed: 'warp-2', alt: 'Live backfill progress showing rows per second and an estimated finish' },
      { seed: 'warp-3', alt: 'Cutover prompt showing replication lag between shadow table and source' },
    ],
    study: [
      {
        heading: 'Problem',
        paragraphs: [
          'Adding a NOT NULL column to a 1.2 million row table locked writes for four minutes on the primary. The team’s answer was a Sunday 2am maintenance window, roughly monthly.',
          'The existing zero-downtime tools were written for MySQL, or assumed you could install an extension the managed database would not let you install.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'Warp creates a shadow table with the target schema, backfills it in bounded batches that yield between chunks, and keeps it current with triggers on the source.',
          'Cutover is a single transaction that renames both tables, and it refuses to run while replication lag is above a threshold you set. If anything is wrong it does nothing, loudly.',
          'Every run starts with a dry run that prints the exact statements. No migration tool earns trust by being clever about what it is about to do.',
        ],
      },
      {
        heading: 'Result',
        paragraphs: [
          'The Sunday windows stopped. Migrations now run on a Tuesday afternoon while the site takes traffic, with peak write latency up six milliseconds during the backfill.',
          'Around 900 stars and a steady trickle of issues from people running it against managed Postgres, which is exactly who it was for.',
        ],
      },
    ],
    metrics: [
      { label: 'Write lock during migration', value: '4 min → 0' },
      { label: 'Peak latency cost', value: '+6ms while backfilling' },
      { label: 'Maintenance windows', value: '12/yr → 0' },
    ],
    liveUrl: 'https://example.com/warp-migrate',
    repoUrl: 'https://github.com/',
    featured: true,
  },
  {
    slug: 'meridian-docs',
    name: 'Meridian Docs',
    tagline: 'A documentation platform where every code sample is executed on every deploy.',
    outcome: 'Support tickets down 31%',
    year: 2022,
    role: 'Senior engineer · platform',
    client: 'Pulseboard',
    tags: ['Next.js', 'MDX', 'Playwright', 'AWS'],
    cover: {
      seed: 'meridian-cover',
      alt: 'Documentation page with a sidebar, a prose column and a code sample',
    },
    shots: [
      { seed: 'meridian-1', alt: 'API reference page generated from the OpenAPI schema' },
      { seed: 'meridian-2', alt: 'Runnable code sample with a language switcher above it' },
      { seed: 'meridian-3', alt: 'Search overlay listing matches grouped by documentation section' },
    ],
    study: [
      {
        heading: 'Problem',
        paragraphs: [
          'Pulseboard’s docs had 340 code samples and no way to know which ones still worked. Support answered the same four questions every week, all of them caused by a snippet that had drifted from the API.',
          'The docs were also a separate deploy from the product, so a breaking change shipped on Monday and the documentation caught up on Thursday.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'Every fenced code block in the MDX is extracted at build time and executed against a live sandbox tenant. A sample that throws fails the build, so a broken snippet cannot reach the site.',
          'The API reference is generated from the same OpenAPI schema the server validates against, which means it cannot describe an endpoint that does not exist.',
          'Docs moved into the product repo. A pull request that changes an endpoint and does not change its documentation gets a failing check.',
        ],
      },
      {
        heading: 'Result',
        paragraphs: [
          'Documentation-caused support tickets fell 31% in the first quarter and stayed down.',
          'Nineteen broken samples were found by the very first build. Nobody had known.',
        ],
      },
    ],
    metrics: [
      { label: 'Docs-caused support tickets', value: 'down 31%' },
      { label: 'Broken samples found', value: '19, on the first build' },
      { label: 'Docs lag behind the API', value: '3 days → 0' },
    ],
    liveUrl: 'https://example.com/meridian-docs',
    repoUrl: 'https://github.com/',
    featured: true,
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

/** Previous and next in catalogue order, for the pager at the foot of a case study. */
export function getProjectNeighbours(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return {
    previous: i > 0 ? PROJECTS[i - 1] : undefined,
    next: i >= 0 && i < PROJECTS.length - 1 ? PROJECTS[i + 1] : undefined,
  }
}
