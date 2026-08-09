# Amee Dave — Portfolio Website

A premium, minimal portfolio for Amee Dave, AI Filmmaker & Visual Storyteller. Built with plain HTML5, CSS3 and vanilla JavaScript only — no frameworks, no build step, no backend.

---

## 1. Project Overview

- **Pages:** Home, About & Contact, Privacy, 404, and six individual project pages.
- **Stack:** HTML5, CSS3, vanilla JavaScript (ES modules). No React, no Next.js, no Tailwind, no Bootstrap, no build tools.
- **Hosting:** designed for GitHub → Netlify, with a custom domain connected afterward.
- **Fonts:** Bebas Neue (display) and Manrope (body), loaded from Google Fonts.
- **Colours:** dark pages use `#0A0A0A` background / `#FFFFFF` text; light pages (About, Privacy) use `#F5F2EC` background / `#111111` text; accent is `#E76F2E` throughout.

---

## 2. File Structure

```
amee-portfolio/
│
├── index.html
├── about.html
├── privacy.html
├── 404.html
├── netlify.toml
├── robots.txt
├── sitemap.xml
├── README.md
│
├── projects/
│   ├── mercedes-live-your-signature.html
│   ├── luxury-watch-film.html
│   ├── perfume-product-film.html
│   ├── sportswear-ai-film.html
│   ├── ceramic-product-film.html
│   └── brand-story-film.html
│
├── css/
│   ├── reset.css
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js              (header scroll, mobile menu, active nav, scroll reveal)
│   ├── projects.js          (project data, homepage filters, prev/next nav)
│   ├── video-controller.js  (hero video, hover previews, custom "VIEW" cursor)
│   └── transitions.js       (full-screen page transition overlay)
│
└── assets/
    ├── images/     (gallery stills + og-default.jpg)
    ├── posters/    (poster frames for hero + each project)
    ├── icons/      (favicon + apple touch icon)
    └── videos/     (hero + project preview/full placeholder videos)
```

All CSS/JS/image/page links use **root-relative paths** (e.g. `/css/style.css`, `/projects/mercedes-live-your-signature.html`). This is why the site needs to be served from a local server or Netlify rather than opened directly as a `file://` URL — see the next section.

---

## 3. Opening the Website Locally

Because the site uses root-relative paths and ES module JavaScript (`<script type="module">`), it needs to be served over `http://`, not opened directly from disk. The easiest way is VS Code's Live Server (next section). If you have Python installed, you can also run:

```bash
cd amee-portfolio
python3 -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

---

## 4. Running with VS Code Live Server

1. Open the `amee-portfolio` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel if you don't already have it.
3. Right-click `index.html` in the file explorer and choose **Open with Live Server**.
4. Your default browser opens the site at an address like `http://127.0.0.1:5500`. Navigation, filters, hover previews and the mobile menu all work exactly as they will in production.

---

## 5. Creating a GitHub Repository

1. Go to [github.com](https://github.com) and click **New repository**.
2. Name it something like `amee-portfolio`, leave it public or private as you prefer, and skip adding a README (you already have one).
3. Click **Create repository**. GitHub will show you a page with setup commands — keep that tab open for the next step.

---

## 6. Uploading / Pushing Files to GitHub

From inside the `amee-portfolio` folder, using a terminal:

```bash
git init
git add .
git commit -m "Initial commit — Amee Dave portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/amee-portfolio.git
git push -u origin main
```

If you'd rather not use the command line, you can also drag and drop the entire `amee-portfolio` folder contents into GitHub's web upload interface on the new repository's page.

---

## 7. Connecting GitHub to Netlify

1. Sign in at [netlify.com](https://netlify.com) (a free account is sufficient — nothing in this project needs a paid plan).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub** and authorize Netlify if prompted.
4. Select your `amee-portfolio` repository.
5. Build settings: leave the **Build command** blank (there is no build step) and set the **Publish directory** to the repository root (`.` — this matches `netlify.toml`, so Netlify should pick it up automatically).
6. Click **Deploy site**.

---

## 8. Deploying the Site

Once connected, Netlify deploys automatically:

- Every push to your `main` branch triggers a new deploy.
- You can also trigger a manual deploy from the Netlify dashboard (**Deploys → Trigger deploy**).
- `netlify.toml` already configures clean URLs (e.g. `/about` → `about.html`), a proper 404 page, security headers, and sensible caching — no extra dashboard configuration is required.

---

## 9. Connecting a Custom Domain

1. In the Netlify dashboard, open your site → **Domain settings → Add a domain**.
2. Enter your domain (e.g. `ameedave.com`) and follow Netlify's instructions to either:
   - point your domain's nameservers at Netlify DNS (simplest), or
   - add the A/CNAME records Netlify gives you at your existing DNS provider.
3. Netlify automatically provisions a free HTTPS certificate (via Let's Encrypt) once DNS is verified — this can take a few minutes to a few hours.
4. **Important:** once your final domain is live, replace every placeholder occurrence of `https://www.ameedave.com` with your real domain. It appears in:
   - `<link rel="canonical">` and Open Graph/Twitter tags in every HTML file
   - the JSON-LD structured data blocks
   - `robots.txt` and `sitemap.xml`

A simple way to do this across the whole project: use your code editor's **Find & Replace in Files** for `https://www.ameedave.com` → your real domain.

---

## 10. Replacing Images

All placeholder images live in `assets/images/`, `assets/posters/` and `assets/icons/`. They were generated as clearly labelled placeholder graphics (dark background, project title, "placeholder" caption) so the site still looks intentional before real photography is added.

To replace one:

1. Export your final image at the **same filename** (e.g. `mercedes-poster.webp`) so every page that references it updates automatically, **or**
2. Use a new filename and update the `src` in the relevant HTML file(s) and, for project posters, the `poster` field in `js/projects.js`.

Recommended sizes: posters/hero images at 1920×1080 (16:9), gallery stills at roughly 1600×1067 (landscape) or 1200×1500 (portrait) to match the existing mosaic rhythm.

---

## 11. Replacing Hero and Preview Videos

Video files live in `assets/videos/`. Each is currently a short placeholder clip with a text label so autoplay/hover behaviour can be tested end-to-end before real footage arrives.

- **Hero showreel:** `assets/videos/showreel-preview.mp4` (+ optional `.webm`), referenced in `index.html`.
- **Project hover previews:** `assets/videos/<slug>-preview.mp4`, referenced via the `previewVideo` field in `js/projects.js`.
- **Full project films:** `assets/videos/<slug>-full.mp4`, referenced via the `fullVideo` field in `js/projects.js` and the `<video>` element in each `/projects/*.html` file.

**Using an external video host instead of local files:** for full project films especially, you may prefer hosting on Vimeo, Cloudflare Stream or Bunny Stream rather than serving large files yourself. Each project page has a comment marking exactly where to swap in an embed or a hosted URL:

```html
<!-- REPLACE VIDEO: point contentUrl / source at the final edit, or swap for an
     embed from Vimeo, Cloudflare Stream or Bunny Stream once hosted externally -->
```

If you switch to an iframe embed, update the `frame-src` line in `netlify.toml`'s Content-Security-Policy to allow that provider's domain.

---

## 12. Adding a New Project

1. Open `js/projects.js` and duplicate one of the objects in the `PROJECTS` array. Fill in `number`, `slug`, `title`, `category`, `year`, `duration`, `role`, `tools`, `overview`, `concept`, `visualDirection`, `cinematography`, `production`, `editing`, `poster`, `previewVideo`, `fullVideo` and `gallery`.
2. Duplicate an existing file in `/projects/` (e.g. `mercedes-live-your-signature.html`), rename it to `<your-slug>.html`, and edit the visible text to match (title, meta description, duration, role, overview, process paragraphs, tools, gallery captions). The header, footer and `<script>` tags at the bottom can stay as they are.
3. Add a new `<article class="project-tile">` block to the `SELECTED WORK` grid in `index.html`, copying the structure of an existing tile and updating the number, slug, category, title and meta text.
4. Drop the new poster, preview video and full video files into `assets/posters/` and `assets/videos/` using the paths you set in step 1.
5. Add the new page's URL to `sitemap.xml`.

Previous/Next navigation on project pages updates automatically — it's generated from the order of the `PROJECTS` array in `js/projects.js`.

---

## 13. Updating Contact Details

Email, Instagram and LinkedIn links appear in the header's mobile menu, the About page's contact section, and the footer of every page. To update them, search the project for:

- `work.ameedave@email.com` (appears in `mailto:` links, footers and the mobile menu)
- `instagram.com/ameedavedesign` (About page contact row)
- `linkedin.com/in/ameecreator` (About page contact row)

Update each occurrence to match — your editor's project-wide Find & Replace makes this quick.

---

## 14. Adding Plausible Analytics

This site ships analytics-ready but with no active tracking by default. Every HTML page has a commented placeholder in the `<head>`:

```html
<!-- Privacy-friendly analytics (Plausible) — insert once an account exists:
<script defer data-domain="www.ameedave.com" src="https://plausible.io/js/script.js"></script>
-->
```

To activate it:

1. Create a account at [plausible.io](https://plausible.io) and add your domain.
2. Uncomment the script tag in every HTML page (or do a project-wide find of the comment block) and set `data-domain` to your real domain.
3. Plausible is cookie-free, so **no cookie consent banner is required** for this specific setup. See the note at the end of this README if you later add a cookie-based tool instead.

---

## 15. Recommended Video Export Settings

- **Codec:** H.264 (MP4) for maximum compatibility; add a VP9/WebM version for the hero video where possible.
- **Resolution:** 1920×1080 for hero/full films; hover previews can be exported smaller (1280×800) since they play at thumbnail size.
- **Bitrate:** aim for a heavily compressed, web-friendly file — roughly 4–6 Mbps for 1080p H.264 is usually enough for a crisp preview without a huge file size.
- **Audio:** hover previews and the hero video are muted in the browser regardless, so exporting them without an audio track saves file size. Full project films can keep audio.
- **Duration:** keep hover previews short (4–8 seconds, looping) so they feel responsive and load quickly.
- **Poster frame:** always export a matching still frame (see image settings below) so the video container never shows an empty black box while loading.

---

## 16. Recommended Image Export Settings

- **Format:** WebP for photography and stills (`.webp`) — smaller than JPEG at equivalent quality. Use JPEG only as a fallback if a tool in your pipeline doesn't support WebP.
- **Poster/hero images:** 1920×1080, quality ~80–85%.
- **Gallery stills:** 1600×1067 (landscape) or 1200×1500 (portrait), quality ~80–85%.
- **Social share image (`og-default.jpg`):** exactly 1200×630 for correct rendering on LinkedIn, Twitter/X and Facebook link previews.
- **Favicon/app icons:** keep the existing SVG (`favicon.svg`) as the primary favicon; only replace the PNG fallbacks if you change the monogram mark.

---

## A note on cookies

This project intentionally ships **without a cookie consent banner**, because the recommended analytics setup (Plausible) doesn't use cookies or track individuals across sites. If you later add a tool that *does* set non-essential cookies — advertising pixels, session-replay tools, a cookie-based analytics platform, etc. — you will need to add a cookie consent banner and update `privacy.html` accordingly before deploying that change.

---

## Credits

Design and build: created for Amee Dave, AI Filmmaker & Visual Storyteller, based in Gujarat, India.
