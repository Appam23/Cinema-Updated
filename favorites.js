// favorites.js - Render favorite movies from localStorage or fallback
import { getFavorites } from "./shared.js";

function renderFavoritesPage() {
  const favorites = getFavorites();
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';
  if (!favorites.length) {
    favoritesList.innerHTML = '<li>No favorite movies yet.</li>';
    return;
  }
  favorites.forEach(movie => {
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
    favoritesList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', renderFavoritesPage);
