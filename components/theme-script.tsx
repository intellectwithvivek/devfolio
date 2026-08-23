'use client'

import { createThemeScript } from '@the_viveksingh/vivek-ui'

/**
 * The anti-flash snippet, inlined in `<head>`.
 *
 * `createThemeScript` ships from VivekUI's client module, so it cannot be called
 * from a server component — hence this one-line boundary. The snippet itself is
 * plain synchronous JavaScript that sets `data-theme` before the first paint;
 * React cannot do this job, because the server does not know what this visitor
 * chose. Dark is the default, matching the `ThemeProvider` in the layout.
 */
const THEME_SCRIPT = createThemeScript({ defaultTheme: 'dark' })

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
}
