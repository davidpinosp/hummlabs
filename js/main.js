(function () {
  'use strict';

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
