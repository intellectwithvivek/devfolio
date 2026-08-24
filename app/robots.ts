import type { MetadataRoute } from 'next'

import { SITE } from '@/data/site'

/**
 * Crawlers that answer questions rather than return links.
 *
 * Listing them explicitly is the AEO decision on this site, and it is a
 * deliberate one: DevFolio is an MIT-licensed open-source template whose whole
 * purpose is to be found, quoted and reused, so being summarised inside an AI
 * answer with a citation is the outcome we want, not a leak to prevent.
 *
 * They are named rather than left to the `*` rule because several of these
 * agents look for their own token before falling back — and because a future
 * maintainer who wants the opposite policy should find one obvious list to
 * flip, not a silence they have to interpret.
 *
 * If you fork this for client work where the content is the product, this is
 * the block to reconsider. Retrieval bots (`*-SearchBot`, `*-User`) send
 * referral traffic; the training crawlers do not.
 */
const ANSWER_ENGINES = [
  // OpenAI — training, search index, and user-triggered fetches
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google Gemini / AI Overviews grounding (separate from Googlebot)
  'Google-Extended',
  // Apple Intelligence
  'Applebot-Extended',
  // Meta AI
  'meta-externalagent',
  // Others that feed retrieval and training corpora
  'Amazonbot',
  'DuckAssistBot',
  'MistralAI-User',
  'cohere-ai',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Next's build output and image optimiser cache — no content, and
        // crawling them wastes budget that should go to the six real routes.
        disallow: ['/_next/static/chunks/', '/_next/image?'],
      },
      {
        userAgent: ANSWER_ENGINES,
        allow: '/',
      },
    ],
    sitemap: new URL('/sitemap.xml', SITE.url).toString(),
    host: SITE.url,
  }
}
