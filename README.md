# Structure du site

``
`
.
├── index.html                  → accueil : carrousel des projets "featured"
├── projects.html                → grille complète des projets + filtres par classification
├── about.html
├── CNAME                        → domaine perso (ne pas toucher)
├── css/
│   └── style.css                → tous les styles (fond blanc, typo Oracle noire)
├── js/
│   ├── carousel.js               → logique du carrousel (accueil uniquement)
│   ├── projects-grid.js          → logique de la grille + des filtres (page projets uniquement)
│   └── lazy-video.js             → chargement différé + lecture auto des vidéos (pages projet)
├── data/
│   ├── projects.json             → tous les projets (métadonnées, carte d'identité, description, médias)
│   └── classification.json       → les 13 catégories fixes utilisées pour les filtres
├── assets/
│   ├── fonts/                    → police Oracle
│   └── projects/
│       └── nom-du-projet/        → un dossier par projet : cover, images, vidéos, posters
└── projects/
    ├── _template.html            → gabarit à dupliquer pour chaque nouveau projet
    └── nom-du-projet.html        → une page HTML par projet
```

## Ajouter un nouveau projet, étape par étape

1. Copie `projects/_template.html` → renomme-le `projects/nom-du-projet.html`
   (le nom de fichier = le `slug` que tu utiliseras dans `projects.json`)
2. Crée le dossier `assets/projects/nom-du-projet/` avec ta cover, tes images,
   vidéos et posters
3. Remplis le gabarit copié : titre, baseline, carte d'identité (ajoute/retire
   des `identity-row` selon ce dont ce projet a besoin), description, blocs média
4. Ajoute une entrée dans `data/projects.json` :
   - `slug` : doit correspondre exactement au nom du fichier HTML
   - `title`, `baseline`, `cover`
   - `featured: true` si tu veux que ce projet apparaisse dans le carrousel
     de l'accueil
   - `classification` : un ou plusieurs slugs parmi ceux listés dans
     `data/classification.json` (c'est ce qui alimente les filtres de
     `projects.html`)
   - `identity` : la liste label/valeur affichée sur la page projet (libre,
     pas besoin des mêmes champs partout)
   - `description`, `media` : uniquement utilisés si tu passes un jour à une
     page projet générée depuis le JSON — pour l'instant chaque page HTML
     dans `projects/` porte son propre contenu, ces deux champs servent
     surtout d'aide-mémoire
5. Vérifie en local, puis commit + push sur GitHub

## Tester en local

Le site charge `projects.json` et `classification.json` via `fetch()`,
donc ouvrir juste `index.html` en double-cliquant dessus ne fonctionnera
pas (restriction du navigateur sur les fichiers locaux). Utilise :
- l'extension VSCode **Live Server** (clic droit sur `index.html` →
  "Open with Live Server"), ou
- en ligne de commande : `python3 -m http.server` puis
  http://localhost:8000

## Classification (filtres de projects.html)

Les 13 catégories sont fixées dans `data/classification.json` : Identité
visuelle, Signalétique, Médiation & co-design, Recherche-création, Design
social, Jeu, Installation interactive, Positionnement, Habiter la ville,
Écologie & climat, Inclusion & diversité, Graphisme, Design d'objet.

Pour chaque projet, indique un ou plusieurs de ces `slug` dans le champ
`classification` de `projects.json` — les filtres de la grille se basent
uniquement là-dessus, pas sur le champ `Tags` de la carte d'identité (qui
lui est un texte libre affiché tel quel sur la page projet, plus
granulaire que la classification).
