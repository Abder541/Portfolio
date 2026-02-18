# Portfolio — Abderahmane Chaouche

Portfolio professionnel orienté recrutement — Apprenti Informaticien CFC Exploitation & Infrastructure.

**Technologie :** HTML / CSS / JavaScript vanilla — aucun framework, aucun backend.
**Ouverture :** Ouvrir `index.html` directement dans un navigateur (pas de serveur requis).

---

## Structure

```
portfolio/
├── index.html              # Landing recrutement (hero, stats, projets phares, CTA)
├── projects.html           # Vitrine de tous les projets avec filtres
├── project-wazuh.html      # Case study : Hackathon Cybersécurité — Wazuh SIEM
├── project-iot.html        # Case study : Hackathon IoT — Raspberry Pi + Python
├── project-nocode.html     # Case study : Hackathons No Code — WordPress
├── project-vmware.html     # Case study : Administration VMware ESXi
├── project-web.html        # Case study : Projets Web HTML/CSS/PHP/JS
├── skills.html             # Compétences par catégories avec niveaux
├── about.html              # Parcours + timeline + formation
├── contact.html            # Formulaire mailto + infos contact + dispo
├── assets/
│   ├── css/style.css       # Design system complet (variables, composants, responsive)
│   ├── js/main.js          # Burger, scroll reveal, filtres, formulaire, back-to-top
│   └── img/
│       ├── photo-profil.jpg     ← Placer ici la photo de profil
│       └── projects/            ← Placer ici les captures de projets (optionnel)
└── README.md
```

---

## Photo de profil

Placer `photo-profil.jpg` dans `assets/img/`.

- Format recommandé : JPG ou WebP
- Dimensions : 400×400 px minimum, carré ou portrait
- Cadrage : centré sur le visage (le CSS applique `object-position: top center`)
- Si le fichier est absent : un placeholder "AC" s'affiche automatiquement

---

## Fonctionnalités

- **Navigation** : navbar sticky + menu burger mobile + lien actif automatique
- **Scroll reveal** : animation fade/slide au scroll via IntersectionObserver
- **Filtres projets** : filtre par catégorie (Tous / Cybersécurité / IoT / Infrastructure / Web / No Code)
- **Formulaire contact** : validation JS + génération de `mailto:` pré-rempli (aucun backend)
- **Anti-spam** : champ honeypot invisible
- **Retour en haut** : bouton flottant visible après 380px de scroll
- **Accessibilité** : skip link, aria-labels, focus visible, contrastes corrects
- **Reduced motion** : animations désactivées si `prefers-reduced-motion: reduce`
- **Photo fallback** : placeholder affiché si `photo-profil.jpg` est absent
- **Responsive** : mobile-first, breakpoints 480 / 700 / 900px

---

## Personnalisation

Toutes les variables de design sont dans `assets/css/style.css` — section `:root` :

```css
--accent:        #4f8ef7;   /* Bleu principal */
--accent-violet: #8b5cf6;   /* Violet */
--accent-cyan:   #06d6e0;   /* Cyan */
--accent-green:  #10d9a0;   /* Vert (disponibilité) */
--bg-primary:    #0d0f1a;   /* Fond principal */
```

---

## Contact

- Email : Abderahmane.chaouche.0@gmail.com
- LinkedIn : [abderahmane-chaouche](https://www.linkedin.com/in/abderahmane-chaouche)
- GitHub Pages : [abder541.github.io/Portfolio](https://abder541.github.io/Portfolio/)
