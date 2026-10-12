(function () {
  'use strict';

  var LANG_KEY = 'hummlabs-lang';

  var translations = {
    en: {
      logo: 'Humm Labs',
      nav_mission: 'Mission',
      nav_bird: 'Hummingbird',
      nav_laburo: 'Laburo',
      nav_team: 'Team',
      hero_label: 'Idea Lab',
      hero_title: 'We terraform.\nWhere there was nothing, something grows.',
      hero_desc: 'Humm Labs is an idea lab. We shape the world into what we want it to be—and leave our surroundings better than we found them.',
      mission_eyebrow: 'The mission',
      mission_title: 'Make the world what we want it to look like.',
      mission_body: 'Most people accept the world as they find it. We don\'t. Humm Labs finds the ground no one has built on—markets with real demand and no real solution—and builds the systems that change them. We don\'t observe our surroundings. We shape them.',
      step_1_title: 'Find the ground',
      step_1_desc: 'Real demand, no real solution. We look where others haven\'t.',
      step_2_title: 'Build the system',
      step_2_desc: 'We apply AI and software with intention—built to run, not to demo.',
      step_3_title: 'Make it bloom',
      step_3_desc: 'We operate what we build until it scales and changes its market.',
      bird_eyebrow: 'Why the hummingbird',
      bird_title: 'Small. Relentless. Impossible to ignore.',
      bird_intro: 'The hummingbird is our family\'s animal. It\'s also how we work.',
      trait_1_title: 'Relentless iteration',
      trait_1_desc: 'Its wings beat up to 80 times a second. It never stops moving, never stops refining. Neither do we.',
      trait_2_title: 'Speed',
      trait_2_desc: 'For its size, it\'s one of the fastest animals on Earth. We ship, learn, and ship again before the window closes.',
      trait_3_title: 'Impact',
      trait_3_desc: 'It pollinates as it feeds, leaving every place it visits more alive than it found it. That\'s the standard we hold ourselves to.',
      laburo_eyebrow: 'First bloom',
      status_live: 'Live',
      laburo_desc: 'The AI hiring operating system for LatAm. Frontline hiring in Latin America runs on volume, speed, and WhatsApp—not legacy software. Laburo runs the entire pipeline on its own.',
      module_source_title: 'Source',
      module_source_desc: 'Reaches candidates where they already are and starts the conversation.',
      module_screen_title: 'Screen',
      module_screen_desc: 'Qualifies every candidate against the role, in real time, at any volume.',
      module_schedule_title: 'Schedule',
      module_schedule_desc: 'Books the interview the moment a candidate qualifies.',
      laburo_cta: 'Visit Laburo',
      next_teaser: 'A second system is already taking root.',
      team_eyebrow: 'The team',
      team_title: 'The people behind the lab.',
      team_david_role: 'Founder',
      team_david_bio: 'Building Humm Labs to find the markets no one has built for—and terraform them.',
      footer_tagline: 'We terraform.',
      meta_home_title: 'Humm Labs — We terraform.',
      meta_home_desc: 'Humm Labs is an idea lab. We find the markets no one has built for and terraform them. First system live: Laburo, the AI hiring operating system for LatAm.'
    },
    es: {
      logo: 'Humm Labs',
      nav_mission: 'Misión',
      nav_bird: 'Colibrí',
      nav_laburo: 'Laburo',
      nav_team: 'Equipo',
      hero_label: 'Idea Lab',
      hero_title: 'Terraformamos.\nDonde no había nada, algo crece.',
      hero_desc: 'Humm Labs es un idea lab. Moldeamos el mundo para que sea lo que queremos que sea—y dejamos nuestro entorno mejor de lo que lo encontramos.',
      mission_eyebrow: 'La misión',
      mission_title: 'Hacer que el mundo se vea como queremos.',
      mission_body: 'La mayoría acepta el mundo tal como lo encuentra. Nosotros no. Humm Labs encuentra el terreno donde nadie ha construido—mercados con demanda real y sin una solución real—y construye los sistemas que los transforman. No observamos nuestro entorno. Le damos forma.',
      step_1_title: 'Encontrar el terreno',
      step_1_desc: 'Demanda real, sin solución real. Buscamos donde otros no han mirado.',
      step_2_title: 'Construir el sistema',
      step_2_desc: 'Aplicamos IA y software con intención—hecho para operar, no para una demo.',
      step_3_title: 'Hacerlo florecer',
      step_3_desc: 'Operamos lo que construimos hasta que escala y transforma su mercado.',
      bird_eyebrow: 'Por qué el colibrí',
      bird_title: 'Pequeño. Incansable. Imposible de ignorar.',
      bird_intro: 'El colibrí es el animal de nuestra familia. También es cómo trabajamos.',
      trait_1_title: 'Iteración incansable',
      trait_1_desc: 'Sus alas baten hasta 80 veces por segundo. Nunca deja de moverse, nunca deja de refinarse. Nosotros tampoco.',
      trait_2_title: 'Velocidad',
      trait_2_desc: 'Para su tamaño, es uno de los animales más rápidos del planeta. Lanzamos, aprendemos y volvemos a lanzar antes de que se cierre la ventana.',
      trait_3_title: 'Impacto',
      trait_3_desc: 'Poliniza mientras se alimenta, y deja cada lugar que visita más vivo de lo que lo encontró. Ese es el estándar que nos exigimos.',
      laburo_eyebrow: 'Primer brote',
      status_live: 'En vivo',
      laburo_desc: 'El sistema operativo de contratación con IA para LatAm. La contratación frontline en América Latina corre sobre volumen, velocidad y WhatsApp—no sobre software heredado. Laburo opera todo el pipeline por sí solo.',
      module_source_title: 'Reclutar',
      module_source_desc: 'Llega a los candidatos donde ya están e inicia la conversación.',
      module_screen_title: 'Filtrar',
      module_screen_desc: 'Califica a cada candidato contra el rol, en tiempo real y a cualquier volumen.',
      module_schedule_title: 'Agendar',
      module_schedule_desc: 'Agenda la entrevista en el momento en que el candidato califica.',
      laburo_cta: 'Visitar Laburo',
      next_teaser: 'Un segundo sistema ya está echando raíces.',
      team_eyebrow: 'El equipo',
      team_title: 'Las personas detrás del laboratorio.',
      team_david_role: 'Fundador',
      team_david_bio: 'Construyendo Humm Labs para encontrar los mercados donde nadie ha construido—y terraformarlos.',
      footer_tagline: 'Terraformamos.',
      meta_home_title: 'Humm Labs — Terraformamos.',
      meta_home_desc: 'Humm Labs es un idea lab. Encontramos los mercados donde nadie ha construido y los terraformamos. Primer sistema en vivo: Laburo, el sistema operativo de contratación con IA para LatAm.'
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
