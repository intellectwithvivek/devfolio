import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, EmptyState, Grid, Section, Button } from '@the_viveksingh/vivek-ui'

import { JsonLd } from '@/components/json-ld'
import { ProjectTile } from '@/components/project-tile'
import { PROJECTS } from '@/data/projects'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Six case studies from eight years of full-stack work: payments reconciliation, self-hosted search, product analytics, checkout, zero-downtime migrations and developer documentation.',
  path: '/projects',
})

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
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
