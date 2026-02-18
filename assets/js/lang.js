/* ============================================================
   Language toggle — FR (default) / EN
   Reads data-fr / data-en attributes and swaps textContent.
   ============================================================ */
(function () {
  var KEY = 'lang';
  var FR = 'fr';
  var EN = 'en';

  function getLang() {
    return localStorage.getItem(KEY) || FR;
  }

  function apply(lang) {
    var els = document.querySelectorAll('[data-fr][data-en]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      el.textContent = lang === EN ? el.getAttribute('data-en') : el.getAttribute('data-fr');
    }
    /* Update toggle buttons */
    var btns = document.querySelectorAll('.lang-toggle');
    for (var j = 0; j < btns.length; j++) {
      btns[j].textContent = lang.toUpperCase();
      btns[j].setAttribute('aria-label',
        lang === FR ? 'Switch to English' : 'Passer en français');
    }
    /* Update <html lang> */
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    /* Notify other scripts */
    window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: lang } }));
  }

  function toggle() {
    var next = getLang() === FR ? EN : FR;
    localStorage.setItem(KEY, next);
    apply(next);
  }

  /* Apply saved language before first paint (runs synchronously) */
  var saved = getLang();
  if (saved === EN) {
    document.documentElement.setAttribute('lang', EN);
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(getLang());
    var btns = document.querySelectorAll('.lang-toggle');
    for (var k = 0; k < btns.length; k++) {
      btns[k].addEventListener('click', toggle);
    }
  });
})();
