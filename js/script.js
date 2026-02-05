document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.filters .tag');
    const projects = document.querySelectorAll('.project');
  
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Gérer la sélection/dé-sélection des tags
        const isSelected = tag.classList.contains('selected');
        tags.forEach(t => t.classList.remove('selected')); // Réinitialiser tous les tags
        if (!isSelected) {
          tag.classList.add('selected'); // Ajouter la classe "selected" au tag cliqué
        }
  
        // Filtrer les projets
        const selectedTag = tag.getAttribute('data-tag');
        projects.forEach(project => {
          if (selectedTag === 'all' || project.getAttribute('data-tags').includes(selectedTag)) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  });