import type { Metadata } from 'next'
import { Breadcrumb, Divider, Heading, Section, Text } from '@the_viveksingh/vivek-ui'

import { ContactForm } from '@/components/contact-form'
import { JsonLd } from '@/components/json-ld'
import { PROFILE } from '@/data/profile'
import { ROUTE_UPDATED } from '@/data/content-dates'
import { contactGraph } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Contact'
const DESCRIPTION =
  'Start a project: full-stack engineering for payments, commerce and platform work. Tell me what you are building and what is going wrong. Reply in two days.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
  modifiedTime: ROUTE_UPDATED['/contact'],
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactGraph({ title: TITLE, description: DESCRIPTION, updated: ROUTE_UPDATED['/contact'] })} />

      <Section size="xl" padding="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <Heading level={1} className="df-case-title" style={{ marginBlock: 'var(--vk-space-6)' }}>
          Start a conversation
        </Heading>

        <div className="df-grid-2">
          <ContactForm />

          <aside className="df-contact-aside">
            <div>
              <p className="df-eyebrow">Currently</p>
              <Text>{PROFILE.available}</Text>
            </div>

            <Divider />

            <div>
              <p className="df-eyebrow">Direct</p>
              <Text>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </Text>
              <Text size="sm" tone="muted">
                {PROFILE.location} · {PROFILE.timezone}
              </Text>
            </div>

            <Divider />

            <div>
              <p className="df-eyebrow">Elsewhere</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--vk-space-2)' }}>
                {PROFILE.socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      {social.label}
                    </a>{' '}
                    <Text as="span" size="sm" tone="muted">
                      {social.handle}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>

            <Divider />

            <Text size="sm" tone="muted">
              I read everything and reply within two working days. If the project is not a fit I will say so
              quickly, and point you at someone who is a better match where I can.
            </Text>
          </aside>
        </div>
      </Section>
    </>
  )
}
