/**
 * The homepage FAQ, rendered by the VivekUI `FAQ` component and emitted again as
 * FAQPage JSON-LD. One source, so the schema can never disagree with the page.
 *
 * Answers are plain strings on purpose: the JSON-LD needs text, and a ReactNode
 * here would mean maintaining two versions of every answer.
 */

export interface FaqEntry {
  id: string
  question: string
  answer: string
}

export const FAQS: readonly FaqEntry[] = [
  {
    id: 'free',
    question: 'Is this portfolio template free to use?',
    answer:
      'Yes. DevFolio is released under the MIT licence, which means you can use it for personal or commercial work, modify it, and ship it without asking permission or paying anything. There is no paid tier and no feature held back — the repository you clone is the whole template.',
  },
  {
    id: 'ui-library',
    question: 'What UI library does this template use?',
    answer:
      'Every component on this site comes from VivekUI (@the_viveksingh/vivek-ui), a free React component library with 91 components, 6 SVG charts and zero runtime dependencies. There is no Tailwind, no shadcn and no CSS framework anywhere in the project. Setup is one npm install and one CSS import in app/layout.tsx.',
  },
  {
    id: 'customise',
    question: 'How do I customise it for myself?',
    answer:
      'All the content lives in typed files under /data — your name and positioning in profile.ts, your case studies in projects.ts, your work history in experience.ts. Change the accent colour by overriding the --vk-color-primary custom properties in app/globals.css, since every VivekUI token is a plain CSS variable. Nothing about the layout requires you to touch component internals.',
  },
  {
    id: 'dark-mode',
    question: 'Does it support dark mode?',
    answer:
      'Dark mode is the default, and there is a toggle in the navbar that switches between light, dark and following your operating system. The choice is saved to localStorage and applied by an inline script before first paint, so a returning visitor never sees a flash of the wrong theme.',
  },
]
