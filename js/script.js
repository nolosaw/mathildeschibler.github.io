document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.filters .tag');
    const projects = document.querySelectorAll('.project');
    const resetButton = document.getElementById('reset-filters');

    
  
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Ajouter ou retirer la classe "selected" pour le tag cliqué
        tag.classList.toggle('selected');
  
        // Récupérer tous les tags sélectionnés
        const selectedTags = Array.from(tags)
          .filter(t => t.classList.contains('selected'))
          .map(t => t.getAttribute('data-tag'));
  
        // Filtrer les projets
        projects.forEach(project => {
          const projectTags = project.getAttribute('data-tags').split(' ');
          // Afficher le projet s'il correspond à au moins un tag sélectionné
          if (selectedTags.length === 0 || selectedTags.some(tag => projectTags.includes(tag))) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  
    // Gestion du bouton "Reset Filters"
    resetButton.addEventListener('click', () => {
      // Désélectionner tous les tags
      tags.forEach(tag => tag.classList.remove('selected'));
  
      // Afficher tous les projets
      projects.forEach(project => {
        project.style.display = 'block';
      });
    });
  
    // Afficher tous les projets par défaut
    projects.forEach(project => {
      project.style.display = 'block';
    });
  });