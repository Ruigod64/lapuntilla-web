/**
 * La Puntilla — Utils
 * Funciones puras compartidas por todos los módulos.
 * Se expone en window.LP.utils
 */
(function (LP) {
  'use strict';

  LP.utils = {

    /** Interpolación lineal */
    lerp: function (a, b, t) { return a + (b - a) * t; },

    /** Limitar valor entre [min, max] */
    clamp: function (v, mn, mx) { return Math.min(Math.max(v, mn), mx); },

    /** Scroll suave a un selector CSS */
    goTo: function (selector) {
      var el = document.querySelector(selector);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    /** Debounce */
    debounce: function (fn, delay) {
      var t;
      return function () {
        var ctx = this, args = arguments;
        clearTimeout(t);
        t = setTimeout(function () { fn.apply(ctx, args); }, delay);
      };
    },

    /** Posición del mouse relativa a un elemento (en %) */
    mousePercent: function (e, el) {
      var r  = el.getBoundingClientRect();
      var x  = LP.utils.clamp(((e.clientX - r.left) / r.width)  * 100, 0, 100);
      var y  = LP.utils.clamp(((e.clientY - r.top)  / r.height) * 100, 0, 100);
      return { x: x, y: y };
    },

  };

})(window.LP = window.LP || {});
