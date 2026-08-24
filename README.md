<div align="center">

<img src="./public/logo.svg" width="88" height="88" alt="">

# DevFolio — a free Next.js portfolio template

**A production-quality developer portfolio built entirely with [VivekUI](https://ui.vivekkumarsingh.in). Next.js 16 · React 19 · TypeScript · zero runtime UI dependencies.**

[![npm version](https://img.shields.io/npm/v/@the_viveksingh/vivek-ui?color=6d28d9&label=%40the_viveksingh%2Fvivek-ui)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![npm downloads](https://img.shields.io/npm/dm/@the_viveksingh/vivek-ui?color=6d28d9)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![license](https://img.shields.io/badge/license-MIT-6d28d9)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/intellectwithvivek/vivek_UI?color=6d28d9)](https://github.com/intellectwithvivek/vivek_UI)
[![runtime deps](https://img.shields.io/badge/runtime%20UI%20deps-0-6d28d9)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)

### [**Live demo →**](https://devfolio.vivekkumarsingh.in)

<!-- Replace with a real screenshot once you have deployed: -->
<!-- ![DevFolio screenshot](./public/screenshot.png) -->

_Screenshot placeholder — run the site, take a 1600×1000 capture of the homepage, save it to `public/screenshot.png` and uncomment the line above._

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fintellectwithvivek%2Fdevfolio)

</div>

---

## What you get

- **Six routes, finished** — `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`, `/built-with`.
- **Dark mode by default**, with a light / dark / system toggle that persists and is applied before first paint. No theme flash.
- **Two charts**, both pure inline SVG with a visually hidden data table underneath: a twelve-week download sparkline on the homepage and a projects-per-year bar chart on `/about`.
- **SEO done properly** — Metadata API per route, canonical URLs, `sitemap.ts` with content-derived `lastmod` and image entries, `robots.ts`, one `h1` per page, and a **connected JSON-LD `@graph`** rather than loose nodes: `WebSite` and `Person` with stable `@id`s, a typed page node per route (`ProfilePage`, `CollectionPage`, `AboutPage`, `ContactPage`), `BreadcrumbList`, `CreativeWork` per case study and `SoftwareSourceCode` for the template.
- **Generated OG images** — a branded 1200×630 card per route via `next/og`, prerendered at build. Case-study cards carry the project name and the number it moved.
- **AEO** — `FAQPage` schema fed from the same data the page renders, a `public/llms.txt` written as answers rather than a feature list, and a `robots.ts` that names the answer engines it welcomes instead of leaving it to a wildcard.
- **Accessible by construction** — visible focus, WCAG AA contrast in both themes, `prefers-reduced-motion` respected, no layout shift, no console errors.
- **No CSS framework.** No Tailwind, no shadcn, no MUI. One stylesheet, `app/globals.css`, mostly custom properties.

## Quick start

```bash
git clone https://github.com/intellectwithvivek/devfolio.git
cd devfolio
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
| `data/site.ts` | Canonical URL, repository URL, verification tokens, every outbound UTM-tagged link |
| `data/content-dates.ts` | When each static route last changed — the source of sitemap `lastmod` |
| `lib/schema.ts` | The JSON-LD graph builders, one per route |
| `lib/og.tsx` | The shared OpenGraph card |
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

**Replace the mark.** `app/icon.svg` is the single source for the whole icon set — a drawn "D" on a violet tile with the site's signature accent rule beneath it. The letterform is drawn rather than set from a font, because at 16px a real glyph's thin joins vanish and the counter fills in. Edit that one file, then:

```bash
npm run icons
```

That rewrites `app/favicon.ico` (six PNG-in-ICO sizes), `app/apple-icon.png`, `public/icon-512.png`, `public/icon-maskable.png` and `public/logo.svg`. Commit what it writes — they are derived files, but checked in, so a fresh clone is complete and nothing re-derives them per request. `components/logo.tsx` carries the same geometry inline for the navbar and footer, and takes a required `id` because two copies on one page need distinct gradient ids.

The maskable icon is a separate file, not the same PNG relabelled: a launcher crops it to its own shape, so it runs the gradient edge to edge and keeps the mark inside the central 80% safe zone.

**Add a résumé** by dropping a PDF in `public/` and pointing `components/resume-button.tsx` at it; right now it opens a toast explaining that this is a demo.

**Wire up the contact form** in `components/contact-form.tsx` — validation and the confirmation toast are already there, it just needs somewhere to POST.

## Search Console: verify, then submit

The single thing that breaks this step is a `SITE.url` that disagrees with the host actually serving the page. Search Console rejects a sitemap whose URLs sit outside the verified property (*"Sitemap contains URLs which are not on this property"*), and Google may index whichever origin it reached first. Check it before anything else:

```bash
curl -s https://your-domain.com | grep -o '<link rel="canonical"[^>]*>'
curl -s https://your-domain.com/sitemap.xml | head -6
```

Both must show your real domain.

**1. Verify ownership.** Prefer the **DNS TXT record** on the apex domain over the HTML meta tag: one record covers every present and future subdomain, and it cannot be lost by a deploy that drops the tag. If you do want the tag, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in your host's environment variables and redeploy — `app/layout.tsx` renders it only when the variable is present.

**2. Add the property.** A *Domain* property (DNS-verified) covers `http`, `https`, `www` and every subdomain at once. A *URL prefix* property covers exactly one origin — pick Domain unless you have a reason not to.

**3. Submit the sitemap.** Search Console → **Sitemaps** → enter `sitemap.xml` → Submit. You submit the path, not the full URL.

**4. Then wait, and resist resubmitting.** "Discovered" turning into "Indexed" takes days to weeks for a new domain; resubmitting does not speed it up. Use **URL Inspection → Request indexing** for the two or three pages you care about most, and check **Page indexing** for anything reported as excluded.

**Worth knowing about `lastmod`:** it is the only sitemap field Google still acts on, and only while it stays accurate. This template therefore reads dates from your content — `data/content-dates.ts` for static routes, `publishedAt`/`updatedAt` per case study — rather than stamping `new Date()` at build time. Edit the date when you edit the page. If every URL claims to change on every deploy, Google learns the field is noise and stops reading it.

`changefreq` and `priority` are not worth agonising over: Google ignores `changefreq` entirely, and `priority` only ranks your own URLs against each other.

## Powered by VivekUI

```bash
npm i @the_viveksingh/vivek-ui
```

Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime dependencies. One install, one CSS import, no config.

- **Docs** — <https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=portfolio&utm_medium=readme>
- **npm** — <https://www.npmjs.com/package/@the_viveksingh/vivek-ui>
- **GitHub** — <https://github.com/intellectwithvivek/vivek_UI>
- **Author — Vivek Kumar Singh** — <https://vivekkumarsingh.in/?utm_source=vivekui-template&utm_campaign=portfolio&utm_medium=readme>

The [`/built-with`](https://devfolio.vivekkumarsingh.in/built-with) page lists every component this site uses, each one linked to its documentation.

## Project structure

```
app/
  layout.tsx           ThemeProvider, ToastProvider, fonts, root metadata
  page.tsx             Home
  globals.css          The only stylesheet
  sitemap.ts robots.ts manifest.ts
  opengraph-image.tsx  Generated 1200x630 share card (one per route)
  icon.svg             The brand mark — source for the whole icon set
  favicon.ico apple-icon.png   Generated from it by `npm run icons`
  projects/            Index, [slug] case study, loading states
  about/ contact/ built-with/
components/            Site header, footer, project tile, forms, JSON-LD
data/                  All content, typed
lib/                   Metadata helpers, JSON-LD graph builders, OG card
scripts/               generate-icons.mjs — rasterises the mark (npm run icons)
assets/fonts/          Fonts read at build time to draw the OG cards
public/llms.txt        Plain-text summary for answer engines
```

## Licence

[MIT](./LICENSE). Use it for anything, commercial work included.

The footer credit — *"Built with ❤️ using VivekUI"* — may be removed; the licence does not require it. If the template saved you a weekend, a ⭐ on [VivekUI](https://github.com/intellectwithvivek/vivek_UI) is appreciated instead.
