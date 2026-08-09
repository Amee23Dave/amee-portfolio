/* =========================================================
   MAIN.JS
   Site-wide behaviour shared by every page:
   - header show/hide on scroll
   - refined full-screen mobile menu
   - active navigation state
   - scroll-triggered "reveal" animation for sections
   - styled fallback for any image that fails to load
   ========================================================= */

/* ---------------------------------------------------------
   HEADER — hide on scroll down, reveal on scroll up
   --------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  const hideThreshold = 96;

  function update() {
    const currentScrollY = window.scrollY;

    header.classList.toggle('has-scrolled', currentScrollY > 8);

    if (currentScrollY > hideThreshold && currentScrollY > lastScrollY) {
      header.classList.add('is-hidden');
    } else if (currentScrollY < lastScrollY) {
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ---------------------------------------------------------
   MOBILE MENU — refined full-screen panel (no hamburger morph)
   --------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const closeButton = menu?.querySelector('[data-menu-close]');
  if (!toggle || !menu) return;

  const focusableSelector = 'a[href], button:not([disabled])';

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    const firstLink = menu.querySelector(focusableSelector);
    if (firstLink) firstLink.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeMenu({ returnFocus = true } = {}) {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onKeydown);
    if (returnFocus) toggle.focus();
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    // Simple focus trap while the menu is open
    if (event.key === 'Tab') {
      const focusable = Array.from(menu.querySelectorAll(focusableSelector));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeButton) {
  closeButton.addEventListener('click', () => {
    closeMenu();
  });
}

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu({ returnFocus: false }));
  });
}

/* ---------------------------------------------------------
   ACTIVE NAVIGATION STATE
   --------------------------------------------------------- */
function initActiveNav() {
  const path = window.location.pathname;
  const hash = window.location.hash;
  const links = document.querySelectorAll('[data-nav-key]');
  if (!links.length) return;

  let matchKey = null;

  /* WORK
     Homepage
     Portfolio page
     Individual project pages
  */

  if (path === '/' || path.endsWith('/portfolio.html') || path.startsWith('/projects/')) {
    matchKey = 'work';
  } else if (path.endsWith('/about.html')) {
    /*matchKey = hash === '#contact' ? 'contact' : 'about';*/
    matchKey = 'about';
  }

  links.forEach((link) => {
    const isActive = link.dataset.navKey === matchKey;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
  document.addEventListener('DOMContentLoaded', () => {
  initActiveNav();
});


/* ---------------------------------------------------------
   SCROLL REVEAL — sections fade upward into view once
   --------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------
   IMAGE FALLBACK — styled block instead of a broken-image icon
   Applies to any <img> that opts in with [data-fallback-text]
   --------------------------------------------------------- */
function initImageFallbacks() {
  document.addEventListener('error', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    if (!target.hasAttribute('data-fallback-text')) return;
    if (target.dataset.fallbackApplied) return;

    target.dataset.fallbackApplied = 'true';
    const fallback = document.createElement('div');
    fallback.className = 'media-fallback';
    fallback.innerHTML = `<span class="media-fallback__text">${target.dataset.fallbackText}</span>`;
    target.replaceWith(fallback);
  }, true);
}

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initActiveNav();
  initScrollReveal();
  initImageFallbacks();
});
