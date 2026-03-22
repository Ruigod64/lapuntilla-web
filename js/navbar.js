/**
 * La Puntilla — NavBar
 * Maneja: efecto scroll, menú hamburguesa y cierre de móvil.
 */
(function (LP) {
  'use strict';

  var goTo = LP.utils.goTo;

  function init() {
    var navbar    = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var mobileMenu= document.getElementById('mobile-menu');

    if (!navbar) return;

    /* ── Efecto scroll ── */
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ── Hamburger ── */
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        var open = hamburger.classList.toggle('open');
        if (mobileMenu) mobileMenu.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }

    /* ── Cerrar menú al hacer resize a desktop ── */
    window.addEventListener('resize', LP.utils.debounce(function () {
      if (window.innerWidth > 768) {
        if (hamburger)   hamburger.classList.remove('open');
        if (mobileMenu)  mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    }, 150));
  }

  /* Función global para cerrar el menú (usada en inline onclick) */
  window.closeMenu = function () {
    var hamburger  = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (hamburger)  hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  LP.navbar = { init: init };

})(window.LP = window.LP || {});
