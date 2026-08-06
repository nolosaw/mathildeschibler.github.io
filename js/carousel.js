// ==========================================================
// HOME PAGE : carrousel des projets "featured"
// - défilement natif au swipe / scroll horizontal (trackpad)
// - boucle infinie (clone du premier et dernier slide)
// - avance automatiquement toutes les 4 secondes si l'utilisateur
//   n'interagit pas, repart de zéro dès qu'il touche au carrousel
// - clic sur une carte = va directement à la page du projet
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
      const featured = projects.filter(p => p.featured);
      if (featured.length) initCarousel(featured);
    })
    .catch(err => console.error('Impossible de charger projects.json :', err));

  function slideMarkup(project) {
    return `
      <a href="projects/${project.slug}.html" class="carousel-slide">
        <div class="carousel-image">
          <img src="${project.cover}" alt="${project.title}" loading="lazy">
        </div>
        <p class="carousel-caption">
          <strong>${project.title}</strong><br>${project.baseline || ''}
        </p>
      </a>
    `;
  }

  function initCarousel(projects) {
    const AUTOPLAY_DELAY = 4000;

    // Un seul projet : pas besoin de boucle ni d'autoplay, on affiche juste la carte.
    if (projects.length === 1) {
      track.innerHTML = slideMarkup(projects[0]);
      return;
    }

    // Clone du dernier projet au début et du premier à la fin, pour boucler sans à-coup.
    const extended = [projects[projects.length - 1], ...projects, projects[0]];
    track.innerHTML = extended.map(slideMarkup).join('');

    const slides = Array.from(track.children);
    let index = 1; // première vraie carte (après le clone de tête)
    let autoplayTimer = null;
    let settleTimer = null;

    function goTo(i, smooth = true) {
      const slide = slides[i];
      if (!slide) return;
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    function resetAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        index++;
        goTo(index);
      }, AUTOPLAY_DELAY);
    }

    // Position initiale sans animation, puis démarrage de l'autoplay.
    goTo(index, false);
    resetAutoplay();

    // Une fois le scroll stabilisé, on repère la carte la plus proche du centre ;
    // si c'est un clone (début ou fin), on saute silencieusement vers l'équivalent réel.
    track.addEventListener('scroll', () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = index;
        let minDist = Infinity;
        slides.forEach((s, i) => {
          const sCenter = s.offsetLeft + s.clientWidth / 2;
          const dist = Math.abs(sCenter - center);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        index = closest;

        if (index === 0) {
          index = slides.length - 2;
          goTo(index, false);
        } else if (index === slides.length - 1) {
          index = 1;
          goTo(index, false);
        }
      }, 120);
    }, { passive: true });

    // Toute interaction manuelle relance le minuteur des 4 secondes.
    ['wheel', 'touchstart', 'mousedown'].forEach(evt => {
      track.addEventListener(evt, resetAutoplay, { passive: true });
    });
  }
});
