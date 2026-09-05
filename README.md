# Neuron ICT — Landing page (testing build)

Static landing page for **Neuron ICT**: local SEO and Google Business Profile
visibility reviews for established local service businesses.

> **Approved static testing baseline: 2d57460**
>
> That commit is the first version of this page to pass the visual, responsive, accessibility
> and deployment audit. Treat it as the stable test-design reference. Later commits should
> stabilise it, not redesign it.

## GitHub Pages is a testing environment only

This repository is deployed to GitHub Pages **solely so the page can be reviewed, validated and
approved**. It is not the intended production environment and is not indexed.

The production path is:

**Approved static design → production-content completion → optional Django template conversion →
own domain/server deployment**

## Stack

- Semantic HTML5 (no templating, no framework)
- Tailwind CSS v4, compiled with the standalone Tailwind CLI
- ~70 lines of vanilla JavaScript (mobile menu, form placeholder state, footer year)
- Fonts loaded from Google Fonts: Instrument Sans (headings), Inter (body), IBM Plex Mono (labels)

## Project structure

```
.
├── index.html            # The landing page — all 10 sections, in order
├── privacy.html          # Privacy notice placeholder
├── src/
│   └── input.css         # Tailwind source: design tokens + component classes
├── assets/
│   ├── css/styles.css    # Compiled output — committed so GitHub Pages can serve it
│   ├── js/main.js        # Minimal progressive enhancement
│   └── img/              # logo-mark.svg, favicon.svg
├── .nojekyll             # Serve files as-is on GitHub Pages
└── package.json
```

`assets/css/styles.css` is a **build artefact but is committed on purpose** — GitHub Pages
serves the repository as-is and does not run a build step.

## Local build

Requires Node.js 18+.

```bash
npm install

# one-off minified production build
npm run build

# watch mode while editing HTML/CSS
npm run dev
```

Rerun `npm run build` and commit `assets/css/styles.css` before every deployment, otherwise
new Tailwind classes used in the HTML will have no styles.

## Preview locally

Any static server works. To reproduce the GitHub Pages subpath exactly, serve the **parent**
directory and open `/neuronict/`:

```bash
npm run serve                                   # http://localhost:4173
python -m http.server 4173 --directory ..       # http://localhost:4173/neuronict/
```

## Deploy this testing version to GitHub Pages

1. Push to `main`.

2. In the repository: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)`

3. The test URL is `https://abdullahalharun-code.github.io/neuronict/`.

All asset paths are **relative** (`assets/...`, `index.html`, `privacy.html`), so the site works
from a repository subpath as well as from a domain root. Keep it that way — do not introduce
leading-slash paths. No `CNAME` file is included, since no production domain is confirmed.

`index.html` and `privacy.html` currently carry `<meta name="robots" content="noindex, nofollow">`
so the testing deployment is not indexed. **Remove those tags before production launch.**

## Campaign continuity — what this page is for

The page is the landing destination for a personalised outbound campaign, and it has to continue
the same story the email starts:

**Strong real-world reputation → unexpected local visibility gap → evidence → personalized
visibility review → conversation**

- Primary CTA: **"Request a local visibility review"**
- Secondary CTA: **"See a sample analysis"**

The review may initially be delivered as a short personalized video, and later be supported by a
PDF or snapshot. The copy therefore says "a short, personalized visibility review" and must
**never be locked to a single delivery format** — no wording that promises a written report, a
PDF, a video, or a delivery deadline.

### Deep-link anchors used by campaign emails

These IDs are stable and safe to link to from outbound email. Do not rename them.

| Anchor | Section |
| --- | --- |
| `#sample-analysis` | Sample analysis (evidence / proof) |
| `#about` | About Neuron ICT (trust) |
| `#request-review` | Final review CTA + form |

Supporting anchors: `#visibility-gap`, `#what-we-review`, `#how-it-works`, `#who-we-help`.

Example: `https://abdullahalharun-code.github.io/neuronict/#sample-analysis`

The header is sticky, so `html` carries `scroll-padding-top` (80px, 96px from `md`). Without it a
deep link parks the target section underneath the header. If the header height ever changes,
change that value with it.

## Do Not Regress

Constraints that are easy to undo by accident and expensive to rediscover:

- **Grid SVGs are capped at 424px** (`.viz-grid`). Both use a fixed 424-unit `viewBox`, so their
  in-figure labels scale with the container. Uncapped, the sample numerals render at ~8px on a
  375px phone and ~30px in a tablet-width single-column layout.
- **Moderate viz numerals use ink, not white.** White on `#C2740B` is only 3.4:1; ink `#0E1A26`
  on it is 5.1:1. Strong and weak fills are dark enough to keep white numerals.
- **The hero text column is `1.25fr`.** The visual column only needs to reach the 424px cap, and
  the extra width is what keeps both hero CTAs on a single line.
- **No `overflow-x: hidden` on `body`.** It was removed after verifying zero horizontal overflow
  from 320px to 1600px — keep real overflow visible rather than masked.
- **Keep `scroll-padding-top` on `html`** while the header is sticky, or every campaign deep link
  lands behind the header.
- **Keep the anchor IDs above unchanged** — outbound emails already point at them.
- **Keep the primary CTA wording identical everywhere** — "Request a local visibility review",
  shortened to "Request a review" only where space demands it. It is always the same action; no
  consultation booking, quotes, pricing or packages.
- **Keep the sample analysis honestly labelled** — "Sample analysis — illustrative example. Not a
  real client.", and both geo-grids labelled illustrative.
- **Keep findings split into *Observation:* / *What we'd investigate:*.** Nothing may state an
  assumed cause as a fact.
- **Keep the form's testing disclosure** until a real backend exists (see below).

## Third-party fonts

Audited against the live Google Fonts response.

| Family | Weights requested | Used for | Latin payload |
| --- | --- | --- | --- |
| Inter | 400, 500, 600 | body copy, UI | 48.3 KB (one variable file) |
| Instrument Sans | 500, 600 | headings, wordmark | 30.1 KB (one variable file) |
| IBM Plex Mono | 400, 500 | eyebrows, step numbers, grid numerals | 29.6 KB (two static files) |

**Total ≈ 108 KB of woff2 plus ≈ 13 KB of CSS, over 5 requests to two Google hosts.**

**No unused weights are being requested.** Every requested weight appears in the markup. Inter and
Instrument Sans are served as variable fonts, so the extra weights cost zero additional bytes —
one latin file each covers the whole requested range. Only IBM Plex Mono is static, and both of
its weights are used (400 for labels, 500 for the sample-grid numerals). Nothing was removed.

Only the `latin` subset is downloaded for an English page; the cyrillic/greek/vietnamese
`@font-face` blocks in the response are never fetched.

**Production task: self-host.** Self-hosting removes the third-party runtime dependency,
simplifies the privacy disclosure and gives deployment control. All three families are
OFL-1.1 licensed, but the files must come from an official source (Google Fonts' own download,
or each project's upstream repository) with the OFL text retained — **do not pull font binaries
from a mirror or CDN of uncertain provenance.** This was deliberately not done during the testing
pass. Do not swap the approved typography for a generic system-font stack just to drop Google
Fonts.

## Form safety (testing build)

The request form is intentionally non-production and must stay that way until a real backend is
approved:

- The `<form>` has **no `action` and no `method`**.
- Submission is intercepted in `assets/js/main.js`, which calls `preventDefault()` and only
  validates and writes to a local status element. Verified: submitting fires **zero** network
  requests (no `fetch`, `XMLHttpRequest` or `sendBeacon`) and does not change the URL.
- No API endpoint, key, secret or third-party form service exists anywhere in the repository.
- The success state says plainly that nothing was sent, so it cannot be mistaken for a real
  submission. A static note under the submit button repeats this.

Both messages are marked `TESTING BUILD` in the source and are easy to delete when the form goes
live.

## Placeholders that must be replaced before production

The authoritative pre-launch checklist. Nothing here has been invented — every unknown is left as
an explicit placeholder rather than a plausible-looking fake.

| # | Where | What must be replaced |
| --- | --- | --- |
| 1 | About section | Founder/consultant real name |
| 2 | About section | Professional role |
| 3 | About section + footer | City / region |
| 4 | About section | Real founder photograph (currently a dashed placeholder box) |
| 5 | About section | Genuine background copy (currently a bracketed placeholder paragraph) |
| 6 | About section + footer | Real LinkedIn URL (currently `href="#"`, twice) |
| 7 | Footer | Real business email address (currently `href="#"`) |
| 8 | `privacy.html` | Production privacy details — legal entity, what the form collects, retention, lawful basis, jurisdiction, access/deletion, privacy contact |
| 9 | `index.html` + `main.js` | Real form submission backend, replacing the intercepted testing handler and its disclosure text |
| 10 | Deployment | Production domain (add `CNAME` only once the domain is confirmed) |
| 11 | `<head>` of both pages | Canonical URL (`<link rel="canonical">`) — not present yet |
| 12 | `<head>` of both pages | Open Graph / Twitter card tags and a social-share image — not present yet |
| 13 | `assets/img/` | Favicon and logo mark if the current provisional SVGs are not final |
| 14 | `<head>` of both pages | Remove `<meta name="robots" content="noindex, nofollow">` |
| 15 | Fonts | Self-host the three families from an official OFL source (see above) |
| 16 | Sample analysis | Decide whether to keep the illustrative example or replace it with a consented real one — if it stays illustrative, the "Not a real client" labelling stays too |

Qualifications, experience, certifications, client numbers and awards are deliberately absent.
Do not fabricate any of them.

## Intentionally not included

Not to be added until validation actually requires them: analytics, tracking pixels, cookie
banners, CRM integration, hosted form services, live chat, booking calendars, testimonials, case
studies, blog, pricing tables, extra service pages, Django, a database, authentication, or
animation libraries.

## Future Django conversion

The markup is structured to port cleanly:

- The header and footer are self-contained and marked with comments for extraction into
  `includes/header.html` and `includes/footer.html`.
- Each of the ten sections is a single top-level `<section>` with an `id` and a numbered comment
  banner, so sections map one-to-one onto template blocks or includes.
- No content is generated by JavaScript — the DOM is complete in the HTML source.
- Repeated patterns use shared component classes (`.container-page`, `.section`, `.btn`,
  `.panel`, `.field-input`, `.eyebrow`, `.lede`) defined in `src/input.css`, so a template
  refactor does not require rewriting long utility strings.
- The CTA form uses standard `name` attributes (`business_name`, `service_area`, `email`) ready
  for a Django form; only `{% csrf_token %}`, `action` and `method` need adding.
