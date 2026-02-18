/* ============================================================
   HERO TERMINAL — Typewriter animation
   ============================================================ */
(function () {
  'use strict';

  const LINES_FR = [
    { cmd: 'whoami',               out: 'Abderahmane Chaouche — Apprenti Informaticien CFC' },
    { cmd: 'cat specialites.txt',  out: 'Infrastructure · Virtualisation · Cybersécurité' },
    { cmd: 'uptime',               out: '2 ans de formation | 4 hackathons | Dispo août 2026' },
  ];

  const LINES_EN = [
    { cmd: 'whoami',               out: 'Abderahmane Chaouche — IT Apprentice (CFC)' },
    { cmd: 'cat skills.txt',       out: 'Infrastructure · Virtualization · Cybersecurity' },
    { cmd: 'uptime',               out: '2 years training | 4 hackathons | Available Aug 2026' },
  ];

  const TYPING_SPEED   = 38;   // ms per character (command)
  const OUTPUT_SPEED   = 12;   // ms per character (output)
  const LINE_PAUSE     = 420;  // ms pause between lines
  const PROMPT_CHAR    = '>';

  let skipRequested = false;

  function getLang() {
    return document.documentElement.getAttribute('data-lang') || 'fr';
  }

  function getLines() {
    return getLang() === 'en' ? LINES_EN : LINES_FR;
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function typeText(el, text, speed) {
    for (let i = 0; i < text.length; i++) {
      if (skipRequested) {
        el.textContent += text.slice(i);
        return;
      }
      el.textContent += text[i];
      await sleep(speed);
    }
  }

  async function runTerminal(container) {
    const lines = getLines();
    const body = container.querySelector('.terminal-body');
    if (!body) return;

    for (let i = 0; i < lines.length; i++) {
      const { cmd, out } = lines[i];

      // Prompt + command
      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal-line';
      const promptSpan = document.createElement('span');
      promptSpan.className = 'terminal-prompt';
      promptSpan.textContent = PROMPT_CHAR + ' ';
      const cmdSpan = document.createElement('span');
      cmdSpan.className = 'terminal-cmd';
      cmdLine.appendChild(promptSpan);
      cmdLine.appendChild(cmdSpan);
      body.appendChild(cmdLine);

      await typeText(cmdSpan, cmd, TYPING_SPEED);

      if (!skipRequested) await sleep(200);

      // Output
      const outLine = document.createElement('div');
      outLine.className = 'terminal-line terminal-output';
      body.appendChild(outLine);

      await typeText(outLine, out, OUTPUT_SPEED);

      if (i < lines.length - 1 && !skipRequested) await sleep(LINE_PAUSE);
    }

    // Blinking cursor at end
    const cursorLine = document.createElement('div');
    cursorLine.className = 'terminal-line';
    cursorLine.innerHTML = '<span class="terminal-prompt">' + PROMPT_CHAR + ' </span><span class="terminal-cursor">█</span>';
    body.appendChild(cursorLine);
  }

  function init() {
    const container = document.getElementById('hero-terminal');
    if (!container) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      skipRequested = true;
    }

    // Skip on click or keypress
    const skipHandler = () => { skipRequested = true; };
    container.addEventListener('click', skipHandler);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') skipHandler();
    }, { once: true });

    runTerminal(container);
  }

  // Re-run on language change
  window.addEventListener('langChanged', () => {
    const container = document.getElementById('hero-terminal');
    if (!container) return;
    const body = container.querySelector('.terminal-body');
    if (body) body.innerHTML = '';
    skipRequested = false;
    runTerminal(container);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
