document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('home-carousel');
  if (!container) return;

  const DELAY = 5000;

  fetch('/data/projects.json')
    .then(response => response.json())
    .then(projects => {
      const featured = projects
        .filter(p => p.featured)
        .sort((a, b) => (a.homeOrder || 0) - (b.homeOrder || 0));
      if (featured.length) initCarousel(featured);
    })
    .catch(err => console.error('Impossible de charger projects.json :', err));

  function initCarousel(projects) {
    container.innerHTML = projects.map((project, i) => {
      const displayTitle = project.homeTitle || project.title;
      return `
        <a href="/projects/${project.slug}/" class="home-slide${i === 0 ? ' active' : ''}" aria-label="${displayTitle}">
          <img src="${project.homeImage}" alt="${displayTitle}" loading="${i === 0 ? 'eager' : 'lazy'}">
          <div class="home-caption">
            <span>${displayTitle}</span>
            <span>${project.homeCategory || ''}</span>
          </div>
        </a>
      `;
    }).join('');

    const slides = Array.from(container.children);
    if (slides.length <= 1) return;

    let index = 0;
    setInterval(() => {
      const current = slides[index];
      const nextIndex = (index + 1) % slides.length;
      const next = slides[nextIndex];

      // L'actuel balaie vers la gauche pendant que le suivant arrive depuis la droite
      current.classList.remove('active');
      current.classList.add('leaving');
      next.classList.add('active');

      // Une fois sorti à gauche, on le replace instantanément à droite (sans transition),
      // prêt pour son prochain passage
      current.addEventListener('transitionend', function reset(e) {
        if (e.propertyName !== 'transform') return;
        current.removeEventListener('transitionend', reset);
        current.classList.add('no-transition');
        current.classList.remove('leaving');
        void current.offsetWidth; // force le saut instantané avant de réactiver la transition
        current.classList.remove('no-transition');
      }, { once: true });

      index = nextIndex;
    }, DELAY);
  }
});