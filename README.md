<div align="center">

# DevFolio — a free Next.js portfolio template

**A production-quality developer portfolio built entirely with [VivekUI](https://ui.vivekkumarsingh.in). Next.js 16 · React 19 · TypeScript · zero runtime UI dependencies.**

[![npm version](https://img.shields.io/npm/v/@the_viveksingh/vivek-ui?color=6d28d9&label=%40the_viveksingh%2Fvivek-ui)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![npm downloads](https://img.shields.io/npm/dm/@the_viveksingh/vivek-ui?color=6d28d9)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![license](https://img.shields.io/badge/license-MIT-6d28d9)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/intellectwithvivek/vivek_UI?color=6d28d9)](https://github.com/intellectwithvivek/vivek_UI)
[![runtime deps](https://img.shields.io/badge/runtime%20UI%20deps-0-6d28d9)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)

### [**Live demo →**](https://portfolio-vivekui.vercel.app)

<!-- Replace with a real screenshot once you have deployed: -->
<!-- ![DevFolio screenshot](./public/screenshot.png) -->

_Screenshot placeholder — run the site, take a 1600×1000 capture of the homepage, save it to `public/screenshot.png` and uncomment the line above._

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fintellectwithvivek%2Fnextjs-portfolio-template-vivekui)

</div>

---

## What you get

- **Six routes, finished** — `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`, `/built-with`.
- **Dark mode by default**, with a light / dark / system toggle that persists and is applied before first paint. No theme flash.
- **Two charts**, both pure inline SVG with a visually hidden data table underneath: a twelve-week download sparkline on the homepage and a projects-per-year bar chart on `/about`.
- **SEO done properly** — Metadata API per route, canonical URLs, OpenGraph and Twitter cards, `sitemap.ts`, `robots.ts`, one `h1` per page, and JSON-LD for `Person`, `WebSite`, `CreativeWork`, `BreadcrumbList` and `FAQPage`.
- **AEO** — an FAQ section backed by `FAQPage` schema, plus a `public/llms.txt` summarising the site for answer engines.
- **Accessible by construction** — visible focus, WCAG AA contrast in both themes, `prefers-reduced-motion` respected, no layout shift, no console errors.
- **No CSS framework.** No Tailwind, no shadcn, no MUI. One stylesheet, `app/globals.css`, mostly custom properties.

## Quick start

```bash
git clone https://github.com/intellectwithvivek/nextjs-portfolio-template-vivekui.git
cd nextjs-portfolio-template-vivekui
npm install
npm run dev
```

Open <http://localhost:3000>. Requires **Node.js 20.9+** (22 LTS recommended).

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Make it yours

Everything you need to change is data, not markup.

| File | What lives there |
|---|---|
| `data/profile.ts` | Your name, role, positioning, avatar, socials, skills, tech stack |
| `data/projects.ts` | Case studies: problem / approach / result, metrics, screenshots, tags |
| `data/experience.ts` | Work history and education, most recent first |
| `data/oss.ts` | The four headline figures, the sparkline series, the bar-chart series |
| `data/testimonials.ts` | Quotes and avatars |
| `data/faq.ts` | Homepage questions — also the source of the `FAQPage` JSON-LD |
| `data/site.ts` | Canonical URL, repository URL, and every outbound UTM-tagged link |
| `app/globals.css` | The accent colour and every other visual decision |

**Change the accent colour** by re-pointing the primary tokens at the top of `app/globals.css`. Every VivekUI value is a CSS custom property, so this rebrands the whole site:

```css
:root {
  --vk-color-primary: #6d28d9;      /* your accent, light mode */
  --vk-color-primary-fg: #ffffff;   /* text that sits on it */
}
[data-theme='dark'] {
  --vk-color-primary: #a78bfa;      /* the lifted dark-mode version */
  --vk-color-primary-fg: #16062e;
}
```

**Before you deploy**, set `SITE.url` in `data/site.ts` to your own domain — it is the `metadataBase` for every canonical URL, OpenGraph tag and sitemap entry.

**Add a résumé** by dropping a PDF in `public/` and pointing `components/resume-button.tsx` at it; right now it opens a toast explaining that this is a demo.

**Wire up the contact form** in `components/contact-form.tsx` — validation and the confirmation toast are already there, it just needs somewhere to POST.

## Powered by VivekUI

```bash
npm i @the_viveksingh/vivek-ui
```

Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime dependencies. One install, one CSS import, no config.

- **Docs** — <https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=portfolio&utm_medium=readme>
- **npm** — <https://www.npmjs.com/package/@the_viveksingh/vivek-ui>
- **GitHub** — <https://github.com/intellectwithvivek/vivek_UI>
- **Author — Vivek Kumar Singh** — <https://vivekkumarsingh.in/?utm_source=vivekui-template&utm_campaign=portfolio&utm_medium=readme>

The [`/built-with`](https://portfolio-vivekui.vercel.app/built-with) page lists every component this site uses, each one linked to its documentation.

## Project structure

```
app/
  layout.tsx           ThemeProvider, ToastProvider, fonts, root metadata
  page.tsx             Home
  globals.css          The only stylesheet
  sitemap.ts robots.ts
  projects/            Index, [slug] case study, loading states
  about/ contact/ built-with/
components/            Site header, footer, project tile, forms, JSON-LD
data/                  All content, typed
lib/                   Metadata helpers and JSON-LD builders
public/llms.txt        Plain-text summary for answer engines
```

## Licence

[MIT](./LICENSE). Use it for anything, commercial work included.

The footer credit — *"Built with ❤️ using VivekUI"* — may be removed; the licence does not require it. If the template saved you a weekend, a ⭐ on [VivekUI](https://github.com/intellectwithvivek/vivek_UI) is appreciated instead.
