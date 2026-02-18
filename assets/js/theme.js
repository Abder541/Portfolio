/* ============================================================
   Theme toggle — dark (default) / light
   ============================================================ */
(function () {
  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  // Apply saved theme immediately (before paint)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === LIGHT) document.body.setAttribute('data-theme', LIGHT);

  function updateIcons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.textContent = theme === LIGHT ? '\u{1F319}' : '\u{2600}\u{FE0F}';
      btn.setAttribute('aria-label',
        theme === LIGHT ? 'Passer au mode sombre' : 'Passer au mode clair');
    });
  }

  function toggle() {
    var current = document.body.getAttribute('data-theme') || DARK;
    var next = current === DARK ? LIGHT : DARK;
    if (next === DARK) {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', next);
    }
    localStorage.setItem(STORAGE_KEY, next);
    updateIcons(next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var theme = document.body.getAttribute('data-theme') || DARK;
    updateIcons(theme);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  });
})();
