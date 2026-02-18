/* ============================================================
   ABDERAHMANE CHAOUCHE — PORTFOLIO SCRIPTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  setActiveNavLink();
  initScrollReveal();
  initBackToTop();
  initFilters();
  initContactForm();
  initPhotoFallback();
  initCounters();
});

/* ---- NAVBAR (burger) ---- */
function initNavbar() {
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('nav-mobile');
  if (!burger || !mobileMenu) return;

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu(burger, mobileMenu));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu(burger, mobileMenu);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu(burger, mobileMenu);
  });
}

function closeMobileMenu(burger, menu) {
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}

/* ---- ACTIVE NAV LINK ---- */
function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const allLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  allLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop().split('#')[0] || 'index.html';

    const isActive =
      linkPage === page ||
      (page === '' && linkPage === 'index.html') ||
      (page.startsWith('project-') && linkPage === 'projects.html');

    link.classList.toggle('active', isActive);
  });
}

/* ---- SCROLL REVEAL ---- */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---- BACK TO TOP ---- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 380);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- PROJECT FILTERS ---- */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ---- CONTACT FORM (EmailJS + fallback mailto) ---- */
function initContactForm() {
  const form = document.getElementById('contact-form-el') || document.getElementById('contact-form');
  if (!form) return;

  // Auto-focus on #contact-form hash (section anchor)
  if (window.location.hash === '#contact-form') {
    const nameField = form.querySelector('input[name="name"]');
    if (nameField) setTimeout(() => { nameField.focus(); }, 200);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot check
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) return;

    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    clearFormError(form);

    if (!name || !email || !message) {
      showFormError(form, 'Merci de remplir tous les champs obligatoires.');
      return;
    }
    if (!isValidEmail(email)) {
      showFormError(form, 'Adresse e-mail invalide.');
      return;
    }

    const submitBtn    = document.getElementById('contact-submit');
    const submitText   = document.getElementById('contact-submit-text');
    const submitLoader = document.getElementById('contact-submit-loader');
    const successEl    = document.getElementById('form-success');
    const errorEl      = document.getElementById('form-error-emailjs');

    // Show loader
    if (submitBtn)     submitBtn.disabled = true;
    if (submitText)    submitText.style.display = 'none';
    if (submitLoader)  submitLoader.style.display = 'inline';
    if (successEl)     successEl.style.display = 'none';
    if (errorEl)       errorEl.style.display = 'none';

    // Use EmailJS if configured, else fallback to mailto
    const useEmailJS =
      typeof emailjs !== 'undefined' &&
      typeof EMAILJS_SERVICE_ID !== 'undefined' &&
      EMAILJS_SERVICE_ID !== 'TON_SERVICE_ID';

    if (useEmailJS) {
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  name,
        from_email: email,
        subject:    subject || `Contact Portfolio — ${name}`,
        message:    message,
      }).then(() => {
        if (successEl) { successEl.style.display = 'block'; setTimeout(() => { successEl.style.display = 'none'; }, 8000); }
        form.reset();
      }).catch(() => {
        if (errorEl) errorEl.style.display = 'block';
      }).finally(() => {
        if (submitBtn)    submitBtn.disabled = false;
        if (submitText)   submitText.style.display = 'inline';
        if (submitLoader) submitLoader.style.display = 'none';
      });
    } else {
      // Fallback mailto (quand EmailJS n'est pas encore configuré)
      const mailSubject = subject || `Contact Portfolio — ${name}`;
      const mailBody =
        `Bonjour Abderahmane,\n\nJe me permets de vous contacter via votre portfolio.\n\n` +
        `Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}\n\n---\nEnvoyé depuis le formulaire de contact du portfolio.`;

      window.location.href =
        `mailto:Abderahmane.chaouche.0@gmail.com` +
        `?subject=${encodeURIComponent(mailSubject)}` +
        `&body=${encodeURIComponent(mailBody)}`;

      if (submitBtn)    submitBtn.disabled = false;
      if (submitText)   submitText.style.display = 'inline';
      if (submitLoader) submitLoader.style.display = 'none';
      if (successEl) { successEl.style.display = 'block'; setTimeout(() => { successEl.style.display = 'none'; }, 7000); }
      form.reset();
    }
  });
}

function showFormError(form, msg) {
  let el = form.querySelector('.form-error');
  if (!el) {
    el = document.createElement('p');
    el.className = 'form-error';
    form.appendChild(el);
  }
  el.textContent = msg;
}

function clearFormError(form) {
  const el = form.querySelector('.form-error');
  if (el) el.textContent = '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---- PHOTO FALLBACK ---- */
function initPhotoFallback() {
  document.querySelectorAll('.profile-photo').forEach(img => {
    const showPlaceholder = () => {
      img.style.display = 'none';
      const placeholder = document.getElementById(img.dataset.placeholder);
      if (placeholder) placeholder.style.display = 'flex';
    };

    img.addEventListener('error', showPlaceholder);

    // Image déjà chargée (et échouée) avant l'ajout du listener
    if (img.complete && img.naturalWidth === 0) {
      showPlaceholder();
    }
  });
}

/* ---- ANIMATED COUNTERS ---- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      el.textContent = target + suffix;
    });
    return;
  }

  let counted = false;

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500; // ms
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(eased * target);
      el.textContent = current + (progress >= 1 ? suffix : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          counters.forEach(el => animateCounter(el));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}
