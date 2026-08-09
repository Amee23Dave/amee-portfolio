/* =========================================================
   VIDEO-CONTROLLER.JS
   Handles every video-related interaction:
   - hero showreel autoplay + fallback messaging
   - project tile hover-to-play previews (hover-capable only)
   - custom "VIEW" cursor that follows the pointer
   All preview video sources are read from js/projects.js so
   there is a single place to update media paths.
   ========================================================= */

import { PROJECTS } from './projects.js';

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------------------------------------------------------
   HERO SHOWREEL
   --------------------------------------------------------- */
function initHeroVideo() {
  const video = document.querySelector('[data-hero-video]');
  const fallback = document.querySelector('[data-hero-fallback]');
  if (!video) return;

  const showFallback = () => {
    video.style.display = 'none';
    if (fallback) fallback.classList.add('is-visible');
  };

  video.addEventListener('canplay', () => video.classList.add('is-ready'), { once: true });
  video.addEventListener('error', showFallback);

  // If autoplay is blocked or the source fails silently, fall back
  // after a short grace period rather than leaving a black frame.
  const readyTimeout = window.setTimeout(() => {
    if (video.readyState < 2) showFallback();
  }, 4000);

  video.addEventListener('canplay', () => window.clearTimeout(readyTimeout), { once: true });

  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      // Autoplay was blocked — poster stays visible, no error state needed.
    });
  }
}

/* ---------------------------------------------------------
   CUSTOM "VIEW" CURSOR
   --------------------------------------------------------- */
function createCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-view';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = 'View';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-custom-cursor');

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let raf = null;

  function loop() {
    // Smooth lerp follow — no elastic overshoot, just gentle catch-up.
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${cursor.classList.contains('is-visible') ? 1 : 0.6})`;
    raf = window.requestAnimationFrame(loop);
  }

  window.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  raf = window.requestAnimationFrame(loop);

  return cursor;
}

/* ---------------------------------------------------------
   PROJECT TILE HOVER PREVIEWS
   --------------------------------------------------------- */
function initProjectTileHover() {
  const tiles = document.querySelectorAll('[data-project-tile]');
  if (!tiles.length) return;

  const cursor = canHover ? createCursor() : null;

  // Only enable hover video once a tile has been visible on screen,
  // so we never fetch preview media the visitor hasn't scrolled to.
  const readyTiles = new WeakSet();

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          readyTiles.add(entry.target);
          visibilityObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });

    tiles.forEach((tile) => visibilityObserver.observe(tile));
  } else {
    tiles.forEach((tile) => readyTiles.add(tile));
  }

  tiles.forEach((tile) => {
    const frame = tile.querySelector('.project-tile__frame');
    const poster = tile.querySelector('.project-tile__poster');
    const slug = tile.dataset.slug;
    const project = PROJECTS.find((item) => item.slug === slug);
    if (!frame || !poster || !project) return;

    let video = null;

    function ensureVideo() {
      if (video) return video;
      video = document.createElement('video');
      video.className = 'project-tile__video';
      video.src = project.previewVideo;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('aria-hidden', 'true');
      video.addEventListener('canplay', () => video.classList.add('is-playing'), { once: false });
      frame.appendChild(video);
      return video;
    }

    if (!canHover) return; // touch devices: poster only, tap navigates via the wrapping link

    frame.addEventListener('mouseenter', () => {
      if (!readyTiles.has(tile)) return;
      const v = ensureVideo();
      const playPromise = v.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
      if (cursor) cursor.classList.add('is-visible');
    });

    frame.addEventListener('mouseleave', () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.classList.remove('is-playing');
      }
      if (cursor) cursor.classList.remove('is-visible');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
  initProjectTileHover();
});
