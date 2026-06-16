// ============================================
// CIELO Website — Main Script v2.0
// Street Luxury Brand by ASIA VISION LINK
// ============================================

var lenis = null;

// ── Smooth Scroll (Lenis) ──
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.2,
    easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
    wheelMultiplier: 0.85,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
}

// ── Image Loading ──
function initImages() {
  document.querySelectorAll('[data-image-id]').forEach(function(el) {
    var id = el.getAttribute('data-image-id');
    var config = (typeof CIELO_IMAGES !== 'undefined') ? CIELO_IMAGES[id] : null;
    if (config && config.url && config.url.trim() !== '') {
      el.src = config.url;
      if (config.alt) el.alt = config.alt;
      el.addEventListener('load', function() { el.classList.add('loaded'); });
      el.addEventListener('error', function() { el.style.display = 'none'; });
    }
  });
}

// ── Loading Screen ──
function initLoader() {
  var loader = document.getElementById('loader');
  if (!loader) return;

  var progressEl = document.getElementById('loaderProgress');
  var logoEl     = loader.querySelector('.loader-logo');
  var subEl      = loader.querySelector('.loader-sub');
  var tagEl      = loader.querySelector('.loader-tagline');

  function finishLoader() {
    loader.style.pointerEvents = 'none';
    setTimeout(function() { loader.style.display = 'none'; }, 100);
  }

  if (typeof gsap === 'undefined') {
    setTimeout(function() {
      loader.style.transition = 'opacity 0.6s ease';
      loader.style.opacity = '0';
      setTimeout(finishLoader, 650);
    }, 1400);
    return;
  }

  var tl = gsap.timeline({ onComplete: finishLoader });

  tl.fromTo(logoEl,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power4.inOut' }
    )
    .fromTo(subEl,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(progressEl,
      { width: '0%' },
      { width: '100%', duration: 0.9, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(tagEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.4'
    )
    .to(loader, { opacity: 0, duration: 0.75, ease: 'power2.inOut' }, '+=0.25');
}

// ── Cursor Glow (Hero Only) ──
function initCursorGlow() {
  var glowEl = document.getElementById('cursorGlow');
  var heroEl = document.getElementById('hero');
  if (!glowEl || !heroEl || window.matchMedia('(max-width: 768px)').matches) return;

  var glowX = 0, glowY = 0;
  var targetX = 0, targetY = 0;
  var inHero = false;
  var rafId = null;

  window.addEventListener('mousemove', function(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    var rect = heroEl.getBoundingClientRect();
    inHero = e.clientY >= rect.top && e.clientY <= rect.bottom;
  }, { passive: true });

  function animateGlow() {
    glowX += (targetX - glowX) * 0.07;
    glowY += (targetY - glowY) * 0.07;
    glowEl.style.transform = 'translate(' + (glowX - 240) + 'px, ' + (glowY - 240) + 'px)';
    glowEl.style.opacity = inHero ? '1' : '0';
    rafId = requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

// ── Navigation ──
function initNav() {
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    var isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    if (lenis) { isOpen ? lenis.stop() : lenis.start(); }
  });
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (lenis) lenis.start();
    });
  });
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

// ── Hero Slider ──
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

  function pauseProgress() {
    if (!progressEl) return;
    var computed = parseFloat(getComputedStyle(progressEl).width);
    var trackW   = parseFloat(getComputedStyle(progressEl.parentElement).width) || 1;
    progressEl.style.transition = 'none';
    progressEl.style.width = (computed / trackW * 100).toFixed(1) + '%';
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
    pauseProgress();
  }

  if (btnPrev) btnPrev.addEventListener('click', function() { stopAuto(); goTo(current - 1); startAuto(); });
  if (btnNext) btnNext.addEventListener('click', function() { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { stopAuto(); goTo(i); startAuto(); });
  });

  // Swipe support
  var sliderEl = document.getElementById('heroSlider');
  if (sliderEl) {
    var touchStartX = 0, touchStartY = 0;
    sliderEl.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    sliderEl.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        stopAuto();
        goTo(dx < 0 ? current + 1 : current - 1);
        startAuto();
      }
    }, { passive: true });
  }

  // Pause on hover / focus
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

// ── Scroll Reveal ──
function initReveal() {
  if (!('IntersectionObserver' in window)) return;

  var simpleTargets = document.querySelectorAll(
    '.section-header, .about-content, .about-image-wrap, .contact-info'
  );
  simpleTargets.forEach(function(el) { el.classList.add('reveal'); });

  var simpleObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        simpleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  simpleTargets.forEach(function(el) { simpleObserver.observe(el); });

  // Staggered reveals for card groups
  var staggerGroups = [
    { selector: '.product-card', delay: 90 },
    { selector: '.art-card',     delay: 70 },
    { selector: '.philosophy-item', delay: 110 },
  ];

  staggerGroups.forEach(function(group) {
    var cards = document.querySelectorAll(group.selector);
    cards.forEach(function(card) { card.classList.add('reveal'); });

    // Group by parent
    var parents = new Map();
    cards.forEach(function(card) {
      var parent = card.parentElement;
      if (!parents.has(parent)) parents.set(parent, []);
      parents.get(parent).push(card);
    });

    parents.forEach(function(groupCards, parent) {
      var triggered = false;
      var groupObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            groupCards.forEach(function(card, i) {
              setTimeout(function() {
                card.classList.add('visible');
              }, i * group.delay);
            });
            groupObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      groupObserver.observe(parent);
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

    // TODO: Replace with real endpoint
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

// ── Smooth Anchor Scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var hash = this.getAttribute('href');
      if (hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -72, duration: 1.2 });
      } else {
        var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
}

// ── Active Nav on Scroll ──
function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function(entries) {
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

  sections.forEach(function(s) { observer.observe(s); });
}

// ── GSAP Scroll Animations ──
function initGsapAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Philosophy background parallax
  var philoBg = document.querySelector('.philosophy-bg-img');
  if (philoBg) {
    gsap.to(philoBg, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#philosophy',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  // About image subtle parallax
  var aboutImg = document.querySelector('.about-img');
  if (aboutImg) {
    gsap.fromTo(aboutImg,
      { yPercent: 5 },
      {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }

  // Philosophy quote dramatic entrance
  var quote = document.querySelector('.philosophy-quote');
  if (quote) {
    gsap.fromTo(quote,
      { opacity: 0, y: 40, letterSpacing: '0.05em' },
      {
        opacity: 1, y: 0, letterSpacing: '-0.02em',
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quote,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // Contact form glass entrance
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    gsap.fromTo(contactForm,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 75%',
        }
      }
    );
  }
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function() {
  initImages();
  initLoader();
  initLenis();
  initCursorGlow();
  initNav();
  initHeroSlider();
  initReveal();
  initSmoothScroll();
  initContactForm();
  initActiveNav();
  initGsapAnimations();
});
