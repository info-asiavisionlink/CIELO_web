// ============================================
// CIELO Website — Main Script v3.0
// Vanilla JS only. No scroll-jacking libraries.
// Browser-native scroll. Zero dependencies.
// ============================================

// ── Image Loading ──
function initImages() {
  document.querySelectorAll('[data-image-id]').forEach(function(el) {
    var id = el.getAttribute('data-image-id');
    var config = (typeof CIELO_IMAGES !== 'undefined') ? CIELO_IMAGES[id] : null;
    if (config && config.url && config.url.trim() !== '') {
      el.src = config.url;
      if (config.alt) el.alt = config.alt;
      el.addEventListener('load', function() {
        el.classList.add('loaded');
        var wrap = el.closest('[data-placeholder-label]');
        if (wrap) wrap.classList.add('image-loaded');
      });
      el.addEventListener('error', function() { el.style.display = 'none'; });
    }
  });
}

// ── Loading Screen (pure CSS transitions, no GSAP) ──
function initLoader() {
  var loader     = document.getElementById('loader');
  if (!loader) return;

  var progressEl = document.getElementById('loaderProgress');
  var logoEl     = loader.querySelector('.loader-logo');
  var subEl      = loader.querySelector('.loader-sub');
  var tagEl      = loader.querySelector('.loader-tagline');

  // Logo clips in
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      if (logoEl) logoEl.classList.add('reveal-in');
    });
  });

  // Sub label fades up
  setTimeout(function() {
    if (subEl) subEl.classList.add('reveal-in');
  }, 380);

  // Progress bar fills
  setTimeout(function() {
    if (progressEl) {
      progressEl.style.transition = 'width 0.9s ease';
      progressEl.style.width = '100%';
    }
  }, 460);

  // Tagline appears
  setTimeout(function() {
    if (tagEl) tagEl.classList.add('reveal-in');
  }, 950);

  // Loader fades out and hides
  setTimeout(function() {
    loader.style.transition = 'opacity 0.75s ease';
    loader.style.opacity = '0';
    setTimeout(function() {
      loader.style.display = 'none';
      loader.style.pointerEvents = 'none';
    }, 800);
  }, 1850);
}

// ── Cursor Glow (Hero only, desktop) ──
function initCursorGlow() {
  var glowEl = document.getElementById('cursorGlow');
  var heroEl = document.getElementById('hero');
  if (!glowEl || !heroEl || window.matchMedia('(max-width: 768px)').matches) return;

  var glowX   = 0, glowY   = 0;
  var targetX = 0, targetY = 0;
  var inHero  = false;

  window.addEventListener('mousemove', function(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    var rect = heroEl.getBoundingClientRect();
    inHero = e.clientY >= rect.top && e.clientY <= rect.bottom;
  }, { passive: true });

  function tick() {
    glowX += (targetX - glowX) * 0.07;
    glowY += (targetY - glowY) * 0.07;
    glowEl.style.transform = 'translate(' + (glowX - 260) + 'px, ' + (glowY - 260) + 'px)';
    glowEl.style.opacity   = inHero ? '1' : '0';
    requestAnimationFrame(tick);
  }
  tick();
}

// ── Navigation ──
function initNav() {
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
  nav.classList.toggle('scrolled', window.scrollY > 60);

  if (!toggle || !links) return;
  toggle.addEventListener('click', function() {
    var isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

// ── Hero Slider (pure timer + CSS fade, no scroll libraries) ──
function initHeroSlider() {
  var slides     = document.querySelectorAll('.hero-slide');
  var dots       = document.querySelectorAll('.hero-dot');
  var btnPrev    = document.getElementById('heroPrev');
  var btnNext    = document.getElementById('heroNext');
  var counterEl  = document.getElementById('heroCounterCurrent');
  var progressEl = document.getElementById('heroProgressFill');
  if (!slides.length) return;

  var current  = 0;
  var total    = slides.length;
  var INTERVAL = 3000;
  var timer    = null;

  function updateCounter(idx) {
    if (counterEl) counterEl.textContent = String(idx + 1).padStart(2, '0');
  }

  function startProgress() {
    if (!progressEl) return;
    progressEl.style.transition = 'none';
    progressEl.style.width = '0%';
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        progressEl.style.transition = 'width ' + INTERVAL + 'ms linear';
        progressEl.style.width = '100%';
      });
    });
  }

  function freezeProgress() {
    if (!progressEl) return;
    var w = getComputedStyle(progressEl).width;
    var pw = getComputedStyle(progressEl.parentElement).width;
    progressEl.style.transition = 'none';
    progressEl.style.width = (parseFloat(w) / parseFloat(pw) * 100).toFixed(1) + '%';
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) {
      dots[current].classList.remove('active');
      dots[current].setAttribute('aria-selected', 'false');
    }
    current = (index + total) % total;
    slides[current].classList.add('active');
    if (dots[current]) {
      dots[current].classList.add('active');
      dots[current].setAttribute('aria-selected', 'true');
    }
    updateCounter(current);
    startProgress();
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function() { goTo(current + 1); }, INTERVAL);
    startProgress();
  }

  function stopAuto() {
    clearInterval(timer);
    freezeProgress();
  }

  if (btnPrev) btnPrev.addEventListener('click', function() { stopAuto(); goTo(current - 1); startAuto(); });
  if (btnNext) btnNext.addEventListener('click', function() { stopAuto(); goTo(current + 1); startAuto(); });
  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { stopAuto(); goTo(i); startAuto(); });
  });

  // Touch swipe (natural, no scroll intercept)
  var sliderEl = document.getElementById('heroSlider');
  if (sliderEl) {
    var tx = 0, ty = 0;
    sliderEl.addEventListener('touchstart', function(e) {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
    }, { passive: true });
    sliderEl.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - tx;
      var dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
        stopAuto();
        goTo(dx < 0 ? current + 1 : current - 1);
        startAuto();
      }
    }, { passive: true });
  }

  // Pause on hover, resume on leave (no scroll interaction)
  var heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mouseenter', stopAuto);
    heroEl.addEventListener('mouseleave', startAuto);
    heroEl.addEventListener('focusin',    stopAuto);
    heroEl.addEventListener('focusout',   startAuto);
  }

  updateCounter(0);
  startAuto();
}

// ── Scroll Reveal (IntersectionObserver — no GSAP, no scrub) ──
function initReveal() {
  if (!('IntersectionObserver' in window)) return;

  // Simple fade-up for section-level elements
  var simpleTargets = document.querySelectorAll(
    '.section-header, .about-content, .about-image-wrap, .contact-info'
  );
  simpleTargets.forEach(function(el) { el.classList.add('reveal'); });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  simpleTargets.forEach(function(el) { observer.observe(el); });

  // Staggered reveals for card groups
  var staggerConfig = [
    { selector: '.product-card', delay: 90  },
    { selector: '.art-card',     delay: 70  },
    { selector: '.philosophy-item', delay: 110 },
  ];

  staggerConfig.forEach(function(cfg) {
    var cards = document.querySelectorAll(cfg.selector);
    cards.forEach(function(c) { c.classList.add('reveal'); });

    var parents = new Map();
    cards.forEach(function(c) {
      var p = c.parentElement;
      if (!parents.has(p)) parents.set(p, []);
      parents.get(p).push(c);
    });

    parents.forEach(function(group, parent) {
      var fired = false;
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !fired) {
            fired = true;
            group.forEach(function(card, i) {
              setTimeout(function() { card.classList.add('visible'); }, i * cfg.delay);
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      obs.observe(parent);
    });
  });
}

// ── Anchor Scroll (native browser scroll, no library) ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var hash = this.getAttribute('href');
      if (hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

// ── Contact Form ──
function initContactForm() {
  var form = document.getElementById('contactForm');
  var btn  = document.getElementById('submitBtn');
  var note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var name    = form.querySelector('#name').value.trim();
    var email   = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      note.textContent = '必須項目を入力してください。';
      note.style.color = '#e05858';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = '正しいメールアドレスを入力してください。';
      note.style.color = '#e05858';
      return;
    }

    btn.textContent = '送信中...';
    btn.disabled = true;
    note.textContent = '';

    // TODO: Replace with Formspree or custom endpoint
    setTimeout(function() {
      btn.textContent = '送信完了';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--black)';
      note.textContent = 'お問い合わせありがとうございます。';
      note.style.color = 'var(--gold)';
      form.reset();
      setTimeout(function() {
        btn.textContent = '送信する';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        note.textContent = '';
      }, 4000);
    }, 900);
  });
}

// ── Active Nav Link on Scroll ──
function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(a) {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--diamond)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(s) { obs.observe(s); });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function() {
  initImages();
  initLoader();
  initCursorGlow();
  initNav();
  initHeroSlider();
  initReveal();
  initSmoothScroll();
  initContactForm();
  initActiveNav();
});
