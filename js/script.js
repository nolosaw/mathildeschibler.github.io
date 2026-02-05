document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filters button');
    const projects = document.querySelectorAll('.project');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const tag = button.getAttribute('data-tag');
        projects.forEach(project => {
          if (tag === 'all' || project.getAttribute('data-tags').includes(tag)) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  });