const OMDB_API_KEY = "bd58c5fe";
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
      btn.onclick = () => toggleFavorite(movie);
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
      btn.onclick = () => toggleWatchlist(movie);
      li.appendChild(btn);
      watchlistList.appendChild(li);
    });
  }
}

function renderMovies(movies) {
  const movieList = document.getElementById('movie-list');
  if (!movieList) return;
  movieList.innerHTML = '';
  if (!movies || movies.length === 0) {
    movieList.innerHTML = '<li>No movies found.</li>';
    return;
  }
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.gap = '14px';

    const img = document.createElement('img');
    img.src = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/50x75?text=No+Image';
    img.alt = movie.Title;
    img.style.width = '50px';
    img.style.height = '75px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '4px';
    li.appendChild(img);

    const info = document.createElement('span');
    info.textContent = `${movie.Title} (${movie.Year})`;
    li.appendChild(info);

    const actions = document.createElement('span');
    actions.className = 'movie-actions';

    const favBtn = document.createElement('button');
    favBtn.textContent = favorites.some(m => m.imdbID === movie.imdbID) ? 'Remove Favorite' : 'Add Favorite';
    favBtn.onclick = () => toggleFavorite(movie);
    actions.appendChild(favBtn);

    const wlBtn = document.createElement('button');
    wlBtn.textContent = watchlist.some(m => m.imdbID === movie.imdbID) ? 'Remove Watchlist' : 'Add Watchlist';
    wlBtn.onclick = () => toggleWatchlist(movie);
    actions.appendChild(wlBtn);

    li.appendChild(actions);
    movieList.appendChild(li);
  });
}

function toggleFavorite(movie) {
  const exists = favorites.some(m => m.imdbID === movie.imdbID);
  if (exists) {
    favorites = favorites.filter(m => m.imdbID !== movie.imdbID);
  } else {
    favorites.push(movie);
  }
  // Save to localStorage
  localStorage.setItem('cinema_favorites', JSON.stringify(favorites));
  renderLists();
  renderMovies(currentResults);
}

function toggleWatchlist(movie) {
  const exists = watchlist.some(m => m.imdbID === movie.imdbID);
  if (exists) {
    watchlist = watchlist.filter(m => m.imdbID !== movie.imdbID);
  } else {
    watchlist.push(movie);
  }
  // Save to localStorage
  localStorage.setItem('cinema_watchlist', JSON.stringify(watchlist));
  renderLists();
  renderMovies(currentResults);
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
];

let allFetchedMovies = [];

async function fetchAllMovieDetails(titles) {
  const promises = titles.map(async title => {
    const resp = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
    const data = await resp.json();
    return data && data.Response !== "False" ? data : null;
  });
  return (await Promise.all(promises)).filter(Boolean);
}

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