import { OMDB_API_KEY, renderMovies, toggleFavorite, toggleWatchlist } from "./shared.js";
let favorites = [];
let watchlist = [];

function renderLists() {
  // Favorites
  const favoritesList = document.getElementById('favorites-list');
  if (favoritesList) {
    favoritesList.innerHTML = '';
    favorites.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = `${movie.Title} (${movie.Year})`;
      const btn = document.createElement('button');
      btn.textContent = 'Remove';
      btn.onclick = () => toggleFavorite(movie, favorites, setFavorites, renderLists, renderMovies, currentResults);
      li.appendChild(btn);
      favoritesList.appendChild(li);
    });
  }

  // Watchlist
  const watchlistList = document.getElementById('watchlist-list');
  if (watchlistList) {
    watchlistList.innerHTML = '';
    watchlist.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = `${movie.Title} (${movie.Year})`;
      const btn = document.createElement('button');
      btn.textContent = 'Remove';
      btn.onclick = () => toggleWatchlist(movie, watchlist, setWatchlist, renderLists, renderMovies, currentResults);
      li.appendChild(btn);
      watchlistList.appendChild(li);
    });
  }
}

// Removed toggleFavorite and toggleWatchlist functions as they are now imported from shared.js

function setFavorites(newFavorites) {
  favorites = newFavorites;
}

function setWatchlist(newWatchlist) {
  watchlist = newWatchlist;
}


// Demo: List of available movies (replace with your own or fetch from API)

const availableMovieTitles = [
  "Inception",
  "The Matrix",
  "Interstellar",
  "The Dark Knight",
  "Pulp Fiction",
  "Forrest Gump",
  "Fight Club",
  "The Shawshank Redemption",
  "The Godfather",
  "Gladiator",
  "Titanic",
  "Avatar",
  "Avengers: Endgame",
  "Jurassic Park",
  "Star Wars",
  "Toy Story",
  "The Lion King",
  "Back to the Future",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Harry Potter and the Sorcerer's Stone",
  "Spider-Man",
  "Iron Man",
  "Black Panther",
  "Frozen",
  "Shrek",
  "Finding Nemo"
    // More Horror movies
    ,"Rosemary's Baby"
    ,"The Babadook"
    ,"Paranormal Activity"
    ,"The Blair Witch Project"
    ,"Poltergeist"
    ,"The Texas Chain Saw Massacre"
    ,"Carrie"
    ,"Insidious"
    ,"The Grudge"
    ,"Midsommar"
    // More Western movies
    ,"Shane"
    ,"Rio Bravo"
    ,"The Searchers"
    ,"3:10 to Yuma"
    ,"The Outlaw Josey Wales"
    ,"Red River"
    ,"Winchester '73"
    ,"The Man Who Shot Liberty Valance"
    ,"My Darling Clementine"
    ,"Pat Garrett & Billy the Kid"
];

import { fetchAllMovieDetails } from "./shared.js";

let allFetchedMovies = [];

async function renderAllMoviesFromAPI(genre = "") {
  if (allFetchedMovies.length === 0) {
    allFetchedMovies = await fetchAllMovieDetails(availableMovieTitles);
  }
  let filtered = allFetchedMovies;
  if (genre && genre !== "") {
    filtered = allFetchedMovies.filter(movie => {
      if (!movie.Genre) return false;
      // OMDb returns genres as comma-separated string
      return movie.Genre.split(',').map(g => g.trim().toLowerCase()).includes(genre.toLowerCase());
    });
  }
  renderAllMovies(filtered);
}


function renderAllMovies(movies) {
  const grid = document.getElementById('all-movies-grid');
  if (!grid) return;
  grid.innerHTML = '';
  if (!movies || movies.length === 0) {
    grid.innerHTML = '<p>No movies available.</p>';
    return;
  }
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    const img = document.createElement('img');
    img.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/140x210?text=No+Image';
    img.alt = movie.Title;
    card.appendChild(img);
    const title = document.createElement('div');
    title.className = 'movie-card-title';
    title.textContent = movie.Title;
    card.appendChild(title);
    const year = document.createElement('div');
    year.className = 'movie-card-year';
    year.textContent = movie.Year;
    card.appendChild(year);
    grid.appendChild(card);
  });
}



// Genre dropdown event
document.addEventListener('DOMContentLoaded', () => {
  const genreDropdown = document.getElementById('genre-dropdown');
  if (genreDropdown) {
    genreDropdown.addEventListener('change', (e) => {
      const selectedGenre = e.target.value;
      renderAllMoviesFromAPI(selectedGenre);
    });
  }
});

// Initial render
renderLists();
renderMovies([]);
renderAllMoviesFromAPI();