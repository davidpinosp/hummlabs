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

  // Draws the hero video frame by frame on a canvas with WebCodecs. Seeking a
  // <video> costs tens of milliseconds per jump whatever the encoding, so the
  // picture lagged the scroll; decoding the frames directly is many times
  // faster. The file is fetched once as plain bytes, and a small index (made by
  // tools/hero-index.py) says where each frame is in it. Frames decode in
  // groups that start on a keyframe (12 frames), and only the group on screen
  // and its two neighbours stay decoded, so memory stays bounded however far
  // anyone scrolls. onFail is called if decoding breaks at any point.
  function FramePlayer(canvas, onFail) {
    var GROUPS_KEPT = 3;
    var ctx = canvas.getContext('2d');
    var player = this;
    var generation = 0;
    var index = null;
    var groups = [];
    var bytes = null;
    var received = 0;
    var decoder = null;
    var aborter = null;
    var cache = {};
    var decoding = -1;
    var pending = null;
    var want = 0;
    var dir = 1;
    var drawnIndex = -1;
    var poster = null;
    var failed = false;

    this.set = '';
    this.frameCount = 0;
    this.fps = 24;
    this.dirty = true;
    this.stats = { draws: 0, groupMs: 0, cached: 0 };

    function timestamp(i) {
      return Math.round(i * 1e6 / player.fps);
    }

    function closeFrames(frames) {
      frames.forEach(function (f) {
        if (f) f.close();
      });
    }

    function teardown() {
      generation++;
      if (aborter) aborter.abort();
      if (decoder && decoder.state !== 'closed') decoder.close();
      Object.keys(cache).forEach(function (g) {
        closeFrames(cache[g]);
      });
      if (pending) closeFrames(pending);
      cache = {};
      pending = null;
      decoding = -1;
      received = 0;
      drawnIndex = -1;
    }

    function fail(err) {
      if (failed) return;
      failed = true;
      teardown();
      if (window.console) console.warn('Hero frames fell back to the video:', err);
      onFail();
    }

    function groupOf(i) {
      for (var g = groups.length - 1; g >= 0; g--) {
        if (groups[g].start <= i) return g;
      }
      return 0;
    }

    function arrived(g) {
      return groups[g].lastByte <= received;
    }

    function decodeGroup(g) {
      var group = groups[g];
      var mine = generation;
      var started = performance.now();
      decoding = g;
      pending = [];
      try {
        for (var i = group.start; i <= group.end; i++) {
          var frame = index.frames[i];
          decoder.decode(new EncodedVideoChunk({
            type: i === group.start ? 'key' : 'delta',
            timestamp: timestamp(i),
            duration: timestamp(1),
            data: bytes.subarray(frame[0], frame[0] + frame[1])
          }));
        }
      } catch (err) {
        fail(err);
        return;
      }
      decoder.flush().then(function () {
        if (mine !== generation) return;
        cache[g] = pending;
        pending = null;
        decoding = -1;
        player.stats.groupMs = performance.now() - started;
        player.dirty = true;
        schedule();
      }, function (err) {
        if (mine === generation) fail(err);
      });
    }

    // Keeps the group on screen and the next one in the scroll direction (then
    // the one behind) decoded, releasing everything else.
    function schedule() {
      if (failed || !index || decoding >= 0) return;
      var g = groupOf(want);
      var keep = [g, g + dir, g - dir].filter(function (n) {
        return n >= 0 && n < groups.length;
      }).slice(0, GROUPS_KEPT);
      Object.keys(cache).forEach(function (n) {
        if (keep.indexOf(+n) < 0) {
          closeFrames(cache[n]);
          delete cache[n];
        }
      });
      player.stats.cached = Object.keys(cache).length * 12;
      for (var k = 0; k < keep.length; k++) {
        if (!cache[keep[k]] && arrived(keep[k])) {
          decodeGroup(keep[k]);
          return;
        }
      }
    }

    function sizeCanvas() {
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.round(canvas.clientWidth * ratio);
      var h = Math.round(canvas.clientHeight * ratio);
      if (w && h && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
        drawnIndex = -1;
      }
    }

    // Draws like object-fit: cover, at the same focal point as the video.
    function paint(source, sw, sh, focus) {
      var cw = canvas.width;
      var ch = canvas.height;
      var scale = Math.max(cw / sw, ch / sh);
      var w = sw * scale;
      var h = sh * scale;
      ctx.drawImage(source, (cw - w) * focus, (ch - h) / 2, w, h);
    }

    // The frame asked for if it is decoded, else the nearest decoded one.
    function bestFrame() {
      var best = null;
      Object.keys(cache).forEach(function (n) {
        var group = groups[n];
        var i = Math.max(group.start, Math.min(group.end, want));
        var frame = cache[n][i - group.start];
        if (frame && (!best || Math.abs(i - want) < Math.abs(best.i - want))) best = { i: i, frame: frame };
      });
      return best;
    }

    function draw(focus) {
      sizeCanvas();
      var best = bestFrame();
      if (best) {
        if (best.i === drawnIndex) return;
        paint(best.frame, best.frame.displayWidth, best.frame.displayHeight, focus);
        drawnIndex = best.i;
        player.stats.draws++;
        player.dirty = best.i !== want;
      } else if (poster && drawnIndex === -1) {
        paint(poster, poster.naturalWidth, poster.naturalHeight, focus);
        drawnIndex = -2;
      }
    }

    this.setPoster = function (img, focus) {
      poster = img;
      draw(focus);
    };

    this.show = function (i, focus) {
      if (i !== want) {
        dir = i > want ? 1 : -1;
        want = i;
        schedule();
      }
      player.dirty = false;
      draw(focus);
    };

    this.loaded = function () {
      return bytes ? received / bytes.length : 0;
    };

    // Resolves true once decoding can start, or false if this browser cannot
    // decode the video (the caller then uses the <video> instead).
    this.load = function (set) {
      teardown();
      failed = false;
      player.set = set;
      var mine = generation;
      aborter = typeof AbortController === 'function' ? new AbortController() : null;
      var signal = aborter ? aborter.signal : undefined;
      return fetch('media/hero/hero-' + set + '.json', { signal: signal }).then(function (res) {
        if (!res.ok) throw new Error('hero index ' + res.status);
        return res.json();
      }).then(function (data) {
        var config = {
          codec: data.codec,
          codedWidth: data.width,
          codedHeight: data.height,
          optimizeForLatency: true
        };
        if (data.description) {
          config.description = Uint8Array.from(atob(data.description), function (c) {
            return c.charCodeAt(0);
          });
        }
        return VideoDecoder.isConfigSupported(config).then(function (support) {
          if (mine !== generation) return false;
          if (!support.supported) return false;
          index = data;
          player.fps = data.fps;
          player.frameCount = data.frames.length;
          groups = data.keys.map(function (start, n) {
            var end = (n + 1 < data.keys.length ? data.keys[n + 1] : data.frames.length) - 1;
            var last = data.frames[end];
            return { start: start, end: end, lastByte: last[0] + last[1] };
          });
          bytes = new Uint8Array(data.bytes);
          decoder = new VideoDecoder({
            output: function (frame) {
              var i = Math.round(frame.timestamp * player.fps / 1e6);
              var group = groups[decoding];
              if (pending && group && i >= group.start && i <= group.end) pending[i - group.start] = frame;
              else frame.close();
            },
            error: fail
          });
          decoder.configure(config);
          stream(data.src, mine, signal);
          return true;
        });
      }).catch(function (err) {
        if (mine !== generation || (err && err.name === 'AbortError')) return false;
        if (window.console) console.warn('Hero frames unavailable:', err);
        return false;
      });
    };

    // Reads the video as it downloads; each group decodes once its bytes are in.
    function stream(src, mine, signal) {
      fetch(src, { signal: signal }).then(function (res) {
        if (!res.ok || !res.body) throw new Error('hero video ' + res.status);
        var reader = res.body.getReader();
        function read() {
          return reader.read().then(function (part) {
            if (part.done || mine !== generation) return;
            if (received + part.value.length > bytes.length) throw new Error('hero video is larger than its index');
            bytes.set(part.value, received);
            received += part.value.length;
            schedule();
            return read();
          });
        }
        return read();
      }).catch(function (err) {
        if (mine === generation && !(err && err.name === 'AbortError')) fail(err);
      });
    }
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
    var lastDrift = 0;
    var lastView = '';
    // The element showing the animation: a canvas fed by FramePlayer, or the
    // <video> itself where frames cannot be decoded directly.
    var stage = video;
    var player = null;

    function currentSet() {
      return mobileQuery.matches ? 'mobile' : 'desktop';
    }

    function focus() {
      return mobileQuery.matches ? 0.5 : 0.35;
    }

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
      var next = currentSet();
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

    video.addEventListener('loadedmetadata', function () {
      duration = video.duration || 0;
      video.currentTime = shown;
    });
    video.addEventListener('loadeddata', function () {
      showFrame();
      unlock();
    });

    // Falls back to scrubbing the <video> (no WebCodecs, an unsupported codec,
    // or a decoding error).
    function useVideo() {
      player = null;
      if (stage !== video) {
        stage.parentNode.replaceChild(video, stage);
        video.style.transform = stage.style.transform;
        stage = video;
      }
      duration = 0;
      set = '';
      loadSet();
      ['touchstart', 'pointerdown', 'wheel', 'keydown'].forEach(function (type) {
        window.addEventListener(type, unlock, { passive: true, once: true });
      });
    }

    function startFrames() {
      var canvas = document.createElement('canvas');
      canvas.className = video.className;
      canvas.setAttribute('aria-hidden', 'true');
      video.parentNode.replaceChild(canvas, video);
      stage = canvas;
      player = new FramePlayer(canvas, useVideo);
      loadFrames();
    }

    function loadFrames() {
      var mine = player;
      if (!mine) return;
      duration = 0;
      mine.load(currentSet()).then(function (ok) {
        if (mine !== player) return;
        if (!ok) {
          useVideo();
          return;
        }
        duration = mine.frameCount / mine.fps;
        lastView = '';
      });
    }

    var canDecode = typeof window.VideoDecoder === 'function' &&
      typeof window.EncodedVideoChunk === 'function' &&
      typeof window.fetch === 'function' && !!window.ReadableStream;

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

      // With decoded frames nothing changes unless the page moved or a frame
      // was decoded, so the loop does no work while the page is still.
      var view = rect.top + ' ' + vh + ' ' + window.innerWidth;
      if (player && view === lastView && !player.dirty) return;
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
      if (player) {
        // Any decoded frame shows at once, so the frame follows the scroll
        // directly (Lenis already smooths wheel input).
        player.show(Math.min(player.frameCount - 1, Math.round(target * player.fps)), focus());
        return;
      }
      shown += (target - shown) * (1 - Math.exp(-CATCH_UP * dt));
      if (Math.abs(target - shown) < 0.002) shown = target;
      // One seek at a time: queueing seeks makes the browser fall behind.
      if (!video.seeking && Math.abs(video.currentTime - shown) > 0.012) {
        video.currentTime = shown;
      }
    }

    window.addEventListener('resize', function () {
      if (!player) loadSet();
      else if (player.set !== currentSet()) loadFrames();
    });
    if (canDecode) startFrames();
    else useVideo();

    // The poster is the first frame and is preloaded in the head. A slow
    // connection gets the text after REVEAL_WAIT and the picture fades in
    // when it arrives.
    var poster = new Image();
    poster.src = 'media/hero/hero-start-' + currentSet() + '.webp';
    var framed = poster.decode().then(function () {
      if (player) player.setPoster(poster, focus());
    }, function () {});
    var fonts = document.fonts
      ? Promise.all(HERO_FONTS.map(function (font) { return document.fonts.load(font); }))
      : null;
    framed.then(showFrame);
    Promise.all([framed, fonts]).then(reveal, reveal);
    setTimeout(reveal, Math.max(0, REVEAL_WAIT - performance.now()));

    if (/^#debug$/.test(location.hash)) showDebug();

    // A readout for checking the hero on real devices: add #debug to the URL.
    function showDebug() {
      var box = document.createElement('div');
      box.style.cssText = 'position:fixed;right:8px;bottom:8px;z-index:2000;padding:6px 8px;' +
        'font:11px/1.4 ui-monospace,Menlo,monospace;color:#f6efe1;background:rgba(0,0,0,.72);' +
        'border-radius:4px;white-space:pre;pointer-events:none';
      document.body.appendChild(box);
      var lastDraws = 0;
      var lastAt = performance.now();
      setInterval(function () {
        var now = performance.now();
        var lines = ['mode    ' + (player ? 'frames (' + player.set + ')' : 'video (' + set + ')')];
        if (player) {
          var s = player.stats;
          lines.push('draws/s ' + ((s.draws - lastDraws) * 1000 / (now - lastAt)).toFixed(0));
          lines.push('decoded ' + s.cached + ' frames');
          lines.push('group   ' + s.groupMs.toFixed(0) + ' ms');
          lines.push('loaded  ' + Math.round(player.loaded() * 100) + '%');
          lastDraws = s.draws;
        }
        if (performance.memory) lines.push('js heap ' + Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB');
        lastAt = now;
        box.textContent = lines.join('\n');
      }, 500);
    }

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
