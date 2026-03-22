/**
 * La Puntilla — Gallery + Lightbox
 * ==================================
 * Abre un lightbox al hacer clic en cualquier .gallery-slot.has-photo.
 * Para activar una foto: agrega la clase "has-photo" al slot,
 * pon un <img src="..."> dentro y opcionalmente un .gallery-slot__caption.
 */
(function (LP) {
  'use strict';

  function init() {
    var lightbox = document.getElementById('lightbox');
    var lbImg    = lightbox && lightbox.querySelector('.lightbox-img');
    var lbCap    = lightbox && lightbox.querySelector('.lightbox-caption');
    var lbClose  = lightbox && lightbox.querySelector('.lightbox-close');

    if (!lightbox) return;

    var slots = document.querySelectorAll('.gallery-slot.has-photo');

    /* ── Abrir ── */
    slots.forEach(function (slot) {
      slot.addEventListener('click', function () {
        var img     = slot.querySelector('img');
        var capEl   = slot.querySelector('.gallery-slot__caption-text');
        if (!img) return;

        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        if (lbCap) lbCap.textContent = capEl ? capEl.textContent : '';

        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        lbClose.focus();
      });
    });

    /* ── Cerrar ── */
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.src = '';
    }

    if (lbClose) lbClose.addEventListener('click', close);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }

  LP.gallery = { init: init };

})(window.LP = window.LP || {});
