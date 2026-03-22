/**
 * La Puntilla — Main
 * Inicializa todos los módulos en orden.
 */
(function (LP) {
  'use strict';

  /* goTo global para onclicks del HTML */
  window.goTo = function (selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  function boot() {
    LP.navbar.init();
    LP.hero.init();
    LP.cursorGlow.init();
    LP.reveal.init();
    LP.reservation.init();
    LP.reviewsCarousel.init();
    LP.gallery.init();

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})(window.LP = window.LP || {});
