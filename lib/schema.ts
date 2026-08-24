import { SITE_PUBLISHED } from '@/data/content-dates'
import type { FaqEntry } from '@/data/faq'
import { PROFILE } from '@/data/profile'
import type { Project } from '@/data/projects'
import { PROJECTS, shotUrl } from '@/data/projects'
import { INSTALL_COMMAND, LINKS, REPO_LABEL, SITE } from '@/data/site'

import { absolute } from './seo'

/**
 * Structured data, emitted as one connected `@graph` per page.
 *
 * The point of the graph is the wiring, not the node count. Loose islands of
 * JSON-LD — a Person here, a BreadcrumbList there — leave a search engine to
 * guess whether they describe the same thing. Giving every node a stable `@id`
 * and referencing it (`isPartOf`, `author`, `breadcrumb`, `mainEntity`) states
 * the relationships outright, which is what lets Google resolve the site to a
 * single entity and what lets an answer engine attribute a quote correctly.
 *
 * Every `@id` is absolute, because a relative one is not globally unique and so
 * cannot be referenced from another page's graph.
 */

type Node = Record<string, unknown>

const ID = {
  website: `${absolute('/')}#website`,
  person: `${absolute('/')}#person`,
  page: (path: string) => `${absolute(path)}#webpage`,
  breadcrumb: (path: string) => `${absolute(path)}#breadcrumb`,
  work: (slug: string) => `${absolute(`/projects/${slug}`)}#work`,
  template: `${absolute('/built-with')}#template`,
  faq: `${absolute('/')}#faq`,
}

/** Wraps a set of nodes into the document a page emits. */
function graph(nodes: Node[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

/**
 * Profile URLs for `sameAs`.
 *
 * Filtered, not listed: `data/profile.ts` ships placeholder links like
 * `https://github.com/` so the template runs before you fill it in, and a bare
 * origin as `sameAs` is a claim that the person *is* GitHub. Anything without a
 * path is dropped, so real profiles start appearing the moment you add them and
 * never before.
 */
function sameAs(): string[] {
  return PROFILE.socials
    .map((social) => social.href)
    .filter((href) => {
      try {
        return new URL(href).pathname.replace(/\/+$/, '') !== ''
      } catch {
        return false
      }
    })
}

function personNode(): Node {
  const profiles = sameAs()
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: PROFILE.name,
    givenName: PROFILE.firstName,
    jobTitle: PROFILE.role,
    description: PROFILE.positioning[0],
    url: absolute('/'),
    image: { '@type': 'ImageObject', url: PROFILE.avatar, caption: PROFILE.avatarAlt },
    email: `mailto:${PROFILE.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'TypeScript',
      'Next.js',
      'React',
      'Node.js',
      'PostgreSQL',
      'Distributed systems',
      'Payments infrastructure',
      'Web performance',
      'Web accessibility',
    ],
    ...(profiles.length > 0 ? { sameAs: profiles } : {}),
  }
}

function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    name: `${PROFILE.name} — ${SITE.name}`,
    alternateName: SITE.name,
    description: SITE.tagline,
    url: absolute('/'),
    inLanguage: SITE.language,
    datePublished: SITE_PUBLISHED,
    publisher: { '@id': ID.person },
    copyrightHolder: { '@id': ID.person },
    license: 'https://opensource.org/licenses/MIT',
    // No SearchAction: this site has no search. Declaring one you do not have is
    // the most common way a sitelinks-searchbox claim gets ignored outright.
  }
}

function breadcrumbNode(path: string, items: readonly { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': ID.breadcrumb(path),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

/** The page node itself, wired to the site, the breadcrumb and its dates. */
function pageNode({
  path,
  type = 'WebPage',
  name,
  description,
  updated,
  published,
  image,
  extra,
  hasBreadcrumb = true,
}: {
  path: string
  type?: string | string[]
  name: string
  description: string
  updated: string
  published?: string
  image?: { url: string; caption: string }
  extra?: Node
  hasBreadcrumb?: boolean
}): Node {
  return {
    '@type': type,
    '@id': ID.page(path),
    url: absolute(path),
    name,
    description,
    isPartOf: { '@id': ID.website },
    inLanguage: SITE.language,
    datePublished: published ?? SITE_PUBLISHED,
    dateModified: updated,
    ...(hasBreadcrumb ? { breadcrumb: { '@id': ID.breadcrumb(path) } } : {}),
    ...(image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            '@id': `${absolute(path)}#primaryimage`,
            url: image.url,
            caption: image.caption,
          },
        }
      : {}),
    ...extra,
  }
}

function faqNode(items: readonly FaqEntry[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': ID.faq,
    isPartOf: { '@id': ID.website },
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/** One case study. */
function workNode(project: Project): Node {
  return {
    '@type': 'CreativeWork',
    '@id': ID.work(project.slug),
    name: project.name,
    headline: project.tagline,
    abstract: project.study[0]?.paragraphs[0],
    url: absolute(`/projects/${project.slug}`),
    image: shotUrl(project.cover.seed),
    datePublished: project.publishedAt,
    dateModified: project.updatedAt,
    keywords: project.tags.join(', '),
    creator: { '@id': ID.person },
    author: { '@id': ID.person },
    about: project.client,
    inLanguage: SITE.language,
  }
}

/**
 * The template itself, as software.
 *
 * This is the node that earns the "free nextjs portfolio template" query: it is
 * a real, resolvable, MIT-licensed artefact with a repository behind it, so it
 * gives both a crawler and an answer engine something concrete to cite.
 */
function templateNode(): Node {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': ID.template,
    name: `${SITE.name} — free Next.js portfolio template`,
    description: SITE.tagline,
    codeRepository: SITE.repo,
    url: absolute('/built-with'),
    programmingLanguage: ['TypeScript', 'CSS'],
    runtimePlatform: 'Next.js 16',
    license: 'https://opensource.org/licenses/MIT',
    author: { '@id': ID.person },
    isAccessibleForFree: true,
    keywords: [
      'free nextjs portfolio template',
      'nextjs portfolio template',
      'react portfolio template',
      'open source portfolio template',
    ].join(', '),
    // The dependency this site exists to demonstrate.
    softwareRequirements: `${INSTALL_COMMAND} (${LINKS.npm})`,
    codeSampleType: 'full solution',
    identifier: REPO_LABEL,
  }
}

// ---------------------------------------------------------------------------
// One builder per route. Each returns the page's complete graph.
// ---------------------------------------------------------------------------

export function homeGraph({
  title,
  description,
  faqs,
  updated,
}: {
  title: string
  description: string
  faqs: readonly FaqEntry[]
  updated: string
}) {
  return graph([
    websiteNode(),
    personNode(),
    // ProfilePage is the correct type for a portfolio home: the page is *about*
    // a person, and `mainEntity` says which one.
    pageNode({
      path: '/',
      type: 'ProfilePage',
      name: title,
      description,
      updated,
      image: { url: PROFILE.avatar, caption: PROFILE.avatarAlt },
      hasBreadcrumb: false,
      extra: {
        mainEntity: { '@id': ID.person },
        significantLink: [absolute('/projects'), absolute('/built-with'), SITE.repo],
      },
    }),
    faqNode(faqs),
  ])
}

export function projectsIndexGraph({
  title,
  description,
  updated,
}: {
  title: string
  description: string
  updated: string
}) {
  return graph([
    websiteNode(),
    personNode(),
    breadcrumbNode('/projects', [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ]),
    pageNode({
      path: '/projects',
      type: 'CollectionPage',
      name: title,
      description,
      updated,
      extra: {
        // An explicit list beats leaving a crawler to infer the set from links,
        // and it is what an answer engine reads to say "they have shipped six".
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: PROJECTS.length,
          itemListOrder: 'https://schema.org/ItemListOrderDescending',
          itemListElement: PROJECTS.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absolute(`/projects/${project.slug}`),
            name: project.name,
          })),
        },
      },
    }),
  ])
}

export function projectGraph(project: Project) {
  return graph([
    websiteNode(),
    personNode(),
    breadcrumbNode(`/projects/${project.slug}`, [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.name, path: `/projects/${project.slug}` },
    ]),
    pageNode({
      path: `/projects/${project.slug}`,
      type: 'WebPage',
      name: `${project.name} — ${project.outcome}`,
      description: project.tagline,
      published: project.publishedAt,
      updated: project.updatedAt,
      image: { url: shotUrl(project.cover.seed), caption: project.cover.alt },
      extra: { mainEntity: { '@id': ID.work(project.slug) } },
    }),
    workNode(project),
  ])
}

export function aboutGraph({
  title,
  description,
  updated,
}: {
  title: string
  description: string
  updated: string
}) {
  return graph([
    websiteNode(),
    personNode(),
    breadcrumbNode('/about', [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
    pageNode({
      path: '/about',
      type: 'AboutPage',
      name: title,
      description,
      updated,
      extra: { mainEntity: { '@id': ID.person }, about: { '@id': ID.person } },
    }),
  ])
}

export function contactGraph({
  title,
  description,
  updated,
}: {
  title: string
  description: string
  updated: string
}) {
  return graph([
    websiteNode(),
    personNode(),
    breadcrumbNode('/contact', [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
    pageNode({
      path: '/contact',
      type: 'ContactPage',
      name: title,
      description,
      updated,
      extra: { about: { '@id': ID.person } },
    }),
  ])
}

export function builtWithGraph({
  title,
  description,
  updated,
}: {
  title: string
  description: string
  updated: string
}) {
  return graph([
    websiteNode(),
    personNode(),
    breadcrumbNode('/built-with', [
      { name: 'Home', path: '/' },
      { name: 'Built with VivekUI', path: '/built-with' },
    ]),
    pageNode({
      path: '/built-with',
      type: 'WebPage',
      name: title,
      description,
      updated,
      extra: { mainEntity: { '@id': ID.template } },
    }),
    templateNode(),
  ])
}
