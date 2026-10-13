(function () {
  'use strict';

  var LANG_KEY = 'hummlabs-lang';

  var translations = {
    en: {
      logo: "Humm Labs",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab",
      hero_title: "Technology for the world we want to live in.",
      hero_desc: "Humm Labs is an idea lab. We build, acquire, scale, and operate technology ventures.",
      beat_2_title: "Every idea starts as a sketch.",
      beat_2_desc: "We look closely at real problems, then design the software and AI to solve them.",
      beat_3_title: "Then we build it to last.",
      beat_3_desc: "We turn ideas into companies, run them with care, and let them leave their surroundings better than they found them.",
      scroll_cue: "Scroll",
      laburo_eyebrow: "Our first venture",
      status_live: "Live",
      laburo_desc: "The AI hiring operating system for LatAm. It helps companies hire frontline teams, and helps people find work sooner.",
      laburo_cta: "Visit Laburo",
      next_teaser: "More ventures are taking shape.",
      meta_home_title: "Humm Labs — Technology for the world we want to live in",
      meta_home_desc: "Humm Labs is an idea lab. We build, acquire, scale, and operate technology ventures. Our first is Laburo, the AI hiring operating system for LatAm."
    },
    es: {
      logo: "Humm Labs",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab",
      hero_title: "Tecnología para el mundo en el que queremos vivir.",
      hero_desc: "Humm Labs es un idea lab. Construimos, adquirimos, escalamos y operamos empresas de tecnología.",
      beat_2_title: "Toda idea empieza como un boceto.",
      beat_2_desc: "Miramos de cerca problemas reales y luego diseñamos el software y la IA para resolverlos.",
      beat_3_title: "Después, la construimos para que dure.",
      beat_3_desc: "Convertimos ideas en empresas, las operamos con cuidado y dejamos que mejoren el entorno que las rodea.",
      scroll_cue: "Desliza",
      laburo_eyebrow: "Nuestra primera empresa",
      status_live: "En vivo",
      laburo_desc: "El sistema operativo de contratación con IA para LatAm. Ayuda a las empresas a contratar equipos frontline, y a las personas a encontrar trabajo antes.",
      laburo_cta: "Visitar Laburo",
      next_teaser: "Otras empresas están tomando forma.",
      meta_home_title: "Humm Labs — Tecnología para el mundo en el que queremos vivir",
      meta_home_desc: "Humm Labs es un idea lab. Construimos, adquirimos, escalamos y operamos empresas de tecnología. La primera es Laburo, el sistema operativo de contratación con IA para LatAm."
    }
  };

  function getLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === 'es' || stored === 'en') return stored;
    } catch (e) {}
    var browserLang = '';
    try {
      browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    } catch (e) {}
    if (browserLang.indexOf('en') === 0) return 'en';
    return 'es';
  }

  function setLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang;
  }

  function applyTranslations(lang) {
    var t = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!t[key]) return;
      var text = t[key];
      if (text.indexOf('\n') !== -1) {
        el.innerHTML = text.replace(/\n/g, '<br>');
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    applyMetaTranslations(lang);
  }

  function getMetaKeyPrefix() {
    var path = '';
    try {
      path = (window.location.pathname || '').toLowerCase();
    } catch (e) {}
    var file = path.split('/').pop();
    if (!file) file = 'index.html';
    if (file === 'index.html') return 'home';
    return '';
  }

  function setMetaAttr(selector, attr, value) {
    if (!value) return;
    var el = document.querySelector(selector);
    if (!el) return;
    el.setAttribute(attr, value);
  }

  function applyMetaTranslations(lang) {
    var t = translations[lang] || translations.en;
    var prefix = getMetaKeyPrefix();
    if (!prefix) return;

    var title = t['meta_' + prefix + '_title'];
    var desc = t['meta_' + prefix + '_desc'];
    if (title) document.title = title;
    if (desc) setMetaAttr('meta[name="description"]', 'content', desc);
    if (title) setMetaAttr('meta[property="og:title"]', 'content', title);
    if (desc) setMetaAttr('meta[property="og:description"]', 'content', desc);
    if (title) setMetaAttr('meta[name="twitter:title"]', 'content', title);
    if (desc) setMetaAttr('meta[name="twitter:description"]', 'content', desc);
    setMetaAttr('meta[property="og:locale"]', 'content', lang === 'es' ? 'es_ES' : 'en_US');
    setMetaAttr('meta[property="og:locale:alternate"]', 'content', lang === 'es' ? 'en_US' : 'es_ES');
  }

  function initLang() {
    var lang = getLang();
    setLang(lang);
    applyTranslations(lang);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newLang = this.getAttribute('data-lang');
        setLang(newLang);
        applyTranslations(newLang);
      });
    });
  }

  function prefersReducedMotion() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function initReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (prefersReducedMotion()) {
      els.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Wheel and trackpad scrolling glide instead of stepping; touch stays native.
  function initSmoothScroll() {
    if (prefersReducedMotion() || typeof window.Lenis !== 'function') return;
    new window.Lenis({ autoRaf: true, anchors: true });
  }

  function initHeroSequence() {
    var pin = document.querySelector('.hero-pin');
    var canvas = pin && pin.querySelector('.hero-canvas');
    if (!canvas || !canvas.getContext || prefersReducedMotion()) return;

    // Frames 0-33 are the drawing, 34-113 the assembly into the automaton.
    var FRAME_COUNT = 114;
    var DRAWING_END = 33;
    var LAST = FRAME_COUNT - 1;
    // Scroll progress -> frame. The flat segments hold the image still while a
    // statement passes; these points line up with each statement's --at.
    var TIMELINE = [
      { to: 0.12, from: 0, until: 0 },
      { to: 0.36, from: 0, until: DRAWING_END },
      { to: 0.5, from: DRAWING_END, until: DRAWING_END },
      { to: 0.88, from: DRAWING_END, until: LAST },
      { to: 1, from: LAST, until: LAST }
    ];
    var AVIF_PROBE = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAAD5bWV0YQAAAAAAAAAvaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAFBpY3R1cmVIYW5kbGVyAAAAAA5waXRtAAAAAAABAAAAHmlsb2MAAAAARAAAAQABAAAAAQAAASEAAAAUAAAAKGlpbmYAAAAAAAEAAAAaaW5mZQIAAAAAAQAAYXYwMUNvbG9yAAAAAGppcHJwAAAAS2lwY28AAAAUaXNwZQAAAAAAAAACAAAAAgAAABBwaXhpAAAAAAMICAgAAAAMYXYxQ4EADAAAAAATY29scm5jbHgAAgACAAIAAAAAF2lwbWEAAAAAAAAAAQABBAECgwQAAAAcbWRhdAoFGAA2wCAyCx/wAABYAAAAAK8w';

    var mobileQuery = window.matchMedia('(max-width: 860px)');
    var ctx = canvas.getContext('2d');
    var cue = pin.querySelector('.hero-scroll-cue');
    var beats = Array.prototype.slice.call(pin.querySelectorAll('.beat'));

    var format = null;
    var frames = [];
    var set = '';
    var drawnKey = '';
    var ticking = false;

    pin.classList.add('hero-animated');

    function frameAt(p) {
      var segStart = 0;
      for (var i = 0; i < TIMELINE.length; i++) {
        var seg = TIMELINE[i];
        if (p <= seg.to || i === TIMELINE.length - 1) {
          var t = seg.to > segStart ? (p - segStart) / (seg.to - segStart) : 1;
          t = Math.max(0, Math.min(1, t));
          return seg.from + (seg.until - seg.from) * t;
        }
        segStart = seg.to;
      }
      return LAST;
    }

    function framePath(i) {
      return 'media/hero/' + set + '/' + format + '/' + ('00' + i).slice(-3) + '.' + format;
    }

    // The frames the visitor rests on load first, then the timeline fills in coarse-to-fine.
    function loadOrder() {
      var order = [0, DRAWING_END, LAST];
      var seen = {};
      order.forEach(function (i) { seen[i] = true; });
      [12, 6, 3, 1].forEach(function (step) {
        for (var i = 0; i < FRAME_COUNT; i += step) {
          if (!seen[i]) {
            seen[i] = true;
            order.push(i);
          }
        }
      });
      return order;
    }

    function loadFrames() {
      var nextSet = mobileQuery.matches ? 'mobile' : 'desktop';
      if (nextSet === set) return;
      set = nextSet;
      frames = new Array(FRAME_COUNT);
      drawnKey = '';
      var queue = loadOrder();
      var active = 0;
      var token = set;

      function pump() {
        while (active < 6 && queue.length) {
          var i = queue.shift();
          var img = new Image();
          img.decoding = 'async';
          active++;
          img.onload = img.onerror = (function (index, image) {
            return function (event) {
              active--;
              if (token !== set) return;
              if (event.type === 'load') {
                frames[index] = image;
                drawnKey = '';
                schedule();
              }
              pump();
            };
          })(i, img);
          img.src = framePath(i);
        }
      }
      pump();
    }

    function nearestLoaded(target) {
      for (var offset = 0; offset < FRAME_COUNT; offset++) {
        if (frames[target - offset]) return target - offset;
        if (frames[target + offset]) return target + offset;
      }
      return -1;
    }

    function resizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.round(canvas.clientWidth * dpr);
      var h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawnKey = '';
      }
    }

    function paint(img, alpha) {
      var cw = canvas.width;
      var ch = canvas.height;
      var scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      var w = img.naturalWidth * scale;
      var h = img.naturalHeight * scale;
      // When the viewport is narrower than the frame, crop mostly from the empty left side.
      var x = (cw - w) * (set === 'desktop' ? 0.35 : 0.5);
      var y = (ch - h) * 0.5;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, x, y, w, h);
    }

    // Blending the two frames either side of the scroll position hides the
    // step from one frame to the next, so the motion reads as continuous.
    function drawAt(position) {
      var a = Math.floor(position);
      var b = Math.min(a + 1, LAST);
      var mix = position - a;
      var base = frames[a] ? a : nearestLoaded(Math.round(position));
      if (base < 0) return;
      var blend = frames[a] && frames[b] && b !== a && mix > 0.01;
      var key = set + ':' + base + ':' + (blend ? mix.toFixed(2) : '0');
      if (key === drawnKey) return;
      drawnKey = key;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#110c07';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      paint(frames[base], 1);
      if (blend) paint(frames[b], mix);
      ctx.globalAlpha = 1;
    }

    function smoothstep(a, b, v) {
      var t = Math.max(0, Math.min(1, (v - a) / (b - a)));
      return t * t * (3 - 2 * t);
    }

    // Statements scroll with the page; they fade in near the bottom of the
    // screen and out near the top (on phones, before they reach the image).
    function updateBeats() {
      var vh = window.innerHeight;
      var topEdge = mobileQuery.matches ? canvas.getBoundingClientRect().bottom : vh * 0.08;
      var topRange = mobileQuery.matches ? vh * 0.1 : vh * 0.2;
      beats.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var fadeIn = 1 - smoothstep(vh * 0.86, vh, r.bottom);
        var fadeOut = smoothstep(topEdge, topEdge + topRange, r.top);
        var o = Math.min(fadeIn, fadeOut);
        el.style.opacity = o.toFixed(3);
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      });
    }

    function render() {
      ticking = false;
      var rect = pin.getBoundingClientRect();
      var scrollable = pin.offsetHeight - window.innerHeight;
      var progress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;

      updateBeats();
      if (cue) cue.style.opacity = 1 - smoothstep(0, 0.04, progress);
      if (!format) return;
      resizeCanvas();
      drawAt(frameAt(progress));
    }

    function schedule() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    }

    function start(supportsAvif) {
      format = supportsAvif ? 'avif' : 'webp';
      loadFrames();
      schedule();
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', function () {
      if (format) loadFrames();
      drawnKey = '';
      schedule();
    });
    schedule();

    var probe = new Image();
    probe.onload = function () { start(probe.naturalWidth > 0); };
    probe.onerror = function () { start(false); };
    probe.src = AVIF_PROBE;
  }

  function init() {
    initLang();
    initSmoothScroll();
    initReveals();
    initHeroSequence();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
