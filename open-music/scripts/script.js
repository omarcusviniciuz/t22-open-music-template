
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;


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

function applyInputRangeStyle() {
  const inputRange = document.getElementById('priceRange');

  inputRange.addEventListener("input", (event) => {
    const currentInputValue = event.target.value;
    const runnableTrackProgress = (currentInputValue / inputRange.max) * 100;

    inputRange.style.background = `linear-gradient(to right, var(--sua-cor-primaria) ${runnableTrackProgress}%, var(--sua-cor-cinza-5) ${runnableTrackProgress}%)`;
  });
}

function applyInputRangeStyle() {
  const inputRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');

  if (!inputRange) return;


  priceValue.textContent = inputRange.value;

  inputRange.addEventListener("input", (event) => {
    const currentInputValue = event.target.value;
    const runnableTrackProgress = (currentInputValue / inputRange.max) * 100;

    inputRange.style.background = `linear-gradient(to right, var(--sua-cor-primaria) ${runnableTrackProgress}%, var(--sua-cor-cinza-5) ${runnableTrackProgress}%)`;


    priceValue.textContent = currentInputValue;
  });
}

applyInputRangeStyle();

function applyInputRangeStyle() {
  const inputRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const albumCards = document.querySelectorAll('.album-card');

  if (!inputRange) return;

  // Atualiza o valor inicial
  priceValue.textContent = inputRange.value;

  function filtrarPorPreco() {
    const precoMax = Number(inputRange.value);

    albumCards.forEach(card => {
      const precoTexto = card.querySelector('.price').textContent.replace('R$', '').replace(',', '.').trim();
      const precoAlbum = Number(precoTexto);

      if (precoAlbum > precoMax) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }
    });
  }

  // Evento de input para atualizar o range e filtrar os cards
  inputRange.addEventListener("input", (event) => {
    const currentInputValue = event.target.value;
    const runnableTrackProgress = (currentInputValue / inputRange.max) * 100;

    inputRange.style.background = `linear-gradient(to right, var(--sua-cor-primaria) ${runnableTrackProgress}%, var(--sua-cor-cinza-5) ${runnableTrackProgress}%)`;

    priceValue.textContent = currentInputValue;

    filtrarPorPreco();
  });

  // Filtra ao carregar a página também
  filtrarPorPreco();
}

applyInputRangeStyle();