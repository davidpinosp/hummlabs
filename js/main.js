(function () {
  'use strict';

  var LANG_KEY = 'hummlabs-lang';

  var translations = {
    en: {
      logo: "Humm Labs",
      nav_bird: "Hummingbird",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab",
      hero_title: "We build, acquire, scale, and operate innovative ventures.",
      hero_desc: "Humm Labs is an idea lab. We create things that shape our surroundings and help them flourish.",
      bird_eyebrow: "Why the hummingbird",
      bird_title: "A small bird with a large effect.",
      bird_intro: "The hummingbird is our family’s animal. It never stops moving, and as it travels from flower to flower, the whole garden grows. That’s how we want to work.",
      laburo_eyebrow: "Our first project",
      status_live: "Live",
      laburo_desc: "The AI hiring operating system for LatAm. It helps companies hire frontline teams, and helps people find work sooner.",
      laburo_cta: "Visit Laburo",
      next_teaser: "More ideas are taking shape.",
      meta_home_title: "Humm Labs — Idea Lab",
      meta_home_desc: "Humm Labs is an idea lab. We build, acquire, scale, and operate innovative ventures. Our first project is Laburo, the AI hiring operating system for LatAm.",
      value_1_title: "Invent",
      value_1_desc: "We started Humm Labs to invent. We’d rather make something new than repeat what already exists.",
      value_2_title: "Do it well",
      value_2_desc: "Care in the details. We build companies that create real value and are made to last.",
      value_3_title: "Help it flourish",
      value_3_desc: "Good companies lift everyone around them: teams, customers, communities.",
      scroll_cue: "Scroll"
    },
    es: {
      logo: "Humm Labs",
      nav_bird: "Colibrí",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab",
      hero_title: "Construimos, adquirimos, escalamos y operamos empresas innovadoras.",
      hero_desc: "Humm Labs es un idea lab. Creamos cosas que dan forma a nuestro entorno y lo ayudan a florecer.",
      bird_eyebrow: "Por qué el colibrí",
      bird_title: "Un ave pequeña con un gran efecto.",
      bird_intro: "El colibrí es el animal de nuestra familia. Nunca deja de moverse, y mientras va de flor en flor, todo el jardín crece. Así queremos trabajar.",
      laburo_eyebrow: "Nuestro primer proyecto",
      status_live: "En vivo",
      laburo_desc: "El sistema operativo de contratación con IA para LatAm. Ayuda a las empresas a contratar equipos frontline, y a las personas a encontrar trabajo antes.",
      laburo_cta: "Visitar Laburo",
      next_teaser: "Más ideas están tomando forma.",
      meta_home_title: "Humm Labs — Idea Lab",
      meta_home_desc: "Humm Labs es un idea lab. Construimos, adquirimos, escalamos y operamos empresas innovadoras. Nuestro primer proyecto es Laburo, el sistema operativo de contratación con IA para LatAm.",
      value_1_title: "Inventar",
      value_1_desc: "Empezamos Humm Labs para inventar. Preferimos hacer algo nuevo antes que repetir lo que ya existe.",
      value_2_title: "Hacerlo bien",
      value_2_desc: "Cuidado en los detalles. Construimos empresas que crean valor real y están hechas para durar.",
      value_3_title: "Ayudar a florecer",
      value_3_desc: "Las buenas empresas elevan a todos a su alrededor: equipos, clientes, comunidades.",
      scroll_cue: "Desliza"
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

  function initHeaderScroll() {
    var header = document.querySelector('.header');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('scrolled', window.scrollY > 20);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  function initMobileNav() {
    var header = document.querySelector('.header');
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (!header || !toggle || !nav) return;

    function setOpen(open) {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    }

    toggle.addEventListener('click', function () {
      setOpen(!header.classList.contains('nav-open'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('click', function (event) {
      if (!header.classList.contains('nav-open')) return;
      if (header.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  function initReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    var reducedMotion = false;
    try {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    if (reducedMotion) {
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

  function initHeroSequence() {
    var pin = document.querySelector('.hero-pin');
    var canvas = pin && pin.querySelector('.hero-canvas');
    if (!canvas || !canvas.getContext) return;

    var reducedMotion = false;
    try {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}
    if (reducedMotion) return;

    var FRAME_COUNT = 160;
    var mobileQuery = window.matchMedia('(max-width: 860px)');
    var ctx = canvas.getContext('2d');
    var cue = pin.querySelector('.hero-scroll-cue');
    var beats = Array.prototype.map.call(pin.querySelectorAll('.beat'), function (el, i, all) {
      return {
        el: el,
        start: parseFloat(el.getAttribute('data-start')),
        end: parseFloat(el.getAttribute('data-end')),
        first: i === 0,
        last: i === all.length - 1
      };
    });

    var frames = [];
    var set = '';
    var progress = 0;
    var drawnIndex = -1;
    var drawnSet = '';

    pin.classList.add('hero-animated');

    function framePath(i) {
      return 'media/hero/' + set + '/' + ('00' + i).slice(-3) + '.webp';
    }

    // Coarse-to-fine: first and last frames, then every 16th, 8th, ... so the
    // whole timeline is scrubbable almost immediately and sharpens as it loads.
    function loadOrder() {
      var order = [0, FRAME_COUNT - 1];
      var seen = {};
      seen[0] = seen[FRAME_COUNT - 1] = true;
      [16, 8, 4, 2, 1].forEach(function (step) {
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
      var queue = loadOrder();
      var active = 0;
      var token = set;

      function pump() {
        while (active < 6 && queue.length) {
          var i = queue.shift();
          var img = new Image();
          active++;
          img.onload = img.onerror = (function (index, image) {
            return function (event) {
              active--;
              if (token !== set) return;
              if (event.type === 'load') {
                frames[index] = image;
                drawnIndex = -1;
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
        drawnIndex = -1;
      }
    }

    function drawFrame(index) {
      var img = frames[index];
      var cw = canvas.width;
      var ch = canvas.height;
      var scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      var w = img.naturalWidth * scale;
      var h = img.naturalHeight * scale;
      // When the viewport is narrower than the frame, crop mostly from the empty left side.
      var x = (cw - w) * (set === 'desktop' ? 0.35 : 0.5);
      var y = (ch - h) * 0.5;
      ctx.fillStyle = '#110c07';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    function smoothstep(a, b, v) {
      var t = Math.max(0, Math.min(1, (v - a) / (b - a)));
      return t * t * (3 - 2 * t);
    }

    function updateBeats() {
      var fade = 0.05;
      beats.forEach(function (b) {
        var fadeIn = b.first ? 1 : smoothstep(b.start, b.start + fade, progress);
        var fadeOut = b.last ? 1 : 1 - smoothstep(b.end - fade, b.end, progress);
        var o = Math.min(fadeIn, fadeOut);
        b.el.style.opacity = o;
        b.el.style.transform = 'translateY(' + ((1 - o) * (progress < b.start + fade ? 14 : -14)) + 'px)';
        b.el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      });
      if (cue) cue.style.opacity = 1 - smoothstep(0, 0.03, progress);
    }

    function render() {
      ticking = false;
      var rect = pin.getBoundingClientRect();
      var scrollable = pin.offsetHeight - window.innerHeight;
      progress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;

      updateBeats();
      resizeCanvas();
      var target = Math.round(progress * (FRAME_COUNT - 1));
      var index = nearestLoaded(target);
      if (index >= 0 && (index !== drawnIndex || drawnSet !== set)) {
        drawFrame(index);
        drawnIndex = index;
        drawnSet = set;
      }
    }

    var ticking = false;
    function schedule() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    }

    function onResize() {
      loadFrames();
      drawnIndex = -1;
      schedule();
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    loadFrames();
    schedule();
  }

  function init() {
    initLang();
    initHeaderScroll();
    initMobileNav();
    initReveals();
    initHeroSequence();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
