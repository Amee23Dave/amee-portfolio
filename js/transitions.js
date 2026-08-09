/* =========================================================
   TRANSITIONS.JS
   Full-screen page transition overlay.
   - On load: overlay covers the screen, then exits upward to
     reveal the page (a controlled, cinematic reveal — not a
     spinner, not a bounce).
   - On internal navigation: overlay rises to cover the screen,
     then the browser navigates to the new URL.
   prefers-reduced-motion is respected globally via the
   animation-duration override in reset.css, so no separate
   branching is required here.
   ========================================================= */

const TRANSITION_MS = 550;

function isInternalNavigableLink(link) {
  if (!link || !link.href) return false;
  if (link.origin !== window.location.origin) return false;
  if (link.target && link.target !== '' && link.target !== '_self') return false;
  if (link.hasAttribute('download')) return false;
  if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) return false;

  // Same-page anchor (e.g. jumping to #contact while already on about.html)
  // should just scroll — no full-page transition needed.
  if (link.pathname === window.location.pathname && link.hash) return false;

  return true;
}

function initPageEnterTransition() {
  const overlay = document.querySelector('[data-page-transition]');
  if (!overlay) return;

  // Wait one frame so the browser paints the covered state first,
  // then trigger the upward reveal.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      overlay.classList.add('is-revealing');
    });
  });
}

function initLinkTransitions() {
  const overlay = document.querySelector('[data-page-transition]');
  if (!overlay) return;

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href]');
    if (!isInternalNavigableLink(link)) return;

    event.preventDefault();
    overlay.classList.remove('is-revealing');
    overlay.classList.add('is-covering');

    window.setTimeout(() => {
      window.location.href = link.href;
    }, TRANSITION_MS);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPageEnterTransition();
  initLinkTransitions();
});
