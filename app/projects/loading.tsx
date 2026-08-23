import { Grid, Section, Skeleton } from '@the_viveksingh/vivek-ui'

/** Shown while the projects index streams in. Mirrors the real grid's shape. */
export default function ProjectsLoading() {
  return (
    <Section size="xl" padding="lg" aria-busy="true" aria-label="Loading projects">
      <Skeleton variant="text" width="12rem" />
      <Skeleton variant="text" width="min(30rem, 100%)" height="2.5rem" style={{ marginBlock: 'var(--vk-space-6)' }} />

      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ display: 'grid', gap: 'var(--vk-space-3)' }}>
            <Skeleton variant="rect" height="12rem" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" lines={2} />
          </div>
        ))}
      </Grid>
    </Section>
  )
}
