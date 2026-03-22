/**
 * La Puntilla — Reviews Carousel
 * Cálculo en píxeles para que el deslizamiento sea 100% preciso.
 */
(function (LP) {
  'use strict';

  var REVIEWS = [
    {
      text:   'Mi lugar favorito en Mazatlán. Aguachile de camarón delicioso, ceviche de atún, ostiones fresquísimos y pescado a la parrilla. Los precios son muy accesibles y la vista al puerto es increíble.',
      name:   'Sarah K.',
      source: 'Google Maps',
      emoji:  '👩‍🦱',
      stars:  5,
      featured: true,
    },
    {
      text:   'Llegamos sin reservación y aun así nos trataron como si fuéramos los únicos clientes. El zarandeado llegó entero a la mesa, olía a brasa y a mar. Pedimos otro.',
      name:   'Carlos M.',
      source: 'Google Reviews',
      emoji:  '🧔',
      stars:  5,
    },
    {
      text:   'El buffet de desayuno es una maravilla: tortillas recién hechas, guisos de la región con muy rico sazón. Los meseros te atienden muy bien. ¡Imprescindible!',
      name:   'Lupita V.',
      source: 'TripAdvisor',
      emoji:  '👩',
      stars:  5,
    },
    {
      text:   'Restaurant fresco y con buena vista. El aguachile, genial. La barra caliente también muy buena, buena atención y cerveza bien fría. Un must en Mazatlán. Volveré sin duda.',
      name:   'Roberto A.',
      source: 'Foursquare',
      emoji:  '🧑',
      stars:  5,
    },
    {
      text:   'Excelentes porciones, calidad y sabor 10/10. El equipo de meseros nos atendió de maravilla. Sin duda uno de los mejores restaurantes de mariscos en Mazatlán.',
      name:   'Jorge L.',
      source: 'TripAdvisor',
      emoji:  '👨',
      stars:  5,
    },
    {
      text:   'Paté de camarón, callo de hacha y camarones aguachile: todos frescos y muy bien presentados. El marlin ranchero para cerrar. El servicio del mesero fue excelente.',
      name:   'Familia Gutiérrez',
      source: 'Google Reviews',
      emoji:  '👨‍👩‍👧',
      stars:  5,
    },
    {
      text:   'Increíble ver un transatlántico desde La Puntilla mientras tomas una margarita de mango. Eso pasa alrededor de las 5 de la tarde. ¡La hora perfecta para cenar con esa vista!',
      name:   'Adriana R.',
      source: 'TripAdvisor',
      emoji:  '👩‍🦰',
      stars:  5,
    },
    {
      text:   'Gran ubicación frente a la marina. Las brochetas fueron las mejores que he probado en mucho tiempo. Servicio excelente y precios muy justos para la calidad que ofrecen.',
      name:   'Mark T.',
      source: 'Yelp',
      emoji:  '🧑‍🦳',
      stars:  5,
    },
  ];

  var GAP = 24; /* 1.5rem = 24px — debe coincidir con el gap del CSS */

  /* Cuántas tarjetas mostrar según ancho de pantalla */
  function visible() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
  }

  /* HTML de una tarjeta */
  function cardHTML(r) {
    var stars = '★★★★★'.slice(0, r.stars);
    return '<article class="review-card' + (r.featured ? ' featured' : '') + '">'
      + '<div class="stars">' + stars + '</div>'
      + '<blockquote class="review-text">"' + r.text + '"</blockquote>'
      + '<footer class="review-author">'
      +   '<div class="avatar">' + r.emoji + '</div>'
      +   '<div><cite class="author-name">' + r.name + '</cite>'
      +   '<span class="author-src">' + r.source + '</span></div>'
      + '</footer></article>';
  }

  function init() {
    var section  = document.getElementById('reviews');
    var viewport = section && section.querySelector('.carousel-viewport');
    var track    = section && section.querySelector('.carousel-track');
    var btnPrev  = section && section.querySelector('.carousel-prev');
    var btnNext  = section && section.querySelector('.carousel-next');
    var dotsEl   = section && section.querySelector('.carousel-dots');

    if (!track || !viewport) return;

    /* ── Inyectar tarjetas ── */
    track.innerHTML = REVIEWS.map(cardHTML).join('');
    var cards = Array.prototype.slice.call(track.querySelectorAll('.review-card'));
    var total  = cards.length;
    var index  = 0;   /* índice de la primera tarjeta visible */

    /* ── Calcular tamaños en píxeles ── */
    function cardWidth() {
      var vis  = visible();
      var vw   = viewport.clientWidth;
      return (vw - GAP * (vis - 1)) / vis;
    }

    function maxIndex() {
      return total - visible();
    }

    /* ── Aplicar tamaños a las tarjetas ── */
    function resize() {
      var w = cardWidth();
      cards.forEach(function (c) {
        c.style.width     = w + 'px';
        c.style.minWidth  = w + 'px';
        c.style.flexShrink = '0';
      });
    }

    /* ── Mover el track ── */
    function moveTo(i) {
      index = Math.max(0, Math.min(i, maxIndex()));
      var offset = index * (cardWidth() + GAP);
      track.style.transform = 'translateX(-' + offset + 'px)';

      if (btnPrev) btnPrev.disabled = index === 0;
      if (btnNext) btnNext.disabled = index >= maxIndex();

      updateDots();
    }

    /* ── Dots ── */
    function buildDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = '';
      var pages = Math.ceil(total / visible());
      for (var i = 0; i < pages; i++) {
        var d = document.createElement('button');
        d.className = 'carousel-dot';
        d.setAttribute('aria-label', 'Página ' + (i + 1));
        d.setAttribute('data-idx', i * visible());
        dotsEl.appendChild(d);
      }
    }

    function updateDots() {
      if (!dotsEl) return;
      var page = Math.round(index / visible());
      Array.prototype.forEach.call(
        dotsEl.querySelectorAll('.carousel-dot'),
        function (d, i) { d.classList.toggle('active', i === page); }
      );
    }

    /* ── Botones ── */
    if (btnPrev) btnPrev.addEventListener('click', function () { moveTo(index - visible()); });
    if (btnNext) btnNext.addEventListener('click', function () { moveTo(index + visible()); });

    if (dotsEl) {
      dotsEl.addEventListener('click', function (e) {
        var btn = e.target.closest('.carousel-dot');
        if (btn) moveTo(parseInt(btn.getAttribute('data-idx'), 10));
      });
    }

    /* ── Swipe táctil ── */
    var tx0 = 0, ty0 = 0;

    track.addEventListener('touchstart', function (e) {
      tx0 = e.touches[0].clientX;
      ty0 = e.touches[0].clientY;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx0;
      var dy = e.changedTouches[0].clientY - ty0;
      if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 30) return;
      moveTo(dx < 0 ? index + 1 : index - 1);
    }, { passive: true });

    /* ── Drag con mouse ── */
    var mx0 = 0, dragging = false;

    track.addEventListener('mousedown', function (e) {
      mx0 = e.clientX;
      dragging = true;
      track.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', function (e) {
      if (!dragging) return;
      dragging = false;
      track.style.cursor = 'grab';
      var dx = e.clientX - mx0;
      if (Math.abs(dx) < 30) return;
      moveTo(dx < 0 ? index + 1 : index - 1);
    });

    /* ── Teclado ── */
    section.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') moveTo(index + 1);
      if (e.key === 'ArrowLeft')  moveTo(index - 1);
    });

    /* ── Auto-play ── */
    var timer = null;

    function startAuto() {
      stopAuto();
      timer = setInterval(function () {
        var next = index + 1;
        if (next > maxIndex()) next = 0;
        moveTo(next);
      }, 5000);
    }

    function stopAuto() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    section.addEventListener('mouseenter', stopAuto);
    section.addEventListener('mouseleave', startAuto);
    section.addEventListener('touchstart',  stopAuto, { passive: true });

    /* ── Resize ── */
    window.addEventListener('resize', LP.utils.debounce(function () {
      buildDots();
      resize();
      moveTo(0); /* volver al inicio al cambiar tamaño */
    }, 200));

    /* ── Arrancar ── */
    buildDots();
    resize();
    moveTo(0);
    startAuto();
  }

  LP.reviewsCarousel = { init: init };

})(window.LP = window.LP || {});
