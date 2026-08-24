import type { Metadata } from 'next'
import { Badge, Breadcrumb, Button, Code, CopyButton, Heading, Section, Stack, Table, Text } from '@the_viveksingh/vivek-ui'

import { JsonLd } from '@/components/json-ld'
import { COMPONENTS_USED } from '@/data/components-used'
import { INSTALL_COMMAND, LINKS, REPO_LABEL, SITE, componentDocs, vivekui } from '@/data/site'
import { ROUTE_UPDATED } from '@/data/content-dates'
import { builtWithGraph } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Built with VivekUI'
const DESCRIPTION =
  'Every section of this free Next.js portfolio template mapped to the VivekUI component behind it — 38 components, 2 SVG charts, zero runtime dependencies.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/built-with',
  modifiedTime: ROUTE_UPDATED['/built-with'],
  keywords: [
    'free nextjs portfolio template',
    'react component library',
    'VivekUI',
    'zero dependency react components',
    'tailwind alternative',
  ],
})

export default function BuiltWithPage() {
  const chartCount = COMPONENTS_USED.filter((c) => c.group === 'charts').length

  return (
    <>
      <JsonLd
        data={builtWithGraph({ title: TITLE, description: DESCRIPTION, updated: ROUTE_UPDATED['/built-with'] })}
      />

      <Section size="xl" padding="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Built with' }]} />

        <Heading level={1} className="df-case-title" style={{ marginBlock: 'var(--vk-space-6)' }}>
          Built with VivekUI
        </Heading>

        <Text size="xl" style={{ maxInlineSize: '46rem' }}>
          This entire website is built with VivekUI, a free React component library with zero runtime
          dependencies.
        </Text>

        <Text tone="muted" style={{ marginBlockStart: 'var(--vk-space-4)', maxInlineSize: '46rem' }}>
          No Tailwind, no shadcn, no CSS framework, no config file. One <code>npm install</code>, one CSS
          import in <code>app/layout.tsx</code>, and the {COMPONENTS_USED.length - chartCount} components and{' '}
          {chartCount} charts listed below were all that was needed. The rest of this page is the receipts.
        </Text>

        <div className="df-install" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
          <Code>{INSTALL_COMMAND}</Code>
          <CopyButton value={INSTALL_COMMAND} size="sm" variant="ghost" label="Copy" copiedLabel="Copied" />
        </div>
      </Section>

      <Section size="xl" padding="md">
        <Heading level={2} size="lg" style={{ marginBlockEnd: 'var(--vk-space-5)' }}>
          Every component on this site
        </Heading>

        <Table striped hoverable size="md">
          <Table.Caption visuallyHidden>
            Each section of this website and the VivekUI component that renders it, linked to its documentation.
          </Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell scope="col">Component</Table.HeaderCell>
              <Table.HeaderCell scope="col">What it powers here</Table.HeaderCell>
              <Table.HeaderCell scope="col">Where to see it</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {COMPONENTS_USED.map((component) => (
              <Table.Row key={component.name}>
                <Table.HeaderCell scope="row">
                  <a
                    href={componentDocs(component.slug, component.group ?? 'components')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {component.name}
                  </a>{' '}
                  {component.group === 'charts' ? (
                    <Badge size="sm" variant="soft" tone="primary">
                      chart
                    </Badge>
                  ) : null}
                </Table.HeaderCell>
                <Table.Cell>{component.usedFor}</Table.Cell>
                <Table.Cell label="Where to see it">
                  <Text as="span" size="sm" tone="muted">
                    {component.page}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section size="xl" padding="lg" background="muted">
        <Heading level={2} size="lg">
          What that bought
        </Heading>
        <Text tone="muted" style={{ marginBlock: 'var(--vk-space-3) var(--vk-space-6)', maxInlineSize: '46rem' }}>
          Accessible focus handling, a keyboard model per component, light and dark themes from one set of CSS
          custom properties, server components wherever interaction did not demand otherwise, and two charts
          that render as inline SVG with a real table underneath for screen readers. None of it was written in
          this repository.
        </Text>

        <Stack direction="horizontal" gap={3} wrap>
          <Button asChild size="lg">
            <a href={vivekui(LINKS.docs, 'builtwith')} target="_blank" rel="noopener noreferrer">
              Read the Docs
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              Star on GitHub
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`${SITE.repo}/generate`} target="_blank" rel="noopener noreferrer">
              Use this template
            </a>
          </Button>
        </Stack>

        <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-5)' }}>
          The template repository is <code>{REPO_LABEL}</code>, MIT licensed. Keep the
          footer credit if you like it; a GitHub star is appreciated either way.
        </Text>
      </Section>
    </>
  )
}
