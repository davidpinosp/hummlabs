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
      nav_factory: 'Factory',
      hero_label: 'Humm Labs',
      hero_title: 'Unseen gaps.\nCutting-edge technology.',
      hero_desc: 'We identify gaps others miss and build the technology that fills them—deployed where it matters.',
      products_title: 'What we build',
      products_desc: 'Two platforms. One standard: ship fast, scale hard.',
      laburo_tag: 'Hiring',
      laburo_desc: 'AI hiring agent for frontline roles. Source, screen, and schedule at scale—fully automated.',
      factory_tag: 'Software',
      factory_desc: 'Custom software studio. Websites, automations, and custom products—built for measurable business results.',
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
      mission_page_lead: 'We are a venture lab that specializes in identifying unseen gaps in markets and applying cutting-edge technology to fill them.',
      mission_identify_title: 'Identify',
      mission_identify_desc: 'Markets have blind spots—demand without solutions, friction without tools. We find those gaps before they become obvious.',
      mission_apply_title: 'Apply',
      mission_apply_desc: 'We apply cutting-edge technology where it creates the most impact: automation, AI, and software that operates at scale.',
      mission_ship_title: 'Ship',
      mission_ship_desc: 'We don\'t stop at experiments. We build and operate products that scale—Laburo for frontline hiring, Factory for custom software—so our partners can move faster.',
      laburo_page_lead: 'AI hiring agent for frontline roles. Source, screen, and schedule at scale—fully automated.',
      laburo_scale_title: 'Scale frontline hiring',
      laburo_scale_desc: 'Frontline roles need volume and speed. Laburo automates sourcing, screening, and scheduling so your team focuses on the final fit—not the funnel.',
      laburo_automated_title: 'Fully automated',
      laburo_automated_desc: 'From first touch to interview on the calendar. One agent, one pipeline, zero manual triage.',
      factory_page_lead: 'Premium digital systems studio for websites, automations, and internal tools.',
      factory_hero_kicker: 'Factory',
      factory_hero_title: 'Digital systems built to spec.',
      factory_hero_desc: 'Factory designs and builds high-performance websites, automations, and custom systems. No templates. No bloat. Just infrastructure that drives qualified demand and turns traffic into closed deals.',
      factory_chip_web: 'Brand websites',
      factory_chip_auto: 'Revenue automation',
      factory_chip_ai: 'Operational systems',
      factory_chip_seo_gso: 'SEO + GSO',
      factory_visual_title: 'What you get',
      factory_visual_line_1: 'Production-ready quality',
      factory_visual_line_2: 'Custom stack and integrations',
      factory_visual_line_3: 'Launch speed measured in days',
      factory_capabilities_title: 'What we build',
      factory_capabilities_desc: 'Every system is scoped, designed, and delivered for one thing: measurable commercial impact.',
      factory_capability_web_title: 'Conversion-grade websites',
      factory_capability_web_desc: 'Narrative, architecture, and performance engineered around buyer intent - not aesthetics for aesthetics\' sake.',
      factory_capability_auto_title: 'Revenue automation',
      factory_capability_auto_desc: 'Lead capture to follow-up to quote - your entire funnel running without bottlenecks, without manual gaps.',
      factory_capability_custom_title: 'Custom systems',
      factory_capability_custom_desc: 'Internal tools and workflows shaped to how your team actually operates. Not the other way around.',
      factory_process_title: 'How we work',
      factory_process_desc: 'Senior execution. Direct accountability. No handoffs to juniors, no scope drift.',
      factory_step_1_title: 'Scope',
      factory_step_1_desc: 'Objectives, boundaries, and timeline locked.',
      factory_step_2_title: 'Design',
      factory_step_2_desc: 'System architecture and flow mapped.',
      factory_step_3_title: 'Build',
      factory_step_3_desc: 'Engineered and integrated end to end.',
      factory_step_4_title: 'Launch',
      factory_step_4_desc: 'Live, measured, and iterated.',
      factory_testimonials_title: 'Results',
      factory_testimonials_desc: 'Teams that needed it done right.',
      factory_testimonial_laburo_quote: '"We came out significantly stronger - a solid site, a clear message, and qualified applicants from week one."',
      factory_testimonial_laburo_role: 'Laburo Team',
      factory_testimonial_nomada_quote: '"Factory organized our entire digital operation. We quote faster, respond better, and close more."',
      factory_testimonial_nomada_role: 'Nomada Mudanzas Team',
      back_to_products: 'Back to products',
      team_page_title: 'Team',
      team_page_lead: 'The people behind Humm Labs. We find the gaps and build what fills them.',
      team_david_role: 'Founder',
      team_david_bio: 'Leading Humm Labs in identifying unseen market gaps and applying cutting-edge technology to build products that scale.'
    },
    es: {
      logo: 'Humm Labs',
      nav_products: 'Productos',
      nav_mission: 'Misión',
      nav_team: 'Equipo',
      nav_laburo: 'Laburo',
      nav_factory: 'Factory',
      hero_label: 'Humm Labs',
      hero_title: 'Brechas invisibles.\nTecnología de vanguardia.',
      hero_desc: 'Identificamos gaps que otros no ven y construimos la tecnología que los resuelve—donde importa.',
      products_title: 'Lo que construimos',
      products_desc: 'Dos plataformas. Un estándar: enviar rápido, escalar fuerte.',
      laburo_tag: 'Contratación',
      laburo_desc: 'Agente de contratación con IA para roles de primera línea. Reclutar, filtrar y agendar a escala—totalmente automatizado.',
      factory_tag: 'Software',
      factory_desc: 'Estudio de software a medida. Sitios web, automatizaciones y productos personalizados para resultados reales de negocio.',
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
      mission_page_lead: 'Somos un venture lab que identifica brechas invisibles en los mercados y aplica tecnología de vanguardia para resolverlas.',
      mission_identify_title: 'Identificar',
      mission_identify_desc: 'Los mercados tienen puntos ciegos—demanda sin soluciones, fricción sin herramientas. Encontramos esas brechas antes de que sean obvias.',
      mission_apply_title: 'Aplicar',
      mission_apply_desc: 'Aplicamos tecnología de vanguardia donde genera más impacto: automatización, IA y software que opera a escala.',
      mission_ship_title: 'Entregar',
      mission_ship_desc: 'No nos quedamos en experimentos. Construimos y operamos productos que escalan—Laburo para contratación frontline, Factory para software a medida—para que nuestros partners avancen más rápido.',
      laburo_page_lead: 'Agente de contratación con IA para roles de primera línea. Reclutar, filtrar y agendar a escala—totalmente automatizado.',
      laburo_scale_title: 'Escalar la contratación frontline',
      laburo_scale_desc: 'Los roles de primera línea piden volumen y velocidad. Laburo automatiza reclutamiento, filtrado y agendado para que tu equipo se enfoque en el fit final—no en el embudo.',
      laburo_automated_title: 'Totalmente automatizado',
      laburo_automated_desc: 'Desde el primer contacto hasta la entrevista en el calendario. Un agente, un pipeline, cero triage manual.',
      factory_page_lead: 'Estudio premium de sistemas digitales para sitios web, automatizaciones y herramientas internas.',
      factory_hero_kicker: 'Factory',
      factory_hero_title: 'Sistemas digitales hechos a medida.',
      factory_hero_desc: 'Factory diseña y construye sitios web, automatizaciones y sistemas a medida que generan demanda calificada y convierten tráfico en ventas. Sin plantillas. Sin relleno. Solo infraestructura que mueve resultados.',
      factory_chip_web: 'Web de marca',
      factory_chip_auto: 'Automatización de ingresos',
      factory_chip_ai: 'Sistemas de operación',
      factory_chip_seo_gso: 'SEO + GSO',
      factory_visual_title: 'Lo que recibes',
      factory_visual_line_1: 'Calidad lista para producción',
      factory_visual_line_2: 'Stack e integraciones a medida',
      factory_visual_line_3: 'Velocidad de lanzamiento en días',
      factory_capabilities_title: 'Qué construimos',
      factory_capabilities_desc: 'Cada sistema se define, diseña y entrega con un solo objetivo: impacto comercial medible.',
      factory_capability_web_title: 'Web que convierte',
      factory_capability_web_desc: 'Narrativa, arquitectura y performance diseñados alrededor de la intención de compra - no estética por estética.',
      factory_capability_auto_title: 'Automatización de ingresos',
      factory_capability_auto_desc: 'De la captura del lead al seguimiento y la cotización - tu funnel completo operando sin cuellos de botella, sin baches manuales.',
      factory_capability_custom_title: 'Sistemas a medida',
      factory_capability_custom_desc: 'Herramientas internas y flujos armados para cómo tu equipo realmente trabaja. No al revés.',
      factory_process_title: 'Cómo trabajamos',
      factory_process_desc: 'Ejecución senior. Accountability directo. Sin delegación a juniors, sin desvíos de alcance.',
      factory_step_1_title: 'Scope',
      factory_step_1_desc: 'Objetivos, límites y timeline definidos.',
      factory_step_2_title: 'Diseño',
      factory_step_2_desc: 'Arquitectura y flujo del sistema mapeados.',
      factory_step_3_title: 'Build',
      factory_step_3_desc: 'Construcción e integración de punta a punta.',
      factory_step_4_title: 'Launch',
      factory_step_4_desc: 'En vivo, medido e iterado.',
      factory_testimonials_title: 'Resultados',
      factory_testimonials_desc: 'Equipos que necesitaban que saliera bien.',
      factory_testimonial_laburo_quote: '"Salimos mucho mejor parados - sitio sólido, mensaje claro y postulaciones calificadas desde la primera semana."',
      factory_testimonial_laburo_role: 'Equipo Laburo',
      factory_testimonial_nomada_quote: '"Factory nos ordenó toda la operación digital. Hoy cotizamos más rápido, respondemos mejor y cerramos más."',
      factory_testimonial_nomada_role: 'Equipo Nómada Mudanzas',
      back_to_products: 'Volver a productos',
      team_page_title: 'Equipo',
      team_page_lead: 'Las personas detrás de Humm Labs. Encontramos las brechas y construimos lo que las llena.',
      team_david_role: 'Fundador',
      team_david_bio: 'Liderando Humm Labs en la identificación de brechas invisibles en el mercado y la aplicación de tecnología de vanguardia para construir productos que escalan.'
    }
  };

  function getLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === 'es' || stored === 'en') return stored;
    } catch (e) {}
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
    initReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
