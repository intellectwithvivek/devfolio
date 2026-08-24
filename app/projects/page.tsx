import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, EmptyState, Grid, Section, Button } from '@the_viveksingh/vivek-ui'

import { JsonLd } from '@/components/json-ld'
import { ProjectTile } from '@/components/project-tile'
import { PROJECTS } from '@/data/projects'
import { ROUTE_UPDATED } from '@/data/content-dates'
import { projectsIndexGraph } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Projects'
const DESCRIPTION =
  'Six engineering case studies, each with the number it moved — payments reconciliation, self-hosted search, analytics, checkout and zero-downtime migrations.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/projects',
  modifiedTime: ROUTE_UPDATED['/projects'],
})

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={projectsIndexGraph({ title: TITLE, description: DESCRIPTION, updated: ROUTE_UPDATED['/projects'] })}
      />

      <Section size="xl" padding="lg">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects' },
          ]}
        />

        <Section.Header
          eyebrow={<p className="df-eyebrow">Case studies</p>}
          headingLevel={1}
          titleSize="2xl"
          title="Everything worth writing up"
          description="Ordered newest first. Each one states the problem, what I did about it, and the number that moved."
        />

        {PROJECTS.length === 0 ? (
          <EmptyState
            title="No case studies yet"
            description="Add your projects to /data/projects.ts and they will appear here."
            actions={
              <Button asChild variant="outline">
                <Link href="/contact">Get in touch instead</Link>
              </Button>
            }
          />
        ) : (
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
            {PROJECTS.map((project, index) => (
              <ProjectTile key={project.slug} project={project} priority={index === 0} headingLevel={3} />
            ))}
          </Grid>
        )}
      </Section>
    </>
  )
}
