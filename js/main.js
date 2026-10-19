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
    var root = document.documentElement;
    var pin = document.querySelector('.hero-pin');
    var video = pin && pin.querySelector('.hero-video');
    // The head script picks the animated hero (.hero-js) before the first paint.
    if (!video || typeof video.play !== 'function' || !root.classList.contains('hero-js')) return;
    root.classList.add('hero-live');

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
    // How far the automaton drifts right after the animation, as a share of
    // the screen width (desktop only).
    var DRIFT = 0.08;
    // First load waits for these fonts and the first frame, but never longer
    // than REVEAL_WAIT (ms since navigation) before showing the text.
    var HERO_FONTS = ['300 1em "Cormorant Garamond"', '400 1em "Cormorant Garamond"', '1em Geist', '1em "Geist Mono"'];
    var REVEAL_WAIT = 2000;
    // Desktop draws the animation from a sequence of stills on a canvas, the
    // way Apple's product pages do: any frame shows the moment it is asked
    // for, where seeking a video decodes from the last keyframe and lags the
    // scroll. Phones keep the video, which is a third of the download.
    var FRAME_COUNT = 310;
    var FRAME_URL = 'media/hero/frames/';
    var FRAME_LOADS = 6;
    // Frames this far either side of the current one are kept decoded, so a
    // draw never waits on a decode (about 8 MB each at full size).
    var DECODE_AHEAD = 8;
    // Only the coarse passes load at once; the rest wait for the visitor to
    // interact, or this long after the page has loaded.
    var FINE_FRAMES_AFTER = 3000;

    var mobileQuery = window.matchMedia('(max-width: 860px)');
    var useFrames = !mobileQuery.matches;
    var stage = video;
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
    var lastDrift = 0;
    var lastView = '';

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
    // inline play-then-pause unlocks it. It plays at a crawl so no frame moves
    // before the pause.
    function unlock() {
      if (unlocked) return;
      video.playbackRate = 0.1;
      function settle() {
        video.pause();
        video.playbackRate = 1;
        video.currentTime = shown;
      }
      var attempt = video.play();
      if (attempt && typeof attempt.then === 'function') {
        attempt.then(function () {
          unlocked = true;
          settle();
        }, function () {
          video.playbackRate = 1;
        });
      } else {
        unlocked = true;
        settle();
      }
    }

    // First load: reveal the header and hero once the fonts and the first
    // frame are ready, so nothing pops in or changes font on screen.
    function reveal() {
      root.classList.add('hero-shown');
    }

    function showFrame() {
      root.classList.add('hero-framed');
    }

    // Frame sequence. Frames load coarse to fine (every 16th, then every 8th,
    // and so on), so the whole animation can be scrubbed early and sharpens
    // as the rest arrive; until then the nearest loaded frame stands in.
    var canvas = null;
    var ctx = null;
    var frames = [];
    var decoded = {};
    var drawn = -1;
    var frameDirty = true;

    function loadFrames() {
      var order = [];
      var queued = {};
      var coarse = 0;
      [16, 8, 4, 2, 1].forEach(function (step) {
        for (var i = 0; i < FRAME_COUNT; i += step) {
          if (!queued[i]) {
            queued[i] = true;
            order.push(i);
          }
        }
        if (step === 8) coarse = order.length;
      });
      if (!queued[FRAME_COUNT - 1]) order.splice(1, 0, FRAME_COUNT - 1);
      coarse += 1;
      var next = 0;
      var limit = coarse;
      var active = 0;
      function fine() {
        if (limit === order.length) return;
        limit = order.length;
        while (active < FRAME_LOADS && next < limit) pump();
      }
      ['wheel', 'touchstart', 'pointerdown', 'keydown', 'scroll'].forEach(function (type) {
        window.addEventListener(type, fine, { passive: true, once: true });
      });
      window.addEventListener('load', function () {
        setTimeout(fine, FINE_FRAMES_AFTER);
      });
      function pump() {
        if (next >= limit) return;
        active++;
        var i = order[next++];
        var img = new Image();
        img.decoding = 'async';
        img.onload = function () {
          active--;
          frames[i] = img;
          frameDirty = true;
          pump();
        };
        img.onerror = function () {
          active--;
          pump();
        };
        img.src = FRAME_URL + ('00' + i).slice(-3) + '.webp';
      }
      for (var n = 0; n < FRAME_LOADS; n++) pump();
    }

    // Keeps the loaded frames near `center` decoded as bitmaps and releases
    // the rest. A pending decode is marked true until its bitmap arrives.
    function keepDecoded(center) {
      if (typeof window.createImageBitmap !== 'function') return;
      Object.keys(decoded).forEach(function (key) {
        if (Math.abs(key - center) <= DECODE_AHEAD) return;
        if (decoded[key] !== true) decoded[key].close();
        delete decoded[key];
      });
      var from = Math.max(0, center - DECODE_AHEAD);
      var to = Math.min(FRAME_COUNT - 1, center + DECODE_AHEAD);
      for (var i = from; i <= to; i++) {
        if (frames[i] && !decoded[i]) decodeFrame(i);
      }
    }

    function decodeFrame(i) {
      decoded[i] = true;
      createImageBitmap(frames[i]).then(function (bitmap) {
        if (decoded[i] === true) {
          decoded[i] = bitmap;
        } else {
          bitmap.close();
        }
      }, function () {
        delete decoded[i];
      });
    }

    function nearestFrame(i) {
      for (var d = 0; d < FRAME_COUNT; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    }

    function sizeCanvas() {
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.round(canvas.clientWidth * ratio);
      var h = Math.round(canvas.clientHeight * ratio);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawn = -1;
      }
    }

    // Draws like object-fit: cover, at the same focal point as the video.
    function drawFrame(i) {
      var f = nearestFrame(i);
      if (f < 0 || f === drawn) return;
      var img = frames[f];
      var cw = canvas.width;
      var ch = canvas.height;
      var scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      var w = img.naturalWidth * scale;
      var h = img.naturalHeight * scale;
      var focus = mobileQuery.matches ? 0.5 : 0.35;
      var source = decoded[f] && decoded[f] !== true ? decoded[f] : img;
      ctx.drawImage(source, (cw - w) * focus, (ch - h) / 2, w, h);
      drawn = f;
    }

    if (useFrames) {
      canvas = document.createElement('canvas');
      canvas.className = 'hero-video';
      canvas.setAttribute('aria-hidden', 'true');
      video.parentNode.replaceChild(canvas, video);
      ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      stage = canvas;
      duration = FRAME_COUNT / 24;
      loadFrames();
    }

    video.addEventListener('loadedmetadata', function () {
      duration = video.duration || 0;
      video.currentTime = shown;
    });
    video.addEventListener('loadeddata', function () {
      showFrame();
      unlock();
    });
    if (!useFrames) {
      ['touchstart', 'pointerdown', 'wheel', 'keydown'].forEach(function (type) {
        window.addEventListener(type, unlock, { passive: true, once: true });
      });
    }

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

      // With frames, nothing changes unless the page moved or a frame arrived.
      var view = rect.top + ' ' + vh + ' ' + window.innerWidth;
      if (useFrames && view === lastView && !frameDirty) return;
      lastView = view;

      updateBeats(progress, past);
      if (cue) cue.style.opacity = 1 - smoothstep(0, 0.04, progress);
      // Darken the automaton while text passes over it, and bring it back for
      // the final screen.
      if (dim) {
        var arrive = finale ? 1 - finale.getBoundingClientRect().top / vh : 0;
        var amount = smoothstep(0.05, 0.5, past / vh) * (1 - smoothstep(0.7, 1, arrive));
        dim.style.opacity = amount.toFixed(3);
      }
      // On wide screens the automaton eases to the right as it finishes,
      // giving the text column room.
      var drift = mobileQuery.matches ? 0 : smoothstep(0.8, 0.95, progress) * window.innerWidth * DRIFT;
      if (drift !== lastDrift) {
        lastDrift = drift;
        stage.style.transform = drift ? 'translate3d(' + drift.toFixed(1) + 'px, 0, 0)' : '';
      }
      // Text scrolling off the top fades out under the header.
      var scrim = past > 0;
      if (scrim !== scrimOn) {
        scrimOn = scrim;
        document.body.classList.toggle('header-scrim', scrim);
      }
      if (!duration) return;

      target = timeAt(progress);
      if (useFrames) {
        // The frame follows the scroll directly; Lenis already smooths it.
        frameDirty = false;
        sizeCanvas();
        var index = Math.min(FRAME_COUNT - 1, Math.round(target * 24));
        keepDecoded(index);
        drawFrame(index);
        return;
      }
      shown += (target - shown) * (1 - Math.exp(-CATCH_UP * dt));
      if (Math.abs(target - shown) < 0.002) shown = target;
      // One seek at a time: queueing seeks makes the browser fall behind.
      if (!video.seeking && Math.abs(video.currentTime - shown) > 0.012) {
        video.currentTime = shown;
      }
    }

    if (!useFrames) {
      window.addEventListener('resize', loadSet);
      loadSet();
    }

    // The first frame (the poster, or frame 0) is preloaded in the head. A
    // slow connection gets the text after REVEAL_WAIT and the picture fades
    // in when it arrives.
    var poster = new Image();
    poster.src = useFrames ? FRAME_URL + '000.webp' : video.poster;
    var framed = poster.decode().catch(function () {});
    var fonts = document.fonts
      ? Promise.all(HERO_FONTS.map(function (font) { return document.fonts.load(font); }))
      : null;
    framed.then(showFrame);
    Promise.all([framed, fonts]).then(reveal, reveal);
    setTimeout(reveal, Math.max(0, REVEAL_WAIT - performance.now()));

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
