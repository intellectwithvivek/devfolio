/**
 * Every VivekUI component this site imports, mapped to the part of the site it
 * powers. Rendered as the table on /built-with.
 *
 * `slug` is the component's docs URL segment. Keep the two in sync when you add
 * a component — a dead link in the credit table is worse than no table.
 */

export interface ComponentUse {
  /** Exported name, as you would import it. */
  name: string
  /** Docs URL segment. */
  slug: string
  /** Charts live at /docs/charts/<slug>, everything else at /docs/components/<slug>. */
  group?: 'components' | 'charts'
  /** Where on this site you can see it. */
  usedFor: string
  /** Which page to look at. */
  page: string
}

export const COMPONENTS_USED: readonly ComponentUse[] = [
  { name: 'Navbar', slug: 'navbar', usedFor: 'Sticky site navigation, with the mobile sheet', page: 'Every page' },
  { name: 'ThemeProvider', slug: 'theme-provider', usedFor: 'Theme state, persistence and the anti-flash script', page: 'Every page' },
  { name: 'ThemeToggle', slug: 'theme-toggle', usedFor: 'Light / dark / system switch in the navbar', page: 'Every page' },
  { name: 'Footer', slug: 'footer', usedFor: 'Credit block and the three link columns', page: 'Every page' },
  { name: 'Section', slug: 'section', usedFor: 'Every band on every page, plus its header', page: 'Every page' },
  { name: 'Heading', slug: 'heading', usedFor: 'Page and section headings at the right level', page: 'Every page' },
  { name: 'Text', slug: 'text', usedFor: 'Body copy, captions and muted secondary lines', page: 'Every page' },
  { name: 'Button', slug: 'button', usedFor: 'Every call to action, as a link where it navigates', page: 'Every page' },
  { name: 'Badge', slug: 'badge', usedFor: 'Tech tags, project tags and the navbar credit', page: 'Every page' },
  { name: 'Hero', slug: 'hero', usedFor: 'The split hero holding the oversized headline', page: 'Home' },
  { name: 'Marquee', slug: 'marquee', usedFor: 'The tech-stack ticker under the hero', page: 'Home' },
  { name: 'Stats', slug: 'stats', usedFor: 'The four headline figures, as a description list', page: 'Home' },
  { name: 'AnimatedCounter', slug: 'animated-counter', usedFor: 'Each figure counting up when scrolled into view', page: 'Home' },
  { name: 'Sparkline', slug: 'sparkline', group: 'charts', usedFor: 'Twelve-week OSS download trend under the figure', page: 'Home' },
  { name: 'BentoGrid', slug: 'bento-grid', usedFor: 'The six-tile featured-project wall', page: 'Home' },
  { name: 'Card', slug: 'card', usedFor: 'Each project tile', page: 'Home · Projects' },
  { name: 'Avatar', slug: 'avatar', usedFor: 'Reference portraits, grouped in the hero', page: 'Home' },
  { name: 'Timeline', slug: 'timeline', usedFor: 'Work history, and education on the about page', page: 'Home · About' },
  { name: 'Testimonials', slug: 'testimonials', usedFor: 'Three quotes as figure / blockquote / figcaption', page: 'Home' },
  { name: 'FAQ', slug: 'faq', usedFor: 'The questions section, on native details / summary', page: 'Home' },
  { name: 'CTA', slug: 'cta', usedFor: 'The closing ask above the footer', page: 'Home' },
  { name: 'Grid', slug: 'grid', usedFor: 'The three-column case-study index', page: 'Projects' },
  { name: 'Stack', slug: 'stack', usedFor: 'Vertical and horizontal groupings, on the token scale', page: 'Home · Contact' },
  { name: 'EmptyState', slug: 'empty-state', usedFor: 'What renders if you delete every project from the data', page: 'Projects' },
  { name: 'Skeleton', slug: 'skeleton', usedFor: 'Loading placeholders while a route streams in', page: 'Projects' },
  { name: 'Breadcrumb', slug: 'breadcrumb', usedFor: 'The trail on every inner page', page: 'Inner pages' },
  { name: 'Carousel', slug: 'carousel', usedFor: 'Screenshots, on CSS scroll-snap', page: 'Case study' },
  { name: 'ButtonGroup', slug: 'button-group', usedFor: 'The Live site / GitHub pair', page: 'Case study' },
  { name: 'Prose', slug: 'prose', usedFor: 'Problem / Approach / Result, and the about bio', page: 'Case study · About' },
  { name: 'BarChart', slug: 'bar-chart', group: 'charts', usedFor: 'Projects shipped per year, 2019 to 2026', page: 'About' },
  { name: 'Divider', slug: 'divider', usedFor: 'Rules between blocks in the contact sidebar', page: 'Contact' },
  { name: 'Field', slug: 'field', usedFor: 'Labels, hints and errors wired to every control', page: 'Contact' },
  { name: 'Input', slug: 'input', usedFor: 'Name and email', page: 'Contact' },
  { name: 'Select', slug: 'select', usedFor: 'Project type, as a native select', page: 'Contact' },
  { name: 'Textarea', slug: 'textarea', usedFor: 'The brief', page: 'Contact' },
  { name: 'TagInput', slug: 'tag-input', usedFor: 'Services you are interested in', page: 'Contact' },
  { name: 'Toast', slug: 'toast', usedFor: 'Submit confirmation, and the résumé button', page: 'Contact · Home' },
  { name: 'Code', slug: 'code', usedFor: 'The install command, in the footer and here', page: 'Every page' },
  { name: 'CopyButton', slug: 'copy-button', usedFor: 'Copying that install command to the clipboard', page: 'Every page' },
  { name: 'Table', slug: 'table', usedFor: 'This table', page: 'Built with' },
]
