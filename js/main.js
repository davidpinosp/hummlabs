(function () {
  'use strict';

  var LANG_KEY = 'hummlabs-lang';

  var translations = {
    en: {
      logo: "Humm Labs",
      nav_mission: "Mission",
      nav_bird: "Hummingbird",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab",
      hero_title: "We terraform.\nWhere there was nothing, something grows.",
      hero_desc: "Humm Labs is an idea lab. We create and build things that shape our surroundings and help them flourish.",
      mission_eyebrow: "The mission",
      mission_title: "Shape the world around us, and help it flourish.",
      mission_body: "We like making things. We look closely at the places around us—an industry, a community, a way of working—notice what’s missing, and build something that helps it grow. Then we keep tending it.",
      step_1_title: "Notice",
      step_1_desc: "Pay attention to what’s missing, and to the people it affects.",
      step_2_title: "Make",
      step_2_desc: "Build carefully, with the best tools of our time.",
      step_3_title: "Tend",
      step_3_desc: "Stay with what we build and help it grow over time.",
      bird_eyebrow: "Why the hummingbird",
      bird_title: "A small bird with a large effect.",
      bird_intro: "The hummingbird has long been our family’s animal. It also reminds us how we want to work.",
      trait_1_title: "Constant motion",
      trait_1_desc: "Its wings beat dozens of times a second, adjusting with every movement. We try to work the same way: small steps, constant refinement.",
      trait_2_title: "Lightness",
      trait_2_desc: "It moves quickly, but lightly. We want to move fast without leaving a heavy footprint.",
      trait_3_title: "Pollination",
      trait_3_desc: "As it feeds, it carries pollen from flower to flower and helps the whole garden grow. We hope what we make does the same.",
      laburo_eyebrow: "Our first project",
      status_live: "Live",
      laburo_desc: "The AI hiring operating system for LatAm. It helps companies hire frontline teams, and helps people find work sooner.",
      module_source_title: "Source",
      module_source_desc: "Meets candidates where they already are, on the channels they use every day.",
      module_screen_title: "Screen",
      module_screen_desc: "Reviews each application against the role, quickly and consistently.",
      module_schedule_title: "Schedule",
      module_schedule_desc: "Books the interview as soon as there’s a good fit.",
      laburo_cta: "Visit Laburo",
      next_teaser: "Other ideas are taking shape.",
      footer_tagline: "We terraform.",
      meta_home_title: "Humm Labs — We terraform.",
      meta_home_desc: "Humm Labs is an idea lab. We create and build things that shape our surroundings and help them flourish. Our first project is Laburo, the AI hiring operating system for LatAm."
    },
    es: {
      logo: "Humm Labs",
      nav_mission: "Misión",
      nav_bird: "Colibrí",
      nav_laburo: "Laburo",
      hero_label: "Idea Lab",
      hero_title: "Terraformamos.\nDonde no había nada, algo crece.",
      hero_desc: "Humm Labs es un idea lab. Creamos y construimos cosas que dan forma a nuestro entorno y lo ayudan a florecer.",
      mission_eyebrow: "La misión",
      mission_title: "Dar forma al mundo que nos rodea, y ayudarlo a florecer.",
      mission_body: "Nos gusta hacer cosas. Miramos con atención los lugares que nos rodean—una industria, una comunidad, una forma de trabajar—, notamos lo que falta y construimos algo que lo ayude a crecer. Y después lo seguimos cuidando.",
      step_1_title: "Observar",
      step_1_desc: "Prestar atención a lo que falta, y a las personas a quienes afecta.",
      step_2_title: "Hacer",
      step_2_desc: "Construir con cuidado, con las mejores herramientas de nuestro tiempo.",
      step_3_title: "Cuidar",
      step_3_desc: "Acompañar lo que construimos y ayudarlo a crecer con el tiempo.",
      bird_eyebrow: "Por qué el colibrí",
      bird_title: "Un ave pequeña con un gran efecto.",
      bird_intro: "El colibrí ha sido por mucho tiempo el animal de nuestra familia. También nos recuerda cómo queremos trabajar.",
      trait_1_title: "Movimiento constante",
      trait_1_desc: "Sus alas baten decenas de veces por segundo, ajustándose con cada movimiento. Intentamos trabajar igual: pasos pequeños, mejora constante.",
      trait_2_title: "Ligereza",
      trait_2_desc: "Se mueve rápido, pero con ligereza. Queremos avanzar rápido sin dejar una huella pesada.",
      trait_3_title: "Polinización",
      trait_3_desc: "Mientras se alimenta, lleva polen de flor en flor y ayuda a que todo el jardín crezca. Esperamos que lo que hacemos tenga el mismo efecto.",
      laburo_eyebrow: "Nuestro primer proyecto",
      status_live: "En vivo",
      laburo_desc: "El sistema operativo de contratación con IA para LatAm. Ayuda a las empresas a contratar equipos frontline, y a las personas a encontrar trabajo antes.",
      module_source_title: "Reclutar",
      module_source_desc: "Encuentra a los candidatos donde ya están, en los canales que usan todos los días.",
      module_screen_title: "Filtrar",
      module_screen_desc: "Revisa cada postulación frente al rol, de forma rápida y consistente.",
      module_schedule_title: "Agendar",
      module_schedule_desc: "Agenda la entrevista en cuanto hay un buen encaje.",
      laburo_cta: "Visitar Laburo",
      next_teaser: "Otras ideas están tomando forma.",
      footer_tagline: "Terraformamos.",
      meta_home_title: "Humm Labs — Terraformamos.",
      meta_home_desc: "Humm Labs es un idea lab. Creamos y construimos cosas que dan forma a nuestro entorno y lo ayudan a florecer. Nuestro primer proyecto es Laburo, el sistema operativo de contratación con IA para LatAm."
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
