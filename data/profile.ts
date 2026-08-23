/** The person this template is a portfolio for. Swap every field for your own. */

export interface SocialLink {
  label: string
  href: string
  handle: string
}

export const PROFILE = {
  name: 'Arjun Mehta',
  firstName: 'Arjun',
  role: 'Full-stack engineer',
  /** Two lines, shown under the hero headline. */
  positioning: [
    'I build the unglamorous half of products: the checkout that never double-charges, the search that answers in 70ms, the migration that runs on a Tuesday afternoon.',
    'Eight years across fintech and commerce infrastructure — currently principal engineer at Kettle, in Bengaluru.',
  ],
  location: 'Bengaluru, India',
  timezone: 'IST · UTC+5:30',
  email: 'arjun@devfolio.example',
  avatar: 'https://i.pravatar.cc/320?img=68',
  avatarAlt: 'Arjun Mehta, smiling, in front of a plain wall',
  available: 'Taking on two contracts for Q4 2026',
  socials: [
    { label: 'GitHub', href: 'https://github.com/', handle: '@arjunmehta' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', handle: 'in/arjunmehta' },
    { label: 'X', href: 'https://x.com/', handle: '@arjun_builds' },
  ] satisfies SocialLink[],
} as const

/** The tech-stack marquee on the homepage. Text only — no brand logos, on purpose. */
export const STACK: readonly string[] = [
  'TypeScript',
  'Next.js',
  'React',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'AWS',
  'Docker',
  'Terraform',
  'Kafka',
  'GraphQL',
  'Playwright',
  'ClickHouse',
  'Rust',
  'gRPC',
  'OpenTelemetry',
]

/** Grouped skills for /about. */
export interface SkillGroup {
  id: string
  title: string
  note: string
  skills: readonly string[]
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'product',
    title: 'Product engineering',
    note: 'What I reach for when the work is user-facing.',
    skills: ['TypeScript', 'React 19', 'Next.js App Router', 'React Server Components', 'CSS architecture', 'Web performance', 'WCAG 2.2 AA'],
  },
  {
    id: 'backend',
    title: 'Backend & data',
    note: 'Where most of the eight years actually went.',
    skills: ['Node.js', 'Go', 'PostgreSQL', 'ClickHouse', 'Redis', 'Kafka', 'gRPC', 'Event sourcing', 'Idempotency design'],
  },
  {
    id: 'platform',
    title: 'Platform & delivery',
    note: 'Shipping it, and keeping it up at 3am.',
    skills: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'OpenTelemetry', 'Grafana', 'Progressive rollouts'],
  },
  {
    id: 'practice',
    title: 'How I work',
    note: 'The parts that are not a technology.',
    skills: ['Incident review', 'Technical writing', 'Interface design', 'Mentoring', 'Migration planning'],
  },
]
