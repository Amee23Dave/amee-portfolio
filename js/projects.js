/* =========================================================
   PROJECTS.JS — single source of project data used by scripts
   (hover previews). The HTML pages are static for speed and SEO.

   TO ADD OR EDIT A PROJECT
   1. Update / add the object below.
   2. Add or edit its card in index.html and/or work.html.
   3. Duplicate a page in /projects/ and change the text + video.
   4. Put its media in /assets/work/:
        <slug>.webp          card + poster image (1600px wide)
        <slug>-preview.mp4   5-second muted hover preview
        <slug>.mp4           full film
   ========================================================= */

export const PROJECTS = [
  {
    "number": "01",
    "slug": "mercedes-live-your-signature",
    "title": "Mercedes — Live Your Signature",
    "category": "AI Ad Film",
    "year": "2026",
    "duration": "00:27",
    "role": "AI Filmmaking & Editing",
    "url": "/projects/mercedes-live-your-signature.html",
    "image": "/assets/work/mercedes-live-your-signature.webp",
    "preview": "/assets/work/mercedes-live-your-signature-preview.mp4",
    "video": "/assets/work/mercedes-live-your-signature.mp4",
    "poster": "/assets/work/mercedes-live-your-signature.webp",
    "format": "landscape"
  },
  {
    "number": "02",
    "slug": "badminton-women-player",
    "title": "Badminton Women Player",
    "category": "AI Ad Film",
    "year": "2026",
    "duration": "00:20",
    "role": "AI Filmmaking, Cinematography & Editing",
    "url": "/projects/badminton-women-player.html",
    "image": "/assets/work/badminton-women-player.webp",
    "preview": "/assets/work/badminton-women-player-preview.mp4",
    "video": "/assets/work/badminton-women-player.mp4",
    "poster": "/assets/work/badminton-women-player.webp",
    "format": "landscape"
  },
  {
    "number": "03",
    "slug": "aqua-hydration-serum",
    "title": "Aqua Hydration Serum",
    "category": "AI Ad Film",
    "year": "2026",
    "duration": "00:35",
    "role": "AI Filmmaking, Cinematography & Editing",
    "url": "/projects/aqua-hydration-serum.html",
    "image": "/assets/work/aqua-hydration-serum.webp",
    "preview": "/assets/work/aqua-hydration-serum-preview.mp4",
    "video": "/assets/work/aqua-hydration-serum.mp4",
    "poster": "/assets/work/aqua-hydration-serum.webp",
    "format": "cinema"
  },
  {
    "number": "04",
    "slug": "mahalaxmi-tea-masala",
    "title": "Mahalaxmi Tea Masala",
    "category": "AI Ad Film",
    "year": "2026",
    "duration": "00:16",
    "role": "Creative Direction, AI Filmmaking & Editing",
    "url": "/projects/mahalaxmi-tea-masala.html",
    "image": "/assets/work/mahalaxmi-tea-masala.webp",
    "preview": "/assets/work/mahalaxmi-tea-masala-preview.mp4",
    "video": "/assets/work/mahalaxmi-tea-masala.mp4",
    "poster": "/assets/work/mahalaxmi-tea-masala.webp",
    "format": "landscape"
  },
  {
    "number": "05",
    "slug": "e-motorad-electric-cycle",
    "title": "E-Motorad Electric Cycle",
    "category": "AI Ad Film",
    "year": "2026",
    "duration": "00:18",
    "role": "AI Filmmaking, Cinematography & Editing",
    "url": "/projects/e-motorad-electric-cycle.html",
    "image": "/assets/work/e-motorad-electric-cycle.webp",
    "preview": "/assets/work/e-motorad-electric-cycle-preview.mp4",
    "video": "/assets/work/e-motorad-electric-cycle.mp4",
    "poster": "/assets/work/e-motorad-electric-cycle-frame.webp",
    "format": "portrait"
  },
  {
    "number": "06",
    "slug": "3d-product-perfume-bottle",
    "title": "3D Product Perfume Bottle",
    "category": "3D Product Film",
    "year": "2026",
    "duration": "00:15",
    "role": "Creative Direction, Editing & Sound Design",
    "url": "/projects/3D-product-perfume-bottle.html",
    "image": "/assets/work/3d-product-perfume-bottle.webp",
    "preview": "/assets/work/3d-product-perfume-bottle-preview.mp4",
    "video": "/assets/work/3d-product-perfume-bottle.mp4",
    "poster": "/assets/work/3d-product-perfume-bottle-frame.webp",
    "format": "portrait"
  },
  {
    "number": "07",
    "slug": "3d-bedroom-animation",
    "title": "3D Bedroom Animation",
    "category": "3D Product Film",
    "year": "2026",
    "duration": "00:11",
    "role": "Creative Direction, Editing & Sound Design",
    "url": "/projects/3D-bedroom-animation.html",
    "image": "/assets/work/3d-bedroom-animation.webp",
    "preview": "/assets/work/3d-bedroom-animation-preview.mp4",
    "video": "/assets/work/3d-bedroom-animation.mp4",
    "poster": "/assets/work/3d-bedroom-animation.webp",
    "format": "landscape"
  }
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}
