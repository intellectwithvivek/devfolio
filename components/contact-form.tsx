'use client'

import { useState } from 'react'
import { Button, Field, Input, Select, TagInput, Text, Textarea, useToast } from '@the_viveksingh/vivek-ui'

const PROJECT_TYPES = [
  { value: 'product', label: 'New product build' },
  { value: 'rescue', label: 'Rescue an existing codebase' },
  { value: 'performance', label: 'Performance or reliability work' },
  { value: 'platform', label: 'Platform / infrastructure' },
  { value: 'advisory', label: 'Advisory or fractional' },
]

const SUGGESTED_SERVICES = 'Next.js · API design · Postgres · Migrations · Accessibility'

/**
 * A form with no backend. Submitting validates, confirms with a Toast and
 * clears — which is exactly as far as a template should go.
 */
export function ContactForm() {
  const { toast } = useToast()
  const [services, setServices] = useState<string[]>(['Next.js'])
  const [errors, setErrors] = useState<{ name?: string; email?: string; brief?: string }>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const brief = String(data.get('brief') ?? '').trim()

    const next: typeof errors = {}
    if (!name) next.name = 'Please tell me what to call you.'
    if (!email) next.email = 'I need somewhere to reply.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That address does not look right.'
    if (brief.length < 20) next.brief = 'A couple of sentences, so I can give you a useful answer.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      toast({
        title: 'Check the form',
        description: 'A few fields still need filling in.',
        tone: 'warning',
      })
      return
    }

    toast({
      title: `Thanks, ${name.split(' ')[0]} — message received`,
      description: 'Demo only: this template has no backend, so nothing was actually sent.',
      tone: 'success',
      duration: 7000,
    })

    form.reset()
    setServices([])
  }

  return (
    <form className="df-form" onSubmit={handleSubmit} noValidate>
      <div className="df-form-row">
        <Field label="Your name" required error={errors.name}>
          <Input name="name" autoComplete="name" placeholder="Priya Raghavan" />
        </Field>

        <Field label="Email" required error={errors.email}>
          <Input name="email" type="email" autoComplete="email" placeholder="priya@company.com" />
        </Field>
      </div>

      <Field label="What kind of project is it?" help="Pick the closest match — we can refine it later.">
        <Select name="projectType" options={PROJECT_TYPES} placeholder="Choose one" defaultValue="" />
      </Field>

      <Field
        label="Services you are interested in"
        help={`Press Enter or comma to add. Try: ${SUGGESTED_SERVICES}`}
      >
        <TagInput
          name="services"
          value={services}
          onValueChange={setServices}
          max={8}
          placeholder="Add a service"
        />
      </Field>

      <Field
        label="The brief"
        required
        error={errors.brief}
        help="What are you building, what is going wrong, and when does it need to be done?"
      >
        <Textarea name="brief" rows={6} placeholder="We are rebuilding checkout and losing baskets at the payment step…" />
      </Field>

      <div>
        <Button type="submit" size="lg">
          Send message
        </Button>
        <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
          No backend, no tracking, nothing stored. Wire it to your own handler in{' '}
          <code>components/contact-form.tsx</code>.
        </Text>
      </div>
    </form>
  )
}
