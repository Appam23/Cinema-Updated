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
