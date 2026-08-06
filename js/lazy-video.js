// ==========================================================
// PAGE PROJET : chargement différé + lecture automatique des vidéos
// - une vidéo n'est chargée (data-src -> src) que lorsqu'elle approche
//   de l'écran, pour éviter que plusieurs vidéos ne pèsent toutes au
//   chargement d'une même page
// - une fois chargée, elle se joue automatiquement en muet dès qu'elle
//   est visible (comme une image qui bouge), et se met en pause quand
//   elle sort de l'écran
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video.lazy-video');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        if (!video.src) {
          video.src = video.dataset.src;
          video.load();
        }
        video.play().catch(() => {
          // Lecture auto bloquée par le navigateur : la vidéo reste
          // affichée sur son poster, l'utilisateur peut lancer manuellement.
        });
      } else {
        video.pause();
      }
    });
  }, { rootMargin: '200px', threshold: 0.25 });

  videos.forEach(video => observer.observe(video));
});
