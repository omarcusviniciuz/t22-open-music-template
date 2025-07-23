
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Carrega tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

const genreButtons = document.querySelectorAll('.genres button');

const albumCards = document.querySelectorAll('.album-card');

genreButtons.forEach(button => {
  button.addEventListener('click', () => {
  
    genreButtons.forEach(btn => btn.classList.remove('active'));
    
    button.classList.add('active');

    const selectedGenre = button.textContent.trim();

    albumCards.forEach(card => {
      const cardGenre = card.querySelector('.genre').textContent.trim();
      if (selectedGenre === 'Todos' || cardGenre === selectedGenre) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});