// ============================================
// CIELO Website — Main Script
// Vanilla JavaScript / No dependencies
// ============================================

// ── Image Loading ──
function initImages() {
  document.querySelectorAll('[data-image-id]').forEach(function (el) {
    var id = el.getAttribute('data-image-id');
    var config = (typeof CIELO_IMAGES !== 'undefined') ? CIELO_IMAGES[id] : null;

    if (config && config.url && config.url.trim() !== '') {
      el.src = config.url;
      if (config.alt) el.alt = config.alt;
      el.addEventListener('load', function () {
        el.classList.add('loaded');
      });
      el.addEventListener('error', function () {
        // Image failed to load — leave placeholder visible
        el.style.display = 'none';
      });
    }
    // If no URL: image stays display:none, parent [data-placeholder-label] shows stripe pattern
  });
}

// ── Navigation ──
function initNav() {
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  // Scrolled state
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }
}

// ── Scroll Reveal ──
function initReveal() {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.art-card, .product-card, .philosophy-item, .about-content, .about-image-wrap, .contact-info, .contact-form'
  );

  targets.forEach(function (el) { el.classList.add('reveal'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
}

// ── Smooth Scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var hash = this.getAttribute('href');
      if (hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      var offset = 72; // nav height
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
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

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
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

    // Submit state
    btn.textContent = '送信中...';
    btn.disabled = true;
    note.textContent = '';

    // TODO: Replace with actual endpoint (Formspree / Netlify Forms / custom API)
    // Example: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })
    setTimeout(function () {
      btn.textContent = '送信完了';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--black)';
      note.textContent = 'お問い合わせありがとうございます。';
      note.style.color = 'var(--gold)';
      form.reset();
      setTimeout(function () {
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

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (a) {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--diamond)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function (s) { observer.observe(s); });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function () {
  initImages();
  initNav();
  initReveal();
  initSmoothScroll();
  initContactForm();
  initActiveNav();
});
