import { Fragment } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Carousel,
  Heading,
  Prose,
  Section,
  Text,
} from '@the_viveksingh/vivek-ui'

import { JsonLd } from '@/components/json-ld'
import { PROJECTS, getProject, getProjectNeighbours, shotUrl } from '@/data/projects'
import { breadcrumbSchema, creativeWorkSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

/** All six case studies are prerendered at build time. */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

// `params` is a Promise in Next.js 16 — it must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return pageMetadata({
      title: 'Project not found',
      description: 'That case study does not exist.',
      path: `/projects/${slug}`,
    })
  }

  return pageMetadata({
    title: `${project.name} — ${project.outcome}`,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    images: [shotUrl(project.cover.seed, 1200, 630)],
  })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  const { previous, next } = getProjectNeighbours(project.slug)

  return (
    <>
      <JsonLd
        data={[
          creativeWorkSchema(project),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.name, path: `/projects/${project.slug}` },
          ]),
        ]}
      />

      <Section className="df-case-hero" size="xl" padding="lg">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: project.name },
          ]}
        />

        <div style={{ marginBlock: 'var(--vk-space-6)' }}>
          <Heading level={1} className="df-case-title">
            {project.name}
          </Heading>
          <Text size="xl" tone="muted" style={{ marginBlockStart: 'var(--vk-space-4)', maxInlineSize: '46rem' }}>
            {project.tagline}
          </Text>
        </div>

        <div className="df-tags" style={{ marginBlockEnd: 'var(--vk-space-6)' }}>
          {project.tags.map((tag) => (
            <Badge key={tag} variant="soft" tone="primary">
              {tag}
            </Badge>
          ))}
        </div>

        <ButtonGroup label={`${project.name} links`}>
          <Button asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live site
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </ButtonGroup>

        <dl className="df-meta" style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Outcome</dt>
            <dd style={{ color: 'var(--vk-color-primary)' }}>{project.outcome}</dd>
          </div>
        </dl>
      </Section>

      {/* Screenshots. Three slides, so it fits two-up on a laptop and one on a phone. */}
      <Section size="xl" padding="md" aria-label={`${project.name} screenshots`}>
        <Carousel
          slidesPerView={{ base: 1, md: 2 }}
          gap={4}
          showArrows
          showDots
          label={`${project.name} screenshots`}
        >
          {project.shots.map((shot) => (
            <figure key={shot.seed} style={{ margin: 0 }}>
              <div className="df-shot">
                <Image
                  src={shotUrl(shot.seed, 1200, 800)}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
                  {shot.alt}
                </Text>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </Section>

      <Section size="xl" padding="lg">
        {/* Fragments, not wrapper elements: Prose sets its vertical rhythm with a
            direct-child selector, so a <section> around each part would break it. */}
        <Prose size="lg">
          {project.study.map((part) => (
            <Fragment key={part.heading}>
              <h2>{part.heading}</h2>
              {part.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </Fragment>
          ))}
        </Prose>
      </Section>

      <Section size="xl" padding="md" aria-label="Measured results">
        <Heading level={2} size="lg" style={{ marginBlockEnd: 'var(--vk-space-5)' }}>
          What changed
        </Heading>
        <div className="df-metrics">
          {project.metrics.map((metric) => (
            <div className="df-metric" key={metric.label}>
              <p className="df-metric-value">{metric.value}</p>
              <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-2)' }}>
                {metric.label}
              </Text>
            </div>
          ))}
        </div>
      </Section>

      <Section size="xl" padding="lg">
        <nav className="df-pager" aria-label="More case studies">
          {previous ? (
            <Link className="df-pager-link" href={`/projects/${previous.slug}`} data-direction="previous">
              <span className="df-pager-label">Previous</span>
              <span className="df-tile-title">{previous.name}</span>
              <Text size="sm" tone="muted">
                {previous.outcome}
              </Text>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link className="df-pager-link" href={`/projects/${next.slug}`} data-direction="next">
              <span className="df-pager-label">Next</span>
              <span className="df-tile-title">{next.name}</span>
              <Text size="sm" tone="muted">
                {next.outcome}
              </Text>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Section>
    </>
  )
}
