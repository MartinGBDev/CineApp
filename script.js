/* ============ REFERENCIAS ============ */
const cardsSection      = document.getElementById("cards_section");
const foundersCounter   = document.getElementById("founders_counter");
const searchbarButton   = document.getElementById("searchbar_button");
const searchbar         = document.getElementById("searchbar");
const filterFavButton   = document.getElementById("filter_favoritas_button");
const filterAllButton   = document.getElementById("filter_todas_button");
const orderSelect       = document.getElementById("order_select");
const favCounterNumber  = document.getElementById("fav_counter_number");

const STORAGE_KEY = "catalogo";

/* ============ ESTADO ============ */
let catalogo       = [];
let currentFilter  = "todas";   // "todas" | "favoritas"
let currentSearch  = "";
let currentOrder   = "";        // "" | "recientes" | "nombre"

/* ============ CARGA DE DATOS ============ */
async function loadCatalogo() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    catalogo = JSON.parse(saved);
  } else {
    try {
      const answer = await fetch("./catalogo.json");
      if (!answer.ok) throw new Error("No se pudo cargar catalogo.json");
      catalogo = await answer.json();
    } catch (err) {
      console.error(err);
      catalogo = [];
    }
  }

  // Normalizamos "favorite" a booleano SIEMPRE (el JSON lo trae como string)
  catalogo = catalogo.map(m => ({
    ...m,
    favorite: m.favorite === true || m.favorite === "true"
  }));
}

function saveCatalogo() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogo));
}

async function init() {
  await loadCatalogo();
  renderCurrentView();
}

init();

/* ============ LÓGICA DE FAVORITOS ============ */
function toggleFavorite(id) {
  const movie = catalogo.find(m => String(m.id) === String(id));
  if (!movie) return;

  movie.favorite = !movie.favorite;
  saveCatalogo();
  renderCurrentView();   // si estamos en "Favoritas", la tarjeta desaparece
}

/* ============ FILTRADO / BÚSQUEDA / ORDEN ============ */
function getVisibleMovies() {
  let movies = [...catalogo];

  // 1) Filtro Todas / Favoritas
  if (currentFilter === "favoritas") {
    movies = movies.filter(m => m.favorite);
  }

  // 2) Búsqueda por título (case-insensitive)
  const term = currentSearch.trim().toLowerCase();
  if (term) {
    movies = movies.filter(m => m.title.toLowerCase().includes(term));
  }

  // 3) Orden
  if (currentOrder === "recientes") {
    movies.sort((a, b) => Number(b.year) - Number(a.year));   // descendente
  } else if (currentOrder === "nombre") {
    movies.sort((a, b) => a.title.localeCompare(b.title, "es"));
  }

  return movies;
}

function renderCurrentView() {
  renderMovies(getVisibleMovies());
  updateFavCounter();
}

function updateFavCounter() {
  const total = catalogo.filter(m => m.favorite).length;
  favCounterNumber.textContent = total;
}

/* ============ RENDER ============ */
function renderMovies(movies) {
  cardsSection.innerHTML = "";

  const fragment = document.createDocumentFragment();

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = movie.id;                 // mejor que setAttribute("id", ...)

    card.innerHTML = `
      <div class="img_card_container">
        <img src="${movie.image}" alt="${movie.title}">
      </div>
      <div class="info_card_container">
        <h3 class="movie_title">${movie.title}</h3>
        <div class="movie_year">${movie.year}</div>
        <div class="movie_genre">${movie.genre}</div>
      </div>
      <div class="favbutton_card_container">
        <button class="favbutton_card ${movie.favorite ? "is-fav" : ""}">
          ${movie.favorite ? "★ En favoritos" : "☆ Agregar a favoritos"}
        </button>
      </div>
    `;

    fragment.appendChild(card);
  });

  cardsSection.appendChild(fragment);
  foundersCounter.textContent = movies.length;
}

/* ============ EVENTOS ============ */

// Delegación: un solo listener para todas las tarjetas (presentes y futuras)
cardsSection.addEventListener("click", (e) => {
  const btn = e.target.closest(".favbutton_card");
  if (!btn) return;
  const card = btn.closest(".card");
  toggleFavorite(card.dataset.id);
});

// Buscar
searchbarButton.addEventListener("click", () => {
  currentSearch = searchbar.value;
  renderCurrentView();
});

searchbar.addEventListener("input", () => {       // búsqueda "en vivo"
  currentSearch = searchbar.value;
  renderCurrentView();
});

searchbar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    currentSearch = searchbar.value;
    renderCurrentView();
  }
});

// Filtros
filterAllButton.addEventListener("click", () => {
  currentFilter = "todas";
  filterAllButton.classList.add("active");
  filterFavButton.classList.remove("active");
  renderCurrentView();
});

filterFavButton.addEventListener("click", () => {
  currentFilter = "favoritas";
  filterFavButton.classList.add("active");
  filterAllButton.classList.remove("active");
  renderCurrentView();
});

orderSelect.addEventListener("change", () => {
  currentOrder = orderSelect.value;
  renderCurrentView();
});