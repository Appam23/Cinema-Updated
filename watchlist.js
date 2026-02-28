// watchlist.js - Render watchlist movies from localStorage or fallback
import { getWatchlist } from "./shared.js";

function renderWatchlistPage() {
  const watchlist = getWatchlist();
  const watchlistList = document.getElementById('watchlist-list');
  watchlistList.innerHTML = '';
  if (!watchlist.length) {
    watchlistList.innerHTML = '<li>No movies in your watchlist yet.</li>';
    return;
  }
  watchlist.forEach(movie => {
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
    watchlistList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', renderWatchlistPage);
