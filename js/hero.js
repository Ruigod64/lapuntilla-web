/**
 * La Puntilla — Hero
 * Maneja: partículas, parallax de capas y animación de entrada.
 */
(function (LP) {
  'use strict';

  function initParticles() {
    var container = document.getElementById('particles');
    if (!container) return;

    var colors = ['#26b5ad', '#1a7b76', '#d95f3b', '#c9870d', '#f0e4c8'];

    for (var i = 0; i < 18; i++) {
      var p    = document.createElement('span');
      p.className = 'particle';

      var size = Math.random() * 4 + 2;
      p.style.cssText = [
        'width:'             + size + 'px',
        'height:'            + size + 'px',
        'left:'              + Math.random() * 100 + '%',
        'top:'               + (55 + Math.random() * 40) + '%',
        'background:'        + colors[Math.floor(Math.random() * colors.length)],
        'animation-duration:'+ (Math.random() * 6 + 7) + 's',
        'animation-delay:'   + Math.random() * 9 + 's',
      ].join(';');

      container.appendChild(p);
    }
  }

  function initParallax() {
    var photo = document.getElementById('hero-photo');
    var bg    = document.getElementById('hero-bg');
    var waves = document.getElementById('hero-waves');
    if (!bg) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var progress = Math.min(window.scrollY / window.innerHeight, 1);
          if (photo) photo.style.transform = 'translateY(' + (progress * 18) + '%)';
          bg.style.transform    = 'translateY(' + (progress * 22) + '%)';
          if (waves) waves.style.transform = 'translateY(' + (progress * 12) + '%)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function initEntrance() {
    /* Activa las transiciones CSS del hero al cargar la página */
    var content = document.getElementById('hero-content');
    if (!content) return;
    content.classList.add('hero-loaded');
  }

  function init() {
    initParticles();
    initParallax();
    initEntrance();
  }

  LP.hero = { init: init };

})(window.LP = window.LP || {});
