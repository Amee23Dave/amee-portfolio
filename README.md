# Amee Dave — Portfolio Website

Dark, editorial portfolio for **Amee Dave, AI Filmmaker & Visual Storyteller**.
Plain HTML, CSS and vanilla JavaScript — no frameworks, no build step, no backend.
Hosted on **Vercel** (a matching `netlify.toml` is included if you ever move to Netlify).

---

## 1. Pages

| Page | File | Live URL |
|---|---|---|
| Home — headline, showreel, selected work, about me (services, capabilities, email / Instagram / LinkedIn), contact form | `index.html` | `/` |
| Work — all projects + contact form | `work.html` | `/work` |
| Project pages (7) | `projects/*.html` | `/projects/<name>` |
| Privacy | `privacy.html` | `/privacy` |
| 404 | `404.html` | any missing page |

The old `/about` address now opens the About section on the homepage.
Old project addresses (`luxury-watch-film`, `perfume-product-film`, `sportswear-ai-film`,
`ceramic-product-film`, `brand-story-film`, `projects/portfolio`) automatically redirect to the
correctly named pages. Their files in `/projects/` are only tiny redirect stubs.

---

## 2. File structure

```
amee-portfolio/
├── index.html, work.html, privacy.html, 404.html
├── projects/                 7 project pages (+ redirect stubs for old URLs)
├── css/
│   ├── reset.css
│   ├── style.css             colours, fonts, every component
│   ├── animations.css        page transition + reveal motion
│   └── responsive.css        tablet / mobile layout
├── js/
│   ├── main.js               header, mobile menu, active nav, contact form
│   ├── projects.js           project data (used for hover previews)
│   ├── video-controller.js   showreel, hover previews, "VIEW" cursor
│   └── transitions.js        page transition overlay
├── assets/
│   ├── work/                 ← web-optimised media actually used by the site
│   ├── fonts/                self-hosted Bebas Neue + Poppins
│   ├── images/               og-image.jpg (social share image)
│   ├── icons/                favicons
│   ├── videos/, posters/     your original full-size files (not loaded by the site)
├── vercel.json               clean URLs, redirects, security + cache headers
├── netlify.toml              same rules for Netlify
├── robots.txt, sitemap.xml
```

---

## 3. Colours & fonts

Edit the tokens at the top of `css/style.css`:

- Background `#0e0e0e` (near-black), raised surfaces `#141414` / `#1a1a1a`
- Text `#f1f0ec`, muted `#9a9a96`, accent `#e76f2e`
- Fonts: **Bebas Neue** (big headlines) and **Poppins** (navigation, text, labels, contact details) — both self-hosted in `assets/fonts/`

---

## 4. Media in `assets/work/`

Each project uses three files named after its slug:

| File | Used for | Recommended export |
|---|---|---|
| `<slug>.webp` | card image + page poster | 1600px wide, WebP quality 80 (≈50–200 KB) |
| `<slug>-preview.mp4` | 5-second hover preview | 960px wide, H.264, no audio, ≈150–500 KB |
| `<slug>.mp4` | full film on the project page | H.264, CRF 20, AAC audio, "fast start" |

Vertical films also have `<slug>-frame.webp` (a 9:16 poster frame).
The homepage showreel is `showreel.mp4` (1600px, no audio) with `showreel.webp` as its first frame.

**To replace a file, keep the same name** and push — nothing else needs to change.

Handy ffmpeg commands:

```bash
# hover preview (5 s from second 3)
ffmpeg -ss 3 -t 5 -i input.mp4 -an -vf "scale=960:-2" -c:v libx264 -crf 30 -pix_fmt yuv420p -movflags +faststart slug-preview.mp4

# full film for the web
ffmpeg -i input.mp4 -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a copy -movflags +faststart slug.mp4
```

Why this matters: images and videos used to be 4–70 MB each, which is why the first section looked
broken on the first visit and fine after a reload (the browser had cached them by then).

---

## 5. Adding a new project

1. Export the three media files into `assets/work/` (see above).
2. Duplicate a page in `projects/`, rename it, and change the title, meta tags, role, duration and video paths.
3. Copy a card (`<a class="work-card" …>`) in `work.html` (and `index.html` if it should be on the homepage),
   and update the link, image, title and `data-slug`. Add `work-card--wide` for a full-width card.
4. Add the project to `js/projects.js` so its hover preview plays.
5. Update the Previous / Next links on the neighbouring project pages and add the URL to `sitemap.xml`.

---

## 6. Your portrait (homepage "About me")

Save a portrait as `assets/images/amee-portrait.webp` (about 800 × 1000px). In `index.html`, find the
`REPLACE` comment in the About section, uncomment the `<img>` line and remove the class
`about-me__portrait--placeholder`.

---

## 7. Contact form

There is no server. When someone presses **Let's talk**, their own email app opens with a pre-filled
message to `work.ameedave@email.com`. To change the address, edit `CONTACT_EMAIL` in `js/main.js`
and the email links in the HTML files. The form asks for name, email and project details.

---

## 8. Deploying (Vercel)

```bash
git add .
git commit -m "Update site"
git push
```

Vercel redeploys automatically on every push to `main`.
Custom domain: Vercel project → **Settings → Domains → Add**, then follow the DNS instructions.
Afterwards, find-and-replace `https://www.ameedave.com` with your real domain in all HTML files,
`sitemap.xml` and `robots.txt`.

Run locally: open the folder in VS Code → right-click `index.html` → **Open with Live Server**
(or run `python -m http.server` in the folder). Opening the file by double-clicking won't work,
because the site uses root paths like `/css/style.css`.

---

## 9. Analytics & cookies

Each page has a commented-out Plausible script in the `<head>` — uncomment it once you have an account.
Plausible is cookie-free, so no cookie banner is needed. If you ever add a tool that sets
non-essential cookies, add a consent banner and update `privacy.html`.
