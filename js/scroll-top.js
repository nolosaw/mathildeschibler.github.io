var scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
  scrollTopBtn.hidden = false;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}