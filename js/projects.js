/* =========================================================
   PROJECTS.JS
   Single source of truth for all project data, plus the
   homepage filter logic and project-page prev/next navigation
   that read from it.

   HOW TO ADD A NEW PROJECT
   1. Add a new object to the PROJECTS array below.
   2. Create /projects/<slug>.html (duplicate an existing one
      and edit the text — the <head>, header, footer and
      scripts can stay the same).
   3. Add a matching <article class="project-tile"> block to
      the "SELECTED WORK" grid in index.html.
   4. Drop the poster + preview + full video files into
      /assets/posters/ and /assets/videos/ using the paths you
      set on the object below.
   That's it — prev/next links and filtering pick it up
   automatically because they read from this array.
   ========================================================= */

export const PROJECTS = [
  {
    id: 1,
    number: '01',
    slug: 'mercedes-live-your-signature',
    title: 'Mercedes — Live Your Signature',
    category: { value: 'ai-ad-film', label: 'AI Ad Film' },
    year: 2026,
    duration: '00:25',
    role: 'Creative Direction, AI Filmmaking & Editing',
    tools: ['Blender', 'After Effects', 'AI Generation'],
    overview: [
      'Live Your Signature imagines a Mercedes campaign built entirely through AI-assisted filmmaking. The objective was to translate the marque’s design language into a short, emotionally charged film without a traditional production shoot.',
      'It’s aimed at an audience that already associates the brand with precision and restraint, so the film had to feel engineered rather than generated. The central idea follows a single vehicle moving through changing light as a metaphor for a signature that never wavers. The intended feeling is quiet confidence — the sense of arriving, not trying.'
    ],
    concept: 'The brief started as a personal exercise: could an AI-driven pipeline produce a film with the discipline of a real automotive campaign? The answer became the throughline — one car, one gesture, one idea, repeated with total control.',
    visualDirection: 'Framing stays low and deliberate, echoing the wide, grounded stance of the car itself. Colour is kept close to the brand’s own palette — graphite, chrome and a single warm highlight — so nothing competes with the subject.',
    cinematography: 'Camera movement is slow and mechanical, never handheld, reinforcing the sense of precision engineering. Reflections and negative space carry as much of the story as the car itself.',
    production: 'Every frame was built and iterated through AI generation tools, then art-directed shot by shot for consistency in proportion, material and light before compositing.',
    editing: 'The edit favours long holds over quick cuts, letting each frame breathe. Sound design is minimal — low mechanical tones and silence used deliberately to keep focus on the image.',
    // --- REPLACE MEDIA: swap these paths for final assets ---
    poster: '/assets/posters/mercedes-poster.webp',
    previewVideo: '/assets/videos/mercedes-live-your-signature-preview.mp4',
    // Full film: point this at an external host (Vimeo / Cloudflare Stream / Bunny Stream)
    // once the final edit is ready, e.g. https://player.vimeo.com/video/XXXXXXXXX
    fullVideo: '/assets/videos/mercedes-live-your-signature-full.mp4',
    gallery: [
      { src: '/assets/images/mercedes-still-01.webp', alt: 'Mercedes concept film — wide exterior still, low camera angle', caption: 'Still 01 — Exterior, dusk' },
      { src: '/assets/images/mercedes-still-02.webp', alt: 'Mercedes concept film — close detail of headlamp and grille', caption: 'Still 02 — Detail, chrome and light' },
      { src: '/assets/images/mercedes-still-03.webp', alt: 'Mercedes concept film — rear three-quarter still in motion', caption: 'Still 03 — Departure' }
    ],
    disclaimer: true
  },
  {
    id: 2,
    number: '02',
    slug: 'luxury-watch-film',
    title: 'Badminton Women Player',
    category: { value: 'ai-ad-film', label: 'AI Ad Film' },
    year: 2026,
    duration: '00:30',
    role: 'AI Filmmaking, Cinematography & Editing',
    tools: ['AI Generation', 'After Effects', 'DaVinci Resolve'],
    overview: [
      'The Signature of Time is a concept film for a fictional luxury watch, built to sit alongside the kind of advertising high-horology brands commission for launch campaigns. The objective was to communicate craftsmanship and permanence without a single spoken word.',
      'It’s aimed at an audience fluent in luxury visual language — people who notice light on metal before they notice a tagline. The central idea treats the watch mechanism as a living, breathing object, its motion mirrored by the film’s own pacing. The desired emotion is stillness — the feeling of time being respected rather than spent.'
    ],
    concept: 'The idea grew from a simple question: what does patience look like on screen? The film answers with extreme close-ups and unhurried pacing, treating the watch’s internal motion as the true subject.',
    visualDirection: 'A near-black palette lets every highlight on brushed metal and sapphire glass register clearly. Warm accent light picks out the mechanism without turning the film into a product demo.',
    cinematography: 'Macro-style framing and slow push-ins recreate the intimacy of holding the piece in hand. Depth of field isolates single components — a rotor, a hand, a jewel — one at a time.',
    production: 'AI-generated sequences were layered and refined frame by frame to maintain consistent material behaviour across every close-up, with manual correction wherever reflections broke continuity.',
    editing: 'Cuts are sparse and always motivated by the mechanism’s own rhythm. A restrained score of ticking and resonant tone underlines the film without ever becoming decorative.',
    poster: '/assets/posters/watch-poster.webp',
    previewVideo: '/assets/videos/luxury-watch-film-preview.mp4',
    fullVideo: '/assets/videos/luxury-watch-film-full.mp4',
    gallery: [
      { src: '/assets/images/watch-still-01.webp', alt: 'Luxury watch concept film — macro still of the movement', caption: 'Still 01 — The movement' },
      { src: '/assets/images/watch-still-02.webp', alt: 'Luxury watch concept film — dial and hands in low light', caption: 'Still 02 — Dial, low light' },
      { src: '/assets/images/watch-still-03.webp', alt: 'Luxury watch concept film — case and strap detail', caption: 'Still 03 — Case detail' }
    ],
    disclaimer: true
  },
  {
    id: 3,
    number: '03',
    slug: 'perfume-product-film',
    title: 'Aqua Hydration Serum',
    category: { value: 'ai-ad-film', label: 'AI Ad Film' },
    year: 2026,
    duration: '00:20',
    role: '3D Animation, Lighting & Editing',
    tools: ['Blender', 'After Effects'],
    overview: [
      'Sculpted in Scent is a 3D product film created for a fictional perfume house, designed to function as a hero asset for a fragrance launch. The objective was to give an intangible product — scent — a physical, sculptural presence on screen.',
      'It targets an audience used to premium beauty advertising, where texture and light do the persuading. The central idea renders the fragrance itself as a moving form, rising and settling around the bottle like liquid glass. The desired emotion is sensory anticipation — the moment just before a scent is experienced.'
    ],
    concept: 'Perfume is famously hard to film because there is nothing literal to show. The concept solves this by visualising the scent as an abstract, fluid material that behaves the way a fragrance’s opening, heart and base notes might if they had form.',
    visualDirection: 'A warm, low-contrast palette keeps focus on the bottle and its reflections. Every surface — glass, liquid, metal cap — was styled to catch light differently, building visual rhythm across the film.',
    cinematography: 'The virtual camera orbits gently rather than cutting between angles, so the product stays the fixed point in an otherwise fluid frame.',
    production: 'The bottle and fluid simulation were modelled and animated entirely in Blender, with lighting rebuilt across several passes to get glass refraction and liquid behaviour to read correctly.',
    editing: 'A single continuous shot structure was chosen over multiple cuts, with the edit focused on timing the fluid’s movement to a soft, minimal sound bed.',
    poster: '/assets/posters/perfume-poster.webp',
    previewVideo: '/assets/videos/perfume-product-film-preview.mp4',
    fullVideo: '/assets/videos/perfume-product-film-full.mp4',
    gallery: [
      { src: '/assets/images/perfume-still-01.webp', alt: 'Perfume product film — bottle with fluid form rising', caption: 'Still 01 — Rise' },
      { src: '/assets/images/perfume-still-02.webp', alt: 'Perfume product film — vertical detail of glass and cap', caption: 'Still 02 — Glass and cap' },
      { src: '/assets/images/perfume-still-03.webp', alt: 'Perfume product film — bottle settled, final frame', caption: 'Still 03 — Settle' }
    ],
    disclaimer: true
  },
  {
    id: 4,
    number: '04',
    slug: 'sportswear-ai-film',
    title: 'Mahalaxmi Spices Masala',
    category: { value: 'ai-ad-film', label: 'AI Ad Film' },
    year: 2026,
    duration: '00:28',
    role: 'Creative Direction, AI Filmmaking & Editing',
    tools: ['AI Generation', 'After Effects', 'Premiere Pro'],
    overview: [
      'Built for Motion is a concept campaign film for a fictional performance sportswear label, made to sit within the kind of kinetic, high-energy advertising global sportswear brands release around major product drops. The objective was to communicate engineering and performance through pure movement.',
      'It’s built for an audience that responds to rhythm and physicality over dialogue. The central idea follows fabric and form in motion — no faces, no narrative, just the product doing what it was built to do. The desired emotion is momentum — the feeling of being pulled forward.'
    ],
    concept: 'The idea was to strip a sportswear film down to its most essential ingredient: motion itself. Every shot exists to show tension, release or speed in the material.',
    visualDirection: 'High-contrast lighting and a cool, graphite palette give the film an athletic, technical edge, with the brand’s accent colour reserved for single, deliberate flashes.',
    cinematography: 'Fast, directional camera moves are paired with extreme slow motion on impact frames, creating a push-pull rhythm that mirrors the sport itself.',
    production: 'Motion sequences were generated and iterated through an AI pipeline, then graded and stabilised to match the kinetic energy of traditionally shot sportswear films.',
    editing: 'The cut is built on rhythm first, image second — cuts land on beats, and a percussive sound design does much of the storytelling.',
    poster: '/assets/posters/sportswear-poster.webp',
    previewVideo: '/assets/videos/sportswear-ai-film-preview.mp4',
    fullVideo: '/assets/videos/sportswear-ai-film-full.mp4',
    gallery: [
      { src: '/assets/images/sportswear-still-01.webp', alt: 'Sportswear concept film — fabric in motion, wide shot', caption: 'Still 01 — Tension' },
      { src: '/assets/images/sportswear-still-02.webp', alt: 'Sportswear concept film — vertical detail of textile weave', caption: 'Still 02 — Weave detail' },
      { src: '/assets/images/sportswear-still-03.webp', alt: 'Sportswear concept film — impact frame, extreme slow motion', caption: 'Still 03 — Impact' }
    ],
    disclaimer: true
  },
  {
    id: 5,
    number: '05',
    slug: 'ceramic-product-film',
    title: 'E-Motorad Electric Cycle',
    category: { value: 'ai-ad-film', label: 'AI Ad Film' },
    year: 2026,
    duration: '00:22',
    role: '3D Animation, Art Direction & Editing',
    tools: ['Blender', 'After Effects'],
    overview: [
      'Formed by Earth is a 3D product film created for a fictional ceramics studio, built to showcase a handmade-style homeware collection with the polish of a design-led product launch. The objective was to make digitally produced objects feel tactile and earthbound.',
      'It speaks to an audience drawn to slow, considered design over mass production. The central idea traces each piece back to raw material — clay, glaze and fire — before revealing the finished form. The desired emotion is groundedness — the sense of something made by hand even when it wasn’t.'
    ],
    concept: 'The film treats the ceramics not as finished products but as the result of a process, opening on raw material and closing on the object it becomes.',
    visualDirection: 'Warm, matte textures and natural-toned lighting were prioritised over the glossy finish typical of CG product work, keeping the pieces feeling handmade.',
    cinematography: 'Static, considered compositions with occasional slow reveals let each object’s texture and imperfection read clearly, rather than relying on movement to hold attention.',
    production: 'Surface detail — glaze pooling, matte clay, fine cracks — was hand-tuned in Blender’s shader system across multiple lighting setups to avoid the plastic look common in CG ceramics.',
    editing: 'Cuts are unhurried and few, giving each object room to sit on screen. Sound design draws on natural, tactile textures — kiln heat, water, stone.',
    poster: '/assets/posters/ceramic-poster.webp',
    previewVideo: '/assets/videos/ceramic-product-film-preview.mp4',
    fullVideo: '/assets/videos/ceramic-product-film-full.mp4',
    gallery: [
      { src: '/assets/images/ceramic-still-01.webp', alt: 'Ceramic product film — raw clay form, wide still', caption: 'Still 01 — Raw material' },
      { src: '/assets/images/ceramic-still-02.webp', alt: 'Ceramic product film — vertical detail of glaze texture', caption: 'Still 02 — Glaze detail' },
      { src: '/assets/images/ceramic-still-03.webp', alt: 'Ceramic product film — finished vessel, final frame', caption: 'Still 03 — Finished form' }
    ],
    disclaimer: true
  },
  {
    id: 6,
    number: '06',
    slug: '3D-product-perfume-bottle',
    title: 'Up Coming',
    category: { value: '3d-product-film', label: '3D Product Film' },
    year: 2026,
    duration: '00:45',
    role: 'Creative Direction, Editing & Sound Design',
    tools: ['Premiere Pro', 'After Effects', 'AI Generation'],
    overview: [
      'Beyond the Frame is a brand story film created as a concept piece for a design-led studio, structured the way a founder-facing brand film might open a pitch or anniversary reel. The objective was to communicate a creative philosophy rather than sell a specific product.',
      'It’s intended for an audience of collaborators and clients evaluating a studio’s point of view. The central idea moves between process and outcome — sketches, screens and finished work — to show craft as a continuous thread. The desired emotion is trust — the sense of being in capable, considered hands.'
    ],
    concept: 'Rather than presenting a single project, the film treats the studio’s process itself as the story, weaving fragments of work across disciplines into one continuous idea.',
    visualDirection: 'A restrained, editorial visual language — generous negative space, uppercase typography and a single accent colour — mirrors the studio’s own design system throughout the film.',
    cinematography: 'Camera work stays observational, favouring static and slow-drift shots of real process moments over staged, performative footage.',
    production: 'Live-action style sequences were generated and refined through an AI-assisted pipeline, then composited with motion graphics to unify formats and pacing.',
    editing: 'The edit interlaces short fragments rather than long scenes, held together by a single evolving sound bed that carries the film’s pacing from start to finish.',
    poster: '/assets/posters/brand-story-poster.webp',
    previewVideo: '/assets/videos/brand-story-film-preview.mp4',
    fullVideo: '/assets/videos/brand-story-film-full.mp4',
    gallery: [
      { src: '/assets/images/brand-story-still-01.webp', alt: 'Brand story film — process still, wide shot', caption: 'Still 01 — Process' },
      { src: '/assets/images/brand-story-still-02.webp', alt: 'Brand story film — vertical detail, work in progress', caption: 'Still 02 — In progress' },
      { src: '/assets/images/brand-story-still-03.webp', alt: 'Brand story film — finished work, final frame', caption: 'Still 03 — Outcome' }
    ],
    disclaimer: true
  },

{
    id: 7,
    number: '07',
    slug: '3D-product-perfume-bottle',
    title: '3D Product Perfume Bottle',
    category: { value: '3d-product-film', label: '3D Product Film' },
    year: 2026,
    duration: '00:45',
    role: 'Creative Direction, Editing & Sound Design',
    tools: ['Premiere Pro', 'After Effects', 'AI Generation'],
    overview: [
      'Beyond the Frame is a brand story film created as a concept piece for a design-led studio, structured the way a founder-facing brand film might open a pitch or anniversary reel. The objective was to communicate a creative philosophy rather than sell a specific product.',
      'It’s intended for an audience of collaborators and clients evaluating a studio’s point of view. The central idea moves between process and outcome — sketches, screens and finished work — to show craft as a continuous thread. The desired emotion is trust — the sense of being in capable, considered hands.'
    ],
    concept: 'Rather than presenting a single project, the film treats the studio’s process itself as the story, weaving fragments of work across disciplines into one continuous idea.',
    visualDirection: 'A restrained, editorial visual language — generous negative space, uppercase typography and a single accent colour — mirrors the studio’s own design system throughout the film.',
    cinematography: 'Camera work stays observational, favouring static and slow-drift shots of real process moments over staged, performative footage.',
    production: 'Live-action style sequences were generated and refined through an AI-assisted pipeline, then composited with motion graphics to unify formats and pacing.',
    editing: 'The edit interlaces short fragments rather than long scenes, held together by a single evolving sound bed that carries the film’s pacing from start to finish.',
    poster: '/assets/posters/brand-story-poster.webp',
    previewVideo: '/assets/videos/brand-story-film-preview.mp4',
    fullVideo: '/assets/videos/brand-story-film-full.mp4',
    gallery: [
      { src: '/assets/images/brand-story-still-01.webp', alt: 'Brand story film — process still, wide shot', caption: 'Still 01 — Process' },
      { src: '/assets/images/brand-story-still-02.webp', alt: 'Brand story film — vertical detail, work in progress', caption: 'Still 02 — In progress' },
      { src: '/assets/images/brand-story-still-03.webp', alt: 'Brand story film — finished work, final frame', caption: 'Still 03 — Outcome' }
    ],
    disclaimer: true
  },

];

/**
 * Look up a single project by its slug.
 * @param {string} slug
 * @returns {object|undefined}
 */
export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}

/* ---------------------------------------------------------
   HOMEPAGE FILTERS
   Operates on the static markup already in index.html so the
   grid is fully present (and crawlable) before JS runs.
   --------------------------------------------------------- */
function initProjectFilters() {
  const filterGroup = document.querySelector('[data-filter-group]');
  const tiles = document.querySelectorAll('[data-project-tile]');
  const status = document.querySelector('[data-filter-status]');

  if (!filterGroup || !tiles.length) return;

  const buttons = filterGroup.querySelectorAll('.filter-btn');

  function applyFilter(value) {
    let visibleCount = 0;

    tiles.forEach((tile) => {
      const matches = value === 'all' || tile.dataset.category === value;
      tile.classList.toggle('is-filtered-out', !matches);
      if (matches) visibleCount += 1;
    });

    if (status) {
      status.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? '' : 's'}`;
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      applyFilter(button.dataset.filter);
    });
  });
}

/* ---------------------------------------------------------
   PROJECT PAGE — PREVIOUS / NEXT NAVIGATION
   Reads the current slug from <body data-project-slug="...">
   and wires the prev/next/back links automatically.
   --------------------------------------------------------- */
function initProjectNav() {
  const slug = document.body.dataset.projectSlug;
  if (!slug) return;

  const currentIndex = PROJECTS.findIndex((project) => project.slug === slug);
  if (currentIndex === -1) return;

  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const prevLink = document.querySelector('[data-project-nav="prev"]');
  const nextLink = document.querySelector('[data-project-nav="next"]');

  if (prevLink) {
    prevLink.href = `/projects/${prevProject.slug}.html`;
    const titleEl = prevLink.querySelector('[data-project-nav-title]');
    if (titleEl) titleEl.textContent = prevProject.title;
  }

  if (nextLink) {
    nextLink.href = `/projects/${nextProject.slug}.html`;
    const titleEl = nextLink.querySelector('[data-project-nav-title]');
    if (titleEl) titleEl.textContent = nextProject.title;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initProjectNav();
});
