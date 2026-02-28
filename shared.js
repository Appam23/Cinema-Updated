// shared.js - Shared constants and functions for the Cinema app

export const OMDB_API_KEY = "e13f2aee";

export function renderMovies(movies) {
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

    // Buttons will be added in app.js for favorites/watchlist
    li.appendChild(actions);
    movieList.appendChild(li);
  });
}

// Reusable function to render a list of movies in a given ul/ol element
export function renderMovieList(listElement, movies, emptyMessage = 'No movies found.') {
  listElement.innerHTML = '';
  if (!movies || movies.length === 0) {
    listElement.innerHTML = `<li>${emptyMessage}</li>`;
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
    listElement.appendChild(li);
  });
}

// Render a grid of movies in a given container (for all movies page)
export function renderAllMovies(movies) {
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

// Search movies from OMDb API by query string
export async function searchMovies(query, renderMovies, OMDB_API_KEY, setCurrentResults) {
  if (!query.trim()) {
    renderMovies([]);
    if (setCurrentResults) setCurrentResults([]);
    return;
  }
  const resp = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query.trim())}`);
  const data = await resp.json();
  if (data.Search) {
    if (setCurrentResults) setCurrentResults(data.Search);
    renderMovies(data.Search);
  } else {
    if (setCurrentResults) setCurrentResults([]);
    renderMovies([]);
  }
}

// Fetch movie details from OMDb API for a list of titles
export async function fetchAllMovieDetails(titles, apiKey = OMDB_API_KEY) {
  const promises = titles.map(async title => {
    const resp = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`);
    const data = await resp.json();
    return data && data.Response !== "False" ? data : null;
  });
  return (await Promise.all(promises)).filter(Boolean);
}

// Modal utility functions
export function showModal(modal) {
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  }
}
export function hideModal(modal) {
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
  }
}

// Toggle favorite movie in the favorites array and localStorage
export function toggleFavorite(movie, favorites, setFavorites, renderLists, renderMovies, currentResults) {
  const exists = favorites.some(m => m.imdbID === movie.imdbID);
  let updatedFavorites;
  if (exists) {
    updatedFavorites = favorites.filter(m => m.imdbID !== movie.imdbID);
  } else {
    updatedFavorites = [...favorites, movie];
  }
  localStorage.setItem('cinema_favorites', JSON.stringify(updatedFavorites));
  setFavorites(updatedFavorites);
  renderLists();
  renderMovies(currentResults);
}

// Toggle watchlist movie in the watchlist array and localStorage
export function toggleWatchlist(movie, watchlist, setWatchlist, renderLists, renderMovies, currentResults) {
  const exists = watchlist.some(m => m.imdbID === movie.imdbID);
  let updatedWatchlist;
  if (exists) {
    updatedWatchlist = watchlist.filter(m => m.imdbID !== movie.imdbID);
  } else {
    updatedWatchlist = [...watchlist, movie];
  }
  localStorage.setItem('cinema_watchlist', JSON.stringify(updatedWatchlist));
  setWatchlist(updatedWatchlist);
  renderLists();
  renderMovies(currentResults);
}

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('cinema_favorites')) || [];
  } catch {
    return [];
  }
}

export function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem('cinema_watchlist')) || [];
  } catch {
    return [];
  }
}
