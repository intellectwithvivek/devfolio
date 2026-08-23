import { PROFILE } from '@/data/profile'
import type { Project } from '@/data/projects'
import { SITE } from '@/data/site'
import type { FaqEntry } from '@/data/faq'

import { absolute } from './seo'

/** The person the portfolio is about. Emitted on the homepage. */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${absolute('/')}#person`,
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    description: PROFILE.positioning[0],
    url: absolute('/'),
    image: PROFILE.avatar,
    email: `mailto:${PROFILE.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressCountry: 'IN',
    },
    knowsAbout: ['TypeScript', 'Next.js', 'React', 'PostgreSQL', 'Distributed systems', 'Web performance'],
    sameAs: PROFILE.socials.map((s) => s.href),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absolute('/')}#website`,
    name: `${PROFILE.name} — ${SITE.name}`,
    alternateName: SITE.name,
    description: SITE.tagline,
    url: absolute('/'),
    inLanguage: 'en',
    publisher: { '@id': `${absolute('/')}#person` },
  }
}

/** One case study. */
export function creativeWorkSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${absolute(`/projects/${project.slug}`)}#work`,
    name: project.name,
    headline: project.tagline,
    abstract: project.study[0]?.paragraphs[0],
    url: absolute(`/projects/${project.slug}`),
    image: `https://picsum.photos/seed/${project.cover.seed}/1200/800`,
    dateCreated: `${project.year}`,
    keywords: project.tags.join(', '),
    creator: { '@id': `${absolute('/')}#person` },
    author: { '@id': `${absolute('/')}#person` },
    about: project.client,
  }
}

/** Trail for an inner page. Pass the crumbs in order, root first. */
export function breadcrumbSchema(items: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

export function faqSchema(items: readonly FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
