// favorites.js - Render favorite movies from localStorage or fallback
import { getFavorites, renderMovieList } from "./shared.js";

function renderFavoritesPage() {
  const favorites = getFavorites();
  const favoritesList = document.getElementById('favorites-list');
  renderMovieList(favoritesList, favorites, 'No favorite movies yet.');
}

document.addEventListener('DOMContentLoaded', renderFavoritesPage);
