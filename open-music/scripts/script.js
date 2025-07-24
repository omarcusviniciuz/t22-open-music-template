import { fetchAlbums } from "./api.js";
import { albumList } from "./albumsDatabase.js";

function filtrarAlbums() {
  const albumCards = document.querySelectorAll('.album-card');
  const selectedGenre = document.querySelector('.genres button.active')?.textContent.trim() || 'Todos';
  const inputRange = document.getElementById('priceRange');
  const precoMax = inputRange ? Number(inputRange.value) : Infinity;

  albumCards.forEach(card => {
    const cardGenre = card.querySelector('.genre').textContent.trim();
    const precoTexto = card.querySelector('.price').textContent.replace('R$', '').replace(',', '.').trim();
    const precoAlbum = Number(precoTexto);

    const genreMatch = (selectedGenre === 'Todos' || cardGenre === selectedGenre);
    const priceMatch = (precoAlbum <= precoMax);

    if (genreMatch && priceMatch) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function setupGenreFilter() {
  const genreButtons = document.querySelectorAll('.genres button');

  genreButtons.forEach(button => {
    button.addEventListener('click', () => {
      genreButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filtrarAlbums(); // aplica o filtro sempre que o botão for clicado
    });
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

    filtrarAlbums(); // aplica o filtro de preço em tempo real
  });

  // aplica filtro inicial ao carregar
  filtrarAlbums();
}

function createAlbumCard(album) {
  const card = document.createElement('div');
  card.classList.add('album-card');

  card.innerHTML = `
    <div class="c">
      <img src="${album.img}" alt="${album.title}" />
      <h3>${album.title}</h3>
    </div>
    <div class="a">
      <p class="artist">${album.band}</p>
      <p class="genre">${album.genre}</p>
    </div>
    <div class="b">
      <p class="price">R$ ${Number(album.price).toFixed(2)}</p>
      <button>Comprar</button>
    </div>
  `;

  return card;
}

async function loadAlbums() {
  const albumGrid = document.querySelector('.album-grid');
  albumGrid.innerHTML = ''; // limpa a grid

  let apiAlbums = [];
  try {
    apiAlbums = await fetchAlbums();
  } catch (error) {
    console.warn('Erro ao buscar da API, exibindo só local:', error);
  }

  const allAlbums = [...albumList, ...apiAlbums];

  allAlbums.forEach(album => {
    const card = createAlbumCard(album);
    albumGrid.appendChild(card);
  });

  // 🔁 Ativa os filtros depois que os cards foram renderizados
  setupGenreFilter();
  applyInputRangeStyle();
}

loadAlbums();
