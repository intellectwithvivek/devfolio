# Fonts used to render OpenGraph images

These two files are read at build time by `lib/og.tsx` to draw the social share
cards. They are **not** shipped to the browser — the site itself loads its fonts
through `next/font`, which self-hosts and subsets them separately.

They are committed rather than fetched so the build stays hermetic: an OG card
that silently falls back to a default face because a CDN blipped is the kind of
regression nobody notices until a link looks wrong on LinkedIn.

| File | Family | Weight | Licence |
|---|---|---|---|
| `bricolage-extrabold.ttf` | Bricolage Grotesque | 800 | [SIL Open Font License 1.1](https://openfontlicense.org/) |
| `inter-regular.ttf` | Inter | 400 | [SIL Open Font License 1.1](https://openfontlicense.org/) |

Both licences permit redistribution, including bundled in a repository, provided
the fonts are not sold on their own and the licence travels with them. Upstream:
[Bricolage Grotesque](https://github.com/ateliertriay/bricolage) ·
[Inter](https://github.com/rsms/inter).
