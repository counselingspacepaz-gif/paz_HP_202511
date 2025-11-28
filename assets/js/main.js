// assets/js/main.js

// ===============================
// Hero Background Setter
// ===============================
(function () {
  const heroSections = document.querySelectorAll('.section--hero');
  if (!heroSections.length) return;

  heroSections.forEach(section => {
    const bgEl = section.querySelector('.hero__bg');
    if (!bgEl) return;

    const bgUrl = (bgEl.dataset.heroBg || '').trim();
    if (!bgUrl) return;

    section.style.setProperty('--hero-bg', `url(${bgUrl})`);
  });
})();

// ===============================
// Navigation Toggle
// ===============================
(function () {
  const toggleBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-menu');
  if (!toggleBtn || !nav) return;

  // 初期A11y状態
  toggleBtn.setAttribute('aria-expanded', 'false');

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.focus(); // Escape後にボタンへフォーカスを戻す
  };

  const toggleNav = () => {
    const isOpen = nav.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  // PC幅では開閉無効化
  const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;

  toggleBtn.addEventListener('click', () => {
    if (!isDesktop()) toggleNav();
  });

  window.addEventListener('resize', () => {
    if (isDesktop()) closeNav();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
})();
