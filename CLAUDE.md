# CLAUDE.md — Portfolio Abderahmane Chaouche v2

> Ce fichier est lu automatiquement à chaque session Claude Code.
> Il contient tout le contexte nécessaire pour reprendre le projet sans perte d'information.

---

## Qui je suis

- **Nom :** Abderahmane Chaouche
- **Statut :** Apprenti CFC Informaticien — Exploitation & Infrastructure, 2ème année
- **École :** Geneva Institute of Technology (2024–2028), Nyon (région Genève)
- **Domaine :** Infrastructure (VMware ESXi), Cybersécurité (Wazuh SIEM), Linux/Windows Server, Réseau CCNA, Azure
- **Objectif immédiat :** Décrocher un apprentissage pour les 3ème/4ème années — rentrée **août 2026**
- **Langue :** Je communique en **français**. Explique les choix frontend avec des analogies infra/cyber.

---

## Décisions validées (NE PAS remettre en question)

| Décision | Valeur |
|----------|--------|
| Direction design | **OPS CONSOLE** — métaphore "Infrastructure Digitale" |
| Hero 3D | **OUI** — rack serveur 3D interactif (Threlte) |
| Projets affichés | **5 projets** (tous ceux du portfolio actuel) |
| Hébergement | **GitHub Pages** — URL `abder541.github.io/Portfolio` conservée |
| Migration | **From scratch** complet |
| Branche dev | `v2` — NE PAS toucher à `main` (= ancien portfolio en prod) |

---

## Stack technique

| Couche | Technologie | Version |
|--------|------------|---------|
| Framework | SvelteKit 2.x + Svelte 5 (Runes) | `^2.15.0` / `^5.15.0` |
| 3D | Threlte v8 + Three.js | `^8.0.0` / `^0.170.0` |
| Animations | GSAP 3 + ScrollTrigger | `^3.12.5` |
| Smooth scroll | Lenis | `^1.1.14` |
| Build | Vite 5 + TypeScript | `^5.4.0` / `^5.6.0` |
| Fonts | @fontsource-variable/inter + jetbrains-mono | npm packages |
| Déploiement | adapter-static → GitHub Pages | `^3.0.8` |

**Import critique vite.config.ts :**
```ts
import { sveltekit } from '@sveltejs/kit/vite'; // PAS de @sveltejs/vite-plugin-svelte
```

---

## Palette OPS CONSOLE

```css
--bg-base:        #050810   /* Fond principal — quasi-noir bleuté */
--bg-surface:     #0a0f1e   /* Cartes, panneaux */
--bg-surface-2:   #111826   /* Niveau 2 */
--accent-cyan:    #00d4ff   /* Signature — cyan électrique */
--accent-blue:    #5b8def   /* Infrastructure */
--accent-violet:  #7c3aed   /* Profondeur */
--accent-green:   #10d9a0   /* Disponibilité */
--text-primary:   #e8f0ff
--font-display:   'Inter Variable'
--font-mono:      'JetBrains Mono Variable'
```

Tous les tokens sont dans `src/lib/styles/tokens.css`.

---

## Architecture des dossiers

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/           → Navbar, Footer, Button, Card, Badge, CustomCursor, LangToggle, ThemeToggle, BackToTop
│   │   ├── sections/     → Hero, Stats, ProjectsGrid, Timeline, ContactForm, SkillsShowcase
│   │   ├── three/        → HeroScene, ServerRack, ParticleField, Scene3DFallback
│   │   └── animations/   → RevealOnScroll, SplitText, MagneticButton, Marquee, KineticHeading
│   ├── stores/           → lang.ts, theme.ts, motion.ts, cursor.ts
│   ├── utils/            → smooth-scroll.ts, gsap-setup.ts, intersection.ts, i18n.ts
│   ├── data/             → projects.ts, skills.ts, timeline.ts, translations.ts
│   └── styles/           → tokens.css, reset.css, utilities.css
└── routes/
    ├── +layout.svelte / +layout.ts (prerender = true)
    ├── +page.svelte      → Home
    ├── projects/[slug]/  → Case studies dynamiques
    ├── skills/
    ├── about/
    └── contact/

static/
├── favicon.svg
├── fonts/                → (vide — fonts servies via @fontsource npm)
├── img/projects/
├── models/               → server-rack.glb (Phase 3)
└── docs/                 → CV PDF
```

---

## Repo Git

- **Remote :** `https://github.com/Abder541/Portfolio.git`
- **Branche active :** `v2`
- **Branche prod :** `main` (= ancien portfolio HTML — NE PAS y toucher)
- **base path svelte.config.js :** `/Portfolio` (en prod) / `` (en dev)

---

## Contraintes non-négociables

- Lighthouse 90+ toutes catégories
- WCAG 2.2 AA — skip-link, focus-visible, aria-labels, prefers-reduced-motion
- Mobile-first responsive
- Bilingue FR/EN fonctionnel
- Compatible GitHub Pages (static export — `export const prerender = true` dans `+layout.ts`)
- Respect `prefers-reduced-motion` : désactive le 3D et les animations lourdes

---

## Roadmap 8 phases

| Phase | Description | État |
|-------|-------------|------|
| 1 | Setup & Foundations (SvelteKit, dépendances, design tokens) | ✅ **TERMINÉE** |
| 2 | Design System & Composants de base (Navbar, Footer, stores, animations) | 🔄 **EN COURS** |
| 3 | Hero 3D (rack serveur Threlte + LEDs + fallback SVG) | ⏳ |
| 4 | Page Accueil assemblée (Hero + Stats + Bento + Projets + Timeline + CTA) | ⏳ |
| 5 | Pages secondaires (/about, /skills, /projects, /contact) | ⏳ |
| 6 | i18n FR/EN + thème dark/light | ⏳ |
| 7 | Optimisation & Performance (Lighthouse audit, WebP/AVIF, Draco) | ⏳ |
| 8 | Déploiement GitHub Pages + GitHub Actions CI/CD | ⏳ |

---

## Sources de contenu

Le portfolio actuel (textes, projets, certifications) est dans :
`C:\Users\Maintenant pret\Documents\portfolio\`

Les specs complètes du redesign sont dans :
`C:\Users\Maintenant pret\Dossier Contexte Portfolio\PORTFOLIO_REDESIGN_RESEARCH.md`

---

## Style de collaboration

- Explique chaque décision technique (pas expert frontend)
- Confirme **avant** toute action irréversible (suppression, push, écrasement)
- Utilise TodoWrite pour tracker les phases
- Valide phase par phase — attends la validation explicite avant de passer à la suivante
