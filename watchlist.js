// watchlist.js - Render watchlist movies from localStorage or fallback
import { getWatchlist, renderMovieList } from "./shared.js";

function renderWatchlistPage() {
  const watchlist = getWatchlist();
  const watchlistList = document.getElementById('watchlist-list');
  renderMovieList(watchlistList, watchlist, 'No movies in your watchlist yet.');
}

document.addEventListener('DOMContentLoaded', renderWatchlistPage);
