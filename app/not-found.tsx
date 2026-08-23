import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, EmptyState, Section } from '@the_viveksingh/vivek-ui'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Section size="md" padding="xl" align="center">
      <EmptyState
        size="lg"
        headingLevel={1}
        icon={<span aria-hidden="true">404</span>}
        title="That page does not exist"
        description="The link may be out of date, or the case study may have been renamed. Everything published is on the projects index."
        actions={
          <>
            <Button asChild>
              <Link href="/projects">Browse the projects</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back home</Link>
            </Button>
          </>
        }
      />
    </Section>
  )
}
