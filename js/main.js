(function () {
  'use strict';

  var LANG_KEY = 'hummlabs-lang';

  var translations = {
    en: {
      logo: 'Humm Labs',
      nav_products: 'Products',
      nav_mission: 'Mission',
      nav_team: 'Team',
      nav_laburo: 'Laburo',
      hero_label: 'Idea Lab',
      hero_title: 'Unseen gaps.\nCutting-edge technology.',
      hero_desc: 'We identify gaps others miss and build the technology that fills them—deployed where it matters.',
      products_title: 'What we\'re building',
      products_desc: 'Our first system, live and running. More in the lab.',
      status_live: 'Live',
      laburo_tag: 'AI Hiring OS',
      laburo_desc: 'The AI hiring operating system for LatAm. Source, screen, and schedule frontline talent—fully autonomous, built for the region\'s scale.',
      lab_teaser_tag: 'In the lab',
      lab_teaser_title: 'Next system',
      lab_teaser_desc: 'New systems in active development. Built in-house, shipped when they\'re ready.',
      learn_more: 'Learn more',
      why_title: 'Why we exist',
      why_desc: 'Markets have blind spots. We find them and build the systems that own them.',
      why_1_title: 'Identify',
      why_1_desc: 'We spot unseen gaps—where demand exists but solutions don\'t.',
      why_2_title: 'Apply',
      why_2_desc: 'We apply cutting-edge technology where it creates the most impact.',
      why_3_title: 'Ship',
      why_3_desc: 'We build and operate products that scale—not experiments.',
      our_mission: 'Our mission',
      footer_tagline: 'Unseen gaps. Cutting-edge technology.',
      mission_page_title: 'Our mission',
      mission_page_lead: 'We\'re an idea lab that identifies unseen gaps in markets and builds the technology to close them.',
      mission_identify_title: 'Identify',
      mission_identify_desc: 'Markets have blind spots—demand without solutions, friction without tools. We find those gaps before they become obvious.',
      mission_apply_title: 'Apply',
      mission_apply_desc: 'We apply cutting-edge technology where it creates the most impact: automation, AI, and software that operates at scale.',
      mission_ship_title: 'Ship',
      mission_ship_desc: 'We don\'t stop at experiments. We build and operate products that scale—starting with Laburo, our AI hiring operating system for LatAm—so our partners move faster.',
      laburo_page_lead: 'The AI hiring operating system for LatAm. Autonomous sourcing, screening, and scheduling for frontline teams—built for how the region actually hires.',
      laburo_scale_title: 'Built for LatAm scale',
      laburo_scale_desc: 'Frontline hiring in Latin America runs on volume, speed, and WhatsApp—not legacy ATS software. Laburo is the operating layer underneath: sourcing, screening, and scheduling running as one system.',
      laburo_automated_title: 'Fully autonomous',
      laburo_automated_desc: 'From first contact to a confirmed interview, one agent runs the entire pipeline. No manual triage, no dropped candidates, no volume left on the table.',
      laburo_modules_title: 'System modules',
      laburo_modules_desc: 'One pipeline, three modules, zero handoffs.',
      laburo_module_source_title: 'Source',
      laburo_module_source_desc: 'Reaches candidates where they already are and opens the conversation—no job boards, no waiting.',
      laburo_module_screen_title: 'Screen',
      laburo_module_screen_desc: 'Qualifies every candidate against the role in real time, at any volume, with no queue.',
      laburo_module_schedule_title: 'Schedule',
      laburo_module_schedule_desc: 'Books the interview directly on the calendar the moment a candidate qualifies.',
      back_to_products: 'Back to products',
      team_page_title: 'Team',
      team_page_lead: 'The people behind Humm Labs. We find the gaps and build what fills them.',
      team_david_role: 'Founder',
      team_david_bio: 'Leading Humm Labs in identifying unseen market gaps and applying cutting-edge technology to build products that scale.',
      meta_home_title: 'Humm Labs — Idea Lab. Unseen Gaps. Cutting-Edge Technology.',
      meta_home_desc: 'Humm Labs is an idea lab that identifies unseen market gaps. Laburo, our AI hiring operating system for LatAm, is the first system live.',
      meta_mission_title: 'Mission — Humm Labs',
      meta_mission_desc: 'The mission of Humm Labs: identify unseen gaps and apply cutting-edge technology to close them.',
      meta_laburo_title: 'Laburo — The AI Hiring Operating System for LatAm | Humm Labs',
      meta_laburo_desc: 'Laburo is the AI hiring operating system for LatAm. Source, screen, and schedule frontline talent, fully autonomous.',
      meta_team_title: 'Team — Humm Labs',
      meta_team_desc: 'The people behind Humm Labs and the products built to close market gaps.'
    },
    es: {
      logo: 'Humm Labs',
      nav_products: 'Productos',
      nav_mission: 'Misión',
      nav_team: 'Equipo',
      nav_laburo: 'Laburo',
      hero_label: 'Idea Lab',
      hero_title: 'Brechas invisibles.\nTecnología de vanguardia.',
      hero_desc: 'Identificamos gaps que otros no ven y construimos la tecnología que los resuelve—donde importa.',
      products_title: 'Lo que estamos construyendo',
      products_desc: 'Nuestro primer sistema, ya en producción. Más en el laboratorio.',
      status_live: 'En vivo',
      laburo_tag: 'Sistema de Contratación IA',
      laburo_desc: 'El sistema operativo de contratación con IA para LatAm. Reclutamiento, filtrado y agendado de talento frontline—totalmente autónomo, construido para la escala de la región.',
      lab_teaser_tag: 'En el laboratorio',
      lab_teaser_title: 'Próximo sistema',
      lab_teaser_desc: 'Nuevos sistemas en desarrollo activo. Construidos in-house, lanzados cuando estén listos.',
      learn_more: 'Saber más',
      why_title: 'Por qué existimos',
      why_desc: 'Los mercados tienen puntos ciegos. Los encontramos y construimos los sistemas que los dominan.',
      why_1_title: 'Identificar',
      why_1_desc: 'Detectamos brechas invisibles—donde hay demanda pero no soluciones.',
      why_2_title: 'Aplicar',
      why_2_desc: 'Aplicamos tecnología de vanguardia donde genera más impacto.',
      why_3_title: 'Entregar',
      why_3_desc: 'Construimos y operamos productos que escalan—no experimentos.',
      our_mission: 'Nuestra misión',
      footer_tagline: 'Brechas invisibles. Tecnología de vanguardia.',
      mission_page_title: 'Nuestra misión',
      mission_page_lead: 'Somos un idea lab que identifica brechas invisibles en los mercados y construye la tecnología para resolverlas.',
      mission_identify_title: 'Identificar',
      mission_identify_desc: 'Los mercados tienen puntos ciegos—demanda sin soluciones, fricción sin herramientas. Encontramos esas brechas antes de que sean obvias.',
      mission_apply_title: 'Aplicar',
      mission_apply_desc: 'Aplicamos tecnología de vanguardia donde genera más impacto: automatización, IA y software que opera a escala.',
      mission_ship_title: 'Entregar',
      mission_ship_desc: 'No nos quedamos en experimentos. Construimos y operamos productos que escalan—empezando por Laburo, nuestro sistema operativo de contratación con IA para LatAm—para que nuestros partners avancen más rápido.',
      laburo_page_lead: 'El sistema operativo de contratación con IA para LatAm. Reclutamiento, filtrado y agendado autónomo para equipos frontline—construido para cómo la región realmente contrata.',
      laburo_scale_title: 'Construido para la escala de LatAm',
      laburo_scale_desc: 'La contratación frontline en América Latina corre sobre volumen, velocidad y WhatsApp—no software de ATS heredado. Laburo es la capa operativa debajo: reclutamiento, filtrado y agendado corriendo como un solo sistema.',
      laburo_automated_title: 'Totalmente autónomo',
      laburo_automated_desc: 'Desde el primer contacto hasta la entrevista confirmada, un solo agente corre todo el pipeline. Sin triage manual, sin candidatos perdidos, sin volumen que se cae.',
      laburo_modules_title: 'Módulos del sistema',
      laburo_modules_desc: 'Un pipeline, tres módulos, cero traspasos.',
      laburo_module_source_title: 'Reclutar',
      laburo_module_source_desc: 'Llega a los candidatos donde ya están y abre la conversación—sin bolsas de trabajo, sin esperas.',
      laburo_module_screen_title: 'Filtrar',
      laburo_module_screen_desc: 'Califica a cada candidato contra el rol en tiempo real, a cualquier volumen, sin cola.',
      laburo_module_schedule_title: 'Agendar',
      laburo_module_schedule_desc: 'Agenda la entrevista directo en el calendario en el momento en que el candidato califica.',
      back_to_products: 'Volver a productos',
      team_page_title: 'Equipo',
      team_page_lead: 'Las personas detrás de Humm Labs. Encontramos las brechas y construimos lo que las llena.',
      team_david_role: 'Fundador',
      team_david_bio: 'Liderando Humm Labs en la identificación de brechas invisibles en el mercado y la aplicación de tecnología de vanguardia para construir productos que escalan.',
      meta_home_title: 'Humm Labs — Idea Lab. Brechas invisibles. Tecnología de vanguardia.',
      meta_home_desc: 'Humm Labs es un idea lab que identifica brechas invisibles en mercados. Laburo, nuestro sistema operativo de contratación con IA para LatAm, es el primer sistema en vivo.',
      meta_mission_title: 'Misión — Humm Labs',
      meta_mission_desc: 'La misión de Humm Labs: identificar brechas invisibles y aplicar tecnología de vanguardia para resolverlas.',
      meta_laburo_title: 'Laburo — El Sistema Operativo de Contratación con IA para LatAm | Humm Labs',
      meta_laburo_desc: 'Laburo es el sistema operativo de contratación con IA para LatAm. Reclutamiento, filtrado y agendado de talento frontline, totalmente autónomo.',
      meta_team_title: 'Equipo — Humm Labs',
      meta_team_desc: 'Las personas detrás de Humm Labs y de los productos que cierran brechas de mercado.'
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
    if (file === 'mission.html') return 'mission';
    if (file === 'laburo.html') return 'laburo';
    if (file === 'team.html') return 'team';
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

  function init() {
    initLang();
    initHeaderScroll();
    initMobileNav();
    initReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
