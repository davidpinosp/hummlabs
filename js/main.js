(function () {
  'use strict';

  var LANG_KEY = 'hummlabs-lang';

  var translations = {
    en: {
      logo: "Humm Labs",
      nav_mission: "What we believe",
      nav_bird: "Hummingbird",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab",
      hero_title: "We build, acquire, scale, and operate innovative ventures.",
      hero_desc: "Humm Labs is an idea lab. We create things that shape our surroundings and help them flourish.",
      mission_eyebrow: "What we believe",
      mission_title: "Create, and help things grow.",
      mission_body: "We started Humm Labs to invent. We build companies that create real value, and we want everything we make to leave the people and places around it better off.",
      step_1_title: "Invent",
      step_1_desc: "We’d rather make something new than repeat what already exists.",
      step_2_title: "Do it well",
      step_2_desc: "Care in the details. We build things meant to last.",
      step_3_title: "Help it flourish",
      step_3_desc: "Good companies lift everyone around them: teams, customers, communities.",
      bird_eyebrow: "Why the hummingbird",
      bird_title: "A small bird with a large effect.",
      bird_intro: "The hummingbird is our family’s animal. It never stops moving, and as it travels from flower to flower, the whole garden grows. That’s how we want to work.",
      laburo_eyebrow: "Our first project",
      status_live: "Live",
      laburo_desc: "The AI hiring operating system for LatAm. It helps companies hire frontline teams, and helps people find work sooner.",
      laburo_cta: "Visit Laburo",
      next_teaser: "More ideas are taking shape.",
      meta_home_title: "Humm Labs — Idea Lab",
      meta_home_desc: "Humm Labs is an idea lab. We build, acquire, scale, and operate innovative ventures. Our first project is Laburo, the AI hiring operating system for LatAm."
    },
    es: {
      logo: "Humm Labs",
      nav_mission: "En qué creemos",
      nav_bird: "Colibrí",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab",
      hero_title: "Construimos, adquirimos, escalamos y operamos empresas innovadoras.",
      hero_desc: "Humm Labs es un idea lab. Creamos cosas que dan forma a nuestro entorno y lo ayudan a florecer.",
      mission_eyebrow: "En qué creemos",
      mission_title: "Crear, y ayudar a que las cosas crezcan.",
      mission_body: "Empezamos Humm Labs para inventar. Construimos empresas que crean valor real, y queremos que todo lo que hacemos deje mejor a las personas y los lugares que lo rodean.",
      step_1_title: "Inventar",
      step_1_desc: "Preferimos hacer algo nuevo antes que repetir lo que ya existe.",
      step_2_title: "Hacerlo bien",
      step_2_desc: "Cuidado en los detalles. Construimos cosas hechas para durar.",
      step_3_title: "Ayudar a florecer",
      step_3_desc: "Las buenas empresas elevan a todos a su alrededor: equipos, clientes, comunidades.",
      bird_eyebrow: "Por qué el colibrí",
      bird_title: "Un ave pequeña con un gran efecto.",
      bird_intro: "El colibrí es el animal de nuestra familia. Nunca deja de moverse, y mientras va de flor en flor, todo el jardín crece. Así queremos trabajar.",
      laburo_eyebrow: "Nuestro primer proyecto",
      status_live: "En vivo",
      laburo_desc: "El sistema operativo de contratación con IA para LatAm. Ayuda a las empresas a contratar equipos frontline, y a las personas a encontrar trabajo antes.",
      laburo_cta: "Visitar Laburo",
      next_teaser: "Más ideas están tomando forma.",
      meta_home_title: "Humm Labs — Idea Lab",
      meta_home_desc: "Humm Labs es un idea lab. Construimos, adquirimos, escalamos y operamos empresas innovadoras. Nuestro primer proyecto es Laburo, el sistema operativo de contratación con IA para LatAm."
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

  function initAutomatonAssembly() {
    var pin = document.querySelector('.hero-pin');
    var svg = document.getElementById('automatonSvg');
    if (!pin || !svg) return;

    var draft = document.getElementById('autoDraft');
    var parts = [
      { id: 'partWingEcho', start: 0.18, end: 0.38, kind: 'fade' },
      { id: 'partTail', start: 0.38, end: 0.58, kind: 'settle' },
      { id: 'partBeak', start: 0.48, end: 0.66, kind: 'settle' },
      { id: 'partWing', start: 0.26, end: 0.48, kind: 'settle' },
      { id: 'partBody', start: 0.04, end: 0.3, kind: 'settle' },
      { id: 'partHatch', start: 0.15, end: 0.35, kind: 'fade' },
      { id: 'partAxles', start: 0.58, end: 0.7, kind: 'fade' },
      { id: 'partGear1', start: 0.6, end: 0.76, kind: 'gear' },
      { id: 'partGear2', start: 0.66, end: 0.81, kind: 'gear' },
      { id: 'partGear3', start: 0.72, end: 0.86, kind: 'gear' },
      { id: 'partKey', start: 0.8, end: 0.94, kind: 'settle' },
      { id: 'partEye', start: 0.9, end: 1, kind: 'pop' }
    ].map(function (p) {
      p.el = document.getElementById(p.id);
      return p;
    }).filter(function (p) { return p.el; });

    var reducedMotion = false;
    try {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function applyFinal() {
      parts.forEach(function (p) {
        p.el.style.opacity = 1;
        p.el.style.transform = 'none';
      });
      if (draft) draft.style.opacity = 0.12;
    }

    if (reducedMotion) {
      applyFinal();
      return;
    }

    function applyPart(p, progress) {
      var local = (progress - p.start) / (p.end - p.start);
      local = Math.max(0, Math.min(1, local));
      var eased = easeOutCubic(local);
      p.el.style.opacity = eased;

      if (p.kind === 'settle') {
        var translate = (1 - eased) * 16;
        var scale = 0.94 + eased * 0.06;
        p.el.style.transform = 'translateY(' + translate + 'px) scale(' + scale + ')';
      } else if (p.kind === 'gear') {
        var deg = (1 - eased) * -65;
        p.el.style.transform = 'rotate(' + deg + 'deg)';
      } else if (p.kind === 'pop') {
        var s = 0.3 + eased * 0.7;
        p.el.style.transform = 'scale(' + s + ')';
      }
    }

    function update() {
      var rect = pin.getBoundingClientRect();
      var scrollable = pin.offsetHeight - window.innerHeight;
      var progress = scrollable > 0 ? -rect.top / scrollable : 0;
      progress = Math.max(0, Math.min(1, progress));

      parts.forEach(function (p) { applyPart(p, progress); });
      if (draft) draft.style.opacity = 1 - progress * 0.88;
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function init() {
    initLang();
    initHeaderScroll();
    initMobileNav();
    initReveals();
    initAutomatonAssembly();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
