/**
 * La Puntilla — Cursor Glow (sección Especialidades)
 *
 * El glow sigue al cursor con un delay generado por interpolación
 * lineal (lerp) dentro de un loop requestAnimationFrame.
 * El factor bajo (0.06) produce el efecto de "inercia difuminada".
 *
 * Variables CSS actualizadas:
 *  --gx / --gy  → posición del glow global en la sección
 *  --cx / --cy  → posición del glow relativa en cada tarjeta
 */
(function (LP) {
  'use strict';

  function init() {
    var section = document.getElementById('menu');
    var glow    = section && section.querySelector('.menu-glow');
    if (!section || !glow) return;

    var tx = 50, ty = 50;   /* target (posición real del mouse) */
    var cx = 50, cy = 50;   /* current (interpolado con lerp)   */
    var raf = null;

    var lerp        = LP.utils.lerp;
    var clamp       = LP.utils.clamp;
    var mousePercent = LP.utils.mousePercent;

    /* ── Captura posición del mouse ── */
    section.addEventListener('mousemove', function (e) {
      var pos = mousePercent(e, section);
      tx = pos.x;
      ty = pos.y;
      if (!raf) loop();          /* arrancar el loop si estaba detenido */
    }, { passive: true });

    section.addEventListener('mouseleave', function () {
      tx = 50;                   /* regresa al centro con delay */
      ty = 50;
    });

    /* ── Loop de interpolación ── */
    function loop() {
      cx += (tx - cx) * 0.06;   /* factor: 0.06 → mucho delay, 0.2 → poco delay */
      cy += (ty - cy) * 0.06;

      /* Actualizar glow global de la sección */
      glow.style.setProperty('--gx', cx.toFixed(2) + '%');
      glow.style.setProperty('--gy', cy.toFixed(2) + '%');

      /* Actualizar brillo interno de cada tarjeta */
      var cards = section.querySelectorAll('.dish-card');
      var sr    = section.getBoundingClientRect();

      cards.forEach(function (card) {
        var cr  = card.getBoundingClientRect();
        var px  = (cx / 100) * sr.width  - (cr.left - sr.left);
        var py  = (cy / 100) * sr.height - (cr.top  - sr.top);
        var pcx = clamp((px / cr.width)  * 100, -20, 120);
        var pcy = clamp((py / cr.height) * 100, -20, 120);
        card.style.setProperty('--cx', pcx.toFixed(1) + '%');
        card.style.setProperty('--cy', pcy.toFixed(1) + '%');
      });

      /* Detener cuando converge */
      if (Math.abs(cx - tx) > 0.05 || Math.abs(cy - ty) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }
  }

  LP.cursorGlow = { init: init };

})(window.LP = window.LP || {});
