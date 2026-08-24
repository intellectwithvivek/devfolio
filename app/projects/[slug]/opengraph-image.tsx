import { PROJECTS, getProject } from '@/data/projects'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

/**
 * Without this the route is server-rendered on demand, so the first person to
 * share a case study waits on a cold render — and a crawler that times out
 * simply reports no image. Six cards is a trivial build cost.
 */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

/**
 * A per-case-study share card carrying the project name and the number it
 * moved — the outcome is the reason anyone clicks, so it goes on the card.
 */
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'DevFolio case study'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return renderOgImage({ eyebrow: 'Case study', title: 'Project not found' })
  }

  return renderOgImage({
    eyebrow: `${project.client} · ${project.year}`,
    title: project.name,
    subtitle: project.tagline,
    badge: project.outcome,
  })
}
