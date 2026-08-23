import { Section, Skeleton } from '@the_viveksingh/vivek-ui'

/** Shown while a case study streams in. */
export default function ProjectLoading() {
  return (
    <Section size="lg" padding="lg" aria-busy="true" aria-label="Loading case study">
      <Skeleton variant="text" width="16rem" />
      <Skeleton variant="text" width="min(34rem, 100%)" height="3rem" style={{ marginBlock: 'var(--vk-space-6)' }} />
      <Skeleton variant="text" lines={2} width="min(42rem, 100%)" />
      <Skeleton variant="rect" height="18rem" style={{ marginBlockStart: 'var(--vk-space-8)' }} />
      <Skeleton variant="text" lines={5} style={{ marginBlockStart: 'var(--vk-space-8)' }} />
    </Section>
  )
}
