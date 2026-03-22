/**
 * La Puntilla — Reveal on Scroll
 * Usa IntersectionObserver para añadir .visible a elementos
 * .reveal / .reveal-l / .reveal-r cuando entran al viewport.
 * Incluye polyfill básico basado en scroll para browsers sin IO.
 */
(function (LP) {
  'use strict';

  function init() {
    var targets = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
    if (!targets.length) return;

    /* ── Con IntersectionObserver (modern) ── */
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      targets.forEach(function (el) { observer.observe(el); });
      return;
    }

    /* ── Fallback: scroll event (IE / navegadores viejos) ── */
    function checkAll() {
      var winH = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach(function (el) {
        if (el.classList.contains('visible')) return;
        var rect = el.getBoundingClientRect();
        if (rect.top < winH * 0.9) {
          el.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', checkAll, { passive: true });
    window.addEventListener('resize', LP.utils.debounce(checkAll, 150));
    checkAll(); /* ejecutar al cargar por si ya son visibles */
  }

  LP.reveal = { init: init };

})(window.LP = window.LP || {});
