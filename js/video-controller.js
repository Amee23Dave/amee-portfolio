/* =========================================================
   VIDEO-CONTROLLER.JS
   - homepage showreel (fades in only once it can actually play)
   - hover-to-play previews on work cards (mouse devices only)
   - custom "VIEW" cursor that follows the pointer
   Preview paths come from js/projects.js.
   ========================================================= */

import { PROJECTS } from './projects.js';

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------
   SHOWREEL
   --------------------------------------------------------- */
function initShowreel() {
  const video = document.querySelector('[data-reel]');
  if (!video) return;

  const markReady = () => video.classList.add('is-ready');

  if (reduceMotion) {
    video.pause();
    video.removeAttribute('autoplay');
    return; // poster image stays visible
  }

  // The video may already be playable before this script runs
  // (cached file) — check first, then listen.
  if (video.readyState >= 3 && !video.paused) {
    markReady();
  } else {
    video.addEventListener('playing', markReady, { once: true });
  }

  const tryPlay = () => {
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => { /* autoplay blocked — poster stays */ });
    }
  };

  tryPlay();

  // Save battery/CPU: pause when the reel scrolls out of view
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      });
    }, { threshold: 0.05 }).observe(video);
  }
}

/* ---------------------------------------------------------
   CUSTOM CURSOR
   --------------------------------------------------------- */
function createCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-view';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = 'View';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-custom-cursor');

  let targetX = -200;
  let targetY = -200;
  let x = targetX;
  let y = targetY;
  let visible = false;

  window.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!visible) {
      x = targetX;
      y = targetY;
    }
  }, { passive: true });

  const loop = () => {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    const scale = visible ? 1 : 0.6;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);

  return {
    show() { visible = true; cursor.classList.add('is-visible'); },
    hide() { visible = false; cursor.classList.remove('is-visible'); },
  };
}

/* ---------------------------------------------------------
   WORK CARD HOVER PREVIEWS
   --------------------------------------------------------- */
function initWorkCards() {
  const cards = document.querySelectorAll('[data-work-card]');
  if (!cards.length || !canHover) return; // touch: poster only, tap opens project

  const cursor = createCursor();

  cards.forEach((card) => {
    const project = PROJECTS.find((item) => item.slug === card.dataset.slug);
    const media = card.querySelector('.work-card__media');
    let video = null;

    const ensureVideo = () => {
      if (video || !project || !project.preview || !media) return video;
      video = document.createElement('video');
      video.className = 'work-card__video';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('aria-hidden', 'true');
      video.src = project.preview;
      video.addEventListener('playing', () => {
        if (card.matches(':hover')) video.classList.add('is-playing');
      });
      media.appendChild(video);
      return video;
    };

    card.addEventListener('mouseenter', () => {
      cursor.show();
      if (reduceMotion) return;
      const v = ensureVideo();
      if (!v) return;
      const attempt = v.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
      if (v.readyState >= 3) v.classList.add('is-playing');
    });

    card.addEventListener('mouseleave', () => {
      cursor.hide();
      if (!video) return;
      video.classList.remove('is-playing');
      video.pause();
      video.currentTime = 0;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initShowreel();
  initWorkCards();
});
