// import { fetchAlbums } from './api.js';
// import { albumList } from './albumsDatabase.js';

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



function createAlbumCard(album) {
  const card = document.createElement('div');
  card.classList.add('album-card');

  card.innerHTML = `
    <img src="${album.img}" alt="${album.title}" />
    <h3>${album.title}</h3>
    <p class="artist">${album.band}</p>
    <p class="genre">${album.genre}"</p>
    <p class="price">R$ ${album.price.toFixed(2)}</p>
    <button>Comprar</button>
  `;

  return card;
}


async function loadAlbums() {
  const albumGrid = document.querySelector('.album-grid');
  const albums = await fetchAlbums();

  albumGrid.innerHTML = ''; 

  albums.forEach(album => {
    const card = createAlbumCard(album);
    albumGrid.appendChild(card);
  });
}

loadAlbums();