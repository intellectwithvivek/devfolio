import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge, Breadcrumb, Button, Heading, Prose, Section, Text, Timeline } from '@the_viveksingh/vivek-ui'
import { BarChart } from '@the_viveksingh/vivek-ui/charts'

import { JsonLd } from '@/components/json-ld'
import { EDUCATION } from '@/data/experience'
import { PROJECTS_PER_YEAR, PROJECTS_PER_YEAR_TAKEAWAY } from '@/data/oss'
import { PROFILE, SKILL_GROUPS } from '@/data/profile'
import { ROUTE_UPDATED } from '@/data/content-dates'
import { aboutGraph } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'About'
const DESCRIPTION =
  'Full-stack engineer in Bengaluru, eight years across fintech and commerce infrastructure. Skills, education, and projects shipped per year since 2019.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/about',
  type: 'profile',
  modifiedTime: ROUTE_UPDATED['/about'],
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutGraph({ title: TITLE, description: DESCRIPTION, updated: ROUTE_UPDATED['/about'] })} />

      <Section size="xl" padding="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        <Heading level={1} className="df-case-title" style={{ marginBlock: 'var(--vk-space-6)' }}>
          About {PROFILE.firstName}
        </Heading>

        <Prose size="lg">
          <p>
            I am a full-stack engineer in {PROFILE.location}, eight years in, currently principal engineer at
            Kettle. I work on payments and commerce infrastructure — the systems where being wrong is not a
            visual bug, it is somebody&rsquo;s money.
          </p>
          <p>
            I started at an agency, which is the best training there is for finishing things. Eleven products
            in two years teaches you to scope honestly, because you are the one who has to ship the estimate you
            gave. After that I spent four years on developer tooling and commerce, and the last two on a ledger.
          </p>
          <p>
            The work I am proudest of tends to look like subtraction. Ledgerloop removed four hours a day of
            spreadsheet reconciliation. Atlas Search removed a $9,400 monthly invoice. Warp Migrate removed
            twelve maintenance windows a year. None of it demos well; all of it holds.
          </p>
          <p>
            Outside work I maintain two open-source projects, and I am slowly learning to make a decent dosa.
            The dosa is going worse than the projects.
          </p>
        </Prose>
      </Section>

      {/* Skills, grouped. Badges rather than a rating out of five, which nobody believes. */}
      <Section size="xl" padding="lg" background="muted">
        <Section.Header
          eyebrow={<p className="df-eyebrow">Skills</p>}
          title="What I actually reach for"
          description="Grouped by the kind of problem rather than by language, because that is how the choice gets made."
        />

        {SKILL_GROUPS.map((group) => (
          <div className="df-skill-group" key={group.id}>
            <div>
              <Heading level={3} size="md">
                {group.title}
              </Heading>
              <Text size="sm" tone="muted">
                {group.note}
              </Text>
            </div>
            <div className="df-tags">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* The required chart section. */}
      <Section size="xl" padding="lg">
        <Section.Header
          eyebrow={<p className="df-eyebrow">Output</p>}
          title="By the numbers"
          description="Projects shipped per calendar year, counted at launch rather than at kickoff."
        />

        <div className="df-chart-card">
          <BarChart
            data={PROJECTS_PER_YEAR}
            height={300}
            showGrid
            showAxes
            showValues
            barRadius={6}
            categoryPadding={0.32}
            title="Projects shipped per year, 2019 to 2026"
            description="A bar chart of completed projects per calendar year, peaking at eight in 2024."
            xLabel="Year"
            yLabel="Projects shipped"
          />
        </div>

        <Text tone="muted" style={{ marginBlockStart: 'var(--vk-space-4)', maxInlineSize: '46rem' }}>
          {PROJECTS_PER_YEAR_TAKEAWAY}
        </Text>
      </Section>

      <Section size="xl" padding="lg" background="muted">
        <Section.Header
          eyebrow={<p className="df-eyebrow">Education</p>}
          title="Where the foundations came from"
        />
        <Timeline>
          {EDUCATION.map((entry) => (
            <Timeline.Item
              key={entry.id}
              status={entry.status}
              timestamp={entry.period}
              title={
                <>
                  {entry.role} · <span style={{ color: 'var(--vk-color-primary)' }}>{entry.org}</span>
                </>
              }
              description={<Text tone="muted">{entry.summary}</Text>}
            />
          ))}
        </Timeline>
      </Section>

      <Section size="xl" padding="lg">
        <Heading level={2} size="lg">
          Want the short version?
        </Heading>
        <Text tone="muted" style={{ marginBlock: 'var(--vk-space-3) var(--vk-space-6)', maxInlineSize: '44rem' }}>
          Read a case study, or tell me about your project and I will tell you honestly whether I am the right
          person for it.
        </Text>
        <div className="df-tags">
          <Button asChild>
            <Link href="/projects">Read the case studies</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
