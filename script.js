const movies = [
  {
    "id": "1",
    "title": "El Padrino",
    "year": "1972",
    "genre": "Drama",
    "image": "https://picsum.photos/seed/elpadrino/300/450",
    "favorite": "true"
  },
  {
    "id": "2",
    "title": "El Caballero Oscuro",
    "year": "2008",
    "genre": "Acción",
    "image": "https://picsum.photos/seed/batman/300/450",
    "favorite": "true"
  },
  {
    "id": "3",
    "title": "Pulp Fiction",
    "year": "1994",
    "genre": "Crimen",
    "image": "https://picsum.photos/seed/pulpfiction/300/450",
    "favorite": "false"
  },
  {
    "id": "4",
    "title": "Forrest Gump",
    "year": "1994",
    "genre": "Drama",
    "image": "https://picsum.photos/seed/forrestgump/300/450",
    "favorite":"true"
  },
  {
    "id": "5",
    "title": "Matrix",
    "year": "1999",
    "genre": "Ciencia ficción",
    "image": "https://picsum.photos/seed/matrix/300/450",
    "favorite":"true"
  },
  {
    "id": "6",
    "title": "Interestelar",
    "year": "2014",
    "genre": "Ciencia ficción",
    "image": "https://picsum.photos/seed/interstellar/300/450",
    "favorite": "true"
  },
  {
    "id": "7",
    "title": "Gladiador",
    "year": "2000",
    "genre": "Acción",
    "image": "https://picsum.photos/seed/gladiator/300/450",
    "favorite": "true"
  },
  {
    "id": "8",
    "title": "Titanic",
    "year": "1997",
    "genre": "Romance",
    "image": "https://picsum.photos/seed/titanic/300/450",
    "favorite": "false"
  },
  {
    "id": "9",
    "title": "Parásitos",
    "year": "2019",
    "genre": "Drama",
    "image": "https://picsum.photos/seed/parasite/300/450",
    "favorite": "false"
  },
  {
    "id": "10",
    "title": "Coco",
    "year": "2017",
    "genre": "Animación",
    "image": "https://picsum.photos/seed/coco/300/450",
    "favorite": "false"
  },
  {
    "id": "11",
    "title": "Toy Story",
    "year": "1995",
    "genre": "Animación",
    "image": "https://picsum.photos/seed/toystory/300/450",
    "favorite": "false"
  },
  {
    "id": "12",
    "title": "El Señor de los Anillos: La Comunidad del Anillo",
    "year": "2001",
    "genre": "Fantasía",
    "image": "https://picsum.photos/seed/lotr/300/450",
    "favorite": "true"
  }
]


const cardsSection = document.getElementById("cards_section")
const foundersCounters = document.getElementById("founders_counter")
const searchbarButton = document.getElementById("searchbar_button")
const searchbar = document.querySelector('input')
const filterFavButton = document.getElementById("filter_favoritas_button")
const filterAllButton = document.getElementById("filter_todas_button")
const masRecientesOption = document.getElementById("mas_recientes_option")

renderAllMovies(movies)

searchbarButton.addEventListener("click",searchMovie)
filterFavButton.addEventListener("click",renderFavMovies)
filterAllButton.addEventListener("click",renderAllMovies)
masRecientesOption.addEventListener("click",sortByMostRecently)

function sortByMostRecently(){
  renderMovies(movies.sort((a,b)=> a.year - b.year))
}

function renderFavMovies(){
  renderMovies(movies.filter(movie => movie.favorite == "true"))
  filterFavButton.classList.add("active")
  filterAllButton.classList.remove("active")

}
function renderAllMovies(){
  renderMovies(movies)
  filterAllButton.classList.add("active")
  filterFavButton.classList.remove("active")
}
f
function searchMovie(){
  renderMovies(movies.filter(movie => movie.title.includes(searchbar.value.trim()) ))

}


function renderMovies(movies){
  cardsSection.innerHTML = ''

    for( i = 0;i < movies.length;i++){

      const card = document.createElement('div')
      card.setAttribute('id',movies[i].id)
      card.classList.add("card")
      card.innerHTML = `
            <div class="img_card_container">
                <img src="${movies[i].image}">
                
            </div>
            <div class="info_card_container">
                <h3 class="movie_title">${movies[i].title}</h3>
                <div class="movie_year" >${movies[i].year}</div>
                <div class="movie_genre">${movies[i].genre}</div>
            </div>
            <div class="favbutton_card_container">
                <button class="favbutton_card">Agregar a favoritos</button>
            </div>
        
        
        
        `
      cardsSection.appendChild(card)

    }

    foundersCounters.innerHTML = `${movies.length}`
  
}

