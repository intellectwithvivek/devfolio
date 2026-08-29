import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  AnimatedCounter,
  Avatar,
  Badge,
  BentoGrid,
  Button,
  CTA,
  FAQ,
  Hero,
  Marquee,
  Section,
  Stack,
  Stats,
  Testimonials,
  Text,
  Timeline,
} from '@the_viveksingh/vivek-ui'
import { Sparkline } from '@the_viveksingh/vivek-ui/charts'

import { JsonLd } from '@/components/json-ld'
import { ProjectTile } from '@/components/project-tile'
import { ResumeButton } from '@/components/resume-button'
import { EXPERIENCE } from '@/data/experience'
import { FAQS } from '@/data/faq'
import { HEADLINE_STATS, OSS_WEEKLY_DOWNLOADS } from '@/data/oss'
import { PROFILE, STACK } from '@/data/profile'
import { FEATURED_PROJECTS } from '@/data/projects'
import { TESTIMONIALS } from '@/data/testimonials'
import { ROUTE_UPDATED } from '@/data/content-dates'
import { homeGraph } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Free Next.js Portfolio Template — DevFolio (VivekUI, Open Source)'
const DESCRIPTION =
  'Free, open-source Next.js 16 portfolio template. Dark mode, charts, SEO and JSON-LD built in. MIT licensed — clone it, change the data, deploy in one click.'

export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: '/',
    modifiedTime: ROUTE_UPDATED['/'],
    keywords: [
      'free nextjs portfolio template',
      'nextjs portfolio template',
      'react portfolio template',
      'open source portfolio template',
      'developer portfolio template',
      'nextjs 16 template',
    ],
  }),
  // The homepage keeps its own full title rather than the `%s — name` template.
  title: { absolute: TITLE },
}

/** How the six featured projects are laid out in the bento at desktop width. */
const TILE_LAYOUT = [
  { colSpan: { base: 1, sm: 2, lg: 4 }, rowSpan: { lg: 2 }, layout: 'feature' as const },
  { colSpan: { base: 1, sm: 2, lg: 2 }, rowSpan: { lg: 2 }, layout: 'tall' as const },
  { colSpan: { base: 1, sm: 1, lg: 2 }, layout: 'standard' as const },
  { colSpan: { base: 1, sm: 1, lg: 2 }, layout: 'standard' as const },
  { colSpan: { base: 1, sm: 2, lg: 2 }, layout: 'standard' as const },
  { colSpan: { base: 1, sm: 2, lg: 6 }, layout: 'wide' as const },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeGraph({ title: TITLE, description: DESCRIPTION, faqs: FAQS, updated: ROUTE_UPDATED['/'] })} />

      {/* 2 — Hero. The one loud gesture on the site lives in this h1. */}
      <Hero
        className="df-hero"
        layout="split"
        size="xl"
        eyebrow={<p className="df-availability">{PROFILE.available}</p>}
        title={
          <span className="df-display">
            {PROFILE.name} builds software that <span className="df-mark">must not break</span>.
          </span>
        }
        description={
          <div className="df-hero-lede">
            {PROFILE.positioning.map((line) => (
              <Text key={line.slice(0, 24)} size="lg" tone="muted" style={{ marginBlockEnd: 'var(--vk-space-3)' }}>
                {line}
              </Text>
            ))}
          </div>
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/projects">View projects</Link>
            </Button>
            <ResumeButton />
          </>
        }
        media={
          <Stack gap={4} align="start">
            <div className="df-portrait">
              <Image
                src={PROFILE.avatar}
                alt={PROFILE.avatarAlt}
                fill
                sizes="(max-width: 900px) 62vw, 19rem"
                priority
              />
            </div>

            {/* Three references, faces first — the group is decorative, the count is not. */}
            <Stack direction="horizontal" gap={3} align="center">
              <Avatar.Group spacing="md">
                {TESTIMONIALS.map((person) => (
                  <Avatar key={person.id} src={person.avatar} name={person.author} size="sm" />
                ))}
              </Avatar.Group>
              <Text as="span" size="sm" tone="muted">
                {TESTIMONIALS.length} references, further down
              </Text>
            </Stack>
          </Stack>
        }
      />

      {/* 3 — Tech stack ticker. Text only: no brand logos, nothing to license. */}
      <div className="df-marquee">
        <h2 className="df-visually-hidden">Technologies I work with</h2>
        <Marquee gradient gradientWidth="6rem" pauseOnHover speed={0.6} gap={4}>
          {STACK.map((tech) => (
            <Badge key={tech} variant="outline" size="md" className="df-marquee-item">
              {tech}
            </Badge>
          ))}
        </Marquee>
      </div>

      {/* 4 — Headline figures, with the twelve-week download trend under one of them. */}
      <Stats
        className="df-stats"
        size="xl"
        eyebrow={<p className="df-eyebrow">Signals</p>}
        title="Track record"
        columns={{ base: 1, sm: 2, lg: 4 }}
        items={HEADLINE_STATS.map((stat) => ({
          id: stat.id,
          label: stat.label,
          description: stat.description,
          value: (
            <>
              <AnimatedCounter
                value={stat.value}
                locale="en-US"
                format={stat.compact ? { notation: 'compact', maximumFractionDigits: 1 } : undefined}
              />
              {stat.id === 'downloads' ? (
                <Sparkline
                  className="df-spark"
                  data={OSS_WEEKLY_DOWNLOADS}
                  height={30}
                  width={150}
                  curve="smooth"
                  fill
                  showLastPoint
                  title="Weekly npm downloads over the last twelve weeks"
                  description="Rising from 71,400 to 128,400 weekly downloads across twelve weeks."
                  xLabel="Week"
                  yLabel="Downloads"
                  formatValue={(value) => value.toLocaleString('en-US')}
                />
              ) : null}
            </>
          ),
        }))}
      />

      {/* 5 — Featured work. */}
      <Section size="xl">
        <Section.Header
          eyebrow={<p className="df-eyebrow">Selected work</p>}
          title="Six projects, each with a number attached"
          description="Every case study below states what changed and by how much. If a project did not move a number, it is not on this page."
        />
        <BentoGrid cols={{ base: 1, sm: 2, lg: 6 }} gap={4} rowHeight="11rem">
          {FEATURED_PROJECTS.map((project, index) => {
            const tile = TILE_LAYOUT[index] ?? TILE_LAYOUT[TILE_LAYOUT.length - 1]
            return (
              <BentoGrid.Item key={project.slug} colSpan={tile.colSpan} rowSpan={tile.rowSpan}>
                <ProjectTile project={project} layout={tile.layout} priority={index === 0} />
              </BentoGrid.Item>
            )
          })}
        </BentoGrid>
        <div style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          <Button asChild variant="outline">
            <Link href="/projects">All projects</Link>
          </Button>
        </div>
      </Section>

      {/* 6 — Work history, most recent first. */}
      <Section background="muted" size="xl">
        <Section.Header
          eyebrow={<p className="df-eyebrow">Experience</p>}
          title="Eight years, four teams"
          description="Fintech and commerce infrastructure, mostly. The through-line is systems where being wrong costs money."
        />
        <Timeline>
          {EXPERIENCE.map((job) => (
            <Timeline.Item
              key={job.id}
              status={job.status}
              timestamp={job.period}
              title={
                <>
                  {job.role} · <span style={{ color: 'var(--vk-color-primary)' }}>{job.org}</span>
                </>
              }
              description={
                <>
                  <Text tone="muted">{job.summary}</Text>
                  <ul style={{ marginBlockStart: 'var(--vk-space-3)', paddingInlineStart: '1.1rem' }}>
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>
                        <Text as="span" size="sm" tone="muted">
                          {highlight}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </>
              }
            />
          ))}
        </Timeline>
      </Section>

      {/* 7 — Quotes, questions, ask. */}
      <Testimonials
        size="xl"
        columns={{ base: 1, md: 3 }}
        eyebrow={<p className="df-eyebrow">References</p>}
        title="What people say afterwards"
        items={TESTIMONIALS.map((t) => ({
          id: t.id,
          quote: t.quote,
          author: t.author,
          role: t.role,
          avatar: t.avatar,
        }))}
      />

      <FAQ
        size="xl"
        background="muted"
        name="devfolio-faq"
        defaultOpenIndex={0}
        eyebrow={<p className="df-eyebrow">About this template</p>}
        title="Questions about DevFolio"
        description="DevFolio is free and open source. Here is what people ask before cloning it."
        items={FAQS.map((entry) => ({ id: entry.id, question: entry.question, answer: entry.answer }))}
      />

      <CTA
        size="xl"
        background="primary"
        title="Have a project in mind?"
        description="Tell me what you are building and what is going wrong. I reply to everything within two working days."
        actions={
          <>
            <Button asChild size="lg" variant="solid">
              <Link href="/contact">Start a conversation</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/built-with">See how this site is built</Link>
            </Button>
          </>
        }
      />
    </>
  )
}
