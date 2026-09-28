/* =========================================================
   MAIN.JS — site-wide behaviour
   - header hides on scroll down, returns on scroll up
   - full-screen mobile menu (focus trap, Esc, close button)
   - active navigation state
   - styled fallback for any image that fails to load
   - contact form → opens the visitor's email app (no backend)
   ========================================================= */

const CONTACT_EMAIL = 'work.ameedave@email.com';

/* ---------------------------------------------------------
   HEADER
   --------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('has-scrolled', y > 8);

    const menuOpen = document.body.classList.contains('no-scroll');
    if (!menuOpen && y > 120 && y > lastY + 2) {
      header.classList.add('is-hidden');
    } else if (y < lastY - 2 || y <= 120) {
      header.classList.remove('is-hidden');
    }

    lastY = y;
    ticking = false;
  };

  update();
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ---------------------------------------------------------
   MOBILE MENU
   --------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;

  const closeButton = menu.querySelector('[data-menu-close]');
  const focusable = () => Array.from(menu.querySelectorAll('a[href], button:not([disabled])'));

  function onKeydown(event) {
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;

    const items = focusable();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onKeydown);
    const firstLink = menu.querySelector('.mobile-menu__link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu({ returnFocus = true } = {}) {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onKeydown);
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeButton) closeButton.addEventListener('click', () => closeMenu());

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu({ returnFocus: false }));
  });

  // If the window grows past the mobile breakpoint, make sure the page can scroll
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches && menu.classList.contains('is-open')) closeMenu({ returnFocus: false });
  });
}

/* ---------------------------------------------------------
   ACTIVE NAVIGATION
   Works with or without ".html" (Vercel serves clean URLs)
   --------------------------------------------------------- */
function initActiveNav() {
  const path = window.location.pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  let key = null;

  if (path === '/' || path === '/index') key = 'home';
  else if (path === '/about') key = 'about';
  else if (path === '/work' || path.startsWith('/projects/')) key = 'work';

  document.querySelectorAll('[data-nav-key]').forEach((link) => {
    const active = link.dataset.navKey === key;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

/* ---------------------------------------------------------
   IMAGE FALLBACK
   Handles errors that happen after this script runs AND images
   that had already failed before it loaded.
   --------------------------------------------------------- */
function applyFallback(img) {
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = 'true';
  const block = document.createElement('span');
  block.className = 'media-fallback';
  const text = document.createElement('span');
  text.className = 'media-fallback__text';
  text.textContent = img.dataset.fallbackText || '';
  block.appendChild(text);
  img.replaceWith(block);
}

function initImageFallbacks() {
  document.addEventListener('error', (event) => {
    const target = event.target;
    if (target instanceof HTMLImageElement && target.hasAttribute('data-fallback-text')) {
      applyFallback(target);
    }
  }, true);

  document.querySelectorAll('img[data-fallback-text]').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) applyFallback(img);
  });
}

/* ---------------------------------------------------------
   CONTACT FORM
   No server needed: builds a pre-filled email and opens the
   visitor's email app. Change CONTACT_EMAIL above if needed.
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const setStatus = (message, isError = false) => {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const details = String(data.get('details') || '').trim();

    const subject = `Project enquiry — ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Project details:',
      details,
    ].join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(`Opening your email app… If nothing happens, write to ${CONTACT_EMAIL}.`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initActiveNav();
  initImageFallbacks();
  initContactForm();
});
