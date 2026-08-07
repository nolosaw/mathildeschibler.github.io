// ==========================================================
// PAGE PROJETS : grille masonry + filtres par classification
// - filtres générés depuis data/classification.json (catégories)
// - grille générée depuis data/projects.json
// - sélection cumulable en OU ; aucun filtre sélectionné = tout affiché
// - "Shuffle" mélange l'ordre d'affichage ; disparaît au profit de
//   "Réinitialiser tous les filtres" dès qu'un filtre est actif
// - sur mobile, les filtres sont masqués derrière le lien "Filtrer"
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projects-grid');
  const filtersContainer = document.getElementById('filters');
  const filterToggle = document.getElementById('filter-toggle');
  const shuffleBtn = document.getElementById('shuffle-btn');
  const resetBtn = document.getElementById('reset-btn');
  if (!grid) return;

  let allProjects = [];

  filterToggle.addEventListener('click', () => {
    const isOpen = filtersContainer.classList.toggle('open');
    filterToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  shuffleBtn.addEventListener('click', () => {
    allProjects = shuffleArray(allProjects);
    renderGrid(allProjects);
    applyFilters();
  });

  resetBtn.addEventListener('click', () => {
    filtersContainer.querySelectorAll('.chip.active').forEach(chip => {
      chip.classList.remove('active');
      chip.textContent = chip.dataset.label;
    });
    applyFilters();
    updateActionsVisibility();
  });

  Promise.all([
    fetch('/data/classification.json').then(r => r.json()),
    fetch('/data/projects.json').then(r => r.json())
  ])
    .then(([classification, projects]) => {
      allProjects = projects;
      renderFilters(classification);
      renderGrid(allProjects);
    })
    .catch(err => console.error('Impossible de charger les données :', err));

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  grid.classList.add('cursor-follow');
  grid.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const caption = card.querySelector('.project-card-caption');
    if (!caption) return;
    caption.style.transform = `translate(${e.clientX + 16}px, ${e.clientY +10}px)`;
  });
}

  function renderFilters(classification) {
    classification.forEach(tag => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.dataset.slug = tag.slug;
      chip.dataset.label = tag.label;
      chip.textContent = tag.label;

      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        chip.innerHTML = chip.classList.contains('active')
          ? `${tag.label}<span class="chip-x">×</span>`
          : tag.label;
        applyFilters();
        updateActionsVisibility();
      });

      filtersContainer.appendChild(chip);
    });
  }

  function renderGrid(projects) {
    grid.innerHTML = '';
    projects.forEach(project => {
      const card = document.createElement('a');
      card.href = `/projects/${project.slug}/`;
      card.className = 'project-card';
      card.dataset.classification = project.classification.join(' ');

      card.innerHTML = `
        <div class="project-card-image">
          <img src="${project.cover}" alt="${project.title}" loading="lazy">
        </div>
        <p class="project-card-caption">${project.title}</p>
      `;
      grid.appendChild(card);
    });
  }

  function applyFilters() {
    const selected = Array.from(filtersContainer.querySelectorAll('.chip.active'))
      .map(chip => chip.dataset.slug);

    grid.querySelectorAll('.project-card').forEach(card => {
      const cardTags = card.dataset.classification.split(' ');
      const visible = selected.length === 0 || selected.some(tag => cardTags.includes(tag));
      card.style.display = visible ? '' : 'none';
    });
  }

  function updateActionsVisibility() {
    const hasActive = filtersContainer.querySelectorAll('.chip.active').length > 0;
    shuffleBtn.hidden = hasActive;
    resetBtn.hidden = !hasActive;
  }

  function shuffleArray(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
});
