/* =========================================================
   TRANSITIONS.JS — full-screen page transition
   The reveal on page load is pure CSS (see .page-transition),
   so pages never stay covered. This script only adds the
   "cover" motion when leaving a page, and clears it again if
   the browser restores the page from its back/forward cache.
   ========================================================= */

const LEAVE_DELAY = 420;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function isInternalPageLink(link) {
  if (!link || !link.href) return false;
  if (link.origin !== window.location.origin) return false;
  if (link.target && link.target !== '_self') return false;
  if (link.hasAttribute('download')) return false;
  if (/^(mailto|tel):/i.test(link.getAttribute('href') || '')) return false;

  // Same page + hash → let the browser scroll instead
  const samePath = link.pathname.replace(/\.html$/, '') === window.location.pathname.replace(/\.html$/, '');
  if (samePath && link.hash) return false;

  // Direct media files (e.g. "Download the film") open normally
  if (/\.(mp4|webm|jpg|jpeg|png|webp|pdf)$/i.test(link.pathname)) return false;

  return true;
}

function init() {
  const overlay = document.querySelector('[data-page-transition]');
  if (!overlay) return;

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href]');
    if (!isInternalPageLink(link)) return;

    if (reduceMotion.matches) return; // navigate instantly

    event.preventDefault();
    overlay.classList.add('is-covering');
    window.setTimeout(() => {
      window.location.href = link.href;
    }, LEAVE_DELAY);
  });

  // Back/forward cache: the page comes back exactly as it was left,
  // including the covering overlay — remove it so the page is visible.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) overlay.classList.remove('is-covering');
  });
}

document.addEventListener('DOMContentLoaded', init);
