(function () {
  'use strict';

  var LANG_KEY = 'hummlabs-lang';

  var translations = {
    en: {
      logo: "Humm Labs",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab · Ecuador",
      hero_title: "Technology for the world we want to live in.",
      hero_desc: "We build and operate technology companies from Ecuador, with global reach.",
      beat_2_title: "It starts as a sketch.",
      beat_2_desc: "A real problem, looked at closely, and a clear idea of how it could be better.",
      beat_3_title: "Then we build it, piece by piece.",
      beat_3_desc: "Software and AI made with care, and companies made to last.",
      scroll_cue: "Scroll",
      values_eyebrow: "What moves us",
      value_1_title: "Beautiful technology",
      value_1_desc: "Cutting-edge tools, made with craft. Powerful should also mean beautiful.",
      value_2_title: "No ceilings",
      value_2_desc: "Where you start shouldn't decide how far you go. We build to break down the mental and economic barriers in the way.",
      value_3_title: "Grow what surrounds us",
      value_3_desc: "Every company we build should leave its community stronger: technologically, economically, and in spirit.",
      laburo_eyebrow: "Our first company",
      status_live: "Live",
      laburo_desc: "The AI hiring operating system for LatAm. It helps companies hire frontline teams, and helps people find work sooner.",
      laburo_cta: "Visit Laburo",
      next_teaser: "More on the way.",
      meta_home_title: "Humm Labs — Technology for the world we want to live in",
      meta_home_desc: "Humm Labs builds and operates technology companies from Ecuador, with global reach. Our first is Laburo, the AI hiring operating system for LatAm.",
      footer_made: "Made in Ecuador"
    },
    es: {
      logo: "Humm Labs",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab · Ecuador",
      hero_title: "Tecnología para el mundo en el que queremos vivir.",
      hero_desc: "Construimos y operamos empresas de tecnología desde Ecuador, con alcance global.",
      beat_2_title: "Empieza como un boceto.",
      beat_2_desc: "Un problema real, mirado de cerca, y una idea clara de cómo podría ser mejor.",
      beat_3_title: "Luego lo construimos, pieza por pieza.",
      beat_3_desc: "Software e IA hechos con cuidado, y empresas hechas para durar.",
      scroll_cue: "Desliza",
      values_eyebrow: "Lo que nos mueve",
      value_1_title: "Tecnología bella",
      value_1_desc: "Herramientas de vanguardia, hechas con oficio. Lo poderoso también debe ser bello.",
      value_2_title: "Sin techo",
      value_2_desc: "Dónde empiezas no debería decidir hasta dónde llegas. Construimos para derribar las barreras mentales y económicas en el camino.",
      value_3_title: "Hacer crecer nuestro entorno",
      value_3_desc: "Cada empresa que construimos debe dejar a su comunidad más fuerte: en tecnología, en economía y en espíritu.",
      laburo_eyebrow: "Nuestra primera empresa",
      status_live: "En vivo",
      laburo_desc: "El sistema operativo de contratación con IA para LatAm. Ayuda a las empresas a contratar equipos frontline, y a las personas a encontrar trabajo antes.",
      laburo_cta: "Visitar Laburo",
      next_teaser: "Vienen más.",
      meta_home_title: "Humm Labs — Tecnología para el mundo en el que queremos vivir",
      meta_home_desc: "Humm Labs construye y opera empresas de tecnología desde Ecuador, con alcance global. La primera es Laburo, el sistema operativo de contratación con IA para LatAm.",
      footer_made: "Hecho en Ecuador"
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
    var video = pin && pin.querySelector('.hero-video');
    if (!video || typeof video.play !== 'function' || prefersReducedMotion()) return;

    // The video is the drawing (0 - DRAWING_END) followed by the transformation
    // into the automaton, at 24 fps, encoded with a keyframe every 12 frames so
    // seeking anywhere is cheap.
    var DRAWING_END = 68 / 24;
    // Scroll progress -> video time. The flat segments hold the image still on
    // the first sketch, the finished drawing and the finished automaton.
    var END = -1;
    var TIMELINE = [
      { to: 0.05, from: 0, until: 0 },
      { to: 0.22, from: 0, until: DRAWING_END },
      { to: 0.36, from: DRAWING_END, until: DRAWING_END },
      { to: 0.88, from: DRAWING_END, until: END },
      { to: 1, from: END, until: END }
    ];
    // How quickly the shown time catches up with the scroll (per second). The
    // easing turns uneven scroll input into continuous motion.
    var CATCH_UP = 9;

    var mobileQuery = window.matchMedia('(max-width: 860px)');
    var cue = pin.querySelector('.hero-scroll-cue');
    var dim = pin.querySelector('.hero-dim');
    var finale = document.querySelector('.chapter-final');

    function range(el, name) {
      var value = el.getAttribute(name);
      return value ? value.split(' ').map(parseFloat) : null;
    }
    var beats = Array.prototype.map.call(pin.querySelectorAll('.beat'), function (el) {
      return { el: el, enter: range(el, 'data-in'), exit: range(el, 'data-out') };
    });

    var set = '';
    var duration = 0;
    var shown = 0;
    var target = 0;
    var lastTick = 0;
    var unlocked = false;
    var scrimOn = false;

    pin.classList.add('hero-animated');

    function resolve(t) {
      return t === END ? Math.max(0, duration - 1 / 24) : t;
    }

    function timeAt(p) {
      var segStart = 0;
      for (var i = 0; i < TIMELINE.length; i++) {
        var seg = TIMELINE[i];
        if (p <= seg.to || i === TIMELINE.length - 1) {
          var t = seg.to > segStart ? (p - segStart) / (seg.to - segStart) : 1;
          t = Math.max(0, Math.min(1, t));
          var from = resolve(seg.from);
          return from + (resolve(seg.until) - from) * t;
        }
        segStart = seg.to;
      }
      return resolve(END);
    }

    function loadSet() {
      var next = mobileQuery.matches ? 'mobile' : 'desktop';
      if (next === set) return;
      set = next;
      duration = 0;
      while (video.firstChild) video.removeChild(video.firstChild);
      video.poster = 'media/hero/hero-start-' + set + '.webp';
      [['mp4', 'video/mp4'], ['webm', 'video/webm']].forEach(function (pair) {
        var source = document.createElement('source');
        source.src = 'media/hero/hero-' + set + '.' + pair[0];
        source.type = pair[1];
        video.appendChild(source);
      });
      video.load();
    }

    // iOS only paints seeked frames after the video has played once; a muted,
    // inline play-then-pause unlocks it without any visible playback.
    function unlock() {
      if (unlocked) return;
      var attempt = video.play();
      if (attempt && typeof attempt.then === 'function') {
        attempt.then(function () {
          unlocked = true;
          video.pause();
          video.currentTime = shown;
        }).catch(function () {});
      } else {
        unlocked = true;
        video.pause();
      }
    }

    video.addEventListener('loadedmetadata', function () {
      duration = video.duration || 0;
      video.currentTime = shown;
    });
    video.addEventListener('loadeddata', unlock);
    ['touchstart', 'pointerdown', 'wheel', 'keydown'].forEach(function (type) {
      window.addEventListener(type, unlock, { passive: true, once: true });
    });

    function clamp01(v) {
      return Math.max(0, Math.min(1, v));
    }

    function smoothstep(a, b, v) {
      var t = clamp01((v - a) / (b - a));
      return t * t * (3 - 2 * t);
    }

    // Each statement scrolls in, sticks while the animation plays behind it,
    // then scrolls out, easing into and out of its resting point. A statement
    // with no exit range stays until the pin ends, then scrolls away with the
    // page (past is how far the page has scrolled beyond the pin).
    function updateBeats(progress, past) {
      var travel = window.innerHeight * (mobileQuery.matches ? 0.16 : 0.32);
      beats.forEach(function (b) {
        var offset = 0;
        var opacity = 1;
        if (b.enter && progress < b.enter[1]) {
          var tin = clamp01((progress - b.enter[0]) / (b.enter[1] - b.enter[0]));
          offset = Math.pow(1 - tin, 3) * travel;
          opacity = smoothstep(0, 0.75, tin);
        } else if (b.exit && progress > b.exit[0]) {
          var tout = clamp01((progress - b.exit[0]) / (b.exit[1] - b.exit[0]));
          offset = -Math.pow(tout, 3) * travel;
          opacity = 1 - smoothstep(0.25, 1, tout);
        } else if (!b.exit) {
          offset = -past;
        }
        b.el.style.opacity = opacity.toFixed(3);
        b.el.style.transform = 'translate3d(0, ' + offset.toFixed(1) + 'px, 0) translateY(-50%)';
        b.el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';
      });
    }

    function tick(now) {
      requestAnimationFrame(tick);
      var dt = lastTick ? Math.min(0.1, (now - lastTick) / 1000) : 0;
      lastTick = now;

      // The hero stays fixed behind the whole page, so it never scrolls past
      // the finished automaton; the rest of the page slides in over it.
      var vh = window.innerHeight;
      var rect = pin.getBoundingClientRect();
      var scrollable = pin.offsetHeight - vh;
      var progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
      var past = Math.max(0, -rect.top - scrollable);

      updateBeats(progress, past);
      if (cue) cue.style.opacity = 1 - smoothstep(0, 0.04, progress);
      // Darken the automaton while text passes over it, and bring it back for
      // the final screen.
      if (dim) {
        var arrive = finale ? 1 - finale.getBoundingClientRect().top / vh : 0;
        var amount = smoothstep(0.05, 0.5, past / vh) * (1 - smoothstep(0.7, 1, arrive));
        dim.style.opacity = amount.toFixed(3);
      }
      // Text scrolling off the top fades out under the header.
      var scrim = past > 0;
      if (scrim !== scrimOn) {
        scrimOn = scrim;
        document.body.classList.toggle('header-scrim', scrim);
      }
      if (!duration) return;

      target = timeAt(progress);
      shown += (target - shown) * (1 - Math.exp(-CATCH_UP * dt));
      if (Math.abs(target - shown) < 0.002) shown = target;
      // One seek at a time: queueing seeks makes the browser fall behind.
      if (!video.seeking && Math.abs(video.currentTime - shown) > 0.012) {
        video.currentTime = shown;
      }
    }

    window.addEventListener('resize', loadSet);
    loadSet();
    requestAnimationFrame(tick);
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
