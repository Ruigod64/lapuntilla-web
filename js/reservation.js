/**
 * La Puntilla — Reservation
 * Maneja el banner de confirmación al hacer clic en WhatsApp.
 */
(function (LP) {
  'use strict';

  /* Expuesta globalmente para el onclick inline del HTML */
  window.showConfirm = function () {
    var banner = document.getElementById('confirm-banner');
    if (!banner) return;
    banner.classList.add('show');
    setTimeout(function () { banner.classList.remove('show'); }, 4000);
  };

  LP.reservation = { init: function () {} };

})(window.LP = window.LP || {});
