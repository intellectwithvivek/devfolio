import Image from 'next/image'
import Link from 'next/link'
import { Badge, Card, Heading, Text } from '@the_viveksingh/vivek-ui'

import { type Project, shotUrl } from '@/data/projects'

type TileLayout = 'feature' | 'tall' | 'standard' | 'wide'

/**
 * One project, as a tile.
 *
 * The whole card is clickable, but only the title is a real `<a>` — a stretched
 * pseudo-element covers the card instead. A card wrapped in an anchor would put
 * the tags, the outcome and the image inside the link's accessible name.
 */
export function ProjectTile({
  project,
  layout = 'standard',
  priority = false,
  headingLevel = 3,
}: {
  project: Project
  layout?: TileLayout
  /** Set on the first tile only: it is the largest image above the fold. */
  priority?: boolean
  headingLevel?: 2 | 3 | 4
}) {
  const ratio = layout === 'tall' ? '4 / 3' : layout === 'wide' ? undefined : '16 / 9'
  const sizes =
    layout === 'feature'
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw'
      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return (
    <Card variant="outline" padding="none" className="df-tile" data-layout={layout}>
      <div className="df-tile-media" style={ratio ? { aspectRatio: ratio } : undefined}>
        <Image
          src={shotUrl(project.cover.seed, 1200, 800)}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
        />
      </div>

      <div className="df-tile-body">
        <Text as="span" size="sm" tone="muted" className="df-mono">
          {project.client} · {project.year}
        </Text>

        <Heading level={headingLevel} size={layout === 'feature' ? 'xl' : 'lg'} className="df-tile-title">
          <Link href={`/projects/${project.slug}`} className="df-tile-link df-stretch">
            {project.name}
          </Link>
        </Heading>

        <Text tone="muted" lineClamp={layout === 'standard' ? 3 : 4}>
          {project.tagline}
        </Text>

        <p className="df-outcome">{project.outcome}</p>

        <div className="df-tags">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}
